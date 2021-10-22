import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listAppointmentDetails,
  listPrescriptionDetails,
} from "../actions/appointmentActions";
import { useReactToPrint } from "react-to-print";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "../css/cardShadow.css";

const DoctorAppointmentViewScreen = ({ match, history }) => {
  const a_id = match.params.id;
  const dispatch = useDispatch();
  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const patientLogin = useSelector((state) => state.patientLogin);
  const { patientInfo } = patientLogin;
  const appointmentDetails = useSelector((state) => state.appointmentDetails);
  const { loading, appointment, error } = appointmentDetails;
  const prescriptionDetails = useSelector((state) => state.prescriptionDetails);
  const { prescription } = prescriptionDetails;

  useEffect(() => {
    if (userInfo === null) {
      if (patientInfo === null) {
        if (doctorInfo === null) {
          history.push("/patientlogin");
        } else {
          dispatch(listAppointmentDetails(a_id));
          dispatch(listPrescriptionDetails(a_id));
        }
      } else {
        dispatch(listAppointmentDetails(a_id));
        dispatch(listPrescriptionDetails(a_id));
      }
    } else {
      dispatch(listAppointmentDetails(a_id));
      dispatch(listPrescriptionDetails(a_id));
    }
  }, [userInfo, history, dispatch, a_id]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <h1 className="text-center my-3">Appointment Details</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <div className="row ml-3 mr-3">
            <div className="col-6">
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
                          {appointment.doctorName} (
                          {appointment.doctorSpeciality})
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
                        <td>
                          {`${appointment.appointmentScheduledAt}`.slice(0, 10)}
                        </td>
                      </tr>
                      <tr>
                        <td>Appointment Requested At</td>
                        <td>{`${appointment.createdAt}`.slice(0, 10)}</td>
                      </tr>
                      <tr>
                        <td>Appointment Completed At</td>
                        <td>
                          {`${appointment.appointmentCompletedAt}`.slice(0, 10)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
            <div className="col-6">
              <div
                className="shadow-lg p-3 mb-5 bg-white rounded"
                ref={componentRef}
              >
                {prescription && (
                  <div>
                    <h3 className="text-center mb-2">Prescription</h3>

                    {prescription.map((pres) => (
                      <div key={pres._id}>
                        <Table striped hover bordered responsive="md">
                          <tbody>
                            <tr>
                              <td>Prescription date</td>
                              <td>{`${pres.createdAt}`.slice(0, 10)}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <div>
                          <h5 className="text-center my-2">
                            Medicines Prescribed
                          </h5>
                          {pres.medicines.map((med) => (
                            <div
                              key={med._id}
                              className="d-flex justify-content-around align-items-center py-3 mt-2 bg-warning rounded card__shadow"
                            >
                              <p className="text-white">{med.med}</p>
                              <p className="text-white">{med.dosage}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-center">
                <Button className="btn btn-info" onClick={handlePrint}>
                  <i className="fas fa-print"></i> Print Prescription
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentViewScreen;
