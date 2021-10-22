import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDoctordetails } from '../actions/doctorActions';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DoctorProfileViewScreen = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { doctor } = doctorDetails;

  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  useEffect(() => {
    if (userInfo === null) {
      if (doctorInfo === null) {
        history.push('/doctorlogin');
      } else {
        dispatch(listDoctordetails(id));
      }
    } else {
      dispatch(listDoctordetails(id));
    }
  }, [userInfo, history, dispatch, id]);

  return (
    <Container>
      <div>
        <h1 className="my-3 py-3 text-center">Doctor Profile</h1>
        {doctor && (
          <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <Table striped hover bordered responsive="md">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{doctor.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{doctor.email}</td>
                </tr>
                <tr>
                  <td>Contact</td>
                  <td>{doctor.mobileNo}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{doctor.address}</td>
                </tr>
                <tr>
                  <td>Specialised In</td>
                  <td>{doctor.speciality}</td>
                </tr>
                <tr>
                  <td>Approved</td>
                  {doctor.isApproved ? (
                    <td className="text-success">Doctor Is Approved </td>
                  ) : (
                    <td className="text-danger">Doctor Not Approved</td>
                  )}
                </tr>
              </tbody>
            </Table>
            {doctor.isApproved && (
              <div className="d-flex justify-content-center align-items-center">
                <Link
                  to={`/doctor/appointments/${doctor._id}`}
                  className="btn btn-info"
                >
                  View Your Appointments
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default DoctorProfileViewScreen;
