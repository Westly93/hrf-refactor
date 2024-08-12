import React from 'react';
// import { BsCheckCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const tickIconSVG = (
<svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-check"
    width="200" 
    height="200"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="white"
    fill="green"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12l5 5l10 -10" />
  </svg>
  );

const SubmissionSuccess = () => {
  return (
    <div className="container mt-4 text-center">
      <div className="success-icon bg-success rounded-circle d-inline-block">
        {tickIconSVG}
      </div>
      <h4 className="text-success mt-3">Advert Published Successfully</h4>
      <div className="mt-4">
        <Link to="/adverts-list" className="btn btn-primary me-2">
              View Published Adverts
            </Link>
            <Link to="/new-advert" className="btn btn-success">
              Add New Advert
            </Link>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
