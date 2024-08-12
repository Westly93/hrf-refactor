import React, { useState, useEffect } from 'react';
import UpdateAdvert from "../components/UpdateAdvert";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { advertDetailRequirements, deleteAdvert } from '../features/adverts/advertsSlice';
import { ArrowBack, ArrowCircleRightIcon } from '@mui/icons-material';

export default function AdvertPostDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [advertExpired, setAdvertExpired] = useState(false);

  

  const advert = useSelector((state) => state.adverts.singleAdvert);

  const removeAdvert = () => {
    dispatch(deleteAdvert(Number(id)));
    navigate("/adverts-list");
    // setRedirect(true);
  };

  useEffect(() => {
    dispatch(advertDetailRequirements(id));
    if (advert) {
      const expiryDate = new Date(advert.closing_date);
      const currentDate = new Date();
      setAdvertExpired(expiryDate < currentDate);
    }
  }, [dispatch, id, advert]);
  if (!advert) {
    return (
      <div className="col-md-12">
        <div className="container mt-4">
          <h2>Loading data...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-12">
      <div className="container mt-4">
        {advert && (
          <div>
            <h2>Advert Details</h2>
            <div className="row mb-4">
              <p><b>Title:</b> {advert.title}</p>
              <p><b>Closing Date:</b> {advert.closing_date}</p>
              <div className="card md">
                <div className="card-body">
                  <div dangerouslySetInnerHTML={{ __html: advert.content }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        
          {advertExpired && (
            <div className="row">
          <div className="col-lg-4 col-6">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <p className="card-text">{advert.applicants}</p>
                <h5 className="card-title">Applicants</h5>
              </div>
              <Link to={`/applications/${advert.id}`} className="stretched-link" />
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div className="card bg-success text-white">
              <div className="card-body">
                <p className="card-text">{advert.shortlisted}</p>
                <h5 className="card-title">Invite for Interviews</h5>
              </div>
              <Link to={`/advert-shortlist/${advert.id}`} className="stretched-link" />
            </div>
          </div>

          <div className="col-lg-4 col-6">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <p className="card-text">{advert.rejected}</p>
                <h5 className="card-title">Interview Candidates</h5>
              </div>
              <Link to={`/interviewapplicants/${advert.id}`} className="stretched-link" />
            </div>
          </div>

        </div>
        )}
          
        <div className="mb-3">
          <div style={{ marginBottom: '20px' }}></div>
          <label><b>Requirements:</b></label>
          <table className="table table-bordered">
            <thead>
            </thead>
            <tbody>
              {advert &&
                advert.advert_requirements?.map((req, index) => (
                  <tr key={index}>
                    <td>{req.requirement?.description}</td>
                    <td>
                      <span
                        className="badge bg-success"
                        style={{ backgroundColor: 'green', color: 'white' }}
                      >
                        {req.weight}%
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>
      <div className="d-flex justify-content-between">
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-danger">Delete</button>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal">
          Edit
        </button>
      </div>
      <UpdateAdvert advert={advert} />
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete advert{' '}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete "{advert.title}"
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button onClick={() => removeAdvert()} type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}