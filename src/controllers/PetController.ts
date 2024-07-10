import { Request, Response, NextFunction } from 'express';
import { PetService } from '../services/PetService';
import { ObjectId } from 'mongodb';
import { validatePetParams, validateUrlParams } from '../validators/Validator';

/**
 * The PetController class handles HTTP requests related to `Pet` entities.
 * It interacts with the PetService to perform operations such as retrieving, 
 * creating, updating, and deleting pets.
 */
export class PetController {
    /**
     * Constructs a new PetController with the given PetService.
     * @param petService - The service used to perform operations on pets.
     */
    constructor(private petService: PetService) {}

    /**
     * Handles HTTP GET requests to retrieve all pets.
     * Responds with a JSON array of pets if successful, or passes an error to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async getAllPets(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pets = await this.petService.getAllPets();
            res.status(200).json(pets);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP GET requests to retrieve a pet by its ID.
     * Validates the URL parameters, retrieves the pet using its ID, 
     * and responds with a JSON object of the pet if successful. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async getPetById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.params);
            const _id = new ObjectId(req.params._id);
            const pet = await this.petService.getPetById(_id);
            res.status(200).json(pet);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP POST requests to create a new pet.
     * Validates the request body, creates the pet using the PetService, 
     * and responds with a JSON object of the newly created pet. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async savePet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const petReq = req.body || null;
            validatePetParams(petReq);
            const pet = await this.petService.savePet(petReq);
            res.status(201).json(pet);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP PUT requests to update an existing pet.
     * Validates the request body, updates the pet using the PetService, 
     * and responds with a JSON object of the updated pet. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async updatePet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const petReq = req.body || null;
            validatePetParams(petReq);
            const pet = await this.petService.updatePet(petReq);
            res.status(200).json(pet);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP DELETE requests to delete a pet by its ID.
     * Validates the URL parameters, deletes the pet using its ID, 
     * and responds with a status code indicating successful deletion. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async deletePet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.params);
            await this.petService.deletePet(new ObjectId(req.params._id));
            res.status(204).json({ message: 'Pet is successfully deleted' });
        } catch (error: any) {
            next(error);
        }
    }
}
