import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  nearMiss: { type: String, required: true },
  reporter: { type: String, required: true },
  area: { type: String, required: true },
  name: { type: String, required: true },
  incident: { type: String, required: true },
}, {
  timestamps: true
});

const Incident = mongoose.model('Incident', incidentSchema);
export default Incident;
