import express from 'express';
import { logger } from './logger';
import { connectToMongo, closeConnection } from './mongoConnection';

export const startServer = async (app: express.Application, port: number) => {
    try {
        await connectToMongo();
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error('Failed to connect to MongoDB, shutting down the server', { error });
        process.exit(1);
    }
};

export const gracefulShutdown = async () => {
    logger.info('Received shutdown signal, closing connections...');
    try {
        await closeConnection();
        logger.info('Connections closed, shutting down...');
        process.exit(0);
    } catch (error) {
        logger.error('Error during shutdown', { error });
        process.exit(1);
    }
};
