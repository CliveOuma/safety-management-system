import { Request, Response } from 'express';
import User from '../models/user';

export const getAdminCount = async (req: Request, res: Response) => {
  try {
    const adminCount = await User.countDocuments({ role: 'ADMIN' });
    res.status(200).json({ count: adminCount });
  } catch (error) {
    console.error('Error fetching admin count:', error);
    res.status(500).json({ message: 'Error fetching admin count' });
  }
};
