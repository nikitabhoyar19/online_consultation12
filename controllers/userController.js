import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import User from '../models/userModel.js';
import Appointment from '../models/appointmentModel.js';
import generateToken from '../utils/generateToken.js';

//@desc Auth User and get tokens
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isDoctor: user.isDoctor,
      isPatient: user.isPatient,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password');
  }
});

//@desc Get User profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Register a new user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: true,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc Get all patients
//@route GET /api/users
//@access Private/Admin

const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({});
  res.json(patients);
});

//@desc Get all doctors
//@route GET /api/users/doctors
//@access Private/Admin

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({});
  res.json(doctors);
});

//@desc Get all doctors
//@route GET /api/users/appointments
//@access Private/Admin

const getAppointments = asyncHandler(async (req, res) => {
  const appointment = await Appointment.find({});
  res.json(appointment);
});

export {
  authUser,
  getUserProfile,
  registerUser,
  getPatients,
  getDoctors,
  getAppointments,
};
