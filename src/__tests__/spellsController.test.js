const request = require('supertest');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');


describe('GET /harrypotter/spells', () => {
  it('should return 200 OK with the spells data', async () => {
    const response = await request(app).get('/harrypotter/spells?Type=Charm&light=blue');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /harrypotter/spells', () => {
    it('should create a new spell', async () => {
        const newSpell = {
          "id": uuidv4().toString(),
          "name": "Opening Charm 4",
          "incantation": "Aberto",
          "effect": "Opens doors",
          "canBeVerbal": true,
          "type": "Charm",
          "light": "Blue",
          "creator": null
      };

        const response = await request(app)
            .post('/harrypotter/spells')
            .send(newSpell);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newSpell.name);
        expect(response.body.type).toBe(newSpell.type);
        expect(response.body.description).toBe(newSpell.description);
    });
});

