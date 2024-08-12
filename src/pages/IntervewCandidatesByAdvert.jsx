import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { fetchInterviewsByAdvert } from "../features/interviews/interviewByAdvert";

const InterviewCandidatesByAdvert = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.users);
    const [loading, setIsLoading] = useState(false);

    const { loading: shortlistedLoading, isError, error, data: fetchInterviews } = useQuery(
        {
            queryKey: ['fetchInterviewsbyadvert', id],
            queryFn: () => fetchInterviewsByAdvert(id)
        }
    );
    
    return (
        <div className="container">
         <div className="row">
            <div className="col-lg-12">
            <div className="card">
            <div className="card-header"><h3>Candidates Invited for Interview</h3></div>
            <div className="card-body">
              {loading ? (
                <p>Loading data...</p>
              ) : (
               <div className="table-responsive">
                 <table className="table">
                  <thead>
                    <tr>
                      {/* <th>Applicant ID</th> */}
                      <th>First Names</th>
                      <th>Surname</th>
                      <th>Gender</th>
                      <th>National ID</th>
                      <th>Phone Number</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
      {Array.isArray(fetchInterviews) ? (
        fetchInterviews.map(candidate => (
          <tr key={candidate.interview_id}>
            <td>{candidate.firstnames}</td>
            <td>{candidate.surname}</td>
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

export default InterviewCandidatesByAdvert;
