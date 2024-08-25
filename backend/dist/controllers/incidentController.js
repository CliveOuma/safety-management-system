"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncidentCount = exports.getIncidentById = exports.getIncidents = exports.deleteIncident = exports.updateIncident = exports.createIncident = void 0;
const incident_1 = __importDefault(require("../models/incident"));
const createIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, incidentType, eventType, reporter, area, name, incidentDescription } = req.body;
        if (!date || !incidentType || !eventType || !reporter || !area || !name || !incidentDescription) {
            throw new Error('All fields are required');
        }
        const newIncident = new incident_1.default({ date, incidentType, eventType, reporter, area, name, incidentDescription });
        yield newIncident.save();
        res.status(201).send(newIncident);
    }
    catch (error) {
        console.error('Error saving incident:', error);
        res.status(400).send({ message: 'Incident not saved' });
    }
});
exports.createIncident = createIncident;
const updateIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { date, incidentType, eventType, reporter, area, name, incidentDescription } = req.body;
        const updatedIncident = yield incident_1.default.findByIdAndUpdate(id, { date, incidentType, eventType, reporter, area, name, incidentDescription }, { new: true });
        if (!updatedIncident) {
            return res.status(404).send({ message: 'Incident not found' });
        }
        res.status(200).send(updatedIncident);
    }
    catch (error) {
        console.error('Error updating incident:', error);
        res.status(400).send({ message: 'Error updating incident' });
    }
});
exports.updateIncident = updateIncident;
const deleteIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const incident = yield incident_1.default.findByIdAndDelete(id);
        if (!incident) {
            return res.status(404).send({ message: 'Incident not found' });
        }
        res.status(200).send({ message: 'Incident deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting incident:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.deleteIncident = deleteIncident;
const getIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidents = yield incident_1.default.find();
        res.status(200).send(incidents);
    }
    catch (error) {
        console.error('Error fetching incidents:', error); // Detailed logging
        res.status(500).send({ message: 'Error fetching incidents' });
    }
});
exports.getIncidents = getIncidents;
const getIncidentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const incident = yield incident_1.default.findById(id);
        if (!incident) {
            return res.status(404).send({ message: 'Incident not found' });
        }
        res.status(200).send(incident);
    }
    catch (error) {
        console.error('Error fetching incident:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.getIncidentById = getIncidentById;
const getIncidentCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidentCount = yield incident_1.default.countDocuments();
        res.status(200).json({ count: incidentCount });
    }
    catch (error) {
        console.error('Error fetching incident count:', error);
        res.status(500).json({ message: 'Error fetching incident count' });
    }
});
exports.getIncidentCount = getIncidentCount;
