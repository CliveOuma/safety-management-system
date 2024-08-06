"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const incidentRoutes_1 = __importDefault(require("./routes/incidentRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use(body_parser_1.default.json());
// MongoDB Connection
(0, db_1.default)();
// Routes
app.use('/api', authRoutes_1.default);
app.use('/api', incidentRoutes_1.default);
// Add your routes here
app.use('/api', adminRoutes_1.default);
app.use('/api', incidentRoutes_1.default);
exports.default = app;
