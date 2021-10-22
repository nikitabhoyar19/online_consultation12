import React, { useEffect, useState, useRef } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import {
  createPrescription,
  listAppointmentDetails,
  completeAppointment,
} from '../actions/appointmentActions';
import { useSelector, useDispatch } from 'react-redux';

const CreatePriscriptionScreen = ({ match, history }) => {
  const a_id = match.params.id;
  const [medicines, setMedicines] = useState([]);
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState();
  const dispatch = useDispatch();

  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  const appointmentDetails = useSelector((state) => state.appointmentDetails);
  const { appointment } = appointmentDetails;

  const appointmentCompleted = useSelector(
    (state) => state.appointmentCompleted
  );
  const { success } = appointmentCompleted;

  useEffect(() => {
    dispatch(listAppointmentDetails(a_id));
    if (success) {
      history.push(`/appointment/${a_id}`);
    }
  }, [doctorInfo, history, dispatch, a_id, success]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const addMed = () => {
    setMedicines((prev) => {
      return [...prev, { med: medicine, dosage: `${dosage} Per Day` }];
    });
    setMedicine('');
    setDosage(0);
  };

  function deleteNote(id) {
    var arr = medicines;
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (i != id) {
        newArr.push(arr[i]);
      }
    }

    // setMedicines((prev) => {
    //   prev.filter((item) => {
    //     return item.id !== id;
    //   });
    // });
    setMedicines(newArr);
  }

  const submitHandler = () => {
    if (appointment) {
      dispatch(
        createPrescription({
          medicines: medicines,
          appointmentId: appointment._id,
          patientId: appointment.patientId,
          patientName: appointment.patientName,
          doctorId: appointment.doctorId,
          doctorName: appointment.doctorName,
        })
      );
      dispatch(completeAppointment(a_id));
    }
  };
  return (
    <Container>
      <h1 className="text-center py-3">Prescription</h1>
      <div className="row shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-5">
          <Form.Control
            type="text"
            placeholder="Enter Medicine Name You Want To Add"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          ></Form.Control>
        </div>
        <div className="col-5">
          <Form.Control
            type="number"
            placeholder="Enter Dose"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          ></Form.Control>
        </div>
        <div className="col-2">
          <div className="">
            <Button className="btn btn-primary" onClick={addMed}>
              Add Medicine
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-1 mb-5" ref={componentRef}>
        {medicines.map((medic, index) => (
          <div
            key={index}
            id={index}
            className=" shadow-lg p-3 mb-2 bg-white rounded d-flex justify-content-around align-items-center"
          >
            <div>{medic.med}</div>
            <div>{medic.dosage}</div>
            <Button
              className="btn btn-secondary"
              onClick={() => deleteNote(index)}
            >
              <i className="text-danger fas fa-trash"></i>
            </Button>
          </div>
        ))}
      </div>
      {medicines.length > 0 && (
        <div className="d-md-flex justify-content-center align-items-center">
          <Button className="btn btn-info" onClick={handlePrint}>
            Print Prescription
          </Button>
          <Button className="btn btn-success ml-2" onClick={submitHandler}>
            Complete Appointment
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CreatePriscriptionScreen;
