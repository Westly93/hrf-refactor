
import React from "react";

const ApplicantContacts = ({ contacts }) => {
    // Ensure contacts is an array
    const contactsArray = Array.isArray(contacts) ? contacts : [];
  
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Contact Type</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {contactsArray.map((cont, index) => (
              <tr key={index}>
                <td>{cont.contact_type.name}</td>
                <td>{cont.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default ApplicantContacts;

