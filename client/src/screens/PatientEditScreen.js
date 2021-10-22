import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPatientDetails, updatePatient } from '../actions/patientActions';

const PatientEditScreen = ({ match, history }) => {
  const p_id = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientDetails = useSelector((state) => state.patientDetails);
  const { patient } = patientDetails;

  const patientUpdate = useSelector((state) => state.patientUpdate);
  const { success } = patientUpdate;

  useEffect(() => {
    if (userInfo === null) {
      history.push('/adminlogin');
    } else {
      if (success) {
        history.push(`/patient/profile/${p_id}`);
      } else {
        dispatch(listPatientDetails(p_id));
      }
    }
  }, [userInfo, history, dispatch, success]);

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setEmail(patient.email);
      setContact(patient.mobileNo);
      setAddress(patient.address);
      setIsApproved(patient.isApproved);
    }
  }, [patient]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePatient({
        _id: p_id,
        name,
        email,
        address,
        mobileNo: contact,
        isApproved,
      })
    );
  };

  return (
    <Container className="mt-3 mb-3">
      <h1 className="text-center mt-3 mb-2">Edit Patient Profile</h1>
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
            <Form.Group controlId="approved">
              <Form.Label>Approve Patient</Form.Label>
              <Form.Control
                as="select"
                value={isApproved}
                onChange={(e) => setIsApproved(e.target.value)}
              >
                <option value={true}>Approve It</option>
                <option value={false}>Disapprove It</option>
              </Form.Control>
            </Form.Group>

            <Button className="btn btn-dark" type="submit">
              Edit Patient
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientEditScreen;
