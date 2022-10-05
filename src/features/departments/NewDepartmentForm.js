import { useEffect, useState } from "react";
import { useAddNewDepartmentMutation } from "./departmentsApiSlice";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const NewDepartmentForm = () => {
  const [addNewDepartment, { isLoading, isSuccess, isError, error }] =
    useAddNewDepartmentMutation();

  const navigate = useNavigate();

  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setDepartment("");
      navigate("/dash/departments");
    }
    console.log("useEffect", isSuccess);
  }, [isSuccess, navigate]);

  const onDepartmentChange = (e) => setDepartment(e.target.value);

  const canSave = department && !isLoading;

  const onSaveDepartmentClicked = async (e) => {
    e.preventDefault();
    await addNewDepartment({ name: department });
    console.log("OnSave", isSuccess);
  };

  const content = (
    <Card>
      <Card.Header>New Department</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="department">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              name="department"
              value={department}
              onChange={onDepartmentChange}
              autoComplete="off"
              // id="department"
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="primary"
          size="sm"
          disabled={!canSave}
          onClick={onSaveDepartmentClicked}
        >
          Save
        </Button>
      </Card.Footer>
    </Card>
  );

  return content;
};

export default NewDepartmentForm;
