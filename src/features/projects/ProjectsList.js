import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useGetProjectsQuery } from "./projectsApiSlice";

import Project from "./Project";

const ProjectsList = () => {
  const navigate = useNavigate();

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery();

  const onAddProjectClicked = () => navigate("/dash/projects/new");

  let content;

  if (isLoading) content = <Spinner animation="border" variant="primary" />;

  if (isError) {
    content = <h5>{error?.data?.message}</h5>;
  }

  if (isSuccess) {
    const { ids } = projects;

    const tableContent = ids?.length
      ? ids.map((projectId, i) => (
          <Project key={projectId} projectId={projectId} count={i} />
        ))
      : null;

    content = (
      <>
        <h3>Projects List</h3>
        <Card>
          <Card.Header>
            <Button variant="primary" size="sm" onClick={onAddProjectClicked}>
              + Project
            </Button>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>isActive</th>
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

export default ProjectsList;
