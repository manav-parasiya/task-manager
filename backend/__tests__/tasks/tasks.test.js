const request = require('supertest');
const app = require('../../app.js');


jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

jest.mock('../../src/model/tasks.js', () => ({
    fetchTasksModel: jest.fn(),
    createTaskModel: jest.fn(),
    updateTaskModel: jest.fn(),
    deleteTaskModel: jest.fn()
}))

const { fetchTasksModel, createTaskModel, updateTaskModel, deleteTaskModel } = require('../../src/model/tasks.js');
const jwt = require('jsonwebtoken');


describe('GET /v1/api/tasks api test', () => {

    const staticJWTAuthorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJuYW1lIjoiTWFuYXYgUGFyYXNpeWEiLCJlbWFpbCI6Im1hbmF2cGFyYXNpeWExMDIwQGdtYWlsLmNvbSIsImlhdCI6MTc4NzEwNzQ4MSwiZXhwIjoxNzg3MTA4MzgxfQ.hcB5aQJ5wwzI_B3g27JknEN-wj0itDf9yLXxKHKxJa9';


    test('401 with no jwt token ', async () => {
        const response = await request(app).get('/v1/api/tasks')
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('Authorization Token is Required in Headers')
        expect(response.body.data).toEqual([])
    })
    test('200 ok with jwt tokena and return data', async () => {

        const mockUser = {
            user_id: 2,
            name: 'Manav Parasiya',
            email: 'manavparasiya1020@gmail.com',
            iat: 1787107481,
            exp: 1787108381

        }

        const mockTasks = [
            {
                "id": 10,
                "user_id": 2,
                "name": "Manav Parasiya",
                "description": "Testing desc",
                "priority": "high",
                "due_date": "2026-07-09T00:00:00.000Z",
                "created_at": "2026-07-26T07:52:14.000Z",
                "updated_at": "2026-07-26T07:52:14.000Z"
            },
            {
                "id": 11,
                "user_id": 2,
                "name": "Manav Parasiya",
                "description": "Testing desc",
                "priority": "high",
                "due_date": "2026-07-09T00:00:00.000Z",
                "created_at": "2026-07-26T08:33:35.000Z",
                "updated_at": "2026-07-26T08:33:35.000Z"
            },
            {
                "id": 12,
                "user_id": 2,
                "name": "Manav Testing hew",
                "description": "Testing description",
                "priority": "high",
                "due_date": "2026-06-26T00:00:00.000Z",
                "created_at": "2026-08-19T03:02:42.000Z",
                "updated_at": "2026-08-19T03:02:42.000Z"
            },
            {
                "id": 13,
                "user_id": 2,
                "name": "Manav Testing hew",
                "description": "Testing description",
                "priority": "high",
                "due_date": "2026-06-26T00:00:00.000Z",
                "created_at": "2026-08-19T03:02:44.000Z",
                "updated_at": "2026-08-19T03:02:44.000Z"
            },
            {
                "id": 14,
                "user_id": 2,
                "name": "Manav Testing hew",
                "description": "Testing description",
                "priority": "high",
                "due_date": "2026-06-26T00:00:00.000Z",
                "created_at": "2026-08-19T03:02:45.000Z",
                "updated_at": "2026-08-19T03:02:45.000Z"
            }
        ]

        jwt.verify.mockResolvedValue(mockUser)
        fetchTasksModel.mockResolvedValue(mockTasks)
        const response = await request(app).get('/v1/api/tasks').set({ 'Authorization': staticJWTAuthorizationToken });
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe('Successfully Fetched Tasks');
        expect(response.body.data).toEqual(mockTasks);

    })
})

