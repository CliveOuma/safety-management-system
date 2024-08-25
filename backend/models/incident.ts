import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  incidentType: { type: String, required: true },
  eventType: { 
    type: String, 
    required: true,
    enum: ['Near Miss', 'Accident', 'Incident'] // Enum to specify the allowed values
  },
  reporter: { type: String, required: true },
  area: { type: String, required: true },
  name: { type: String, required: true },
  incidentDescription: { type: String, required: true },
}, { timestamps: true }); // Added timestamps for created and updated

const Incident = mongoose.model('Incident', incidentSchema);
export default Incident;
