import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNationality,
  fetchNationalities,
  updateNationality,
  deleteNationality,
} from "../features/applications/applicationsSlice";
import EditModal from "../components/EditModal";
const NewNationality = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
  });
  const { name } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { nationalities } = useSelector((state) => state.applications);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addNationality(formData));
    setFormData({
      name: "",
    });
    //console.log(formData);
  };
  useEffect(() => {
    dispatch(fetchNationalities());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteNationality(id));
  };
  const handleUpdate = async (item) => {
    await dispatch(updateNationality(item));
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="mb-3">
          <legend>Create New Nationality</legend>
          <label for="name" class="form-label">
            Nationality name
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
      {nationalities?.length ? (
        <div className="mt-5">
          <h3>Nationalities</h3>
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
              {nationalities?.map((nation) => (
                <tr key={nation.id}>
                  <th scope="row">{nation.id}</th>
                  <td>{nation.name}</td>
                  <td className="text-success">
                    <i
                      role="button"
                      className="bi bi-pencil-square"
                      data-bs-toggle="modal"
                      data-bs-target={`#editModal${nation.id}`}
                    ></i>
                  </td>
                  <td className="text-danger">
                    <i
                      role="button"
                      onClick={() => handleDelete(nation.id)}
                      className="bi bi-trash3-fill"
                    ></i>
                  </td>
                  <EditModal
                    handleUpdate={handleUpdate}
                    id={`nation${nation.id}`}
                    nation={nation}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <strong>No Nationalitis yet add one</strong>
      )}
    </div>
  );
};

export default NewNationality;
