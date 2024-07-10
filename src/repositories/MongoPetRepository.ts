import { Pet } from '../models/Pet/Pet';
import { IPetRepository } from './IPetRepository';
import { connectToMongo } from '../utils/mongoConnection';
import { ObjectId } from 'mongodb';
const dbName:string = process.env.MONGODB_COLLECTION_NAME ?? ''; 



export class MongoPetRepository implements IPetRepository {
    dataSourceName='MongoDB'
    /**
     * Executes a callback function with the MongoDB collection, if available.
     * This method is implemented in case db+json have been choosen and db is unable to connect
     * @param {Function} callback - The callback function to execute with the collection.
     * @returns {Promise<any>} The result of the callback function, or null if the connection is unavailable.
     */
    private async withCollection<T>(callback: (collection: any) => Promise<T>): Promise<T | null> {
        const db = await connectToMongo();
        if (db === null) {
            console.warn('Unable to connect to MongoDB. Operations will be limited.');
            return null; // Return null if the connection is unavailable
        }
        const collection = db.collection(dbName);
        return await callback(collection);
    }


    private excludeId<T extends { _id?: any }>(obj: T): Omit<T, '_id'> {
        const { _id, ...rest } = obj;
        return rest;
    }

    async findAll(): Promise<Pet[]> {
        const pets = await this.withCollection(async (collection) => {
            const result = await collection.find().toArray();
            return result as Pet[];
        });
        return pets || []; // Return empty array if the result is null
    }

    async findById(_id: ObjectId): Promise<Pet | null> {
        return this.withCollection(async (collection) => {
            const pet = await collection.findOne({ _id: new ObjectId(_id) });
            return pet as Pet;
        }) || null; // Return null if the result is null
    }

    async save(pet: Pet): Promise<void> {
        await this.withCollection(async (collection) => {
            await collection.insertOne(pet);
        });
    }

    async update(_id: ObjectId, updatedPet: Pet): Promise<void> {
        await this.withCollection(async (collection) => {
            await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: this.excludeId(updatedPet) }
            );
        });
    }

    async delete(_id: ObjectId): Promise<void> {
        await this.withCollection(async (collection) => {
            await collection.deleteOne({ _id: new ObjectId(_id) });
        });
    }
}
