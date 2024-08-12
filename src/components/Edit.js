import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateAdvertRequirement } from "../features/adverts/advertsSlice";

const Edit = ({ requirement, rows, setRows, setUpdateState }) => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState(requirement.weight || "");
  const [description, setDescription] = useState(
    requirement.requirement.description || ""
  );
  const handleSubmit = async () => {
    await dispatch(
      updateAdvertRequirement({
        advert_id: requirement.advert_id,
        requirement_id: requirement.requirement_id,
        weight: weight,
      })
    );
    window.location.reload();
  };
  return (
    <tr>
      <td>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
        />
      </td>
      <td>
        <input
          className="form-control"
          type="number"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          min={1}
          name="weight"
        />
      </td>
      <td>
        <button
          onClick={handleSubmit}
          className="btn btn-info btn-sm "
          type="submit"
        >
          Update
        </button>
      </td>
    </tr>
  );
};
export default Edit;
