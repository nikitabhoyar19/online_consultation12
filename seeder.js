import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import User from './models/userModel.js';
import Patient from './models/patientModel.js';
import patients from './data/patients.js';
import Doctor from './models/doctorModel.js';
import doctors from './data/doctors.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Patient.deleteMany();
    await Doctor.deleteMany();
    const createdUsers = await User.insertMany(users);
    const createdPatients = await Patient.insertMany(patients);
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log('data imported');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await User.deleteMany();
    await Doctor.deleteMany();
    console.log('data destroyed');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
