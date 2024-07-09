import { PetService } from '../services/PetService';
import { IPetRepository } from '../repositories/IPetRepository';
import { Pet } from '../models/Pet/Pet';
import { ObjectId } from 'mongodb';
import { PetSummaryDTO } from '../models/Pet/dto/PetSummaryDTO';
import { PetDetailsDTO } from '../models/Pet/dto/PetDetailsDTO';

const mockPetRepository: IPetRepository = {
    dataSourceName: 'test',
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const createMockPet=()=>{
    const pet = new Pet();
    pet._id = new ObjectId();
    pet.name = 'Fluffy';
    pet.species = 'Cat';
    pet.birthYear = 2015;
    pet.available = true;
    return pet;
}

describe('PetService', () => {
    let petService: PetService;

    beforeEach(() => {
        petService = new PetService(mockPetRepository);
    });

    it('should retrieve all pets', async () => {
        const pet = createMockPet() as Pet;

        (mockPetRepository.findAll as jest.Mock).mockResolvedValue([pet]);

        const pets = await petService.getAllPets();
        expect(pets).toEqual([new PetSummaryDTO(pet)]);
    });

    it('should retrieve a pet by ID', async () => {
        const pet = createMockPet() as Pet;

        (mockPetRepository.findById as jest.Mock).mockResolvedValue(pet);

        const petDetails = await petService.getPetById(pet._id);
        expect(petDetails).toEqual(new PetDetailsDTO(pet));
    });

    it('should save a new pet', async () => {
        const pet = createMockPet() as Pet;

        (mockPetRepository.save as jest.Mock).mockResolvedValue(pet);

        (mockPetRepository.findById as jest.Mock).mockResolvedValue(pet);

        const savedPet = await petService.savePet(pet);
        expect(savedPet).toEqual(new PetDetailsDTO(pet));
    });

    it('should update an existing pet', async () => {
        const pet = createMockPet() as Pet;

        (mockPetRepository.findById as jest.Mock).mockResolvedValue(pet);
        (mockPetRepository.update as jest.Mock).mockResolvedValue(pet);
        (mockPetRepository.findById as jest.Mock).mockResolvedValue(pet);

        const updatedPet = await petService.updatePet(pet);
        expect(updatedPet).toEqual(new PetDetailsDTO(pet));
    });

    it('should delete a pet', async () => {
        const petId = new ObjectId();

        (mockPetRepository.findById as jest.Mock).mockResolvedValue(new Pet());
        (mockPetRepository.delete as jest.Mock).mockResolvedValue(petId);

        await petService.deletePet(petId);
        expect(mockPetRepository.delete).toHaveBeenCalledWith(petId);
    });
});
