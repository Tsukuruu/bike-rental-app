const express = require('express');
const bikeRouter = require('./bike.routes');
const typeRouter = require('./type.routes');

const app = express();

app.use('/bikes', bikeRouter);
app.use('/types', typeRouter);

module.exports = app;