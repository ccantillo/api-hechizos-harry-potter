const express = require ('express')
const {returnCharacters, addSpell} = require('../controllers/prueba.controller')
const { validateSpellFields, validateUniqueSpellNameAndId } = require('../middlewares/spells')

const router = express.Router()

router.get("/Spells", returnCharacters)
router.post('/Spells', validateSpellFields, validateUniqueSpellNameAndId, addSpell);

module.exports = router