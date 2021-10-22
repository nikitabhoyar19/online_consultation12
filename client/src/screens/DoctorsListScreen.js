import React, { useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listDoctors, deleteDoctor } from '../actions/userActions';

const DoctorsListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorList = useSelector((state) => state.doctorList);
  const { doctors } = doctorList;

  const doctorDelete = useSelector((state) => state.doctorDelete);
  const { success } = doctorDelete;

  useEffect(() => {
    if (userInfo === null) {
      history.push('/adminlogin');
    } else {
      dispatch(listDoctors());
    }
  }, [userInfo, history, dispatch, success]);

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteDoctor(id));
    }
  };
  return (
    <Container>
      <Row className="my-3 py-2 border-bottom border-dark">
        <Col md={6} className="text-center">
          <h1>Doctor's List</h1>
        </Col>
        <Col md={6} className="text-center align-items-center">
          <Link to="/doctorregister" className="btn btn-primary ">
            Create Doctor
          </Link>
        </Col>
      </Row>
      <div>
        <Table striped bordered hover responsive="xl">
          <thead>
            <tr>
              <th>Id</th>

              <th>Name</th>

              <th>Specialised In</th>

              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors &&
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor._id}</td>

                  <td>{doctor.name}</td>

                  <td>{doctor.speciality}</td>

                  {doctor.isApproved ? (
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
                        to={`/doctor/edit-profile/${doctor._id}`}
                        className="btn btn-dark"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </Link>
                      <Link
                        to={`/doctor/profile/${doctor._id}`}
                        className="btn btn-info ml-1 mr-1"
                      >
                        <i className="fas fa-user"></i> View
                      </Link>
                      <Button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(doctor._id)}
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

export default DoctorsListScreen;
