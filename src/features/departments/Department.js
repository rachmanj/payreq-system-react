import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDepartmentById } from "./departmentsApiSlice";
import Button from "react-bootstrap/Button";

const Department = ({ departmentId, count }) => {
  const department = useSelector((state) =>
    selectDepartmentById(state, departmentId)
  );

  const navigate = useNavigate();

  const onEditClicked = () => {
    navigate(`/dash/departments/${departmentId}`);
  };

  if (department) {
    return (
      <tr>
        <td>{count + 1}</td>
        <td>{department.name}</td>
        <td>
          <Button size="sm" variant="warning" onClick={onEditClicked}>
            Edit
          </Button>
        </td>
      </tr>
    );
  } else return null;
};

export default Department;
