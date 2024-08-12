import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchRequirements } from "../features/requirements/requirementsSlice";
import {
  addRequirements,
  newRequirement,
  fetchAdvert,
  deleteAdvertRequirement,
  updateAdvertRequirement,
} from "../features/adverts/advertsSlice";

import LoadingSpinner from "../components/LoadingSpinner";
import EditRequirement from "../components/EditRequirement";
import EditExperienceModal from "../components/EditExperienceModal";
const AdvertRequirements = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //console.log(id)
  useEffect(() => {

    // if (status == "failed") {
    //   navigate("/login");
    // } else if (!status == "loading") {
    //   if (!isAuthenticated) {
    //     navigate("/login");
    //   } else {
    //     if (!user.roles.some((role) => role.name === "admin")) {
    //       navigate("/vacancies");
    //     }
    //   }
    // }

    dispatch(fetchRequirements());
    dispatch(fetchAdvert(id));
  }, [dispatch]);


  const { advert, requirements, advertRequirements, error } = useSelector(
    (state) => state.adverts
  );
  const { isAuthenticated, user, status } = useSelector((state) => state.users);
  const [weight, setWeight] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();

  // console.log(requirements);

  const handlePublish = () => {
    const dataToSend = {
      id: advert.id,
      title: advert.title,
      content: advert.content,
      closingDate: advert.closing_date,
      requirements: requirements,
    };

    navigate(`/adverts/${advert.id}/preview`, {
      state: { JobPreview: dataToSend },
    });
    // console.log("requirements to send:", dataToSend);
  };

  const [isloading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newReq = await dispatch(
      newRequirement({
        description: description,
        weight: weight,
      })
    );

    await dispatch(
      addRequirements({
        advert_id: advert.id,
        requirement_id: newReq.payload.id,
        weight,
      })
    );

    await dispatch(fetchAdvert(id));
    setDescription("");
    setWeight("");
    setIsLoading(false);
  };

 
 
  const onDelete = (id) => {
    dispatch(deleteAdvertRequirement(id));
  };

  return (
    <div>
   
      {status === "loading" ? (
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {advert ? (
            <section
              className="job-requirements"
              style={{ marginLeft: "20px" }}
            >
              <div className="py-1">
                <h4>Title: {advert.title}</h4>
                <small>Closing Date: {advert.closing_date}</small>
                <br />
                <small>Department: ITS</small>
              </div>
              <form onSubmit={(e) => onSubmit(e)}>
                <legend className="my-5">Job Requirements</legend>
                {error?.errors?.weight?.length &&
                  error.errors.weight.map((err) => (
                    <div className="text-danger">
                      <li>{err}</li>
                    </div>
                  ))}
                <div className="row" style={{ width: "100%" }}>
                  <div className="col-md-6">
                    <div className=" form-group mb-3">
                      <label className="form-label">Description</label>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label for="closing_date" className="form-label">
                        Percentage (%)
                      </label>
                      <input
                        type="number"
                        min={1}
                        className="form-control"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 py-2">
                    <button className="btn btn-primary mt-4">
                      Add requirement
                    </button>
                  </div>
                </div>
              </form>
              {isloading && (
                <div className="loading-overlay">
                  <LoadingSpinner />
                </div>
              )}
              <h4 className="my-5">Requirements Added</h4>
              <div className="row border mb-5">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Requirement Description</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements?.length
                      ? requirements?.map((requirement) => (
                          <tr key={requirement.id}>
                            <td>{requirement.requirement.description}</td>
                            <td>
                              <button className="btn btn-success btn-sm px-3">
                                {requirement.weight}%
                              </button>
                            </td>

                            <td
                              style={{ cursor: "pointer" }}
                              className="text-danger"
                            >
                              <i
                                onClick={(e) => onDelete(requirement.id)}
                                className="bi bi-trash3-fill"
                              ></i>
                            </td>
                          </tr>
                        ))
                      : "No advert requirements yet"}
                  </tbody>
                </table>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/new-advert" className="btn btn-secondary">
                  Back
                </Link>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handlePublish}
                >
                  Preview and publish <AiOutlineArrowRight />
                </button>
              </div>
            </section>
          ) : (
            <strong>Loading ....</strong>
          )}
        </>
      )}
      </div>
   
  );
  
};


export default AdvertRequirements;
