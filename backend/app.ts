import dotenv from 'dotenv';

// Load common environment variables
dotenv.config();

// Load environment-specific variables
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDatabase from './db';
import authRoutes from './routes/authRoutes';
import incidentRoutes from './routes/incidentRoutes';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes';

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allows cookies to be sent with requests
}));
app.use(bodyParser.json());

// MongoDB Connection
connectToDatabase();

// Routes
app.use('/api', authRoutes);
app.use('/api', incidentRoutes);
app.use('/api', adminRoutes);

export default app;
