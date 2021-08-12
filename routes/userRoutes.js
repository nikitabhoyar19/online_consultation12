import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  getPatients,
  getDoctors,
  getAppointments,
} from '../controllers/userController.js';

router.route('/').post(registerUser).get(getPatients);

router.route('/doctors').get(getDoctors);
router.route('/appointments').get(getAppointments);

router.post('/login', authUser);

router.route('/profile').get(getUserProfile);

export default router;
