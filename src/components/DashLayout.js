import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";

import MenuBar from "./MenuBar";

const DashLayout = () => {
  return (
    <>
      <MenuBar />
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default DashLayout;
