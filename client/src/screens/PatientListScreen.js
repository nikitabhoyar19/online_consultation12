import React, { useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPatients, deletePatient } from '../actions/userActions';

const PatientListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientList = useSelector((state) => state.patientList);
  const { patients } = patientList;

  const patientDelete = useSelector((state) => state.patientDelete);
  const { success } = patientDelete;

  useEffect(() => {
    if (userInfo === null) {
      history.push('/adminlogin');
    } else {
      dispatch(listPatients());
    }
  }, [userInfo, history, dispatch, success]);

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deletePatient(id));
    }
  };
  return (
    <Container>
      <Row className="my-3 py-2 border-bottom border-dark">
        <Col md={6} className="text-center">
          <h1>Patient's List</h1>
        </Col>
        <Col md={6} className="text-center align-items-center">
          <Link to="/patientregister" className="btn btn-primary ">
            Create Patient
          </Link>
        </Col>
      </Row>
      <div>
        <Table striped bordered hover responsive="xl">
          <thead>
            <tr>
              <th>Id</th>

              <th>Name</th>

              <th>Email</th>

              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients &&
              patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient._id}</td>

                  <td>{patient.name}</td>

                  <td>{patient.email}</td>

                  {patient.isApproved ? (
                    <td>
                      <i className="fas fa-check text-success"></i>
                    </td>
                  ) : (
                    <td>
                      <i className="fas fa-times text-danger"></i>
                    </td>
                  )}

                  <td>
                    <div className="d-md-flex ">
                      <Link
                        to={`/patient/edit-profile/${patient._id}`}
                        className="btn btn-dark"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </Link>
                      <Link
                        to={`/patient/profile/${patient._id}`}
                        className="btn btn-info ml-1 mr-1"
                      >
                        <i className="fas fa-user"></i> View
                      </Link>
                      <Button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(patient._id)}
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
    </Container>
  );
};

export default PatientListScreen;
