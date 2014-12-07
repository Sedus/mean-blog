'use strict'

var express = require('express'),
    model = require('./model'),
    bodyParser = require('body-parser'),
    postRoutes = require('./routes/postRoutes'),
    exphbs = require('express-handlebars'),
    postCtrl = require('./controller/postController'),
    moment = require('moment')
    ;

var app = express();

app.use(bodyParser.json());
var hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        dateFormat: function(value, options) {
            return moment(value).format('DD-MM-YYYY HH:mm');
        }
    }
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    postCtrl.findAllCB(function (err, posts) {
        if (err) {
            res.status(500).end(err);
        }
        res.render('home', {
            posts: posts
        });
    })
});

app.get('/post', function (req, res) {
    res.render('create', {
        placeholder: 'DD-MM-YYYY HH:mm',
        prefilledDate: moment().format('DD-MM-YYYY HH:mm')
    });
});

postRoutes.initialize(app);

app.listen(3000, function () {
    console.log('Express started');
});