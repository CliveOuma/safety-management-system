"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const incidentSchema = new mongoose_1.default.Schema({
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
const Incident = mongoose_1.default.model('Incident', incidentSchema);
exports.default = Incident;
