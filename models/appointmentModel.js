import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
      default: 20,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctorSpeciality: {
      type: String,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    isOnHold: {
      type: Boolean,
      required: true,
      default: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAppointmentCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    appointmentScheduledAt: {
      type: Date,
    },
    appointmentCompletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointmant', appointmentSchema);

export default Appointment;
