import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerDoctor } from '../actions/doctorActions';

const DoctorRegisterScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [speciality, setSpeciality] = useState('');

  const dispatch = useDispatch();

  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  useEffect(() => {
    if (doctorInfo) {
      history.push(`/doctor/profile/${doctorInfo._id}`);
    }
  }, [history, doctorInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      registerDoctor(name, email, contact, address, speciality, password)
    );
  };

  return (
    <Container className="mt-3 mb-3">
      <Link to="/doctorlogin" className="btn btn-light mb-3">
        Go Back to login
      </Link>
      <h1 className="text-center mt-3 mb-2">Doctor Register</h1>
      <Card className="my-3 shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="mobileNo">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="speciality">
              <Form.Label>Specialised In</Form.Label>
              <Form.Control
                type="text"
                placeholder="Specialised In"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="btn btn-dark" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorRegisterScreen;
