import { Router } from 'express';
import { getAdminCount } from '../controllers/adminController';
import { requireAdmin } from '../middleware/authMiddleware';
import { getIncidentCount } from '../controllers/incidentController';


const router = Router();


router.get('/admin-only', requireAdmin, (req, res) => {
    res.send('Welcome, admin!');
});


  router.get('/admincount', getAdminCount);
  router.get('/incidentcount', getIncidentCount);



export default router;

