import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDepartmentById } from "./departmentsApiSlice";
import EditDepartmentForm from "./EditDepartmentForm";

const EditDepartment = () => {
  const { id } = useParams();

  const department = useSelector((state) => selectDepartmentById(state, id));

  const content = department ? (
    <EditDepartmentForm department={department} />
  ) : (
    <h4>Loading....</h4>
  );

  return content;
};

export default EditDepartment;
