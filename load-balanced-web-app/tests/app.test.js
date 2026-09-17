// tests/app.test.js
// These are the "checks" that run automatically every time code is pushed.
// If any of these fail, GitHub Actions will BLOCK the push (as required
// by the assignment).

const request = require('supertest');
const app = require('../server');

describe('Load Balanced Web App', () => {

  // Test 1: Does the homepage load successfully?
  test('GET / should return status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  // Test 2: Does the homepage contain the word "Hello"?
  test('GET / should contain a greeting message', async () => {
    const res = await request(app).get('/');
    expect(res.text).toContain('Hello from');
  });

  // Test 3: Does the health check endpoint work? (used by AWS to know
  // if a server is alive and should keep receiving traffic)
  test('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  // Test 4: Does an unknown page correctly return a 404 (not found)?
  test('GET /unknown-page should return 404', async () => {
    const res = await request(app).get('/unknown-page');
    expect(res.statusCode).toBe(404);
  });

});
