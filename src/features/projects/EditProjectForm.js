import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./projectsApiSlice";

const EditProjectForm = ({ project }) => {
  const [updateProject, { isLoading, isSuccess, isError, error }] =
    useUpdateProjectMutation();
  const [
    deleteProject,
    { isSuccess: isDeleted, isError: isDeleteError, error: deleteError },
  ] = useDeleteProjectMutation();

  const navigate = useNavigate();

  const [code, setCode] = useState(project.code);
  const [projectName, setProjectName] = useState(project.projectName);
  const [location, setLocation] = useState(project.location);
  const [bowheer, setBowheer] = useState(project.bowheer);

  useEffect(() => {
    if (isSuccess || isDeleted) {
      navigate("/dash/projects");
    }
  }, [isSuccess, isDeleted, navigate]);

  const onCodeChange = (e) => setCode(e.target.value);
  const onProjectNameChange = (e) => setProjectName(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);
  const onBowheerChange = (e) => setBowheer(e.target.value);

  const canSave =
    [code, projectName, location, bowheer].every(Boolean) && !isLoading;

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    await updateProject({
      id: project.id,
      code,
      projectName,
      location,
      bowheer,
    });
    navigate("/dash/projects");
  };

  const onDeleteProjectClicked = async (e) => {
    e.preventDefault();
    await deleteProject({ id: project.id });
    navigate("/dash/projects");
  };

  const content = (
    <Card>
      <Card.Header>
        Edit Project
        <Button
          variant="success"
          size="sm"
          onClick={() => navigate("/dash/projects")}
        >
          Back
        </Button>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="code">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project code"
              name="code"
              value={code}
              onChange={onCodeChange}
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="projectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              name="projectName"
              value={projectName}
              onChange={onProjectNameChange}
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Project Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project location"
              name="location"
              value={location}
              onChange={onLocationChange}
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="bowheer">
            <Form.Label>Bowheer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project bowheer"
              name="bowheer"
              value={bowheer}
              onChange={onBowheerChange}
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="primary"
          size="sm"
          disabled={!canSave}
          onClick={onSaveProjectClicked}
        >
          Save
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="mx-3"
          onClick={onDeleteProjectClicked}
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );

  return content;
};

export default EditProjectForm;
