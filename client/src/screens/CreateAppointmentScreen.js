import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listDoctors } from '../actions/userActions';
import { createAppointment } from '../actions/appointmentActions';

const CreateAppointmentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [symptoms, setSymptoms] = useState('');
  const [date, setDate] = useState();
  const [patientAge, setPatientAge] = useState('');
  const [doctor, setDoctor] = useState('select');

  const patientLogin = useSelector((state) => state.patientLogin);
  const { patientInfo } = patientLogin;

  const doctorList = useSelector((state) => state.doctorList);
  const { doctors } = doctorList;

  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { appointment } = appointmentCreate;

  useEffect(() => {
    if (patientInfo) {
      dispatch(listDoctors());
      if (appointment) {
        history.push(`/appointment/${appointment._id}`);
      }
    } else {
      history.push('/patientlogin');
    }
  }, [patientInfo, history, dispatch, appointment]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (patientInfo) {
      dispatch(
        createAppointment({
          patientId: patientInfo._id,
          patientName: patientInfo.name,
          patientAge: patientAge,
          doctorId: doctor.split('=')[0],
          doctorName: doctor.split('=')[1],
          doctorSpeciality: doctor.split('=')[2],
          symptoms: symptoms,
          appointmentScheduledAt: date,
          isApproved: false,
          isOnHold: true,
        })
      );
    }
  };

  return (
    <Container>
      <h1 className="text-center py-3">Create Appointment</h1>
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <h3 className="text-center text-warning py-1">
          <u>Hello {patientInfo && patientInfo.name}</u>
        </h3>
        <p className="text-success text-center py-3 mb-3">
          <u>Fill In The Details Below To Book Appointment</u>
        </p>
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="symptoms">
            <Form.Label column md="6">
              Symptoms
            </Form.Label>
            <Col md="6">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Symptoms That You Are Feeling"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="date">
            <Form.Label column md="6">
              Date
            </Form.Label>
            <Col md="6">
              <Form.Control
                type="date"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="age">
            <Form.Label column md="6">
              Your Age
            </Form.Label>
            <Col md="6">
              <Form.Control
                type="number"
                placeholder="Enter Your Age"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="doctor">
            <Form.Label column md="6">
              Select Doctor
            </Form.Label>
            {doctors && (
              <Col md="6">
                <Form.Control
                  as="select"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option disabled value={'select'}>
                    Select Doctor
                  </option>
                  {doctors.map((doctor) => {
                    if (doctor.isApproved) {
                      return (
                        <option
                          key={doctor._id}
                          value={`${doctor._id}=${doctor.name}=${doctor.speciality}`}
                        >
                          {doctor.name} ({doctor.speciality})
                        </option>
                      );
                    }
                  })}
                </Form.Control>
              </Col>
            )}
          </Form.Group>
          <div className="d-flex justify-content-center mt-3 py-2">
            <Button type="submit" className="btn btn-primary">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CreateAppointmentScreen;
