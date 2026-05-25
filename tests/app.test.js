const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

describe('Pruebas del Microservicio DevOps', () => {
  // Cerramos la conexión de mongoose al terminar los tests para que no se quede pegado
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Debería responder con estado 200 y un JSON en la ruta principal', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body).toHaveProperty('message');
  });
});