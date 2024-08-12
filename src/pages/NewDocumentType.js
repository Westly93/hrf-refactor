import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDocumentTypes,
  updateDocumentType,
  deleteDocumentType,
} from "../features/applications/applicationsSlice";
import EditModal from "../components/EditModal";
const NewDocumentType = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });
  const { documentTypes } = useSelector((state) => state.applications);
  const { name } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addDocumentTypes(formData));
    setFormData({
      name: "",
    });
    //console.log(formData);
  };

  const handleDelete = (id) => {
    dispatch(deleteDocumentType(id));
  };
  const handleUpdate = async (item) => {
    //console.log(item);
    await dispatch(updateDocumentType(item));
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="mb-3">
          <legend>Create New Document Type</legend>
          <label for="name" class="form-label">
            Document name
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
      {documentTypes?.length ? (
        <div className="mt-5">
          <h3>Document Types </h3>
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
              {documentTypes?.map((type) => (
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
                  <td className="text-danger cursor-pointer">
                    <i
                      role="button"
                      onClick={() => handleDelete(type.id)}
                      className="bi bi-trash3-fill"
                    ></i>
                  </td>
                  <EditModal handleUpdate={handleUpdate} nation={type} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <strong>No Document types yet add one</strong>
      )}
    </div>
  );
};

export default NewDocumentType;
