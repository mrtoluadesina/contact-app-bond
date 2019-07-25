import request from 'supertest';

const trips = require('../data/trips.json');
const drivers = require('../data/drivers.json');
const vehicles = require('../data/vehicles.json');
import app from '../src/app';

describe('Server', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'All is well' });
  });

  test('Returns all trips for /trips', () => {
    return request(app)
      .get('/api/trips')
      .expect('Content-Type', /json/)
      .expect(200, { data: trips });
  });

  test('Returns a 404 when a single trip is not found', () => {
    return request(app)
      .get('/api/trip/id')
      .expect('Content-Type', /json/)
      .expect(404, { error: 'Trip not found' });
  });

  test('Returns data for a single trip with valid ID', () => {
    expect(trips).toEqual(expect.any(Array));

    const tripID = trips[0].tripID;

    return request(app)
      .get(`/api/trip/${tripID}`)
      .expect('Content-Type', /json/)
      .expect(200, { data: trips[0] });
  });

  test('Returns data for drivers with /drivers', () => {
    expect(drivers).toEqual(expect.any(Object));

    return request(app)
      .get('/api/drivers')
      .expect('Content-Type', /json/)
      .expect(200, { data: Object.values(drivers) });
  });

  test('Returns 404 when a single driver is not found', () => {
    return request(app)
      .get('/api/driver/id')
      .expect('Content-Type', /json/)
      .expect(404, { error: 'Driver not found' });
  });

  test('Returns data for a single driver', () => {
    const driverID = Object.keys(drivers)[0];
    const driverData = {
      ...Object.values(drivers)[0],
      photo: expect.any(String),
    };

    return request(app)
      .get(`/api/driver/${driverID}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.data).toEqual(driverData);
      });
  });

  test('Returns 404 when a single vehicle is not found', () => {
    return request(app)
      .get('/api/vehicle/id')
      .expect('Content-Type', /json/)
      .expect(404, { error: 'Vehicle not found' });
  });

  test('Returns data for a single vehicle by ID', () => {
    const vehicleID = Object.keys(vehicles)[0];
    const vehicleData = {
      vehicleID,
      ...Object.values(vehicles)[0],
    };

    return request(app)
      .get(`/api/vehicle/${vehicleID}`)
      .expect('Content-Type', /json/)
      .expect(200, { data: vehicleData });
  });

  test('Returns stats at /stats', () => {
    return request(app)
      .get('/api/stats')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchSnapshot();
      });
  });
});
