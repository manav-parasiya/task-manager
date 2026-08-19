const request = require('supertest');
const app = require('../../app.js');

const { register } = require('../../src/controllers/auth.js');

jest.mock('../../src/model/auth.js',()=>({
    addUser: jest.fn(),
    getUserByEmail: jest.fn()
}))

// 3. Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

// 2. Mock bcrypt
jest.mock('bcrypt', () => ({
    hash: jest.fn()
}));
const { addUser , getUserByEmail} = require('../../src/model/auth.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


describe('POST /v1/api/register testing', () => {
   // Reset mocks before each test to avoid cross-contamination
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('no name, email and password', async () => {
        const response = await request(app).post('/v1/api/register');
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('invalid input data')
        expect(response.body.data).toBe('Name is required, Email is required, password is required')
        expect(response.body.error).toBe(true)
    });

    test('no name and password', async () => {
        const response = await request(app).post('/v1/api/register').send({ 'email': 'manavparasiya1020@gmail.com' });
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('invalid input data')
        expect(response.body.data).toBe('Name is required, password is required')
        expect(response.body.error).toBe(true)
    });

    test('no name', async () => {
        const response = await request(app).post('/v1/api/register').send({ 'email': 'manavparasiya1020@gmail.com', 'password': '12345678' });
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('invalid input data')
        expect(response.body.data).toBe('Name is required')
        expect(response.body.error).toBe(true)
    });

    test('no password', async () => {
        const response = await request(app).post('/v1/api/register').send({ 'name': 'Manav Parasiya', 'email': 'manavparasiya1020@gmail.com' });
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe('invalid input data')
        expect(response.body.data).toBe('password is required')
        expect(response.body.error).toBe(true)
    });

    test('returns 200 with accessToken and refreshToken for valid credentials', async () => {
        const mockUser = {
            name: 'Manav Parasiya',
            email: 'manavparasiya1020@gmail.com',
            password: '12345678'
        }

        
        // Mock bcrypt to say the password matches
        bcrypt.hash.mockResolvedValue('hashed_password_123');

        getUserByEmail.mockResolvedValue([]);

        addUser.mockResolvedValue({...mockUser,insertId: 1});

        // Mock jwt to return fake tokens
        jwt.sign
            .mockReturnValueOnce('fake_access_token_123') // First call returns accessToken
            .mockReturnValueOnce('fake_refresh_token_456'); // Second call returns refreshToken
        
                    
        const response = await request(app).post('/v1/api/register').send({ 'name': 'Manav Parasiya', 'email': 'manavparasiya1020@gmail.com', 'password' : '12345678' });
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('User successfully registered')
        expect(response.body.data).toEqual({"accessToken": "fake_access_token_123", "refreshToken": "fake_refresh_token_456"})
        expect(response.body.error).toBe(false)
    });
    test('returns 409 for already email exists', async () => {
        const mockUser = {
            name: 'Manav Parasiya',
            email: 'manavparasiya1020@gmailc.com',
            password: '12345678'
        }

        // Mock bcrypt to say the password matches
        bcrypt.hash.mockResolvedValue('hashed_password_123');

        getUserByEmail.mockResolvedValue([mockUser?.email]);

        addUser.mockResolvedValue([mockUser]);

        // Mock jwt to return fake tokens
        jwt.sign
            .mockReturnValueOnce('fake_access_token_123') // First call returns accessToken
            .mockReturnValueOnce('fake_refresh_token_456'); // Second call returns refreshToken
        
                    
        const response = await request(app).post('/v1/api/register').send({ 'name': 'Manav Parasiya', 'email': 'manavparasiya1020@gmail.com', 'password' : '12345678' });
        expect(response.statusCode).toBe(409)
        expect(response.body.message).toBe('Email Already Exists, Please Log In')
        expect(response.body.data).toEqual([])
        expect(response.body.error).toBe(true)
    });
})