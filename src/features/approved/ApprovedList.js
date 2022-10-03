import { useNavigate } from "react-router-dom";
import { useGetApprovedsQuery } from "./approvedsApiSlice";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Approved from "./Approved";

const ApprovedList = () => {
  const {
    data: approveds,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetApprovedsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  const onAddPayreqClicked = () => {
    navigate("/dash/approved/new");
  };

  let content;

  if (isSuccess) {
    const { ids } = approveds;

    const tableContent = ids?.length
      ? ids.map((approvedId, i) => (
          <Approved key={approvedId} approvedId={approvedId} count={i} />
        ))
      : null;

    content = (
      <>
        <h3>Approved List</h3>
        <Card>
          <Card.Header>
            <Button variant="primary" size="sm" onClick={onAddPayreqClicked}>
              + Payreq
            </Button>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Payreq No</th>
                  <th>Date</th>
                  <th>Requestor</th>
                  <th>Type</th>
                  <th>Amount</th>
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

export default ApprovedList;
