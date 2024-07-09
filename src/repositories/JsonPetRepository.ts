import { Pet } from '../models/Pet/Pet';
import { IPetRepository } from './IPetRepository';
import fs from 'fs/promises';
import path from 'path';
import { ObjectId } from 'mongodb';

// Maintaining one pets.json for builds and multiple instances
const DATA_PATH = path.join(__dirname, process.env.DATA_PATH || '../data/pets.json');

export class JsonPetRepository implements IPetRepository {
    dataSourceName = 'JSON';

    /**
     * Retrieves all pets from the JSON data file.
     * @returns {Promise<Pet[]>} A promise that resolves to an array of Pet objects.
     */
    async findAll(): Promise<Pet[]> {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        // Parse and return the data as an array of Pet objects
        return JSON.parse(data) as Pet[];
    }

    /**
     * Retrieves a pet by its ID.
     * @param _id - The ID of the pet to retrieve.
     * @returns {Promise<Pet | null>} A promise that resolves to the Pet object if found, or null if not found.
     */
    async findById(_id: ObjectId): Promise<Pet | null> {
        const pets = await this.findAll();
        // Find and return the pet with the specified ID
        return pets.find(pet => new ObjectId(pet._id)?.equals(_id)) || null;
    }

    /**
     * Saves a new pet to the JSON data file.
     * @param pet - The Pet object to save.
     * @returns {Promise<void>} A promise that resolves when the pet has been saved.
     */
    async save(pet: Pet): Promise<void> {
        const pets = await this.findAll();
        // Add the new pet to the array
        pets.push(pet);
        // Write the updated array back to the file
        await fs.writeFile(DATA_PATH, JSON.stringify(pets, null, 2));
    }

    /**
     * Updates an existing pet in the JSON data file.
     * @param _id - The ID of the pet to update.
     * @param updatedPet - The updated Pet object.
     * @returns {Promise<void>} A promise that resolves when the pet has been updated.
     */
    async update(_id: ObjectId, updatedPet: Pet): Promise<void> {
        const pets = await this.findAll();
        // Find the index of the pet with the specified ID
        const index = pets.findIndex(pet => new ObjectId(pet._id)?.equals(_id));
        // If the pet is found, update it
        if (index !== -1) {
            pets[index] = updatedPet;
            // Write the updated array back to the file
            await fs.writeFile(DATA_PATH, JSON.stringify(pets, null, 2));
        }
    }

    /**
     * Deletes a pet by its ID from the JSON data file.
     * @param _id - The ID of the pet to delete.
     * @returns {Promise<void>} A promise that resolves when the pet has been deleted.
     */
    async delete(_id: ObjectId): Promise<void> {
        const pets = await this.findAll();
        // Filter out the pet with the specified ID
        const updatedPets = pets.filter(pet => !new ObjectId(pet._id)?.equals(_id));
        // Write the updated array back to the file
        await fs.writeFile(DATA_PATH, JSON.stringify(updatedPets, null, 2));
    }
}
