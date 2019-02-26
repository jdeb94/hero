const express = require('express');
const PORT = 5450
const routes = require('./routes/api');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testS');
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



/* app.all("/*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
}); 
 */
app.all('/*', function (req, res, next) {
    //console.log('Request');
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS ');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Auth-Token', 'X-CSRF-TOKEN']);
    next();
});
app.use(routes);


app.use((err, req, res, next) => res.status(422).res.send({ error: err }));



app.listen(PORT, function () {
    console.log("Listnening requests on port: " + PORT);
});