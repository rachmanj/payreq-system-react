import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ApprovedForm = () => {
  const content = (
    <>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="payreqNo">
              <Form.Label>Payreq No</Form.Label>
              <Form.Control type="text" placeholder="Enter Payreq No" />
            </Form.Group>
            <Form.Group controlId="approveDate">
              <Form.Label>Approval Date</Form.Label>
              <Form.Control type="date" placeholder="Enter Date" />
            </Form.Group>
            <Form.Group controlId="requestor">
              <Form.Label>Requestor</Form.Label>
              <Form.Control type="text" placeholder="Enter Requestor" />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Select type="text" placeholder="Enter Amount">
                <option value="advance">Advance</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" placeholder="Enter Amount" />
            </Form.Group>
            <Button variant="primary" type="submit" size="sm" className="mt-2">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );

  return content;
};

export default ApprovedForm;
