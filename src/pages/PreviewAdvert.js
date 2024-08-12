import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SubmissionSuccess from "../components/SubmissionSuccess/SubmissionSuccess";
import SubmissionSpinner from "../components/SubmissionSuccess/SubmissionSpinner";

const PreviewAdvert = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const { JobPreview } = location.state || {};
  const { id, title, content, closingDate, requirements } = JobPreview || {};
  const { isAuthenticated } = useSelector((state) => state.users);
  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const dataToSend = {
        id,
        status_id: 1,
      };
      const response = await fetch(
        `https://hrm.msu.ac.zw/api/v1/advert/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      if (response.ok) {
        setIsLoading(false);
        setIsPublished(true);
      } else {
        alert("Failed to publish the advert.");
      }
    } catch (error) {
      alert("Error occurred while publishing the advert:", error);
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {isloading && (
        <div className="loading-overlay">
          <SubmissionSpinner />
        </div>
      )}
      {isPublished ? (
        <SubmissionSuccess />
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="container mt-4">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                  <div className="pb-4">
                    <h2>Preview Advert</h2>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-2">
                      <label>Title:</label>
                    </div>
                    <div className="col-md-10">
                      <p>{title}</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-2">
                      <label>Closing Date:</label>
                    </div>
                    <div className="col-md-10">
                      <p>{closingDate}</p>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-10">
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label>Requirements:</label>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Requirement</th>
                          <th>Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirements &&
                          requirements.map((req, index) => (
                            <tr key={index}>
                              <td>{req.requirement.description}</td>
                              <td>
                                <span
                                  className="badge bg-success"
                                  style={{
                                    backgroundColor: "green",
                                    color: "white",
                                  }}
                                >
                                  {req.weight}%
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={() => console.log("Back")}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handlePublish}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewAdvert;
