import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { useAddNewProjectMutation } from "./projectsApiSlice";

const NewProjectForm = () => {
  const navigate = useNavigate();

  const [addNewProject, { isLoading, isSuccess, isError, error }] =
    useAddNewProjectMutation();

  const [code, setCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [bowheer, setBowheer] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setCode("");
      setProjectName("");
      setLocation("");
      setBowheer("");
      navigate("/dash/projects");
    }
  }, [isSuccess, navigate]);

  const onCodeChange = (e) => setCode(e.target.value);
  const onProjectNameChange = (e) => setProjectName(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);
  const onBowheerChange = (e) => setBowheer(e.target.value);

  const canSave =
    [code, projectName, location, bowheer].every(Boolean) && !isLoading;

  const errAlert = isError ? (
    <Alert variant="danger">{error?.data?.message}</Alert>
  ) : null;

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    await addNewProject({
      code,
      projectName,
      location,
      bowheer,
    });
  };

  const content = (
    <>
      {errAlert}
      <Card>
        <Card.Header>New Department</Card.Header>
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
        </Card.Footer>
      </Card>
    </>
  );

  return content;
};

export default NewProjectForm;
