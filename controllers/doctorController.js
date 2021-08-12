import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Doctor from '../models/doctorModel.js';

//@desc Auth Doctor and get tokens
//@route POST /api/doctors/login
//@access Public

const authDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const doctor = await Doctor.findOne({ email });

  if (doctor && (await doctor.matchPassword(password))) {
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      mobileNo: doctor.mobileNo,
      address: doctor.address,
      isApproved: doctor.isApproved,
      speciality: doctor.speciality,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password');
  }
});

//@desc Register a new doctor
//@route POST /api/doctors
//@access Public

const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, password, mobileNo, address, speciality } = req.body;

  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    res.status(400);
    throw new Error('Doctor already exists');
  }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    mobileNo,
    address,
    isApproved: false,
    speciality,
  });

  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      mobileNo: doctor.mobileNo,
      address: doctor.address,
      isApproved: doctor.isApproved,
      speciality: doctor.speciality,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid doctor data');
  }
});

//@desc get doctor profile
//@route GET /api/doctors/profile/:id
//@access Public

const getDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      password: doctor.password,
      address: doctor.address,
      mobileNo: doctor.mobileNo,
      isApproved: doctor.isApproved,
      speciality: doctor.speciality,
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

//@desc remove doctor profile
//@route DELETE /api/doctors/profile/:id
//@access Public

const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    await doctor.remove();
    res.json({ message: 'doctor removed' });
  } else {
    res.status(404);
    throw new Error('doctor not found');
  }
});

//@desc Update Doctor
//@route PUT /api/doctors/:id
//@access Private/Admin

const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    doctor.name = req.body.name || doctor.name;
    doctor.email = req.body.email || doctor.email;
    doctor.address = req.body.address || doctor.address;
    doctor.mobileNo = req.body.mobileNo || doctor.mobileNo;
    doctor.isApproved = req.body.isApproved || doctor.isApproved;
    doctor.speciality = req.body.speciality || doctor.speciality;

    const updatedDoctor = await doctor.save();
    res.json({
      _id: updatedDoctor._id,
      name: updatedDoctor.name,
      address: updatedDoctor.address,
      mobileNo: updatedDoctor.mobileNo,
      email: updatedDoctor.email,
      isApproved: updatedDoctor.isApproved,
      speciality: updatedDoctor.speciality,
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

export {
  authDoctor,
  registerDoctor,
  getDoctorProfile,
  deleteDoctor,
  updateDoctor,
};
