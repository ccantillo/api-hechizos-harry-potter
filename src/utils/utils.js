const axios = require('axios');

const  BASEURL = 'https://wizard-world-api.herokuapp.com'


const getRequest = async (type, light) => {
    const response = await axios.get(`${BASEURL}/Spells`, {
        params: {
            Type: type ? type.toLowerCase() : type,
        },
    });
    // se hizo el filtro light de esta manera ya que el api no posee la manera de filtrar por ese campo
    let spellResponse = light ? response.data.filter(spell => spell.light.toLowerCase() == light.toLowerCase()) : response.data;
    return spellResponse;
};


module.exports = {
    getRequest,
};