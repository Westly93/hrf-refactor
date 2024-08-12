import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { singleAdvert } from "../apis/AdvertsFunction";
import validator from "validator";
import {
  applicantJobApplicantion,
  applicantJobRequirements,
  applicantDocuments,
  applicantReferences,
  applicationScores,
  fetchDocumentTypes,
  fetchContactTypes,
  applicantDocumentsAdded,
} from "../features/applications/applicationsSlice";

import ApplicationSuccess from "../components/SubmissionSuccess/ApplicationSuccess";
import LoadingSpinner from "../components/LoadingSpinner";
import SubmissionSpinner from "../components/SubmissionSuccess/SubmissionSpinner";
import PageTitle from "../components/PageTitle";

const ApplicationForm = () => {
  const missingFieldsRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector(state => state.users)
  const [Ispublished, setIspublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingg, setIsLoading] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: advert,
  } = useQuery({
    queryKey: ["advert", id],
    queryFn: () => singleAdvert(id),
  });


  //const contactTypes  = useSelector((state) => state.contactTypes?.contactTypes);
  // console.log("types co:", contactTypes);

  //document types
  const [documentType, setDocumentType] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [comment, setComment] = useState("");
  const [documentSizeErr, setDocumentSizeErr] = useState('');
  const [documentTypeName, setDocumentTypeName] = useState('');
  const [documentList, setDocumentList] = useState([]);
  const [validationMessages, setValidationMessages] = useState({});

  // Handling the requirements
  const [experience, setExperience] = useState([]);

  // handle job requirements
  const handleJobRequirementChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      const requirement = advert.advert_requirements.find(
        (req) => req.requirement_id === parseInt(value)
      );
      setExperience((prevExperience) => [
        ...prevExperience,
        { requirement_id: parseInt(value), weight: requirement.weight },
      ]);
    } else {
      setExperience((prevExperience) =>
        prevExperience.filter((req) => req.requirement_id !== parseInt(value))
      );
    }
  };

  // handle file change
  // const handleFileChange = (e) => {
  //   const files = e.target.files;

  //   if (files.length > 0) {
  //     const newDocuments = Array.from(files).map((file) => ({
  //       file,
  //       documentType,
  //       documentTypeName,
  //     }));
  //     setSelectedDocuments([...selectedDocuments, ...newDocuments]);
  //   }
  // };

  // const handleFileChange = (e) => {
  //   const files = e.target.files;

  //   if (files.length > 0) {
  //     const newDocuments = Array.from(files).map((file) => {
  //       if (file.size > 10 * 1024 * 1024) {
  //         // Display error message if document size exceeds 2MB
  //         setDocumentSizeErr('Document size too big')
  //        // console.log("Document size too big");
  //         return null;
  //       }
  //       setDocumentSizeErr('');
  //       return {
  //         file,
  //         documentType,
  //         documentTypeName,
  //       };
  //     });

  //     // Remove null values from the newDocuments array
  //     const filteredDocuments = newDocuments.filter(
  //       (document) => document !== null
  //     );

  //     setSelectedDocuments([...selectedDocuments, ...filteredDocuments]);
  //   }
  // };
  // const handleFileChange = (e) => {
  //   const files = e.target.files;

  //   if (files.length > 0) {
  //     const newDocuments = Array.from(files).map((file) => {
  //       if (file.size > 10 * 1024 * 1024) {
  //         // Display error message if document size exceeds 10MB
  //         setDocumentSizeErr('Document size too big');
  //         return null;
  //       }

  //       if (file.type !== 'application/pdf') {
  //         // Display error message if the file is not a PDF
  //         setDocumentSizeErr('Please upload your documents in PDF format');
  //         return null;
  //       }

  //       setDocumentSizeErr('');
  //       return {
  //         file,
  //         documentType,
  //         documentTypeName,
  //       };
  //     });

  //     // Remove null values from the newDocuments array
  //     const filteredDocuments = newDocuments.filter(
  //       (document) => document !== null
  //     );

  //     setSelectedDocuments([...selectedDocuments, ...filteredDocuments]);
  //   }
  // };

   // Function to handle file input changes
   const handleFileChange = (event, documentType) => {
    const file = event.target.files[0];
    setDocumentList((prevList) => {
      const index = prevList.findIndex(
        (item) => item.documentType === documentType
      );

      if (file?.type !== 'application/pdf') {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [documentType]: 'Please upload your document in PDF format.',
        }));
        event.target.value = '';

      }
      else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          [documentType]: '',
        }));
        setSelectedDocuments((prev) => ({
          ...prev,
          [documentType]: file,
        }));
      }
     
      if (index === -1) {
        return [...prevList, { documentType, file }];
      } else {
        const updatedList = [...prevList];
        updatedList[index] = { ...updatedList[index], file };
        return updatedList;
      }
    });
  };


  const { documentTypes, status: newStatus } = useSelector(
    (state) => state.applications
  );



  const handleDocumentTypeChange = (e) => {
    const [selectedId, selectedName] = e.target.value.split(':');
    setDocumentType(selectedId);
    setDocumentTypeName(selectedName);
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = [...selectedDocuments];
    updatedDocuments.splice(index, 1);
    setSelectedDocuments(updatedDocuments);
  };


  //contact
  const contacts = useSelector(state => state.applications.contactTypes);
  //console.log("contactssssssssssssss:", contacts);

  const docTyps = useSelector(state => state.applications.documentTypes);
  // console.log("document types mapepa:", docTyps);
  useEffect(() => {
    dispatch(fetchDocumentTypes());
    dispatch(fetchContactTypes());// Dispatch the action to fetch data
  }, [dispatch]);


  //end fetching document types

  //this is for contact types and applicant references==============
  const [contactType, setContactType] = useState("");
  const [contactTypeName, setContactTypeName] = useState('');
  const [contact, setContact] = useState("");
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [emailError, setEmailErrors] = useState('');
  const [contactError, setContactErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  // const [deleteApplication, deleteApplication] = useState("");

  
    //const [isPublished, setIspublished] = useState(false);
   


  const formData = new FormData();
  formData.append("contactType", contactType);
  formData.append("contact", contact);


  // handle contacts
  const handleAddContact = () => {


    if (fullname && email && position && organisation && contactType && contactTypeName && contact) {
      const newContact = {
        fullname,
        email,
        position,
        organisation,
        contactType,
        contact,
        contactTypeName,
      };

      if (!contactType) {
        setShowErrors("Please Select Contact Type")
        return;
      }

      if (!validator.isEmail(email)) {
        setEmailErrors("Invalid Email Address!!");
        return;

      } else if (contact.length < 10 || isNaN(contact)) {
        // Validation failed
        setContactErrors("Please enter a 10-digit contact number.")
        return;
      }



      setSelectedContacts([...selectedContacts, newContact]);
      // Clear the input fields
      setfullname('');
      setEmail('');
      setPosition('');
      setOrganisation('');
      setContactType('');
      setContact('');
      setContactTypeName('');
      setShowErrors('');
      setEmailErrors('');
      setContactErrors('');
    }
    else {
      setShowErrors(true);
    }
  };

  // handle contact remove
  const handleRemoveContact = (index) => {
    const updatedContacts = [...selectedContacts];
    updatedContacts.splice(index, 1);
    setSelectedContacts(updatedContacts);
  };
  //end handling contact==============

  // Function to check if all required fields are filled
  const [missingFields, setMissingFields] = useState([]);

  const areAllFieldsFilled = () => {
    const missingFieldsArr = [];

    // if (documentType === "") {
    //   missingFieldsArr.push("Please Select Document Type and then upload your document");
    // }

    if (Object.keys(selectedDocuments).length === 0) {
      setValidationMessages({ global: 'Please upload at least one document.' });
      missingFieldsArr.push("Please upload at least one document.");
    }


    if (comment === "") {
      missingFieldsArr.push("Cover Letter");
    }
    // if (selectedDocuments.length === 0) {
    //   missingFieldsArr.push("Documents");
    // }

    if (experience.length === 0) {
      missingFieldsArr.push("Please tick at least one requirement for your application to be considered");
    }

    if (selectedContacts.length < 3) {
      missingFieldsArr.push("Please provide at least three contact references.!!");
    }
    return missingFieldsArr;
  };
  const isUser = useSelector((state) => state.users.user);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const missingFieldsArr = areAllFieldsFilled();
    setErrorMessage(""); // Reset previous error message

    if (missingFieldsArr.length > 0) {
        setMissingFields(missingFieldsArr);
        return;
    }
    setIsLoading(true);
    setSuccessMessage(""); // Reset previous success message

    let applicationId = null;

    try {
        const applicationResponse = await dispatch(
            applicantJobApplicantion({
                applicant_id: user?.user?.profile?.id,
                advert_id: advert.id,
                application_status_id: 1,
            })
        );

        if (applicationResponse.error) {
            throw new Error(applicationResponse.error.message);
        }

        applicationId = applicationResponse.payload.id;

        const selectedRequirements = Object.keys(experience)
            .filter((reqId) => experience[reqId] === "1")
            .map((reqId) => {
                const requirement_id = reqId.replace("requirement_", "");
                const requirement_weight =
                    selectedRequirements.find((req) => req.id === requirement_id)
                        ?.adverts.requirement.weight || 0;
                return { requirement_id, requirement_weight };
            });

        for (const req of selectedRequirements) {
            const requ = await dispatch(
                applicantJobRequirements({
                    requirement_id: req.requirement_id,
                    checked: "1",
                    comment: comment,
                    application_id: applicationId,
                })
            );
            if (requ.error) throw new Error(requ.error.message);

            const appscores = await dispatch(
                applicationScores({
                    application_id: applicationId,
                    requirement_id: req.requirement_id,
                    score: req.requirement_weight,
                    type: "computed",
                    comment: comment,
                })
            );
            if (appscores.error) throw new Error(appscores.error.message);
        }

        for (const document of documentList) {
            const { file, documentType } = document;
            const zvaramba = await dispatch(
                applicantDocuments({
                    application_id: applicationId,
                    document_type_id: documentType,
                    file: file,
                })
            );
            if (zvaramba.error) throw new Error(zvaramba.error.message);
        }

        for (const cnt of selectedContacts) {
            const { contactType, contact, fullname, email, position, organisation } = cnt;
            const appref = await dispatch(
                applicantReferences({
                    application_id: applicationId,
                    contact_type_id: contactType,
                    contact: contact,
                    fullname: fullname,
                    email: email,
                    position: position,
                    organisation: organisation,
                    verified: "Yes",
                    comment,
                })
            );
            if (appref.error) throw new Error(appref.error.message);
        }

        setIsLoading(false);
        setIspublished(true);
        setSuccessMessage("Application submitted successfully!");
    } catch (error) {
        setErrorMessage(error.message || "An error occurred while saving data.");
        setIsLoading(false);
        setIspublished(false);

        if (applicationId) {
            try {
                await dispatch(
                    deleteApplication({ application_id: applicationId })
                );
            } catch (deleteError) {
                console.error("Error while deleting application:", deleteError.message);
            }
        }
    }
};


  const { qualifications, experience: applicantExperience } = useSelector(state => state.users);
  const myExperience = applicantExperience?.filter(exp => exp.applicant_id === user?.user?.profile?.id);
  const myQualifications = qualifications?.filter(q => q.applicant_id === user?.user?.profile?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (missingFieldsRef.current) {
      missingFieldsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isAuthenticated, missingFields]);



  const closingDate = advert?.closing_date;
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;



  if (closingDate < formattedDate) {
    return (
      <>
        <div className="card">
          <h4 className="card-header">Post: {advert?.title}</h4>
          <div className="card-body">
            <h5 className="alert alert-danger">This advert has expired!!</h5>
            <div className="card-footer">
              <Link to={`/applicant-adverts-list`} className="btn btn-primary fw-semibold">
                Return Back
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }



  // Check if either advert, applications data, or user is loading
  if (isLoading || !advert || !user) {
    return (
      <div className="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }
  // Check if the user data is available
  if (!user) {
    return (
      <div className="not-logged-in-message">
        <p>loading.</p>
      </div>
    );
  }

  // Display error message if there's an error fetching the data
  if (isError) {
    return (
      <div className="col-md-12">
        <div className="container mt-4">
          <h2>Error fetching data: {isError.message}</h2>
        </div>
      </div>
    );
  }

  if (user.user.profile === null || myExperience.length === 0 || myQualifications.length === 0) {
    const missingFields = [];

    if (user.user.profile === null) {
      missingFields.push('Profile');
    }

    if (myExperience.length === 0) {
      missingFields.push('Experience');
    }

    if (myQualifications.length === 0) {
      missingFields.push('Qualifications');
    }

    return (
      <div className="container mt-5 mb-20">
        <div className="card">
          <h2 className="card-header"><b>Profile Incomplete!</b></h2>
          <div className="card-body">
            <div className="alert alert-danger">
              <h4>Please fill in the following: </h4>
              <li>{missingFields.join(', ')}.</li>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle icon="bi bi-envelope" title="Job Application Form" />
      {errorMessage && (
        <div className="alert alert-danger mt-3">
          <p>{errorMessage}</p>
        </div>
      )}
      {isLoadingg && (
        <div className="loading-overlay">
          <SubmissionSpinner />
        </div>
      )}

      {Ispublished ? (
        <ApplicationSuccess />
      ) : (

        <div ref={missingFieldsRef} className="container mt-5 mb-20">
          {missingFields.length > 0 && (
            <div className="alert alert-danger mt-3">
              <p>Please fill in the following required field(s):</p>
              <ul>
                {missingFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="card shadow border-0 rounded">
            <div className="card-header fw-medium">Advert Details</div>
            <div className="card-body">
              <div className="row mb-4">
                <p style={{ display: "none" }}>
                  <b>
                    <h7>Advert_ID</h7>:
                  </b>{" "}
                  {advert.id}
                </p>
                <p style={{ display: "none" }}>
                  <b>
                    <h7>userID</h7>:
                  </b>{" "}
                  {/* {user?.data.id} */}
                </p>
                <p>
                  <b>
                    <h7>Title</h7>:
                  </b>{" "}
                  {advert.title}
                </p>
                <p>
                  <b>Closing Date:</b> {advert.closing_date}
                </p>
              </div>
            </div>
          </div>
          <div className="card shadow border-0 rounded mt-4">
            <div className="card-header fw-medium">Job Requirements</div>
            <div className="card-body">
              <div className="mb-3">
                <div className="alert alert-info fw-bold">
                  <i class="bi bi-info-circle-fill"></i>
                  Thank you for expressing interest in our esteemed organization!
                  To ensure we consider your preferences and qualifications accurately, please take a
                  moment to complete the following checkboxes that best
                  represent your interests and/or qualifications.
                </div>
                <h5 className="fw-bold">Requirements Checklist</h5>
                <ul className="list-group list-flush mb-3">
                  {advert.advert_requirements?.map((requirement, index) => (
                    <li className="list-group-item form-check" key={index}>
                      <input
                        className="mx-2 check-boxx"
                        type="checkbox"
                        name={`requirement_${requirement.requirement_id}`}
                        value={`${requirement.requirement_id}:${requirement.weight}`}
                        checked={experience.some(
                          (req) =>
                            req.requirement_id === requirement.requirement_id
                        )}
                        onChange={handleJobRequirementChange}
                      />
                      <label className="form-check-label">
                        {requirement.requirement?.description}{" "}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* <!--contacts --> */}
          <div className="card shadow border-0 rounded mt-4">

            <div className="card-header fw-medium">Applicant Referees</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mt-3">
                  <label htmlFor="fullname">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                    required
                  />

                  {showErrors && !fullname && <span className="text-danger">This field is required**</span>}

                </div>

                <div className="col-md-6 mt-3">
                  <label htmlFor="email">Email:</label>

                  <input
                    type="email"
                    className={`form-control ${emailError ? "border-danger" : ""}`}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && (
                    <div className="text-danger mt-1">{emailError}</div>
                  )}
                  {showErrors && !email && <span className="text-danger">This field is required**</span>}

                </div>
              </div>
              <div className="row">
                <div className="col-md-6  mt-3">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  />
                  {showErrors && !position && <span className="text-danger">This field is required**</span>}
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="organisation">Organisation:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="organisation"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    required
                  />
                  {showErrors && !organisation && <span className="text-danger">This field is required**</span>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <label htmlFor="contactType">Contact Type:</label>
                  <select
                    className="form-select"
                    id="contactType"
                    value={`${contactType}:${contactTypeName}`}
                    onChange={(e) => {
                      const [selectedId, selectedName] = e.target.value.split(':');
                      setContactType(selectedId);
                      setContactTypeName(selectedName);
                    }}
                    required
                  >
                    <option value="">Select Contact Type</option>
                    {contacts?.map((type) => (
                      <option key={type.id} value={`${type.id}:${type.name}`}>
                        {type.name}
                      </option>
                    ))}
                  </select>

                  {showErrors && !contactType && <span className="text-danger">This field is required**</span>}
                  {showErrors && <p className="text-danger">{showErrors}</p>}
                </div>

                <div className="col-md-6 mt-3">
                  <label htmlFor="contact">Contact:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  {contactError && (
                    <div className="text-danger mt-1">{contactError}</div>
                  )}
                  {showErrors && !contact && <span className="text-danger">This field is required**</span>}

                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <label htmlFor="contact"></label>
                  <button
                    type="submit"
                    className="btn btn-primary btn-md fw-bold"
                    onClick={handleAddContact}
                  >
                    <i className="bi bi-telephone-plus-fill fw-bold p-2"></i>
                    Add References
                  </button>
                </div>
              </div>

              {/* Table to display selected contacts */}
              <div className="my-3">
                {selectedContacts.length > 0 && (
                  <div className="table-responsive">
                    <h5>Selected Contacts</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Position</th>
                          <th>Organisation</th>
                          <th>Contact Type</th>
                          <th>Contact</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedContacts.map((contact, index) => (
                          <tr key={index}>
                            <td>{contact.fullname}</td>
                            <td>{contact.email}</td>
                            <td>{contact.position}</td>
                            <td>{contact.organisation}</td>
                            <td>{contact.contactTypeName}</td>
                            <td>{contact.contact}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemoveContact(index)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <!-- end of contacts --> */}

          {/* The section for application documents */}
          <div className="card shadow border-0 rounded mt-4">
            <div className="card-header fw-medium">Application Documents</div>
            <div className="card-body">
              <div className="alert alert-info fw-bold">
                <i class="bi bi-info-circle-fill"></i>
                Applicants must submit copies of applications with the following:
                application letter, certified certificates and curriculum vitae.
                <br></br>
                Application documents must be in a single scan pdf format.
              </div>

              { Array.isArray(docTyps) &&
                    docTyps?.map((documentType) =>
                      documentType.name === 'Curriculum Vitae' ? (
                        <div className="form-group mb-4" key={documentType.id}>
                          <label className="form-label" htmlFor={documentType.name}>
                            {documentType.name}
                          </label>
                          <input
                            className="form-control"
                            required
                            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            type="file"
                            id={documentType.name}
                            onChange={(event) => handleFileChange(event, documentType.id)}
                          />
                          {validationMessages[documentType.id] && (
                    <div className="text-danger">
                      {validationMessages[documentType.id]}
                    </div>
                  )}
                        </div>
                      ) : null
                    )
                  }
                  {validationMessages.global && (
            <div className="alert alert-danger" role="alert">
              {validationMessages.global}
            </div>
          )}

              {selectedDocuments.length > 0 && (
                <div className="mb-3">
                  <h5>Selected Documents</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Document Name</th>
                          <th>Document Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDocuments.map(({ file, documentTypeName }, index) => (
                          <tr key={index}>
                            <td>{file.name}</td>
                            <td>{documentTypeName}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemoveDocument(index)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="comment">
                  <b>Cover Letter Comment</b>
                </label>
                <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

            </div>
          </div>




          {/* end application documents section */}
          <button
            type="button"
            className="btn btn-primary mt-4 mb-4 btn-lg fw-bold"
            onClick={handleSubmit}
          >
            <i class="bi bi-send-plus-fill ml-4 mr-2"></i>Submit Application
          </button>
        </div>
      )}
    </>
  );
};

export default ApplicationForm;
