"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const incidentController_1 = require("../controllers/incidentController");
const router = (0, express_1.Router)();
router.get('/admin-only', authMiddleware_1.requireAdmin, (req, res) => {
    res.send('Welcome, admin!');
});
router.get('/admincount', adminController_1.getAdminCount);
router.get('/incidentcount', incidentController_1.getIncidentCount);
exports.default = router;
