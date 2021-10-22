import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginDoctor } from '../actions/doctorActions';

function DoctorLoginScreen({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const doctorLogin = useSelector((state) => state.doctorLogin);

  const { doctorInfo } = doctorLogin;

  useEffect(() => {
    if (doctorInfo) {
      history.push(`/doctor/profile/${doctorInfo._id}`);
    }
  }, [doctorInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginDoctor(email, password));
  };

  return (
    <Container className="mt-3 mb-5">
      <div className="d-md-flex align-items-center justify-content-between mb-5">
        <Link to="/" className="btn btn-light ">
          Go Back
        </Link>
        <Link to="/doctorregister" className="btn btn-dark ">
          Register
        </Link>
      </div>
      <h1 className="text-center mt-3 mb-2">Doctor Login</h1>
      <Card className="my-5 shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DoctorLoginScreen;
