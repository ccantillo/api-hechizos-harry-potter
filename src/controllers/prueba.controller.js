const utils = require("../utils/utils")
const { addSpellToDB } = require('../db/spells')


const returnCharacters = async (req, res)  =>{
    try {

        let { Type: type, light } = req.query

        if (!type) res.status(400).json( {message: "You need to specify an spell type"})

        let characters = await utils.getRequest(type, light)
        res.json(characters)

    }catch(error) {
        res.status(400).json( {message: error.message})
    }
}

const addSpell = async (req, res) => {
    try {
        let spell = req.body
        await addSpellToDB(spell);
        res.status(201).json(spell);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

module.exports = {
    returnCharacters,
    addSpell
}