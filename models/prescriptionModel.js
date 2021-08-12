import mongoose from 'mongoose';

const medSchema = mongoose.Schema(
  {
    med: { type: String, required: true },
    dosage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const prescriptionSchema = mongoose.Schema(
  {
    medicines: [medSchema],

    appointmentId: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
