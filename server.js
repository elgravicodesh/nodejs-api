var mysql = require('mysql');
const express = require('express');
require('express-group-routes');

const jwt = require('jsonwebtoken');
var bcryto = require('bcryptjs');


var app = express();
const router = express.Router()
var fs = require('fs');

const bodyparser = require('body-parser');
app.use(bodyparser.json({ type: 'application/*+json' }));


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password@sdadmin',
    database: 'veraliciousdb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) console.log('DB Connection succeed');
    else console.log('DB Connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});


module.exports = { mysqlConnection, app, router, bodyparser, jwt, bcryto }


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});