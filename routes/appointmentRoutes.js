import express from 'express';
const router = express.Router();
import {
  createAppointment,
  createPrescription,
  deleteAppointment,
  getAppointmentDetails,
  getAppointmentOfDoctor,
  getAppointmentOfPatient,
  getPrescriptonOfAppointment,
  updateAppointment,
  updateAppointmentToCompleted,
} from '../controllers/appointmentController.js';

router.post('/', createAppointment);
router.get('/:id', getAppointmentOfPatient);
router.put('/:id', updateAppointment);
router.get('/:id/prescription', getPrescriptonOfAppointment);
router.put('/:id/completed', updateAppointmentToCompleted);
router.get('/doctor/:id', getAppointmentOfDoctor);
router.get('/appointmentdetails/:id', getAppointmentDetails);
router.post('/prescription', createPrescription);
router.delete('/:id/delete', deleteAppointment);

export default router;
