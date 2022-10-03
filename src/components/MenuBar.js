import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

const MenuBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <LinkContainer to="/dash">
            <Navbar.Brand>Payreq System</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Nav>
            <NavDropdown title="Payreqs" id="collasible-nav-dropdown">
              <LinkContainer to="/dash/approved">
                <NavDropdown.Item>Approved</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/dash/outgoings">
                <NavDropdown.Item>Outgoings</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/dash/realizations">
                <NavDropdown.Item>Realizations</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <NavDropdown title="Admin" id="collasible-nav-dropdown">
              <LinkContainer to="/dash/users">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/dash/departments">
                <NavDropdown.Item>Departments</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MenuBar;
