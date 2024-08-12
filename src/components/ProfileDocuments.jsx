import React from "react";


const ProfileDocuments = ({documents}) => {


    return (
        <>
            <table className="table">
            <thead>
              
            </thead>
            <tbody>
              {documents?.map((document, index) => (
                <tr key={index}>
                  <td>{document.document}</td>
                  <td>{document.document_type_name}</td>
                  <td>
                    <a href={document.document_url} download>
                      Download File
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
    )
}



export default ProfileDocuments