import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  listPatients,
  listDoctors,
  listAppointments,
} from '../actions/userActions';
import '../css/cardShadow.css';
import Loader from '../components/Loader';
import Message from '../components/Message';
const AdminDashboardScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const patientList = useSelector((state) => state.patientList);

  const { patients } = patientList;

  const doctorList = useSelector((state) => state.doctorList);

  const { doctors } = doctorList;

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, appointments, error } = appointmentList;

  useEffect(() => {
    if (userInfo === null) {
      history.push('/adminlogin');
    } else {
      dispatch(listPatients());
      dispatch(listDoctors());
      dispatch(listAppointments());
    }
  }, [userInfo, history, dispatch]);

  return (
    <Container>
      <h1 className="py-5 text-center">Admin Dashboard</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <div className="card text-white bg-danger mb-5 p-2 rounded card__shadow">
              <div className="card-header text-center">Doctors</div>
              <div className="card-body">
                <h3 className="card-title text-center">Total doctors</h3>
                <div className="row mt-3">
                  <div
                    className="col-5 bg-warning rounded-circle text-center d-flex justify-content-center align-items-center"
                    style={{ height: 120 }}
                  >
                    <h1
                      className="text-white"
                      style={{ fontSize: 'xxx-large' }}
                    >
                      <i className="fas fa-user-md"></i>
                    </h1>
                  </div>
                  <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-white">
                      {doctors &&
                        doctors.reduce((acc, doctor) => {
                          doctor.isApproved ? (acc = acc + 1) : (acc = acc);
                          return acc;
                        }, 0)}
                    </h3>
                    <p>Approved Doctors</p>
                    <p>
                      Approval Required :{' '}
                      {doctors &&
                        doctors.length -
                          doctors.reduce((acc, doctor) => {
                            doctor.isApproved ? (acc = acc + 1) : (acc = acc);
                            return acc;
                          }, 0)}
                    </p>
                    <Link to="/admin/doctorlist" className="btn btn-warning">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card text-white bg-warning mb-5 card__shadow p-2 rounded">
              <div className="card-header text-center">Patients</div>
              <div className="card-body">
                <h3 className="card-title text-center">Total Patients</h3>
                <div className="row mt-3">
                  <div
                    className="col-5 bg-info rounded-circle text-center d-flex justify-content-center align-items-center"
                    style={{ height: 120 }}
                  >
                    <h1
                      className="text-white"
                      style={{ fontSize: 'xxx-large' }}
                    >
                      <i className="fas fa-user"></i>
                    </h1>
                  </div>
                  <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-white">
                      {patients &&
                        patients.reduce((acc, patient) => {
                          patient.isApproved ? (acc = acc + 1) : (acc = acc);
                          return acc;
                        }, 0)}
                    </h3>
                    <p>Approved Patients</p>
                    <p>
                      Approval Required :{' '}
                      {patients &&
                        patients.length -
                          patients.reduce((acc, patient) => {
                            patient.isApproved ? (acc = acc + 1) : (acc = acc);
                            return acc;
                          }, 0)}
                    </p>
                    <Link to="/admin/patientlist" className="btn btn-info">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card text-white bg-info mb-5 card__shadow p-2 rounded">
              <div className="card-header text-center">Appointments</div>
              <div className="card-body">
                <h3 className="card-title text-center">Appointments</h3>
                <div className="row mt-3">
                  <div
                    className="col-5 bg-success rounded-circle text-center d-flex justify-content-center align-items-center"
                    style={{ height: 120 }}
                  >
                    <h1
                      className="text-white"
                      style={{ fontSize: 'xxx-large' }}
                    >
                      <i className="far fa-calendar-alt"></i>
                    </h1>
                  </div>
                  <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-white">
                      {appointments && appointments.length}
                    </h3>
                    <p>Appointments</p>
                    <p>
                      Approval Required :{' '}
                      {appointments &&
                        appointments.length -
                          appointments.reduce((acc, appointment) => {
                            appointment.isApproved
                              ? (acc = acc + 1)
                              : appointment.isAppointmentCompleted
                              ? (acc = acc + 1)
                              : (acc = acc);
                            return acc;
                          }, 0)}
                    </p>
                    <Link
                      to="/admin/appointmentlist"
                      className="btn btn-success"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminDashboardScreen;
