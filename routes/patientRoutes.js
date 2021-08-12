import express from 'express';
const router = express.Router();
import {
  authPatient,
  deletePatient,
  getPatientProfile,
  registerPatient,
  updatePatient,
} from '../controllers/patientController.js';

router.route('/').post(registerPatient);

router.post('/login', authPatient);
router.put('/:id', updatePatient);
router.get('/profile/:id', getPatientProfile);
router.delete('/profile/:id', deletePatient);

export default router;
