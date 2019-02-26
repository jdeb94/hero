const express = require('express');
const PORT = 5450
const routes = require('./routes/api');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testS');
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.use((err, req, res, next) => res.status(422).res.send({ error: err }));



app.listen(PORT, function () {
    console.log("Listnening requests on port: " + PORT);
});