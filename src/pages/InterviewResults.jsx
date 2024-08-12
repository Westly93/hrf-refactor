import { useQuery } from "@tanstack/react-query";
import { fetchInterviewResults } from "../apis/AdvertsFunction";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { useNavigate} from 'react-router-dom';
import { useState } from "react";
import Pagination from "../components/Pagination";



const InterviewResults = () => {
    const navigate = useNavigate()
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState()


    const {
        isLoading,
        isError,
        error,
        isPreviousData,
        isFetching,
        data: interviewResults,
    } = useQuery({
        queryKey: ['interviews', currentPage],
        queryFn: () => fetchInterviewResults(currentPage),
        keepPreviousData: true        
      });

    // console.log(interviewResults)

    const handleSearch = () => {

    }
    
    const handleHireCandidate = async (interviewId) => {
      // console.log(interviewId)
      try {
        const response = await fetch('https://hrm.msu.ac.zw/api/v1/offer-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          // body: JSON.stringify({interviewId}),

          body: JSON.stringify({ interview_id: interviewId }),

        });
  
        if (response.ok) {
          // console.log('Email sent successfully');
          // Reset the form fields
          // setInterview_Id('');
          // <div class="alert alert-success">
          //   <strong>Success!</strong> Email successfully sent to candidate.
          // </div>
          setAlertSuccess(true)
          navigate(`/`)
         
        } else {
          // console.log('Failed to send email');
          setAlertError(true);
        }
      } catch (error) {
        // console.log('Error occurred:', error);
      }
      navigate(`/interview-results`)

    }

    return ( 
        <>
         <div className="container">
           <div className="row pt-2 mt-4">
          <PageTitle icon="bi bi-people-fill" title="Interview Results" />
             <div>
               <div className="col-md-12 d-flex justify-co6ntent-center">
                 {/* <form className="my-2">
                   <div class="input-group mb-3 rounded-pill"> 
                   <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search candidate..."
                    className="form-control form-control-lg roundedd-pill"                   
                    onChange={handleSearch}
                  />
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">

          {alertError && (
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              Job Offer Email Successfully sent!
              {/* Failed to send mail! */}
              <button type="button" className="btn-close"  data-bs-dismiss="alert" aria-label="Close" onClose={() => setAlertError(false)}></button>
            </div>
          )}

          {alertSuccess && (
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              Job Offer Email Successfully sent!
              <button type="button" className="btn-close"  data-bs-dismiss="alert" aria-label="Close" onClose={() => setAlertSuccess(false)}></button>
            </div>
          )}
            
          </div>
        </div>
        <div className="card-body">
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Gender</th>
                  <th>National ID</th>
                  <th>Total Scores</th>
                  <th>Advert</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(interviewResults) ? (
                  interviewResults.map((person, index) => (
                    <tr key={index}>
                      <td>{person.firstnames}</td>
                      <td>{person.surname}</td>
                      <td>{person.sex}</td>
                      <td>{person.national_id}</td>
                      <td>{person.score}</td>
                      <td>{person.title}</td>
                      <td>{person.interview_status}</td>
                      <td>
                      <button
                        className="btn btn-primary p-1"
                        onClick={() => handleHireCandidate(person.interview_id)}
                      >
                        Offer Job
                      </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <Pagination currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} isPreviousData={isPreviousData} />
        </div>
      </div>
    </>
    );
}
 
export default InterviewResults;