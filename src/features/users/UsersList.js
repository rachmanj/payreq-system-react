import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useGetUsersQuery } from "./usersApiSlice";

import User from "./User";

const UsersList = () => {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const onAddUserClicked = () => {
    navigate("/dash/users/new");
  };

  let content;

  if (isLoading) content = <h5>Loading ....</h5>;

  if (isError) {
    content = <h5>{error?.data?.message}</h5>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId, i) => <User key={userId} userId={userId} count={i} />)
      : null;

    content = (
      <>
        <h3>Users List</h3>
        <Card>
          <Card.Header>
            <Button variant="primary" size="sm" onClick={onAddUserClicked}>
              + User
            </Button>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>NIK</th>
                  <th>Dept</th>
                  <th>Project</th>
                  <th>Roles</th>
                  <th>isActive</th>
                </tr>
              </thead>
              <tbody>{tableContent}</tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  } else return null;

  return content;
};

export default UsersList;
