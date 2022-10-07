import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProjectById } from "./projectsApiSlice";
import Button from "react-bootstrap/Button";

const Project = ({ projectId, count }) => {
  const project = useSelector((state) => selectProjectById(state, projectId));
  const navigate = useNavigate();

  const onEditClicked = () => navigate(`/dash/projects/${projectId}`);

  if (project) {
    return (
      <tr>
        <td>{count + 1}</td>
        <td>{project.code}</td>
        <td>{project.projectName}</td>
        <td>{project.isActive ? "Active" : "In-Active"}</td>
        <td>
          <Button size="sm" variant="warning" onClick={onEditClicked}>
            Edit
          </Button>
        </td>
      </tr>
    );
  } else return null;
};

export default Project;
