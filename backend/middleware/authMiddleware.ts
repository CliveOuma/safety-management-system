import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Defining a type for the decoded token payload
interface DecodedToken {
  userId: string;
  role: string;
  iat: number;
  exp: number; 
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    if (decoded.role !== 'ADMIN') {
      return res.status(403).send({ message: 'Forbidden: Admin role required' });
    }

    // Token is valid and user is an admin
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ message: 'Token expired. Please log in again.' });
    }
    return res.status(401).send({ message: 'Invalid token' });
  }
};
