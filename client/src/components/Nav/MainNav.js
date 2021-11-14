import React from "react";
import "../../style/Nav.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import src from "../../assets/images/nav.svg";
import Predictor from "../Predictor/Predictor";
import Load from "../Load";

function MainNav() {
  const [modalShow, setModalShow] = React.useState(false);

  // This is the navbar of website

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      id="navbar"
      fixed="top"
      className="navbar"
    >
      <Predictor show={modalShow} onHide={() => setModalShow(false)} />
      <Container className="navbar">
        <Navbar.Brand>
          <img src={src} id="nav-image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav_item">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link className="nav_item" onClick={() => setModalShow(true)}>
              <Link to="/">Predictor</Link>
            </Nav.Link>
            <Nav.Link className="nav_item">
              <Link to="user">Appoint-ment</Link>
            </Nav.Link>
            <Nav.Link className="nav_item">
              <Link to="user">Private-talk</Link>
            </Nav.Link>
          </Nav>
          <Nav className="right_side_navbar">
            <Nav.Link className="nav_item">
              <Link to="/register">
                {" "}
                <i class="fas fa-user"></i> - Login
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
