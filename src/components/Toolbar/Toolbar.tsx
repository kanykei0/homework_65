import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Toolbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Bla Bla
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="pages/about">
              About
            </NavLink>
            <NavLink className="nav-link" to="pages/contacts">
              Contacts
            </NavLink>
            <NavLink className="nav-link" to="/new-page">
              Add new page
            </NavLink>
            <NavLink className="nav-link" to="/admin">
              Edit page
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Toolbar;
