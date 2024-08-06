import { Router } from 'express';
import { createIncident, updateIncident, deleteIncident, getIncidents, getIncidentById } from '../controllers/incidentController';
import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/incidents', createIncident);
router.put('/incidents/:id', requireAdmin, updateIncident);
router.delete('/incidents/:id', requireAdmin, deleteIncident);
router.get('/incidents', getIncidents);
router.get('/incidents/:id', getIncidentById); // Add this line


export default router;
