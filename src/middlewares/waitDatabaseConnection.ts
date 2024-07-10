import { Request, Response, NextFunction } from 'express';
import { db } from '../utils/mongoConnection';

// Middleware to check Database connection
// @TODO: Might be possible to queue requests from here until db is connected
export const WaitDatabaseConnection = (req: Request, res: Response, next: NextFunction) => {
    // if db is not intialized, wait until db is connected
    if (!db) {
        return res.status(503).json({ message: 'Service Unavailable: Database not connected' });
    }
    next();
};

