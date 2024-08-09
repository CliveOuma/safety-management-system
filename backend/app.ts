import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDatabase from './db';
import authRoutes from './routes/authRoutes';
import incidentRoutes from './routes/incidentRoutes';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
