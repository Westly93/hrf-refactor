import React from 'react';
import { Link } from 'react-router-dom';

const smileyEmojiSVG = (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="icon icon-tabler icon-tabler-check"
  width="200"
  height="200"
  viewBox="0 0 24 24"
  strokeWidth="2"
  stroke="white"
  fill="none"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M5,13.75L9,17.75L19,7" />
</svg>


);

const SubmissionSuccess = () => {
  return (
    <div className="container mt-4 text-center">
      <div className="success-icon bg-success rounded-circle d-inline-block">
        {smileyEmojiSVG}
      </div>
      <h4 className="text-success mt-3">Application Submitted Successfully</h4>
      <div className="mt-4">
        <Link to="/applicant-adverts-list" className="btn btn-primary me-2">
          Browse Jobs
        </Link> 
        {/* <Link to="/new-advert" className="btn btn-success">
          View Applied Jobs
        </Link> */}
      </div>
    </div>
  );
};

export default SubmissionSuccess;
