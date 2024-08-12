import { useState, useEffect } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  fetchAdvert,
  updateAdvert,
  advertDetailRequirements,
} from "../features/adverts/advertsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAdvert = ({ advert }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.adverts);
  const navigate = useNavigate();
  const [value, setValue] = useState(advert.content || "");
  useEffect(() => {
    dispatch(fetchAdvert());
  }, dispatch);
  console.log('your advert', advert)
  const [formData, setFormData] = useState({
    title: advert?.title || "",
    advert_type: advert.advert_type || "",
    number_of_posts: advert?.number_of_posts || "",
    closing_date: advert?.closing_date || "",
  });
  const { title, advert_type, number_of_posts, closing_date } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    formData.content = value;
    formData.id = Number(id);
    dispatch(updateAdvert(formData));
    //console.log(formData.id)
  };
  if (status == "succeeded") {
    //window.location.reload()
    dispatch(advertDetailRequirements(id));
  }
  return (
    <div
      className="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Advert "{advert.title}"
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3 form-group">
                <label for="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={(e) => onChange(e)}
                  value={title}
                />
              </div>
              <div className="mb-3 form-group">
              {advert.advert_type === 0 ? (
                <select
                name="advert_type"
                value={advert_type}
                onChange={(e) => onChange(e)}
                required
                className="form-select"
                aria-label="Default select example"
              >
                
                <option selected value="0">
                  External
                </option>
                <option value="1">
                  Internal
                </option>
                
              </select>
              ): (
                <select
                name="advert_type"
                value={advert_type}
                onChange={(e) => onChange(e)}
                required
                className="form-select"
                aria-label="Default select example"
              >
                
                <option  value="0">
                  External
                </option>
                <option selected value="1">
                  Internal
                </option>
                
              </select>
              )}
                
              </div>
              <div className="mb-3">
                <label className="form-label" for="content">
                  Content
                </label>
                <div style={{ height: "500px", marginBottom: "5rem" }}>
                  <ReactQuill
                    style={{ height: "100%" }}
                    value={value}
                    name="content"
                    onChange={setValue}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3 form-group">
                    <label for="number_of_posts" className="form-label">
                      Number of Posts
                    </label>
                    <input
                      min={1}
                      type="number"
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
                    <label for="closing_date" className="form-label">
                      Closing Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="closing_date"
                      name="closing_date"
                      value={closing_date}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdvert;
