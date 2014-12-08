'use strict'

var express = require('express'),
    model = require('./model'),
    bodyParser = require('body-parser'),
    postRoutes = require('./routes/postRoutes')
    ;

var app = express();

app.use(bodyParser.json());

postRoutes.initialize(app);

app.listen(3000, function () {
    console.log('Express started');
});