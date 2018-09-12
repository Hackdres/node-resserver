/**
 * 
 */

require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar la carpeta Public donde va todo el FrontEnd
app.use(express.static(path.resolve(__dirname, '../public')));


// Configuración global de Rutas
app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {

    if (err) throw err;
    console.log('Base de datos Online!');

});
mongoose.set('useCreateIndex', true)


app.listen(process.env.PORT, () => {
    console.log('Escuchando del puerto 3000');
});