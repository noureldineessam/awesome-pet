import { MongoClient, Db } from 'mongodb';
import { logger } from './logger';


// Define the MongoDB URI and database name
const uri: string = process.env.MONGODB_URI ?? ''; 
const dbName: string = process.env.MONGODB_COLLECTION_NAME ?? ''; 

// Handle REPO_TYPE:db without URI
if (!uri && process.env.REPO_TYPE === 'db') {
    throw new Error('MONGODB_URI must be defined in the environment variables');
}

export let db: Db | null = null;
let client: MongoClient | null = null; // Store MongoClient instance
let connectionPromise: Promise<Db | null> | null = null;

/**
 * Connects to MongoDB and returns the database instance.
 * @returns {Promise<Db | null>} The connected database instance or null in case of failure.
 */
export async function connectToMongo(): Promise<Db | null> {
    // Return existing connection if already established
    if (db) return db;

    // Return existing connection promise if already in progress
    if (connectionPromise) return connectionPromise;

    // Start a new connection attempt
    connectionPromise = (async () => {
        try {
            if (!uri) {
                if (process.env.REPO_TYPE === 'db_json') {
                    logger.warn('MongoDB is not connected, but GET operations will work from the JSON file');
                    return null;
                }
                throw new Error('Invalid MongoDB URI.');
            }

            client = new MongoClient(uri);

            // Connect to MongoDB
            await client.connect();
            db = client.db(dbName);
            logger.info('Connected to MongoDB');
            return db;
        } catch (error:any) {
            logger.error('Failed to connect to MongoDB', { message: error?.message });
            connectionPromise = null; // Reset the connection promise on failure
            return null; // Connection failure case
        }
    })();

    return connectionPromise;
}


/**
 * Closes the MongoDB connection.
 * @returns {Promise<void>} A promise that resolves when the connection is closed.
 */
export async function closeConnection(): Promise<void> {
    if (client) {
        try {
            await client.close();
            logger.info('MongoDB connection closed');
        } catch (error) {
            logger.error('Failed to close MongoDB connection', { error });
        }
    }
}