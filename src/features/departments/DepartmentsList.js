import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useGetDepartmentsQuery } from "./departmentsApiSlice";

import Department from "./Department";

const DepartmentsList = () => {
  const navigate = useNavigate();

  const {
    data: departments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDepartmentsQuery();

  const onAddDepartmentClicked = () => {
    navigate("/dash/departments/new");
  };

  let content;

  if (isLoading) content = <Spinner animation="border" variant="primary" />;

  if (isError) {
    content = <h5>{error?.data?.message}</h5>;
  }

  if (isSuccess) {
    const { ids } = departments;

    const tableContent = ids?.length
      ? ids.map((departmentId, i) => (
          <Department
            key={departmentId}
            departmentId={departmentId}
            count={i}
          />
        ))
      : null;

    content = (
      <>
        <h3>Departments List</h3>
        <Card>
          <Card.Header>
            <Button
              variant="primary"
              size="sm"
              onClick={onAddDepartmentClicked}
            >
              + Department
            </Button>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>{tableContent}</tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  }

  return content;
};

export default DepartmentsList;
