
import React from "react";

const ApplicantProfileDocuments = () => {
  return (
    <div>
        
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
        {applicantDocument?.map((document, index) => (
            <tr key={index}>
            <td>{document.file}</td>
            <td>{document.document_type}</td>
            <td>
                <a href={document.filePath} download>
                View File
                </a>
            </td>
            </tr>
        ))}
        </tbody>
        </table>

        </div>
        </div>
    </div>
  );
};

export default ApplicantProfileDocuments;

