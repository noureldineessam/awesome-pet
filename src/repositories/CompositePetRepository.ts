import { Pet } from '../models/Pet/Pet';
import { IPetRepository } from './IPetRepository';
import { JsonPetRepository } from './JsonPetRepository';
import { MongoPetRepository } from './MongoPetRepository';
import { ObjectId } from 'mongodb';


export class CompositePetRepository implements IPetRepository {
    private jsonRepo: JsonPetRepository;
    private mongoRepo: MongoPetRepository;
    dataSourceName='Composite'

    constructor() {
        this.jsonRepo = new JsonPetRepository();
        this.mongoRepo = new MongoPetRepository();
    }

    async findAll(): Promise<Pet[]> {
        const pets = await this.jsonRepo.findAll();
        if (pets.length > 0) {
            // pets.forEach(async pet=>{
            //     await this.mongoRepo.save(pet);
            // })
            return pets;
        } else {
            return this.mongoRepo.findAll();
        }
    }

    async findById(_id: ObjectId): Promise<Pet | null> {
        let pet = await this.jsonRepo.findById(_id);
        if (!pet) {
            pet = await this.mongoRepo.findById(_id);
        }
        return pet;
    }

    async save(pet: Pet): Promise<void> {
        await this.jsonRepo.save(pet);
        await this.mongoRepo.save(pet);
    }

    async update(_id: ObjectId, updatedPet: Pet): Promise<void> {
        await this.jsonRepo.update(_id, updatedPet);
        await this.mongoRepo.update(_id, updatedPet);
    }

    async delete(_id: ObjectId): Promise<void> {
        await this.jsonRepo.delete(_id);
        await this.mongoRepo.delete(_id);
    }
}
