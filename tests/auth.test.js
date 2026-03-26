const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user.model');

// mock user model not to test the real db
jest.mock('../src/models/user.model');

// mock audit middleware to avoid actual logging during tests
jest.mock('../src/middleware/audit.middleware', () => (req, res, next) => next());

describe('POST /api/auth/signup', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should register a new user and return 201', async () => {
        User.findOne.mockResolvedValue(null); //no existing user
        User.create.mockResolvedValue({ _id: 'abc123', email: 'jane@example.com' });

        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                password: 'Password123!',
                username: 'janedoe'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    it('should return 400 if user  already exists', async () => {
        User.findOne.mockResolvedValue({ email: 'jane@example.com' }); //user exists

        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                password: 'Password123!',
                username: 'janedoe'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('User already exists');
    });

    it('should return 500 if DB throws an error', async () => {
        User.findOne.mockRejectedValue(new Error('DB connection failed'));

        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                password: 'Password123!',
                username: 'janedoe'
            });

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe('DB connection failed');
    });
});

describe('POST /api/auth/login', () => {
    const bcrypt = require('bcrypt');

    beforeEach(() => jest.clearAllMocks());

    it('should login successfully and return a JWT token', async () => {
        const hashedPassword = await bcrypt.hash('Password123!', 10);

        User.findOne.mockResolvedValue({
            _id: 'abc123',
            email: 'jane@example.com',
            password: hashedPassword,
            role: 'user'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'jane@example.com', password: 'Password123!' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Login successful');
        expect(res.body.token).toBeDefined();
    });

    it('should return 400 if user is not found', async () => {
        User.findOne.mockResolvedValue(null); //user not found

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'ghost@example.com', password: 'Password123!' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return 400 if password does not match', async () => {
        const hashedPassword = await bcrypt.hash('CorrectPassword!', 10);

        User.findOne.mockResolvedValue({
            _id: 'abc123',
            email: 'jane@example.com',
            password: hashedPassword,
            role: 'user'
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'jane@example.com', password: 'WrongPassword!' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');

    });
    it('should return 500 if DB throws an error', async () => {
        User.findOne.mockRejectedValue(new Error('DB error'));

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'jane@example.com', password: 'Password123!' });

        expect(res.statusCode).toBe(500);
    });
})
