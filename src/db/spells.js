const { getRequest } = require('../utils/utils')

let spells = [];

const populateSpells = async () => {
  spells = await getRequest(null, null)
}

const getSpells = async () => {
  if (spells.length === 0) {
    await populateSpells();
  }
  return spells;
}

const addSpellToDB = async newSpell => {
  spells.push(newSpell);
}

// Populate spells array when the module is first imported
populateSpells();

module.exports = {
    getSpells,
    addSpellToDB
};

