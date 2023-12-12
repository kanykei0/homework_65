import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import axiosApi from "../../axiosApi";

const Toolbar = () => {
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosApi.get("pages.json");
      const pageKeys = Object.keys(response.data);
      setPages(pageKeys);
    };

    fetchData();
  }, []);

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
            {pages.map((page) => (
              <li className="nav-item" key={page}>
                <NavLink className="nav-link" to={`/pages/${page}`}>
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </NavLink>
              </li>
            ))}
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
