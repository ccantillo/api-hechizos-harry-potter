const { getSpells } = require('../db/spells')

const validateSpellFields = async (req, res, next) => {
    const { id, name, incantation, effect, canBeVerbal, type, light } = req.body;

    if (!id || !name || !incantation || !effect || !canBeVerbal || !type || !light) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (typeof canBeVerbal !== 'boolean') {
        return res.status(400).json({ message: 'canBeVerbal must be a boolean' });
    }

    if (light !== 'Blue' && light !== 'Red') {
        return res.status(400).json({ message: 'Light must be "Blue" or "Red"' });
    }

    next();
};

const validateUniqueSpellNameAndId = async (req, res, next) => {
    const spellsDB = await getSpells()
    const { name, id } = req.body;

    if (spellsDB.some(s => s.name === name)) {
        return res.status(400).json({ message: 'A spell with the same name already exists' });
    }

    if (spellsDB.some(s => s.id === id)) {
        return res.status(400).json({ message: 'A spell with the same id already exists' });
    }

    next();
};

module.exports = {
    validateSpellFields,
    validateUniqueSpellNameAndId
};
