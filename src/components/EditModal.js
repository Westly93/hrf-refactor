import { useState } from "react";

const EditModal = ({ nation, handleUpdate }) => {
  const [name, setName] = useState(nation.name || "");

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdate({ id: nation.id, name: name });
  };
  return (
    <div
      class="modal fade"
      id={`editModal${nation.id}`}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Edit {nation.name}
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
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div class="d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  class="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
