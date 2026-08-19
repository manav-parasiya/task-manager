const request = require('supertest');
const app = require('../../app.js');

// 1. Mock the database model
jest.mock('../../src/model/auth', () => ({
    getUserByEmail: jest.fn()
}));

// 2. Mock bcrypt
jest.mock('bcrypt', () => ({
    compare: jest.fn()
}));

// 3. Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

// Import the mocked functions so we can control them in tests
const { getUserByEmail } = require('../../src/model/auth.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('POST /v1/api/login', () => {

    // Reset mocks before each test to avoid cross-contamination
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test 1: Missing both email and password
    test('returns 400 if email and password are missing', async () => {
        const response = await request(app).post('/v1/api/login').send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('invalid input data');
        expect(response.body.data).toContain('Email is required');
        expect(response.body.data).toContain('password is required');
    });

    // Test 2: Missing password only
    test('returns 400 if password is missing', async () => {
        const response = await request(app)
            .post('/v1/api/login')
            .send({ email: 'manavparasiya1020@gmail.com' });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('invalid input data');
        expect(response.body.data).toContain('password is required');
    });

    // Test 3: Missing email only
    test('returns 400 if email is missing', async () => {
        const response = await request(app)
            .post('/v1/api/login')
            .send({ password: '12345678' });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('invalid input data');
        expect(response.body.data).toContain('Email is required');
    });

    // Test 4: Successful login (WITH MOCKS)
    test('returns 200 with accessToken and refreshToken for valid credentials', async () => {
        // Arrange: Mock the database to return a user
        const mockUser = {
            id: 1,
            name: 'Manav',
            email: 'manavparasiya1020@gmail.com',
            password: 'hashed_password_here' // This is what is stored in DB
        };
        getUserByEmail.mockResolvedValue([mockUser]);

        // Mock bcrypt to say the password matches
        bcrypt.compare.mockResolvedValue(true);

        // Mock jwt to return fake tokens
        jwt.sign
            .mockReturnValueOnce('fake_access_token_123') // First call returns accessToken
            .mockReturnValueOnce('fake_refresh_token_456'); // Second call returns refreshToken

        // Act: Send the login request
        const response = await request(app)
            .post('/v1/api/login')
            .send({
                email: 'manavparasiya1020@gmail.com',
                password: '12345678' // Plain text password sent by client
            });

        // Assert: Check the response
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe('User successfully logged in');
        expect(response.body.data).toHaveProperty('accessToken', 'fake_access_token_123');
        expect(response.body.data).toHaveProperty('refreshToken', 'fake_refresh_token_456');

        // Check that the database was called with the correct email
        expect(getUserByEmail).toHaveBeenCalledWith('manavparasiya1020@gmail.com');
        expect(bcrypt.compare).toHaveBeenCalledWith('12345678', 'hashed_password_here');
    });

    // Test 5: User does not exist
    test('returns 401 if user does not exist', async () => {
        // Arrange: Mock database to return no user
        getUserByEmail.mockResolvedValue([]);

        // Act
        const response = await request(app)
            .post('/v1/api/login')
            .send({
                email: 'wrong@gmail.com',
                password: '12345678'
            });

        // Assert
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('invalid email or password');
    });

    // Test 6: Wrong password
    test('returns 401 if password is incorrect', async () => {
        // Arrange: Mock database to return a user, but bcrypt says password is wrong
        getUserByEmail.mockResolvedValue([{ id: 1, email: 'manavparasiya1020@gmail.com', password: 'hashed' }]);
        bcrypt.compare.mockResolvedValue(false); // ❌ Password mismatch

        // Act
        const response = await request(app)
            .post('/v1/api/login')
            .send({
                email: 'manavparasiya1020@gmail.com',
                password: 'wrong_password'
            });

        // Assert
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('invalid email or password');
    });

});