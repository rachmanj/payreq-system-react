import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { selectProjectById } from "./projectsApiSlice";
import EditProjectForm from "./EditProjectForm";

const EditProject = () => {
  const { id } = useParams();
  const project = useSelector((state) => selectProjectById(state, id));

  const content = project ? (
    <EditProjectForm project={project} />
  ) : (
    <Spinner animation="border" role="status" />
  );

  return content;
};

export default EditProject;
