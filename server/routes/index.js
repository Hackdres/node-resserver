/**
 * 
 */

const express = require('express');
const app = express();

// Rutas de importación
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;