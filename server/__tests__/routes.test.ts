import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import session from 'express-session';
import MemoryStore from 'memorystore';
import { registerRoutes } from '../routes';
import { db, users } from '../storage';

const app = express();

beforeAll(async () => {
  app.use(express.json());

  // Set up a real, in-memory session store for testing.
  const memoryStore = MemoryStore(session);
  app.use(
    session({
      secret: 'test-secret',
      resave: false,
      saveUninitialized: false, // Set to false for login testing
      store: new memoryStore({ checkPeriod: 86400000 }),
    })
  );
  
  await registerRoutes(app);
});

// This hook runs after each test to ensure a clean database.
afterEach(async () => {
  await db.delete(users);
});


describe('Authentication Routes', () => {
  it('should allow a new user to register successfully', async () => {
    // ✅ Use a fresh agent for each test to ensure isolation.
    const agent = request.agent(app);
    const response = await agent
      .post('/api/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should prevent registration with a duplicate username', async () => {
    const agent = request.agent(app);
    // First, create a user.
    await agent.post('/api/register').send({
      username: 'duplicate',
      email: 'first@example.com',
      password: 'password123',
    });

    // Then, try to create another user with the same username.
    const response = await agent.post('/api/register').send({
      username: 'duplicate',
      email: 'second@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username already exists');
  });

  it('should allow a registered user to log in', async () => {
    const agent = request.agent(app);
    // Register the user first.
    await agent.post('/api/register').send({
      username: 'loginuser',
      email: 'login@example.com',
      password: 'password123',
    });

    // ✅ Log out first, because the register route automatically logs in.
    await agent.post('/api/logout');

    // Now, log in.
    const response = await agent
      .post('/api/login')
      .send({
        username: 'loginuser',
        password: 'password123',
      });
    
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('loginuser');
  });

  it('should deny login with an incorrect password', async () => {
    const agent = request.agent(app);
    await agent.post('/api/register').send({
      username: 'loginuser',
      email: 'login@example.com',
      password: 'password123',
    });

    await agent.post('/api/logout');

    const response = await agent
      .post('/api/login')
      .send({
        username: 'loginuser',
        password: 'wrongpassword',
      });
      
    expect(response.status).toBe(401);
  });
});

describe('Protected Routes', () => {
  it('should allow an authenticated user to access /api/problems', async () => {
    const agent = request.agent(app);

    await agent.post('/api/register').send({
      username: 'authuser',
      email: 'auth@example.com',
      password: 'password123',
    });
    // The agent is now "logged in" because the register route automatically logs in the user.

    const response = await agent.get('/api/problems');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 401 Unauthorized for /api/problems if user is not logged in', async () => {
    // A fresh agent has no session cookie.
    const agent = request.agent(app);
    const response = await agent.get('/api/problems');

    expect(response.status).toBe(401);
  });
});

