import { Pet } from '../Pet';
import { ObjectId } from 'mongodb';

export class PetSummaryDTO {
    _id: ObjectId;
    name: string;
    species: string;

    constructor(pet: Pet) {
        this._id = pet._id;
        this.name = pet.name;
        this.species = pet.species;
    }
}