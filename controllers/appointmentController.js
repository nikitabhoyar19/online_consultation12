import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointmentModel.js';
import Prescription from '../models/prescriptionModel.js';

//@desc Create a new appointment
//@route POST /api/appointments
//@access Public

const createAppointment = asyncHandler(async (req, res) => {
  const {
    patientId,
    patientName,
    patientAge,
    doctorId,
    doctorName,
    doctorSpeciality,
    symptoms,
    appointmentScheduledAt,
    isApproved,
    isOnHold,
  } = req.body;

  const appointment = new Appointment({
    patientId,
    patientName,
    patientAge,
    doctorId,
    doctorName,
    doctorSpeciality,
    symptoms,
    appointmentScheduledAt,
    isApproved,
    isOnHold,
  });

  const creaatedAppointment = await appointment.save();
  res.status(201).json(creaatedAppointment);
});

//@desc get appointments of a specific patient
//@route GET /api/appointments/:id
//@access Public
const getAppointmentOfPatient = asyncHandler(async (req, res) => {
  const p_id = req.params.id;
  const appointments = await Appointment.find({ patientId: p_id });
  if (appointments) {
    res.json(appointments);
  }
});

//@desc Get Appointment Details
//@route GET /api/appointments/appointmentdetails/:id
//@access Public

const getAppointmentDetails = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    res.json({
      _id: appointment._id,
      patientAge: appointment.patientAge,
      isOnHold: appointment.isOnHold,
      isApproved: appointment.isApproved,
      isAppointmentCompleted: appointment.isAppointmentCompleted,
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      doctorId: appointment.doctorId,
      doctorName: appointment.doctorName,
      doctorSpeciality: appointment.doctorSpeciality,
      symptoms: appointment.symptoms,
      appointmentScheduledAt: appointment.appointmentScheduledAt,
      createdAt: appointment.createdAt,
      appointmentCompletedAt:
        appointment.appointmentCompletedAt || appointment.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

//@desc get appointments of a specific doctor
//@route GET /api/appointments/doctor/:id
//@access Public
const getAppointmentOfDoctor = asyncHandler(async (req, res) => {
  const d_id = req.params.id;
  const appointments = await Appointment.find({
    doctorId: d_id,
  });
  if (appointments) {
    res.json(appointments);
  } else {
    res.status(404);
    throw new Error('No Appointments Found');
  }
});

//@desc Create a new prescription
//@route POST /api/appointments/prescription
//@access Public

const createPrescription = asyncHandler(async (req, res) => {
  const {
    medicines,
    appointmentId,
    patientId,
    patientName,
    doctorId,
    doctorName,
  } = req.body;

  const appointment = new Prescription({
    medicines,
    appointmentId,
    patientId,
    patientName,
    doctorId,
    doctorName,
  });

  const createdPrescription = await appointment.save();
  res.status(201).json(createdPrescription);
});

//@desc update appointment to completd
//@route PUT /api/appointments/:id/completed
//@access Private/Admin

const updateAppointmentToCompleted = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.isOnhold = false;
    appointment.isApproved = false;
    appointment.isAppointmentCompleted = true;

    appointment.appointmentCompletedAt = Date.now();

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

//@desc get prescription of a specific appointment
//@route GET /api/appointments/:id/prescription
//@access Public

const getPrescriptonOfAppointment = asyncHandler(async (req, res) => {
  const a_id = req.params.id;
  const prescription = await Prescription.find({
    appointmentId: a_id,
  });
  if (prescription) {
    res.json(prescription);
  } else {
    res.status(404);
    throw new Error('No Prescription Found');
  }
});

//@desc remove  an appointment
//@route DELETE /api/appointments/:id/delete
//@access Public

const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    await appointment.remove();
    res.json({ message: 'appointment removed' });
  } else {
    res.status(404);
    throw new Error('appointment not found');
  }
});

//@desc Update Appointment
//@route PUT /api/appointments/:id
//@access Private/Admin

const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.patientAge = req.body.patientAge || appointment.patientAge;
    appointment.isOnHold = req.body.isOnHold || appointment.isOnHold;
    appointment.isApproved = req.body.isApproved || appointment.isApproved;
    appointment.isAppointmentCompleted =
      req.body.isAppointmentCompleted || appointment.isAppointmentCompleted;
    appointment.patientId = req.body.patientId || appointment.patientId;
    appointment.patientName = req.body.patientName || appointment.patientName;
    appointment.doctorId = req.body.doctorId || appointment.doctorId;
    appointment.doctorName = req.body.doctorName || appointment.doctorName;
    appointment.doctorSpeciality =
      req.body.doctorSpeciality || appointment.doctorSpeciality;
    appointment.symptoms = req.body.symptoms || appointment.symptoms;
    appointment.appointmentScheduledAt =
      req.body.appointmentScheduledAt || appointment.appointmentScheduledAt;

    const updatedAppointment = await appointment.save();
    res.json({
      _id: updatedAppointment._id,
      patientAge: updatedAppointment.patientAge,
      isOnHold: updatedAppointment.isOnHold,
      isApproved: updatedAppointment.isApproved,
      isAppointmentCompleted: updatedAppointment.isAppointmentCompleted,
      patientId: updatedAppointment.patientId,
      patientName: updatedAppointment.patientName,
      doctorId: updatedAppointment.doctorId,
      doctorName: updatedAppointment.doctorName,
      doctorSpeciality: updatedAppointment.doctorSpeciality,
      symptoms: updatedAppointment.symptoms,
      appointmentScheduledAt: updatedAppointment.appointmentScheduledAt,
    });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

export {
  createAppointment,
  getAppointmentOfPatient,
  getAppointmentDetails,
  getAppointmentOfDoctor,
  createPrescription,
  updateAppointmentToCompleted,
  getPrescriptonOfAppointment,
  deleteAppointment,
  updateAppointment,
};
