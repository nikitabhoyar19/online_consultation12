import express from 'express';
const router = express.Router();

import {
  authDoctor,
  registerDoctor,
  getDoctorProfile,
  deleteDoctor,
  updateDoctor,
} from '../controllers/doctorController.js';

router.route('/').post(registerDoctor);

router.post('/login', authDoctor);
router.put('/:id', updateDoctor);
router.get('/profile/:id', getDoctorProfile);
router.delete('/profile/:id', deleteDoctor);

export default router;
