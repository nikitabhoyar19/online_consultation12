import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { listAppointmentsOfDoctor } from '../actions/appointmentActions';
import Message from '../components/Message';

const ListDoctorAppointmentsScreen = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const appointmentOfDoctorList = useSelector(
    (state) => state.appointmentOfDoctorList
  );
  const { appointments } = appointmentOfDoctorList;

  useEffect(() => {
    if (userInfo === null) {
      if (doctorInfo === null) {
        history.push('/doctorlogin');
      } else {
        dispatch(listAppointmentsOfDoctor(id));
      }
    } else {
      dispatch(listAppointmentsOfDoctor(id));
    }
  }, [userInfo, history, dispatch, id]);

  return (
    <Container>
      <h1 className="text-center my-3">Appointments List</h1>
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        {appointments && appointments.length > 0 ? (
          <Table striped bordered hover responsive="xl">
            <thead>
              <tr>
                <th>Id</th>

                <th>Patient</th>

                <th>Symptoms</th>

                <th>Status</th>
                <th>Schedule Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.symptoms}</td>
                  {appointment.isOnHold && (
                    <td className="text-info">On Hold</td>
                  )}
                  {appointment.isApproved && (
                    <td className="text-warning">Approved</td>
                  )}
                  {appointment.isAppointmentCompleted && (
                    <td className="text-success">Completed</td>
                  )}
                  {!appointment.isOnHold &&
                    !appointment.isApproved &&
                    !appointment.isAppointmentCompleted && (
                      <td className="text-danger">Rejected</td>
                    )}
                  <td>{appointment.appointmentScheduledAt.slice(0, 10)}</td>
                  <td>
                    <Link
                      to={
                        appointment.isAppointmentCompleted
                          ? `/doctor/viewappointment/${appointment._id}`
                          : `/appointment/${appointment._id}`
                      }
                      className="btn btn-info"
                    >
                      View Appointment
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Message variant="info">No Appointments Yet</Message>
        )}
      </div>
    </Container>
  );
};

export default ListDoctorAppointmentsScreen;
