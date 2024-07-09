import { Pet } from '../models/Pet/Pet';
import { IPetRepository } from './IPetRepository';
import fs from 'fs/promises';
import path from 'path';
import { ObjectId } from 'mongodb';

//Maintaining one pets.json for builds and multiple instances
const DATA_PATH = path.join(__dirname, process.env.DATA_PATH || '../data/pets.json');

export class JsonPetRepository implements IPetRepository {
    dataSourceName='JSON'

    async findAll(): Promise<Pet[]> {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(data) as Pet[];
    }

    async findById(_id: ObjectId): Promise<Pet | null> {
        const pets = await this.findAll();
        return pets.find(pet => new ObjectId(pet._id)?.equals(_id)) || null;
    }

    async save(pet: Pet): Promise<void> {
        const pets = await this.findAll();
        pets.push(pet);
        await fs.writeFile(DATA_PATH, JSON.stringify(pets, null, 2));
    }

    async update(_id: ObjectId, updatedPet: Pet): Promise<void> {
        const pets = await this.findAll();
        const index = pets.findIndex(pet => new ObjectId(pet._id)?.equals(_id));
        if (index !== -1) {
            pets[index] = updatedPet;
            await fs.writeFile(DATA_PATH, JSON.stringify(pets, null, 2));
        }
    }

    async delete(_id: ObjectId): Promise<void> {
        const pets = await this.findAll();
        const updatedPets = pets.filter(pet => new ObjectId(pet._id)?.equals(_id));
        await fs.writeFile(DATA_PATH, JSON.stringify(updatedPets, null, 2));
    }
}
