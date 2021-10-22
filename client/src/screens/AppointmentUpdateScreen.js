import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listDoctors, listPatients } from '../actions/userActions';
import {
  listAppointmentDetails,
  updateAppointment,
} from '../actions/appointmentActions';

const AppointmentUpdateScreen = ({ match, history }) => {
  const a_id = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors } = doctorList;

  const patientList = useSelector((state) => state.patientList);
  const { patients } = patientList;

  const appointmentDetails = useSelector((state) => state.appointmentDetails);
  const { appointment } = appointmentDetails;

  const appointmentUpdate = useSelector((state) => state.appointmentUpdate);
  const { success } = appointmentUpdate;

  const [symptoms, setSymptoms] = useState('');
  const [date, setDate] = useState();
  const [patientAge, setPatientAge] = useState('');
  const [doctor, setDoctor] = useState('select');
  const [patient, setPatient] = useState('select');
  const [isOnHold, setIsOnHold] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (userInfo) {
      if (success) {
        history.push(`/appointment/${a_id}`);
      } else {
        dispatch(listAppointmentDetails(a_id));
        dispatch(listDoctors());
        dispatch(listPatients());
      }
    } else {
      history.push('/adminlogin');
    }
  }, [userInfo, history, dispatch, a_id, success]);

  useEffect(() => {
    if (appointment) {
      setSymptoms(appointment.symptoms);
      setDate(`${appointment.appointmentScheduledAt}`.slice(0, 10));
      setPatientAge(appointment.patientAge);
      setDoctor(
        `${appointment.doctorId}=${appointment.doctorName}=${appointment.doctorSpeciality}`
      );
      setPatient(`${appointment.patientId}=${appointment.patientName}`);
      setIsOnHold(appointment.isOnHold);
      setIsApproved(appointment.isApproved);
    }
  }, [appointment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAppointment({
        _id: a_id,
        patientId: patient.split('=')[0],
        patientName: patient.split('=')[1],
        patientAge: patientAge,
        doctorId: doctor.split('=')[0],
        doctorName: doctor.split('=')[1],
        doctorSpeciality: doctor.split('=')[2],
        symptoms: symptoms,
        appointmentScheduledAt: date,
        isApproved,
        isOnHold,
      })
    );
  };

  return (
    <Container>
      <h1 className="text-center py-3">Edit Appointment</h1>
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <h3 className="text-center text-warning py-1">
          <u>Hello {userInfo && userInfo.name}</u>
        </h3>

        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId="patient">
            <Form.Label column md="6">
              Select Patient
            </Form.Label>
            {patients && (
              <Col md="6">
                <Form.Control
                  as="select"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                >
                  <option disabled value={'select'}>
                    Select Patient
                  </option>
                  {patients.map((patient) => {
                    if (patient.isApproved) {
                      return (
                        <option
                          key={patient._id}
                          value={`${patient._id}=${patient.name}`}
                        >
                          {patient.name}
                        </option>
                      );
                    }
                  })}
                </Form.Control>
              </Col>
            )}
          </Form.Group>
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
              Patient Age
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
          <Form.Group as={Row} controlId="hold">
            <Form.Label column md="6">
              Change On Hold Status
            </Form.Label>
            <Col md="6">
              <Form.Control
                as="select"
                value={isOnHold}
                onChange={(e) => setIsOnHold(e.target.value)}
              >
                <option value={true}>Put On Hold</option>
                <option value={false}>Remove From Hold</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="approved">
            <Form.Label column md="6">
              Approve Appointment
            </Form.Label>
            <Col md="6">
              <Form.Control
                as="select"
                value={isApproved}
                onChange={(e) => setIsApproved(e.target.value)}
              >
                <option value={true}>Approve It</option>
                <option value={false}>Disapprove It</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-3 py-2">
            <Button type="submit" className="btn btn-primary">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AppointmentUpdateScreen;
