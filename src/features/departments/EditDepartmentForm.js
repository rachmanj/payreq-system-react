import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "./departmentsApiSlice";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const EditDepartmentForm = ({ department }) => {
  const [updateDepartment, { isLoading, isSuccess, isError, error }] =
    useUpdateDepartmentMutation();

  const [
    deleteDepartment,
    { isSuccess: isDeleted, isError: isDeleteError, error: deleteError },
  ] = useDeleteDepartmentMutation();

  const navigate = useNavigate();

  const [deptName, setDeptName] = useState(department.name);

  /*
  useEffect(() => {
    if (isSuccess || isDeleted) {
      navigate("/dash/departments");
    }
    console.log("useEffect", isSuccess);
  }, [isSuccess, isDeleted, navigate]);
  */

  const onDeptNameChange = (e) => setDeptName(e.target.value);

  const canSave = deptName && !isLoading;

  const onSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateDepartment({ id: department.id, name: deptName });
    }
    navigate("/dash/departments");
    // console.log("onSave", isSuccess);
  };

  const onDeleteClicked = async () => {
    await deleteDepartment({ id: department.id });
    navigate("/dash/departments");
  };

  const content = (
    <Card>
      <Card.Header className="justify-content-between">
        Edit Department{" "}
        <Button
          variant="success"
          size="sm"
          onClick={() => navigate("/dash/departments")}
        >
          Back
        </Button>{" "}
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="department">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              name="department"
              value={deptName}
              onChange={onDeptNameChange}
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
          onClick={onSaveClicked}
        >
          Save
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="mx-5"
          onClick={onDeleteClicked}
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
  return content;
};

export default EditDepartmentForm;
