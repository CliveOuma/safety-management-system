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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

// MongoDB Connection
connectToDatabase();

// Routes
app.use('/api', authRoutes);
app.use('/api', incidentRoutes);

// Add your routes here
app.use('/api', adminRoutes);
app.use('/api', incidentRoutes);

export default app;
