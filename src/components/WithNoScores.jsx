import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import PageTitle from "../components/PageTitle";
import DataTable from 'react-data-table-component';
import LoadingSpinner from "../components/LoadingSpinner";


const WithNoScores = ({datas}) => {

  const navigate = useNavigate();
  const { id } = useParams();
  
  return (
    <>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Gender</th>
            <th>National ID</th>
            <th>Total Scores</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(datas) && datas.length > 0 ? (
            datas.map((person, index) => (
              <tr key={index}>
                <td>{person.firstnames}</td>
                <td>{person.surname}</td>
                <td>{person.sex}</td>
                <td>{person.national_id}</td>
                <td>{person.total_score ?? '0'}</td>

                <td>
                    <Link
                    to={`/adverts/${id}/applications/${person.id}`}
                    className="btn btn border-2 border-primary-subtle btn-light font-medium me-2"
                    >
                    <i className="bi bi-eye-fill text-muted"></i> Details
                    </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );

  
}

  

export default WithNoScores;
