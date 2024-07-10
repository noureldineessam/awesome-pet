import express from 'express'
import { PetController } from '../controllers/PetController';
import { PetService } from '../services/PetService';
import { PetRepositoryContext } from '../repositories/PetRepositoryContext';
import { RepositoryFactory } from '../repositories/RepositoryFactory'

const router = express.Router();

/*
    Currently repoType is called from the enviornment file
    @TODO: To make repoType dynamic, use a middlewhere here or in index.ts with the following options:
        1-add a middlewhere to take a query for the repo_type
        2-add a db field to store the repo_type and call it through another middleware

*/
const repoType = process.env.REPO_TYPE || 'json';

const petRepository = RepositoryFactory.createRepository(repoType);
const petRepositoryContext = new PetRepositoryContext(petRepository);

const petService = new PetService(petRepositoryContext);
const petController = new PetController(petService);


router.get('/pets', petController.getAllPets.bind(petController));
router.get('/pets/:_id', petController.getPetById.bind(petController));
router.post('/pets', petController.savePet.bind(petController));
router.put('/pets', petController.updatePet.bind(petController));
router.delete('/pets/:_id', petController.deletePet.bind(petController));



export default router
