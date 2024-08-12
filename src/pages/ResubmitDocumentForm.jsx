import { useMutation } from "@tanstack/react-query";
import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const ResubmitDocumentForm = () => {
    const [file, setFile] = useState(null);

    const mutation = useMutation(formData => {
        return axios.post('https://your-api-endpoint.com/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        mutation.mutate(formData);
    };

    if (mutation.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mt-4">
            <h3>Resubmit CV</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {mutation.isError && (
                <div className="mt-3 text-danger">
                    An error occurred: {mutation.error.message}
                </div>
            )}
            {mutation.isSuccess && (
                <div className="mt-3 text-success">
                    File uploaded successfully!
                </div>
            )}
        </div>
    );
};

export default ResubmitDocumentForm;
