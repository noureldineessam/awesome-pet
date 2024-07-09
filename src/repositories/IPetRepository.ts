import { Pet } from '../models/Pet/Pet';
import { ObjectId } from 'mongodb';



/**
 * Interface representing a repository for `Pet` entities.
 */
export interface IPetRepository {
    dataSourceName: string;

    /**
     * Retrieves all pets from the repository.
     * @returns {Promise<Pet[]>} A promise that resolves to an array of `Pet` objects.
     */
    findAll(): Promise<Pet[]>;

    /**
     * Retrieves a pet by its ID.
     * @param _id - The ID of the pet to retrieve.
     * @returns {Promise<Pet | null>} A promise that resolves to the `Pet` object if found, or `null` if not found.
     */
    findById(_id: ObjectId): Promise<Pet | null>;

    /**
     * Saves a new pet to the repository.
     * @param pet - The pet object to save.
     */
    save(pet: Pet): Promise<void>;

    /**
     * Updates an existing pet in the repository.
     * @param _id - The ID of the pet to update.
     * @param pet - The updated pet object.
     */
    update(_id: ObjectId, pet: Pet): Promise<void>;

    /**
     * Deletes a pet from the repository by its ID.
     * @param _id - The ID of the pet to delete.
     */
    delete(_id: ObjectId): Promise<void>;
}
