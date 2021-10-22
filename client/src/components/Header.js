import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { logoutDoctor } from "../actions/doctorActions";
import { logoutPatient } from "../actions/patientActions";
import { LinkContainer } from "react-router-bootstrap";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const patientLogin = useSelector((state) => state.patientLogin);
  const { patientInfo } = patientLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const logoutDoctorHandler = () => {
    dispatch(logoutDoctor());
  };

  const logoutPatientHandler = () => {
    dispatch(logoutPatient());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Online Consultation</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-auto">
            <Nav.Link href="/adminlogin">Admin</Nav.Link>
            <Nav.Link href="/patientlogin">Patient</Nav.Link>
            <Nav.Link href="/doctorlogin">Doctor</Nav.Link>
          </Nav>
          <Nav>
            {userInfo && (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer
                  to="/admin/admindashboard"
                  className="bg-white text-primary"
                >
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/" className="bg-white text-primary">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}

            {doctorInfo && (
              <NavDropdown title={doctorInfo.name} id="username">
                <LinkContainer
                  to={`/doctor/profile/${doctorInfo._id}`}
                  className="bg-white text-primary"
                >
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/" className="bg-white text-primary">
                  <NavDropdown.Item onClick={logoutDoctorHandler}>
                    Logout
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}

            {patientInfo && (
              <NavDropdown title={patientInfo.name} id="username">
                <LinkContainer
                  to={`/patient/profile/${patientInfo._id}`}
                  className="bg-white text-primary"
                >
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/" className="bg-white text-primary">
                  <NavDropdown.Item onClick={logoutPatientHandler}>
                    Logout
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            <Nav.Link href="/">Contact Us</Nav.Link>
            <Nav.Link href="/">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
