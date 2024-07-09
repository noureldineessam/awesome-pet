import { IPetRepository } from './IPetRepository';
import { Pet } from '../models/Pet/Pet';
import { ObjectId } from 'mongodb';



export class PetRepositoryContext {
    private strategy: IPetRepository;

    constructor(strategy: IPetRepository) {
        this.strategy = strategy;
    }

    get dataSourceName(): string {
        return this.strategy.dataSourceName || 'Context';
    }
    
    async findAll() {
        return this.strategy.findAll();
    }

    async findById(_id: ObjectId) {
        return this.strategy.findById(_id);
    }

    async save(pet: Pet) {
        return this.strategy.save(pet);
    }

    async update(_id: ObjectId, pet: Pet) {
        return this.strategy.update(_id, pet);
    }

    async delete(_id: ObjectId) {
        return this.strategy.delete(_id);
    }
}
