'use strict';

var express = require('express'),
    postCtrl = require('../controller/postController');

exports.initialize = function (app) {
    var router = express.Router();

    router.param('id', function (req, res, next, id) {
        postCtrl.findById(id, function (err, post) {
            if (err) {
                return next(err);
            }
            if (!post) {
                return next('Nothing to load');
            }
            req.post = post;
            next();
        })
    });

    router.get('/', postCtrl.findAll);

    router.get('/:id', function (req, res) {
        res.send(req.post);
    });

    router.post('/', postCtrl.createPost, function (req, res) {
        res.send(req.post);
    });

    router.delete('/:id', postCtrl.deletePost, function (req, res) {
        res.send('Deleted');
    });

    app.use('/api/post', router);

};