"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const incidentController_1 = require("../controllers/incidentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/incidents', incidentController_1.createIncident);
router.put('/incidents/:id', authMiddleware_1.requireAdmin, incidentController_1.updateIncident);
router.delete('/incidents/:id', authMiddleware_1.requireAdmin, incidentController_1.deleteIncident);
router.get('/incidents', incidentController_1.getIncidents);
router.get('/incidents/:id', incidentController_1.getIncidentById); // Add this line
exports.default = router;
