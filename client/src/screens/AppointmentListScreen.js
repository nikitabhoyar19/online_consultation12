import React, { useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAppointments, deleteAppointment } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AppointmentListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, appointments, error } = appointmentList;

  const appointmentDelete = useSelector((state) => state.appointmentDelete);
  const { success } = appointmentDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteAppointment(id));
    }
  };

  useEffect(() => {
    if (userInfo === null) {
      history.push("/adminlogin");
    } else {
      dispatch(listAppointments());
    }
  }, [userInfo, history, dispatch, success]);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row className="my-3 py-2 border-bottom border-dark">
            <Col md={6} className="text-center">
              <h1>Appointment's List</h1>
            </Col>
            <Col md={6} className="text-center align-items-center">
              <Link to="/admin/appointment" className="btn btn-primary ">
                Create Appointment
              </Link>
            </Col>
          </Row>

          <div>
            <Table striped bordered hover responsive="xl">
              <thead>
                <tr>
                  <th>Id</th>

                  <th>Patient Name</th>

                  <th>Doctor Name</th>

                  <th>Symptoms</th>
                  <th>Scheduled At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments &&
                  appointments.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td>{index + 1}</td>
                      <td>{appointment.patientName}</td>
                      <td>
                        {appointment.doctorName} ({appointment.doctorSpeciality}
                        )
                      </td>
                      <td>{appointment.symptoms}</td>
                      <td>{appointment.appointmentScheduledAt.slice(0, 10)}</td>
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
                      <td>
                        <div className="d-md-flex ">
                          <Link
                            to={`/admin/appointment/${appointment._id}`}
                            className="btn btn-dark"
                          >
                            <i className="fas fa-edit"></i> Edit
                          </Link>
                          <Link
                            to={
                              appointment.isAppointmentCompleted
                                ? `/doctor/viewappointment/${appointment._id}`
                                : `/appointment/${appointment._id}`
                            }
                            className="btn btn-info ml-1 mr-1"
                          >
                            <i className="fas fa-user"></i> View
                          </Link>
                          <Button
                            className="btn btn-danger"
                            onClick={() => deleteHandler(appointment._id)}
                          >
                            <i className="fas fa-trash"></i> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AppointmentListScreen;
