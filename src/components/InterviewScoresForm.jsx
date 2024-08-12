import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";

const InterviewScoresForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    console.log(`The interview id is ${id}`)

    const [interview_id, setInterview_Id] = useState(id);
    const [score, setScore] = useState('');
    const [type, setType] = useState('');
    const [comment, setComment] = useState('');

    console.log('hie iam id' + interview_id)



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('https://hrm.msu.ac.zw/api/v1/interview-scores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ interview_id, score, type, comment }),
          });
    
          if (response.ok) {
            console.log('Score posted successfully');
            // Reset the form fields
            // setInterview_Id('');
            setScore('');
            setType('');
            setComment('');
            navigate('/interview-results')
          } else {
            console.log('Failed to post the blog');
          }
        } catch (error) {
          console.log('Error occurred:', error);
        }
      };
    

    return ( 
        <>
        <div className="container">
            <div className="row mt-3">
                <div className="card">
                <h3 className="card-header fw-medium">
                  <PageTitle icon="bi bi-people-fill" title="Enter Interview Details" />
                </h3>
                    <div className="card-body fw-medium">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                              type="hidden"
                              id="interview_id"
                              value={interview_id}
                              style={{ display: 'none' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                            Score:
                            </label>
                            <input
                            type="text"
                            id="score"
                            className="form-control"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                            Type:
                            </label>
                            <input
                            type="text"
                            id="score"
                            className="form-control"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                            Comment:
                            </label>
                            <textarea
                            id="comment"
                            className="form-control"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        </>
     );
}
 
export default InterviewScoresForm;