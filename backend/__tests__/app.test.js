const request = require("supertest");
const app = require("../app.js");

describe('GET /v1/api/health', () => {

    test('returns 200 OK with correct health status', async () => {
        const response = await request(app).get('/v1/api/health');


        expect(response.body.error).toBe(false)
        expect(response.body.message).toBe('Health OK')
        expect(response.statusCode).toBe(200)
    });

});