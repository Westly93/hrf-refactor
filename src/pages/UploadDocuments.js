import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import {
  applicantDocumentsAdded,
  fetchDocumentTypes,
} from "../features/applications/applicationsSlice";
import { userVerification } from "../features/users/usersSlice";

const UploadDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to hold the list of document types and files
  const [documentList, setDocumentList] = useState([]);
  const { isAuthenticated, status, user } = useSelector((state) => state.users);

  // Function to handle file input changes
  const handleFileChange = (event, documentType) => {
    const file = event.target.files[0];

    // Update the state with the selected file for the corresponding document type
    setDocumentList((prevList) => {
      // Find the index of the document type in the list
      const index = prevList.findIndex(
        (item) => item.documentType === documentType
      );

      // If the document type is not in the list, add it with the selected file
      if (index === -1) {
        return [...prevList, { documentType, file }];
      } else {
        // If the document type is already in the list, update the file
        const updatedList = [...prevList];
        updatedList[index] = { ...updatedList[index], file };
        return updatedList;
      }
    });
  };
  const { documentTypes, status: newStatus } = useSelector(
    (state) => state.applications
  );
  // Function to render dynamic file input elements based on the document type object
  const renderFileInputs = () => {
    return (
      documentTypes &&
      documentTypes?.map((documentType) => (
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
          <span className="text-muted">
            Accepted file types: PDF, DOC, DOCX
          </span>
        </div>
      ))
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(documentList);
    try {
      for (const document of documentList) {
        const formData = new FormData();
        formData.append("document", document.file);
        formData.append("document_type_id", document.documentType);
        formData.append("applicant_id", user?.user?.profile?.id);
        await dispatch(applicantDocumentsAdded(formData));
      }
      await dispatch(userVerification());
      // Clear the documentList state after submitting successfully
      setDocumentList([]);

      navigate("/applicant-adverts-list");

    } catch (error) {
      console.error("Error submitting documents:", error);
    }
  };


  //console.log("user iddiiii", user?.user?.profile?.id)


  useEffect(() => {
    dispatch(fetchDocumentTypes());
  }, [dispatch]);
  if (status === "failed") {
    navigate("/login");
  } else if (!status === "loading") {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }
  return (
    <>
      {newStatus === "loading" ? (
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {status === "loading" ? (
            <div class="spinner-border text-info" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-10">
                  <div className="card">
                    <h3 className="card-header fw-medium">
                      <PageTitle
                        icon="bi bi-paperclip"
                        title="Upload Documents"
                      />
                    </h3>
                    <div className="card-body fw-medium">
                      <form
                        enctype="multipart/form-data"
                        onSubmit={onSubmit}
                        className="mt-5"
                      >
                        {/* <legend className="h2 text-center border-bottom">
                Upload the necessary documents as required
              </legend> */}
                        {documentTypes.length && renderFileInputs()}
                        <button type="submit" className="btn btn-primary">
                          Save Documents
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UploadDocuments;
