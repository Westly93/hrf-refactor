import { useQuery } from "@tanstack/react-query";
import React from 'react';
import { Table, Button } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const API_URL = "https://hrm.msu.ac.zw/api/v1/manage-application/2";

const MyApplications = () => {

    const { data, error, isLoading } = useQuery(["applications"], () =>
        fetch(API_URL).then(res => res.json())
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || data.message) {
        return <div>{data ? data.message : "Error fetching applications"}</div>;
    }

    return (
        <div className="container mt-4">
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Advert Title</th>
                        <th>Application Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((application, index) => (
                        <tr key={index}>
                            <td>{application.job_title}</td>
                            <td>
                                {application.status}
                                <div style={{ color: 'red' }}>
                                    {application.document_status === 'Missing Documents' && (
                                        <div>Documents Missing</div>
                                    )}
                                    {application.reference_status === 'Missing References' && (
                                        <div>References Missing</div>
                                    )}
                                    {application.requirement_status === 'Missing Requirements' && (
                                        <div>Requirements Missing</div>
                                    )}
                                </div>
                            </td>
                            <td>
                            {application.status !== 'Application received successfull' && (
                                <Link to={`/upload-application-document/${application.application_id}`} variant="danger">
                                    Resubmit CV
                                </Link>
                            )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MyApplications;
