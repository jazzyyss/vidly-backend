const request = require('supertest');
const { Genre } = require('../../models/genre');
const mongoose = require('mongoose');
const { User } = require('../../models/user');

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index') });
    afterEach(async () => { await Genre.remove({}); server.close(); });
    describe('GET / ', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();

        })
    });
    describe('GET /by id', () => {
        it('should return bad status', async () => {
            const id = new mongoose.Types.ObjectId();
            const res = await request(server).get(`/api/genres/1`);
            expect(res.status).toBe(404);
        });
        it('should return valid object', async () => {
            const id = new mongoose.Types.ObjectId();
            const obj = { _id: id, name: 'genre1' };
            await Genre.collection.insertOne(obj);
            const res = await request(server).get(`/api/genres/${id}`);
            expect(res.status).toBe(200);
            expect(res.body.name).toMatch('genre1');
        });
    });
    describe('post /', () => {

        //we can use happy path(Mosh Refracting method ) to further optimize our test
        it('should return 401 if the user is not loged in', async () => {
            const res = await request(server).post('/api/genres').send({ name: 'genre1' })
            expect(res.status).toBe(401)
        })
        it('should return 400 if genre is less than 5 characters', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: '1234' });
            expect(res.status).toBe(400)
        })
        it('should return 400 if genre is more than 50 characters', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: new Array(52).join('a') });
            expect(res.status).toBe(400)
        })
        it('should save genre if it is valid', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: 'genre1' });
            const genre = await Genre.find({ name: 'genre1' });
            expect(genre).not.toBeNull()
        })
        it('should return genre if it is valid', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: 'genre1' });
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        })
    })
});