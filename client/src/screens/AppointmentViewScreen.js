import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listAppointmentDetails } from '../actions/appointmentActions';
import { Container, Table } from 'react-bootstrap';
import Message from '../components/Message';

const AppointmentViewScreen = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const appointmentDetails = useSelector((state) => state.appointmentDetails);
  const { loading, appointment, error } = appointmentDetails;

  const patientLogin = useSelector((state) => state.patientLogin);
  const { patientInfo } = patientLogin;

  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;
  useEffect(() => {
    if (userInfo === null) {
      if (patientInfo === null) {
        if (doctorInfo === null) {
          history.push('/patientlogin');
        } else {
          dispatch(listAppointmentDetails(id));
        }
      } else {
        dispatch(listAppointmentDetails(id));
      }
    } else {
      dispatch(listAppointmentDetails(id));
    }
  }, [userInfo, history, dispatch, id]);
  return (
    <Container>
      <h1 className="text-center my-3">Appointment Details</h1>
      {appointment && (
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          {appointment.isOnHold && (
            <Message variant="info">
              Appointment Status : This Appointment Is On Hold
            </Message>
          )}
          {appointment.isApproved && (
            <Message variant="warning">
              Appointment Status : This Appointment Is Approved
            </Message>
          )}
          {appointment.isAppointmentCompleted && (
            <Message variant="success">
              Appointment Status : This Appointment Is Completed
            </Message>
          )}
          {!appointment.isOnHold &&
            !appointment.isApproved &&
            !appointment.isAppointmentCompleted && (
              <Message variant="danger">
                Appointment Status : This Appointment Is Rejected
              </Message>
            )}
          <Table striped hover bordered responsive="md">
            <tbody>
              <tr>
                <td>Patient Name</td>
                <td>{appointment.patientName}</td>
              </tr>
              <tr>
                <td>Doctor Name</td>
                <td>
                  {appointment.doctorName} ({appointment.doctorSpeciality})
                </td>
              </tr>
              <tr>
                <td>Symptoms</td>
                <td>{appointment.symptoms}</td>
              </tr>
              <tr>
                <td>Patient's Age</td>
                <td>{appointment.patientAge}</td>
              </tr>
              <tr>
                <td>Appointment Scheduled At</td>
                <td>{`${appointment.appointmentScheduledAt}`.slice(0, 10)}</td>
              </tr>
              <tr>
                <td>Appointment Requested At</td>
                <td>{`${appointment.createdAt}`.slice(0, 10)}</td>
              </tr>
            </tbody>
          </Table>
          {doctorInfo && appointment.isApproved && (
            <Link to={`/doctor/prescription/${id}`} className="btn btn-primary">
              Give Prescription
            </Link>
          )}
        </div>
      )}
    </Container>
  );
};

export default AppointmentViewScreen;
