import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { fetchInterviewCandidates } from "../features/interviews/interviewSlice";

const InterviewCandidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated, user} = useSelector(state=>state.users);
  const [loading, setLoading] = useState(true);
  const [interviewCandidates, setInterviewCandidates] = useState([]);

  useEffect(() => {
    dispatch(fetchInterviewCandidates())
      .then(response => {
        setInterviewCandidates(response.payload); // Assuming payload contains interview candidates data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching interview candidates:", error);
        setLoading(false);
      });
  }, [dispatch]);

  //console.log("interviews:", interviewCandidates);


  useEffect(() => {
    //disptch(userVerification());
    if (isAuthenticated) {
      if (!user.roles.some((role) => role.name === "admin")) {
        navigate("/vacancies");
      }
    } else{
      navigate("/login")
    }
  }, []);

  return (
    <div className="container">
     <div className="row">
        <div className="col-lg-12">
        <div className="card">
        <div className="card-header"><h3>Candidates Invited for Interview</h3></div>
        <div className="card-body">
          {loading ? (
            <p>Loading data...</p>
          ) : interviewCandidates.length === 0 ? (
            <p>No data available.</p>
          ) : (
           <div className="table-responsive">
             <table className="table">
              <thead>
                <tr>
                  {/* <th>Applicant ID</th> */}
                  <th>First Names</th>
                  <th>Surname</th>
                  <th>Title</th>
                  <th>Gender</th>
                  <th>National ID</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
  {Array.isArray(interviewCandidates) ? (
    interviewCandidates.map(candidate => (
      <tr key={candidate.interview_id}>
        <td>{candidate.firstnames}</td>
        <td>{candidate.surname}</td>
        <td>{candidate.title}</td>
        <td>{candidate.sex}</td>
        <td>{candidate.national_id}</td>
        <td>{candidate.email}</td>
        <td>{candidate.status}</td>
        <td>
          <Link to={`/interview-scores-form/${candidate.interview_id}/candidate/${candidate.applicant_id}`}>
            <button className="btn btn-primary">
              Record Score
            </button>
          </Link>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8">No interview candidates available</td>
    </tr>
  )}
</tbody>

           
            </table>
           </div>
          )}
        </div>
      </div>
        </div>
     </div>
    </div>
  );
}

export default InterviewCandidates;
