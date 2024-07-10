import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import PetsRouter from './routes/PetsRouter'
import { ErrorHandler } from './middlewares/ErrorHandler'
import { WaitDatabaseConnection } from "./middlewares/waitDatabaseConnection"
import { logger } from './utils/logger';
import { startServer, gracefulShutdown } from './utils/server';


// Load configuration variables
const repoType = process.env.REPO_TYPE || 'json';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.json());

// Configure morgan based on environment
if (ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}


// if db is the only data store used, tell user that db is still intializing or it's down if it is
if(repoType ==='db'){
    app.use(WaitDatabaseConnection);
}

app.use(`/api`, PetsRouter)
app.use(ErrorHandler);

// Use logger instead of console.log
logger.info('Server is starting...');

startServer(app, Number(PORT))

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);