import { useDispatch, useSelector } from "react-redux";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { addAdvert } from "./advertsSlice";
import LoadingSpinner from "../../components/LoadingSpinner";

const AddAdvert = () => {
  const adverts = useSelector((state) => state.adverts.adverts);
  const navigate = useNavigate();
  const { status, createdAdvert } = useSelector((state) => state.adverts);
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    number_of_posts: "",
    closing_date: "",
    advert_type: "",
  });
  const { title, number_of_posts, closing_date, advert_type } = { ...formData };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    formData.content = value;
    dispatch(addAdvert(formData));
    setFormData({
      title: "",
      content: "",
      number_of_posts: "",
      closing_date: "",
      advert_type: "",
    });
  };
  
  if (status == "succeeded" && createdAdvert) {
    navigate(`/adverts/${createdAdvert.id}/requirements`);
  }

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}
      <div className=" col-lg-11 py-4">
        <h3 className="fw-bold">
          <i class="bi bi-plus-circle-fill"></i> Create New Advert
        </h3>
        <div className="card shadow-sm border">
          <div class="card-header text-uppercase fw-medium">New Advert</div>
          <div className="card-body">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3 form-group">
                <label for="title" className="form-label fw-medium">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={(e) => onChange(e)}
                  value={title}
                />
              </div>
              <div className="mb-3 form-group">
                <select
                  name="advert_type"
                  onChange={(e) => onChange(e)}
                  required
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Select advert type</option>
                  <option value="1">Internal</option>
                  <option value="0">External</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3 form-group">
                    <label
                      for="number_of_posts"
                      className="form-label fw-medium"
                    >
                      Number of Posts
                    </label>
                    <input
                      min={1}
                      type="number"
                      required
                      value={number_of_posts}
                      onChange={(e) => onChange(e)}
                      name="number_of_posts"
                      className="form-control"
                      id="number_of_posts"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 form-group">
                    <label for="closing_date" className="form-label fw-medium">
                      Closing Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="closing_date"
                      name="closing_date"
                      value={closing_date}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium" for="content">
                  Content
                </label>
                <div style={{ height: "300px", marginBottom: "5rem" }}>
                  <ReactQuill
                    style={{ height: "100%" }}
                    value={value}
                    name="content"
                    onChange={setValue}
                  />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdvert;
