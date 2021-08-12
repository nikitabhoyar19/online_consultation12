import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';
import generateToken from '../utils/generateToken.js';

//@desc Auth Patient and get tokens
//@route POST /api/patients/login
//@access Public

const authPatient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const patient = await Patient.findOne({ email });

  if (patient && (await patient.matchPassword(password))) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      mobileNo: patient.mobileNo,
      address: patient.address,
      token: generateToken(patient._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password');
  }
});

//@desc Register a new patient
//@route POST /api/patients
//@access Public

const registerPatient = asyncHandler(async (req, res) => {
  const { name, email, password, mobileNo, address } = req.body;

  const patientExists = await Patient.findOne({ email });
  if (patientExists) {
    res.status(400);
    throw new Error('Patient already exists');
  }

  const patient = await Patient.create({
    name,
    email,
    password,
    mobileNo,
    address,
    isApproved: false,
  });

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      mobileNo: patient.mobileNo,
      address: patient.address,
      token: generateToken(patient._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});

//@desc get patient profile
//@route GET /api/patients/profile/:id
//@access Public

const getPatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      password: patient.password,
      address: patient.address,
      mobileNo: patient.mobileNo,
      isApproved: patient.isApproved,
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

//@desc remove patient profile
//@route DELETE /api/patients/profile/:id
//@access Public

const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    await patient.remove();
    res.json({ message: 'patient removed' });
  } else {
    res.status(404);
    throw new Error('patient not found');
  }
});

//@desc Update Patient
//@route PUT /api/patients/:id
//@access Private/Admin

const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    patient.name = req.body.name || patient.name;
    patient.email = req.body.email || patient.email;
    patient.address = req.body.address || patient.address;
    patient.mobileNo = req.body.mobileNo || patient.mobileNo;
    patient.isApproved = req.body.isApproved || patient.isApproved;

    const updatedPatient = await patient.save();
    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      address: updatedPatient.address,
      mobileNo: updatedPatient.mobileNo,
      email: updatedPatient.email,
      isApproved: updatedPatient.isApproved,
    });
  } else {
    res.status(404);
    throw new Error('Patient not found');
  }
});

export {
  authPatient,
  registerPatient,
  getPatientProfile,
  deletePatient,
  updatePatient,
};
