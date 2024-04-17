const express = require ('express')
const pruebasRouter = require('./routes/prueba.routes');

const app = express()

app.use(express.json())

app.use('/harrypotter', pruebasRouter)

app.listen(3000, () => {
    console.log("server on port 3000");
});

module.exports = app