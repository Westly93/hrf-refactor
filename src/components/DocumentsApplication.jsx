import React from "react"



const DocumentsApplication = (documents) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th>Download</th>
                </tr>
            </thead>
            <tbody>
                {documents ? (
                    documents?.map((document, index) => (
                        <tr key={index}>
                            <td>{document.fileName || document.file}</td>
                            <td>{document.document_type}</td>
                            <td>
                                <a href={document.filePath} download>
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td>Loading documents...</td>
                    </tr>
                )}
            </tbody>

        </table>


    )
}

export default DocumentsApplication;

