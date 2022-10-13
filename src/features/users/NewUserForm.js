import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";

const NewUserForm = ({ projects, departments }) => {
  const navigate = useNavigate();

  const [addUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nik, setNik] = useState("");
  const [roles, setRoles] = useState(["Employee"]);
  const [departmentId, setDepartmentId] = useState(departments[0].id);
  const [projectId, setProjectId] = useState(projects[0].id);

  const onFullnameChange = (e) => setFullname(e.target.value);
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onNikChange = (e) => setNik(e.target.value);
  const onProjectIdChange = (e) => setProjectId(e.target.value);
  const onDepartmentIdChange = (e) => setDepartmentId(e.target.value);
  const onRolesChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const optionProjects = projects.map((project) => {
    return (
      <option key={project.id} value={project.id}>
        {project.code}
      </option>
    );
  });

  const optionDepartments = departments.map((department) => {
    return (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    );
  });

  const optionRoles = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errAlert = isError ? (
    <Alert variant="danger">{error?.data?.message}</Alert>
  ) : null;

  const canSave = [fullname, username, password, nik].every(Boolean);

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    await addUser({
      fullname,
      username,
      password,
      nik,
      roles,
      department: departmentId,
      project: projectId,
    });
    navigate("/dash/users");
  };

  const content = (
    <>
      {errAlert}
      <Card>
        <Card.Header>New User</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Employee Fullname"
                    name="fullname"
                    value={fullname}
                    onChange={onFullnameChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="nik">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Employee NIK"
                    name="nik"
                    value={nik}
                    onChange={onNikChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Employee Username"
                    name="username"
                    value={username}
                    onChange={onUsernameChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    onChange={onPasswordChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="projectId">
                  <Form.Label>Project</Form.Label>
                  <Form.Select
                    name="projectId"
                    value={projectId}
                    onChange={onProjectIdChange}
                  >
                    {optionProjects}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="departmentId">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="departmentId"
                    value={departmentId}
                    onChange={onDepartmentIdChange}
                  >
                    {optionDepartments}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="roles">
                  <Form.Label>Roles</Form.Label>
                  <Form.Select
                    name="roles"
                    multiple="true"
                    onChange={onRolesChange}
                    value={roles}
                  >
                    {optionRoles}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="primary"
            size="sm"
            disabled={!canSave}
            onClick={onSaveUserClicked}
          >
            <BsFileEarmarkPlus /> Save
          </Button>
        </Card.Footer>
      </Card>
    </>
  );

  return content;
};

export default NewUserForm;
