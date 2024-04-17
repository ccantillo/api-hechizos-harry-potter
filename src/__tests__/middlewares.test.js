const { validateSpellFields, validateUniqueSpellNameAndId } = require('../middlewares/spells')

describe('validateSpellFields middleware', () => {
  it('should return 400 if any required field is missing', () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validateSpellFields(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 if canBeVerbal is not a boolean', () => {
    const req = { body: { id: '1', name: 'Spell', incantation: 'Incantation', effect: 'Effect', canBeVerbal: 'not boolean', type: 'Type', light: 'Blue' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validateSpellFields(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'canBeVerbal must be a boolean' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 if light is not "Blue" or "Red"', () => {
    const req = { body: { id: '1', name: 'Spell', incantation: 'Incantation', effect: 'Effect', canBeVerbal: true, type: 'Type', light: 'Green' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validateSpellFields(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Light must be "Blue" or "Red"' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if all validations pass', () => {
    const req = { body: { id: '1', name: 'Spell', incantation: 'Incantation', effect: 'Effect', canBeVerbal: true, type: 'Type', light: 'Blue' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validateSpellFields(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  describe('validateUniqueSpellNameAndId middleware', () => {
    it('should return 400 if a spell with the same name already exists', async () => {
      const spellsDB = [{ id: '1', name: "Opening Charm", incantation: 'Incantation 1', effect: 'Effect 1', canBeVerbal: true, type: 'Type 1', light: 'Blue', creator: 'Creator 1' }];
      const req = { body: { name: "Opening Charm" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
  
      jest.mock('../db/spells', () => ({ getSpells: jest.fn().mockResolvedValue(spellsDB) }));
  
      await validateUniqueSpellNameAndId(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'A spell with the same name already exists' });
      expect(next).not.toHaveBeenCalled();
    });
  
    it('should return 400 if a spell with the same id already exists', async () => {
      const spellsDB = [{ id: "fbd3cb46-c174-4843-a07e-fd83545dce58", name: 'Spell 1', incantation: 'Incantation 1', effect: 'Effect 1', canBeVerbal: true, type: 'Type 1', light: 'Blue', creator: 'Creator 1' }];
      const req = { body: { id: "fbd3cb46-c174-4843-a07e-fd83545dce58" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
  
      jest.mock('../db/spells', () => ({ getSpells: jest.fn().mockResolvedValue(spellsDB) }));
  
      await validateUniqueSpellNameAndId(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'A spell with the same id already exists' });
      expect(next).not.toHaveBeenCalled();
    });
  
    it('should call next if no spell with the same name or id exists', async () => {
      const req = { body: { name: 'New Spell Name', id: 'New Spell Id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
  
      jest.mock('../db/spells', () => ({ getSpells: jest.fn().mockResolvedValue([]) }));
  
      await validateUniqueSpellNameAndId(req, res, next);
  
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