describe('POST /v1/api/tasks api test', () => {

    beforeEach(() => jest.clearAllMocks());
    const staticJWTAuthorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJuYW1lIjoiTWFuYXYgUGFyYXNpeWEiLCJlbWFpbCI6Im1hbmF2cGFyYXNpeWExMDIwQGdtYWlsLmNvbSIsImlhdCI6MTc4NzEwNzQ4MSwiZXhwIjoxNzg3MTA4MzgxfQ.hcB5aQJ5wwzI_B3g27JknEN-wj0itDf9yLXxKHKxJa9';

    const mockTask = {
        "name": "Manav Testing hew",
        "description": "Testing description",
        "priority": "high",
        "due_date": "2026-06-26"
    }

    test('401 with no jwt token ', async () => {
        const response = await request(app).post('/v1/api/tasks').send(mockTask)
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('Authorization Token is Required in Headers')
        expect(response.body.data).toEqual([])
    });
    test('400 with jwt token, no name ', async () => {
        const mockTask = {
            "description": "Testing description",
            "priority": "high",
            "due_date": "2026-06-26"
        }
        const response = await request(app).post('/v1/api/tasks').set({ Authorization: staticJWTAuthorizationToken }).send(mockTask)
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('invalid input data')
        expect(response.body.data).toBe('name is required')
    });

    test('400 with jwt token, no priority ', async () => {
        const mockTask = {
            "name": "Manav Testing hew",
            "description": "Testing description",
            "due_date": "2026-06-26"
        }
        const response = await request(app).post('/v1/api/tasks').set({ Authorization: staticJWTAuthorizationToken }).send(mockTask)
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(true);
        expect(response.body.message).toBe('invalid input data')
        expect(response.body.data).toBe('priority is required')
    });

    test('201 with jwt token, no due_date ', async () => {
        const mockTask = {
            "name": "Manav Testing hew",
            "description": "Testing description",
            "priority": "high",
        }
        const mockCreateTaskModelResponse = {
            insertResults: {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 19,
                info: '',
                serverStatus: 2,
                warningStatus: 0,
                changedRows: 0
            },
            newCreatedTask: [
                {
                    id: 19,
                    user_id: 2,
                    name: 'Manav Testing hew',
                    description: 'Testing description',
                    priority: 'high',
                    due_date: null,
                    created_at: '2026-08-19T03:52:13.000Z',
                    updated_at: '2026-08-19T03:52:13.000Z'
                }
            ]
        }
        createTaskModel.mockResolvedValue(mockCreateTaskModelResponse);

        const response = await request(app).post('/v1/api/tasks').set({ Authorization: staticJWTAuthorizationToken }).send(mockTask)
        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe('Successfully Created Tasks')
        expect(response.body.data).toEqual(mockCreateTaskModelResponse.newCreatedTask)
    });

    test('201 with jwt token, no description and no due_date ', async () => {
        const mockTask = {
            "name": "Manav Testing hew",
            "priority": "high",
        }
        const mockCreateTaskModelResponse = {
            insertResults: {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 19,
                info: '',
                serverStatus: 2,
                warningStatus: 0,
                changedRows: 0
            },
            newCreatedTask: [
                {
                    id: 19,
                    user_id: 2,
                    name: 'Manav Testing hew',
                    priority: 'high',
                    due_date: null,
                    created_at: '2026-08-19T03:52:13.000Z',
                    updated_at: '2026-08-19T03:52:13.000Z'
                }
            ]
        }
        createTaskModel.mockResolvedValue(mockCreateTaskModelResponse);

        const response = await request(app).post('/v1/api/tasks').set({ Authorization: staticJWTAuthorizationToken }).send(mockTask)
        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe('Successfully Created Tasks')
        expect(response.body.data).toEqual(mockCreateTaskModelResponse.newCreatedTask)
    });

    test('201 ok with jwt tokena and return data', async () => {

        const mockUser = {
            user_id: 2,
            name: 'Manav Parasiya',
            email: 'manavparasiya1020@gmail.com',
            iat: 1787107481,
            exp: 1787108381

        }

        const MockCreateTaskModelResponse = {
            insertResults: {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 17,
                info: '',
                serverStatus: 2,
                warningStatus: 0,
                changedRows: 0
            },
            newCreatedTask: [
                {
                    id: 17,
                    user_id: 2,
                    name: 'Manav Testing hew',
                    description: 'Testing description',
                    priority: 'high',
                    due_date: '2026-06-26T00:00:00.000Z',
                    created_at: '2026-08-19T03:22:26.000Z',
                    updated_at: '2026-08-19T03:22:26.000Z'
                }
            ]
        }


        const mockCreateTaskBody = {
            "name": "Manav Testing hew",
            "description": "Testing description",
            "priority": "high",
            "due_date": "2026-06-26"
        }

        jwt.verify.mockResolvedValue(mockUser)
        createTaskModel.mockResolvedValue(MockCreateTaskModelResponse)
        const response = await request(app).post('/v1/api/tasks').set({ 'Authorization': staticJWTAuthorizationToken }).send(mockCreateTaskBody);
        expect(response.statusCode).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toBe('Successfully Created Tasks');
        expect(response.body.data).toEqual(MockCreateTaskModelResponse.newCreatedTask);

    })
})