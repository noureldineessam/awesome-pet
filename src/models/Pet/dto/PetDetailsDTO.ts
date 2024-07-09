import { ObjectId } from 'mongodb';
import { Pet } from '../Pet';


export class PetDetailsDTO {
  _id: ObjectId;
  name: string;
  species: string;
  birthYear: number;
  available: boolean;
  dateAdded: Date;
  dateUpdated: Date;
  photoUrl: URL | null=null


  constructor(pet: Pet) {
    this._id = pet._id;
    this.name = pet.name;
    this.species = pet.species;
    this.available=pet.available
    this.birthYear = pet.birthYear;
    this.dateAdded= pet.dateAdded;
    this.dateUpdated= pet.dateUpdated;
    this.photoUrl= pet.photoUrl;
}
}