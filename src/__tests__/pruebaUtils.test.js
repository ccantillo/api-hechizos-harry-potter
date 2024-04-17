const axios = require('axios');
const utils = require('../utils/utils');

jest.mock('axios');

const mockData = [
    {
        "id": "fbd3cb46-c174-4843-a07e-fd83545dce58",
        "name": "Opening Charm",
        "incantation": "Aberto",
        "effect": "Opens doors",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "5af48c35-81aa-440c-8287-68a4400a9253",
        "name": "Arania Exumai",
        "incantation": "Arania Exumai",
        "effect": "Repels spiders",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "66ee7361-f31e-41f4-8591-644e69fecd3b",
        "name": "Ascendio",
        "incantation": "Ascendio",
        "effect": "Lifts caster",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "6828592d-c5e3-42aa-b92e-ce58143bd108",
        "name": "Blue sparks",
        "incantation": null,
        "effect": "Jet of blue sparks",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "34251fdd-fe20-491e-bf0f-2e7f9b621b00",
        "name": "Descendo",
        "incantation": "Descendo",
        "effect": "Lowers target",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "d75892a8-dc6d-40e3-be37-8393ac1c091f",
        "name": "Hour-Reversal Charm",
        "incantation": null,
        "effect": "Reverses time",
        "canBeVerbal": null,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "ba77773e-ea0f-49dd-9cfc-4d452f77425f",
        "name": "Slowing Charm",
        "incantation": "Arresto Momentum",
        "effect": "Slows or stops target's velocity",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": "Daisy Pennifold (1711)"
    },
    {
        "id": "76b03853-c1ce-4916-b3fc-366996b94512",
        "name": "Finestra spell",
        "incantation": "Finestra",
        "effect": "Shatters glass",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "6859f601-cb03-46bc-97c2-c0f60b34d85e",
        "name": "Finestra spell",
        "incantation": "Finestra",
        "effect": "Shatters glass",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "b7006720-5457-467b-bf03-0f2938399f8d",
        "name": "Freezing Spell",
        "incantation": "Glacius",
        "effect": "Freezes target",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "6c8a4732-5128-4537-8539-7963dbd7a364",
        "name": "Glacius Duo",
        "incantation": "Glacius Duo",
        "effect": "Freezes the target",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "b596ffe5-170f-422d-85bb-86d80b78d439",
        "name": "Glacius Tria",
        "incantation": "Glacius Tria",
        "effect": "Freezes target enemy",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "0c22db1e-5bf5-4a0b-a539-eb47fa132131",
        "name": "Freezing Charm",
        "incantation": "Immobulus",
        "effect": "Stops movement and actions of the target",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "fa3d7f75-4697-4b58-8605-44d0b889ee87",
        "name": "Incendio Tria",
        "incantation": "Incendio Tria",
        "effect": "Conjures blue flames",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "3a58df85-0129-47a8-ada5-7da64d37ca18",
        "name": "Informous Spell",
        "incantation": "Informous",
        "effect": "Adds to the Folio Bruti",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "fe6e9d0e-75c9-4958-bae3-b2102bfc5a82",
        "name": "Mobiliarbus",
        "incantation": "Mobiliarbus",
        "effect": "Levitates wooden objects",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "2b7d364d-38e5-49b0-9215-bdf58b0ab3d2",
        "name": "Reductor Curse",
        "incantation": "Reducto",
        "effect": "Destroys solid objects",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "e82997de-261c-4f6f-a1cc-c77453a8d44b",
        "name": "Portkey Spell",
        "incantation": "Portus",
        "effect": "Turns object into Portkey",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "3820f989-1251-40a8-abdb-91396d9418a8",
        "name": "Revelio Charm",
        "incantation": "Revelio",
        "effect": "Reveals secrets about a person or object",
        "canBeVerbal": true,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    },
    {
        "id": "fe45755f-6310-44fc-bdac-58e6485c2b35",
        "name": "Age Line",
        "incantation": null,
        "effect": "Prevents people above or below a certain age from access to a target",
        "canBeVerbal": null,
        "type": "Charm",
        "light": "Blue",
        "creator": null
    }
]

describe('getRequest', () => {
  it('should return the Empty spells data', async () => {
    const data = [];
    axios.get.mockResolvedValueOnce({ data });
    const spells = await utils.getRequest('Charm', 'blue');
    expect(spells).toEqual(data);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Internal Server Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    await expect(utils.getRequest(null, 'null')).rejects.toThrow(errorMessage);
  });
});