import { Pet } from '../models/Pet/Pet';
import { IPetRepository } from '../repositories/IPetRepository';
import { ObjectId } from 'mongodb';
import { PetSummaryDTO } from '../models/Pet/dto/PetSummaryDTO';
import { PetDetailsDTO } from '../models/Pet/dto/PetDetailsDTO';
import { logger } from '../utils/logger';

export class PetService {
    constructor(private petRepository: IPetRepository) {}

    /**
     * Retrieves all pets and returns them as PetSummaryDTO.
     * @returns {Promise<PetSummaryDTO[]>} An array of PetSummaryDTO.
     */
    async getAllPets(): Promise<PetSummaryDTO[]> {
        try {
            logger.info('Fetching all pets');
            const pets = await this.petRepository.findAll();
            return pets.map(pet => new PetSummaryDTO(pet));
        } catch (error:any) {
            logger.error('Error retrieving all pets', { message: error.message, stack: error.stack });
            throw new Error('Failed to retrieve pets');
        }
    }

    /**
     * Retrieves a pet by ID and returns it as PetDetailsDTO.
     * @param _id - The ID of the pet.
     * @returns {Promise<PetDetailsDTO | null>} The pet details or null if not found.
     */
    async getPetById(_id: ObjectId): Promise<PetDetailsDTO | null> {
        try {
            logger.info('Fetching pet by ID', { id: _id.toString() });
            const pet = await this.petRepository.findById(_id);
            if (pet) {
                return new PetDetailsDTO(pet);
            }
            throw new Error('Pet not found');
        } catch (error:any) {
            logger.error('Error retrieving pet by ID', { message: error.message, stack: error.stack });
            throw new Error(`Failed to retrieve pet: ${error.message}`);
        }
    }

    /**
     * Saves a new pet and returns the saved pet.
     * @param pet - The pet to be saved.
     * @returns {Promise<PetDetailsDTO | null>} The saved pet details or null if not saved.
     */
    async savePet(pet: Pet): Promise<PetDetailsDTO | null> {
        try {
            logger.info('Creating a new pet', { pet });
            pet._id = new ObjectId();
            pet.dateAdded = new Date();
            await this.petRepository.save(pet);
            return await this.getPetById(pet._id);
        } catch (error:any) {
            logger.error('Error creating pet', { message: error.message, stack: error.stack });
            throw new Error('Failed to create pet');
        }
    }

    /**
     * Updates an existing pet and returns the updated pet.
     * @param pet - The pet to be updated.
     * @returns {Promise<PetDetailsDTO | null>} The updated pet details or null if not found.
     */
    async updatePet(pet: Pet): Promise<PetDetailsDTO | null> {
        try {
            logger.info('Updating pet', { id: pet._id.toString() });
            const originalPet = await this.petRepository.findById(pet._id);
            if (originalPet) {
                pet.dateUpdated = new Date();
                await this.petRepository.update(pet._id, pet);
                return await this.getPetById(pet._id);
            }
            throw new Error('Pet not found');
        } catch (error:any) {
            logger.error('Error updating pet', { message: error.message, stack: error.stack });
            throw new Error(`Failed to update pet: ${error.message}`);
        }
    }

    /**
     * Deletes a pet by ID.
     * @param _id - The ID of the pet to be deleted.
     */
    async deletePet(_id: ObjectId): Promise<void> {
        try {
            logger.info('Deleting pet', { id: _id.toString() });
            const originalPet = await this.petRepository.findById(_id);
            if (originalPet) {
                await this.petRepository.delete(_id);
                logger.info('Pet deleted successfully', { id: _id.toString() });
            } else {
                throw new Error('Pet not found');
            }
        } catch (error:any) {
            logger.error('Error deleting pet', { message: error.message, stack: error.stack });
            throw new Error(`Failed to delete pet: ${error.message}`);
        }
    }
}
