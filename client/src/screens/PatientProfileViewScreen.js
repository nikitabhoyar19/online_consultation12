import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPatientDetails } from '../actions/patientActions';
import { Container, Table } from 'react-bootstrap';

const PatientProfileViewScreen = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientDetails = useSelector((state) => state.patientDetails);
  const { patient } = patientDetails;

  const patientLogin = useSelector((state) => state.patientLogin);
  const { patientInfo } = patientLogin;

  useEffect(() => {
    if (userInfo === null) {
      if (patientInfo === null) {
        history.push('/patientlogin');
      } else {
        dispatch(listPatientDetails(id));
      }
    } else {
      dispatch(listPatientDetails(id));
    }
  }, [userInfo, history, dispatch, id]);
  return (
    <Container>
      <div>
        <h1 className="my-3 py-3 text-center">Patient Profile</h1>
        {patient && (
          <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Table striped hover bordered responsive="md">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{patient.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{patient.email}</td>
                </tr>
                <tr>
                  <td>Contact</td>
                  <td>{patient.mobileNo}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{patient.address}</td>
                </tr>
                <tr>
                  <td>Approved</td>
                  {patient.isApproved ? (
                    <td className="text-success">Patient Is Approved</td>
                  ) : (
                    <td className="text-danger">Patient Not Approved</td>
                  )}
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <div className="d-md-flex justify-content-center">
        <Link to="/appointment" className="btn btn-primary mr-1">
          Create An Appointment
        </Link>
        <Link to={`/patient/appointments/${id}`} className="btn btn-info ml-1">
          View All Appointments
        </Link>
      </div>
    </Container>
  );
};

export default PatientProfileViewScreen;
