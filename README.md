API de Hechizos de Harry Potter
Este es un API que proporciona información sobre los hechizos de la serie de Harry Potter, permitiendo filtrarlos por tipo y luz que retornan.

Instalación
Clona el repositorio
Instala las dependencias:

accede a la carpeta /src
npm install


Uso

Para iniciar el servidor, ejecuta:
npm start
El servidor se ejecutará en http://localhost:3000.

Para ejecutar los test unitarios, ejecuta:
npm run test

Para probar la API, puedes utilizar herramientas como Postman o cURL. Aquí tienes algunos ejemplos de solicitudes:

Filtrar hechizos por tipo y luz:
GET http://localhost:3000/harrypotter/spells?Type=Charm&light=blue


Agregar un nuevo hechizo (se debe proporcionar un cuerpo JSON válido):
POST http://localhost:3000/harrypotter/spells
Ejemplo Body:
{
    "id": "fbd3cb46-c174-4843-a07e-fd83545d7",
    "name": "Opening Charm 4",
    "incantation": "Aberto",
    "effect": "Opens doors",
    "canBeVerbal": true,
    "type": "Charm",
    "light": "Blue",
    "creator": null
}



la version de Node utilizada fue la v20.12.2