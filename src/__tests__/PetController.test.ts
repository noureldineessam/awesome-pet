// tests/routes/petsRouter.test.ts
import request from 'supertest';
import express from 'express';
import PetsRouter from '../routes/PetsRouter';


const app = express();
app.use(express.json());
app.use('/api', PetsRouter);
let GlobalId: null=null

let mockPet={                
    "name": "test",
    "species": "testing",
    "available": false,
    "birthYear": 1995,
    "photoUrl": "https://i.imgur.com/wpfirW7."
}
describe('Pets API', () => {

    it('should fetch all pets', async () => {
        const response = await request(app).get('/api/pets');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create a new pet', async () => {
        const response = (await request(app)
            .post('/api/pets')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(mockPet));

        GlobalId=response.body._id

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'test');
        expect(response.body).toHaveProperty('species', 'testing');
    });

    it('should fetch a pet by ID', async () => {
        const petId = GlobalId;

        const response = await request(app).get(`/api/pets/${petId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'test');
        expect(response.body).toHaveProperty('species', 'testing');
    });



    it('should update an existing pet', async () => {
        const response = await request(app)
            .put('/api/pets')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ ...mockPet,
                'name': 'Bella',
                'species': 'Dog',
                _id:GlobalId
             });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Bella');
        expect(response.body).toHaveProperty('species', 'Dog');
    });

    it('should delete a pet', async () => {
        const petId = GlobalId;
        const response = await request(app).delete(`/api/pets/${petId}`);
        expect(response.status).toBe(204);
    });
});
