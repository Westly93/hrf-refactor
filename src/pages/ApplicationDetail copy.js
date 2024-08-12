import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubmissionSpinner from "../components/SubmissionSuccess/SubmissionSpinner";
import {
  fetchApplications,
  fetchApplicationScores,
  applicationScores,
  adjustpplicationScores,
  updateHumanApplicationScores,
  shortListApplicant,
  fetchPreshortListScores,
  fetchApplicationDocuments,
  fetchApplicationReferences,
} from "../features/applications/applicationsSlice";
import { ApplicantCandidates, fetchPreshortListScore } from "../apis/preshortListScores";
import { useQuery } from "@tanstack/react-query";
import {fetchApplicantContacts} from "../features/applications/fetchApplicantDoc";
import ProfileDocuments from "../components/ProfileDocuments";
import ApplicantContacts from "../components/ApplicantContacts";


const ApplicationDetail = ({ show, onHide, req, onSave, requirementsData }) => {


  const { id, pk } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adverts } = useSelector((state) => state.adverts);


  const { applications, scores } = useSelector((state) => state.applications);
  const { isAuthenticated, user } = useSelector((state) => state.users);
  const application = applications?.find((app) => app.id == parseInt(pk));
  const applicant = application && JSON.parse(application.applicant);
  //const advert= application && JSON.parse(application.advert);

  const applicationScores = scores?.filter(
    (score) => score.application_id == pk
  );

  const applicantID = applicationScores[0]?.applicant_id;

  ///const natID = applicationScores[0]?.id;


  //console.log("nationalolID", applicationScores)

  // const {
  //   isLoading: profileDocLoading,
  //   isError: profileDocError,
  //   error: profileDocErrorData,
  //   data: profileDoc,
  // } = useQuery(['profileDoc', applicantID], () => fetchApplicantDoc(applicantID));


  const {
    isLoading: applicantCon,
    isError: applicantConError,
    error: applicantConErrorData,
    data: applicantContact,
  } = useQuery(['applicantContact', applicantID], () => fetchApplicantContacts(applicantID));

  //console.log('contacts', applicantContact)

  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isShortlist, setIsShortlist] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [applicantDocument, setApplicantDocument] = useState([]);
  const [applicationDocument, setApplicationDocument] = useState([]);
  const [applicantReference, setApplicantReference] = useState([]);


  //const combinedArray = profileDoc?.length ? [...profileDoc, ...applicantDocument] : applicantDocument;

    //console.log("applicationnnndocuments", applicantDocument)


    //fetch preshortlist scores
    const { isLoading, isError, error, data: shortlistscores } = useQuery(
      {
          queryKey: ['shortlistscores', pk],
          queryFn: () => fetchPreshortListScore(pk)
      }
  );

  //console.log("application primary key", pk)
 //console.log("shortlistscores", shortlistscores)


  //taking applicant docs
  // const { data: applicationDocs } = useQuery({
  //   queryKey: ['applicationDocs'],
  //   queryFn: fetchApplicantDoc
  // });
  //end applicant docs


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!user.roles.some((role) => role.name === "admin")) {
      navigate("/vacancies");
    }
    dispatch(fetchApplicationScores());
    // dispatch(fetchApplicationDocuments());
    dispatch(fetchApplicationDocuments(pk))
  .then((result) => {
    // Handle the result (e.g., access result.payload for data)
    setApplicantDocument(result.payload.data);
    // console.log('Documents fetched:', applicantDocument);
  })
  .catch((error) => {
    // Handle any errors
    // console.error('Error fetching documents:', error);
  });
  //end call functionn to fetch documents

  //fetch applicantDocs
  
  //end fetch applicantDocs


  // console.log("applications", applicantDocument)


  //==============start applicant references========
  dispatch(fetchApplicationReferences(pk))
  .then((result)=>{
    setApplicantReference(result.payload.data);
  })
  .catch((error) => {
    // Handle any errors
    // console.error('Error fetching references:', error);
  });

  // console.log("Applicant refernces:", applicantReference);
  //==================end applicant references
  dispatch(fetchPreshortListScores(application?.id));
  }, [dispatch, pk]);


  // Filter documents based on application_id
  const applicationIdToFilter = applicationScores[0]?.application_id;
  
  const requirements = applicationScores && applicationScores?.map((req) => req.score);
  // console.log("applicationScoresapplicationScores:", applicationScores);
  //show in different tables kana zvichiita
  const computedScores = applicationScores?.filter(
    (req) => req.type === "computed"
  );
  const humanScores = applicationScores?.filter((req) => req.type === "human");
  const totalWeight = requirements?.reduce((total, req) => total + req, 0);


  //adjust the score
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditScoreModalOpen, setEditScoreModalOpen] = useState(false);
  const [adjustedScore, setAdjustedScore] = useState(requirements);
  const [compScore, setCompScore] = useState(requirements);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState();
  const [requirement_id, setReqID] = useState();
  const [scoreID, setScoreID] = useState();
  const [isLoadingg, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [editScore, setEditScore] = useState('');

  // Function to handle shortlisting of applicant
  const handleShortlist = async (event) => {
    event.preventDefault();
    if (!isShortlisted) {
      const shortList = await dispatch(
        shortListApplicant({
          application_id: applicationScores[0]?.application_id,
          applicant_id: applicationScores[0]?.applicant_id,
          status_id: 1,
        })
      );
      if (shortList.payload) {
        setIsShortlist(true);
        setTimeout(() => {
          setIsShortlist(false);
        }, 5000);
        navigate(`/applications/${id}`)
      }

      setIsShortlisted(true);
      // console.log("shortlist:", shortList);
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  //end shortlist code

//handle adjust code
  const handleSave = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (adjustedScore > compScore) {
      setValidationMessage('Value should be less than the adjusted score.');
      setIsLoading(false);
      return;
    } else{
      try {
        const adjustedRequirement = await dispatch(
          adjustpplicationScores({
            application_id: application?.id,
            requirement_id: requirement_id,
            score: adjustedScore,
            type: "human",
            comment: comment,
          })
        );
        if (adjustedRequirement.payload) {
          setIsPublished(true);
          setTimeout(() => {
            setIsPublished(false);
          }, 5000);
          window.location.reload();
          setIsLoading(false);
        }
       // console.log("adjustedRequirement:", adjustedRequirement);
        toggleModal();
        
      } catch (error) {
       // console.error("No Network");
      }
      setValidationMessage('');
    }

  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "score") {
      setAdjustedScore(parseFloat(value));
    } else if (name === "comment") {
      setComment(value);
    }
  };
  //end of the code

    //editing the human score=========================
    const [humanScore, setHumanScore] = useState('');
    // const [humanScore, setHumanScore] = useState('');
    const openEditScoreModal = () => {
      setEditScoreModalOpen(true);
    };
    const closeAdjustScoreModal = () => {
      setEditScoreModalOpen(false);
    };

    //handle edit human score
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      // adjust human score
      if (humanScore > compScore) {
        setValidationMessage('Value should be less than the computed score.');
        setIsLoading(false);
        return;
      } else{
        try {
          const adjustedHumanScore = await dispatch(
            updateHumanApplicationScores({
              application_id: application?.id,
              id: scoreID,
              score: humanScore,
              type: "human",
              comment: comment,
            })
          );
          if (adjustedHumanScore.payload) {
            setIsPublished(true);
            window.location.reload();
            setIsLoading(false);
            setTimeout(() => {
              setIsPublished(false);
            }, 5000);
            window.location.reload();
            // setIsLoading(false);
            setEditScoreModalOpen(false);
          }
          // console.log("human score adj:", adjustedHumanScore);
          
        } catch (error) {
          // console.error("Error while adjusting score");
          setIsLoading(false);
          setEditScoreModalOpen(false);
        }
        setValidationMessage('');
      }
      closeAdjustScoreModal();
    };
  //end editing the human score====================

  return (
    <div className="mt-5">
      {isLoadingg && (
        <div className="loading-overlay">
          <SubmissionSpinner />
        </div>
      )}



{shortlistscores && shortlistscores.data && Array.isArray(shortlistscores.data) && shortlistscores.data.length > 0 ? (
        <>
          <div className="card shadow border-0 rounded mt-4">
            <h3 className="card-header fw-medium">Job Details</h3>
            <div className="card-body">
              <h5 className="text-uppercase">{shortlistscores.data[0]?.title}</h5>
              <small>Closing Date: {shortlistscores.data[0]?.closing_date}</small>
            </div>
          </div>

          <div></div>
          <div className="card shadow border-0 rounded mt-4">
            <h3 className="card-header fw-medium">Applicant Information</h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">Firstname</div>
                <div className="col-md-8">
                  {shortlistscores.data[0]?.firstnames}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">Surname</div>
                <div className="col-md-8">{shortlistscores.data[0]?.surname}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Date of Birth</div>
                <div className="col-md-8">{shortlistscores.data[0]?.dob}</div>
              </div>
              <div className="row">
                <div className="col-md-4">Gender</div>
                <div className="col-md-8">{shortlistscores.data[0]?.sex}</div>
              </div>
              <div className="row">
                <div className="col-md-4">National Id</div>
                <div className="col-md-8">{shortlistscores.data[0]?.national_id}</div>
              </div>
            </div>
          
          </div>

          {/* applicant contacts */}
          <div className="card shadow border-0 rounded mt-4">
            <h3 className="card-header fw-medium">Applicant Contact Details</h3>
            <div className="card-body">
            <ApplicantContacts contacts={applicantContact}/>
            </div>
          </div>


          {/* applicant documents */}

          <div className="card shadow border-0 rounded mt-4">
            <h3 className="card-header fw-medium">Applicant Documents</h3>
            <div className="card-body">
            <table className="table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Type</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
          {/* Render applicant documents if available, otherwise display profile documents */}
          {applicantDocument?.length ? (
            applicantDocument.map((document, index) => (
              <tr key={index}>
                <td>{document.file}</td>
                <td>{document.document_type}</td>
                <td>
                  <a href={document.filePath} download>
                    View File
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <p className="text-danger">No documents found.</p>
              {/* <td colSpan="3"> */}
                {/* Display a message or placeholder if both arrays are empty */}
                {/* {profileDoc?.length ? (
                  <ProfileDocuments documents={profileDoc} /> 
                // ) : (
                  
                // )}
              </td>
              */}
            </tr>
          )}
        </tbody>
          </table>

          {/* <ProfileDocuments documents={profileDoc}/> */}

            </div>
          </div>

          {/* Applicant references */}
          <div className="card shadow border-0 rounded mt-4">
            <h3 className="card-header fw-medium">Applicant References</h3>
            <div className="card-body">
            <table className="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Position</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {applicantReference?.map((appref, index) => (
                <tr key={index}>
                  <td>{appref.fullname}</td>
                  <td>{appref.email}</td>
                  <td>{appref.organisation}</td>
                  <td>{appref.position}</td>
                  <td>{appref.contact}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>

            </div>
          </div>
          {/* End applicant references */}

          <div className="card shadow border-0 rounded mt-4 mb-5">
            <h3 className="card-header fw-medium">Applicant Requirements</h3>
            <div className="card-body">
              <div className="mb-3">
                {isPublished && (
                  <div className="alert alert-info fw-bold">
                    <p>Applicant Score Adjusted Succeffuly</p>
                  </div>
                )}

                {isShortlist && (
                  <div className="alert alert-success fw-bold">
                    <p>Applicant Shortlisted Succeffuly</p>
                  </div>
                )}
                {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error: {error.message}</p>
            ) : (
              <table className="table table-border">
                <thead>
                  <tr>
                    <th>Requirement</th>
                    <th>Computed Score</th>
                    <th>Human Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
              {Array.isArray(shortlistscores.data) ? (
                shortlistscores.data.map(score => (
                  <tr key={score.requirement_id}>
                    <td>{score.requirement}</td>
                    <td> {score.type === "computed" ? ( <span>{score.score}</span> ) : (<span>N/A</span>) }</td>
                    <td> {score.type === "human" ? ( <span>{score.score}</span> ) : (<span>N/A</span>) }</td>

                    {/* <td>{score.human_score}</td> */}
                   
                    <td>
                        {score.type === "computed" ? (
                          <button
                            className="btn btn-primary btn-sm fw-bold"
                            type="button"
                            onClick={() => {
                              setReqID(score.requirement_id);
                              setAdjustedScore(score.score);
                              setCompScore(score.score);
                              setComment("");
                              setDescription(score.requirement);
                              toggleModal();
                            }}
                          >
                            <i className="bi bi-pencil-square"></i> Adjust Score
                          </button>
                         ) : (
                          <button
                          className="btn btn-success btn-sm fw-bold"
                          type="button"
                          onClick={() => {
                            setReqID(score.requirement_id);
                            setScoreID(score.scoreid);
                            setHumanScore(score.human_score);
                            setCompScore(score.score);
                            setComment("");
                            setDescription(score.requirement);
                            openEditScoreModal(); // Call the function to open the Adjust Score Modal
                          }}
                        >
                          <i className="bi bi-pencil-square"></i> Edit Score
                        </button>
                        
                        
                        )} 
                      </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <p className="fw-bold">No data available.</p>
                  </td>
                </tr>
              )}
              </tbody>
              </table>
              )}
              </div>
            </div>
            <div className="container mt-4 mb-4">
              <button
                className="btn btn border-2 border-primary-subtle btn-success font-medium me-2"
                onClick={handleShortlist}
                disabled={isShortlisted}
              >
                <i className="bi bi-check-fill text-muted mr-2"></i>Short List
              </button>
            </div>
          </div>

          <Modal show={isModalOpen} onHide={toggleModal}>
            <Modal.Header closeButton>
              <Modal.Title>Adjust Requirements Score</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <b>{description}</b>
              </p>
              <Form.Control
                type="number"
                name="score"
                value={adjustedScore}
                max={adjustedScore}
                onChange={handleInputChange}
              />
              <span className="text-danger">{validationMessage}</span>
              
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                placeholder="Add comment (optional)"
                value={comment}
                onChange={handleInputChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal for editing huma score */}
       
        <Modal show={isEditScoreModalOpen} onHide={closeAdjustScoreModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Human Score</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="humanScore">{description}</label>
            <input
              type="number"
              className="form-control"
              id="humanScore"
              name="humanScore"
              value={humanScore}
              onChange={(e) => setHumanScore(e.target.value)}
            />
          </div>
          <span className="text-danger">{validationMessage}</span>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeAdjustScoreModal}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

        
        </>
      ) : (
        <>
        <span>Loading more information....</span>
        {/* <div className="card shadow border-0 rounded mt-4">
            <h3 className="card-header fw-medium">Applicant Documents</h3>
            <div className="card-body"> */}
            {/* <table className="table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Type</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
          {applicantDocument?.length ? (
            applicantDocument.map((document, index) => (
              <tr key={index}>
                <td>{document.file}</td>
                <td>{document.document_type}</td>
                <td>
                  <a href={document.filePath} download>
                    View File
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">
               
                {profileDoc?.length ? (
                  <ProfileDocuments documents={profileDoc} />
                ) : (
                  <p className="text-danger">Applicant did not attach documents.</p>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table> */}

          {/* <ProfileDocuments documents={profileDoc}/> */}

            {/* </div>
          </div> */}
          {/* <div className="card shadow border-0 rounded mt-4">
            <h3 className="card-header fw-medium">Applicant References</h3>
            <div className="card-body">
            <table className="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Position</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {applicantReference?.map((appref, index) => (
                <tr key={index}>
                  <td>{appref.fullname}</td>
                  <td>{appref.email}</td>
                  <td>{appref.organisation}</td>
                  <td>{appref.position}</td>
                  <td>{appref.contact}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>

            </div>
          </div> */}
        </>
          
      )}
    </div>
  );
};

export default ApplicationDetail;
