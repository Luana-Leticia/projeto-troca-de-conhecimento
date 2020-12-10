const express = require('express');
const app = express();
const index = require('./routes/index');

const database = require('./configs/database');
database.connect();

app.use('/', index);

module.exports = app;