const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const database = require('./configs/database');
database.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const index = require('./routes/index');
const account = require('./routes/accountRoute');
const meeting = require('./routes/meetingRoute');

app.use('/', index);
app.use('/account', account);
app.use('/meeting', meeting);

module.exports = app;