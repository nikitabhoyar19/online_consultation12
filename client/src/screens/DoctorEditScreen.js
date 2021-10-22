import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listDoctordetails, updateDoctor } from '../actions/doctorActions';

const DoctorEditScreen = ({ match, history }) => {
  const d_id = match.params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const [speciality, setSpeciality] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { doctor } = doctorDetails;

  const doctorUpdate = useSelector((state) => state.doctorUpdate);
  const { success } = doctorUpdate;

  useEffect(() => {
    if (userInfo === null) {
      history.push('/adminlogin');
    } else {
      if (success) {
        history.push(`/doctor/profile/${d_id}`);
      } else {
        dispatch(listDoctordetails(d_id));
      }
    }
  }, [userInfo, history, dispatch, success]);

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setEmail(doctor.email);
      setContact(doctor.mobileNo);
      setAddress(doctor.address);

      setSpeciality(doctor.speciality);
      setIsApproved(doctor.isApproved);
    }
  }, [doctor]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDoctor({
        _id: d_id,
        name,
        email,
        mobileNo: contact,
        address,
        speciality,
        isApproved,
      })
    );
  };

  return (
    <Container className="mt-3 mb-3">
      <h1 className="text-center mt-3 mb-2">Edit Doctor</h1>
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

            <Form.Group controlId="approved">
              <Form.Label>Approve Doctor</Form.Label>
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
              Update Doctor
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorEditScreen;
