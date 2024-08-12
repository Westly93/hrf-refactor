import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContactType,
  fetchContactTypes,
  updateContactType,
  deleteContactType,
} from "../features/applications/applicationsSlice";
import EditModal from "../components/EditModal";
const NewContactType = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });
  const { contactTypes } = useSelector((state) => state.applications);
  const { name } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addContactType(formData));
    setFormData({
      name: "",
    });
    //console.log(formData);
  };
  useEffect(() => {
    dispatch(fetchContactTypes());
  }, dispatch);
  const handleDelete = (id) => {
    dispatch(deleteContactType(id));
  };
  const handleUpdate = (contactType) => {
    dispatch(updateContactType(contactType));
    //console.log(contactType);
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="mb-3">
          <legend>Create New Contact Type</legend>
          <label for="name" class="form-label">
            Contact name
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={name}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      {contactTypes?.length ? (
        <div className="mt-5">
          <h3>Contact Types </h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contactTypes?.map((type) => (
                <tr key={type.id}>
                  <th scope="row">{type.id}</th>
                  <td>{type.name}</td>
                  <td className="text-success">
                    <i
                      data-bs-toggle="modal"
                      data-bs-target={`#editModal${type.id}`}
                      role="button"
                      className="bi bi-pencil-square"
                    ></i>
                  </td>
                  <td className="text-danger">
                    <i
                      role="button"
                      onClick={() => handleDelete(type.id)}
                      className="bi bi-trash3-fill"
                    ></i>
                  </td>
                  <EditModal nation={type} handleUpdate={handleUpdate} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <strong>No Contact types yet add one</strong>
      )}
    </div>
  );
};

export default NewContactType;
