import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplications,
  fetchApplicationScores,
  deleteApplication,
  fetchAdvertApplicationScores,
} from "../features/applications/applicationsSlice";
import PageTitle from "../components/PageTitle";
import DataTable from 'react-data-table-component';
import LoadingSpinner from "../components/LoadingSpinner";
import { ApplicantCandidates } from "../apis/preshortListScores";
import { useQuery } from "@tanstack/react-query";
import WithNoScores from "../components/WithNoScores";

const ApplicantList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useSelector(state => state.users);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [appscores, setAppscores] = useState([]);



  useEffect(() => {


    if (!isAuthenticated) {
      navigate('/login');
    } else {
      if (!user.roles.some(role => role.name === "admin")) {
        navigate('/login');
      }
    }

       dispatch(fetchAdvertApplicationScores(id))
      .then((data) => {
        setAppscores(data.payload);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [dispatch, isAuthenticated, navigate, user.roles]);

  //   dispatch(fetchApplicationScores())
  //     .then((data) => {
  //       setAppscores(data.payload);
  //       setLoading(false);
  //     })
  //     .catch((error) => setError(error.message));
  // }, [dispatch, isAuthenticated, navigate, user.roles]);

  const { isLoadingInt,  data: applicantsCandidates } = useQuery(
    {
        queryKey: ['applicantCandidates', id],
        queryFn: () => ApplicantCandidates(id)
    }
);



  const columns = [
    {
      name: 'First Names',
      selector: (row) => row.firstnames,
      sortable: true,
    },
    {
      name: 'Surname',
      selector: (row) => row.surname,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: 'National Id',
      selector: (row) => row.national_id,
      sortable: true,
    },
    
    {
      name: 'Total Scores',
      selector: (row) => row.totalscore,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <Link
          to={`/adverts/${id}/applications/${row.application_id}`}
          className="btn btn border-2 border-primary-subtle btn-light font-medium me-2"
        >
          <i className="bi bi-eye-fill text-muted"></i> Details
        </Link>
      ),
    },
  ];
  

  

  const filteredApplications = appscores || [];

  // const advertApplications = filteredApplications.length && filteredApplications?.filter(
  //   (app) => app.advert_id === parseInt(id)
  // );
  

  // const applicantsWithScoreAbove50 = filteredApplications && filteredApplications?.reduce((result, app) => {
  //   const existingApplicant = result.find((item) => item.applicant_id === app.applicant_id);
  //   if (existingApplicant) {
  //     existingApplicant.totalscore += app.totalscore;
  //   } else {
  //     result.push({ ...app });
  //   }
  //   return result;
  // }, []);

  const applicantsWithScoreAbove50 = Array.isArray(filteredApplications) 
  ? filteredApplications.reduce((result, app) => {
      const existingApplicant = result.find((item) => item.applicant_id === app.applicant_id);
      if (existingApplicant) {
        existingApplicant.totalscore += app.totalscore;
      } else {
        result.push({ ...app });
      }
      return result;
    }, [])
  : [];


  // console.log("app scores1122", applicantsWithScoreAbove50)



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <PageTitle icon="bi bi-people-fill" title="Applicants List/Pre-Shortlisted" />
        <div className="mt-3 mb-3">
        <Link className="btn btn-primary" style={{ marginRight: '3px' }} to={`/adverts/${id}/matrix-scores`}>
          Matrix Scores
        </Link>

          <Link className="btn btn-success mr-12" to={`/adverts/${id}/summary-table`}>
            View Summary table
          </Link>

          {/* <Link className="btn btn-outline-info" to={`/adverts/${id}/summary-table`}>
            View Summary table
          </Link> */}
        </div>
      </div>

      <div className="card card-primary">
        <div className="card-header fw-medium ">Advert Details</div>
        <div className="card-body">
          {loading ? (
            <div className="loading-spinner">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {applicantsWithScoreAbove50 && applicantsWithScoreAbove50.length > 0 ? (
                <DataTable
                  search
                  columns={columns}
                  data={applicantsWithScoreAbove50}
                  noDataComponent={<div>No data</div>}
                  pagination
                />
              ) : (
                <p>No shortlist..</p>
              )}
            </>
          )}
        </div>

        {/* <div className="card-body">
          {loading ? (
            <div className="loading-spinner">
              <LoadingSpinner />
            </div>
          ) : (
            <DataTable
              search
              columns={columns}
              data={applicantsWithScoreAbove50 || []}
              noDataComponent={<div>No data available</div>}
              pagination
            />
          )}
        </div>
        <div className="card-body">
          <WithNoScores datas={applicantsCandidates}/>
        </div> */}
      </div>
    </div>
  );
};

export default ApplicantList;
