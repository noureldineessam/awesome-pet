import { IPetRepository } from './IPetRepository';
import { JsonPetRepository } from './JsonPetRepository';
import { Db } from 'mongodb';
import { MongoPetRepository } from './MongoPetRepository';
import { CompositePetRepository } from './CompositePetRepository';

export class RepositoryFactory {
    /**
     * Creates an instance of IPetRepository based on the provided type.
     * @param type - The type of repository to create (e.g., 'json', 'db', 'db_json').
     * @param db - The database instance (optional).
     * @returns An instance of IPetRepository.
     * @throws Error if an unknown repository type is provided.
     */
    static createRepository(type: string, db?: Db | null): IPetRepository {
        /*
            TODO: Select only JsonPetRepository if there was no connection to mongodb to prevent client blocking behaviour 
            This will require more complex solution to handle multiple instances and data sync issues

            This should be implemented if multiple instances are handled correctly
            if(!db) return new JsonPetRepository()
        */

            
            switch(type) {
                case 'json':
                    return new JsonPetRepository();
                case 'db':
                    return new MongoPetRepository();
                case 'db_json':
                    return new CompositePetRepository();
                default:
                    throw new Error('Unknown repository type');
            }
    }
}