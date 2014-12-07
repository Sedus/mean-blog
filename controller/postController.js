'use strict';

var mongoose = require('mongoose'),
    moment = require('moment'),
    Post = mongoose.model('post');

exports.findAll = function (req, res, next) {
    _findAll(function (err, posts) {
        if (err) {
            return next(err);
        }
        res.end(JSON.stringify(posts));
    })
};

exports.findAllCB = function (callback) {
    _findAll(function (err, posts) {
        if (err) {
            return callback(err);
        }
        return callback(null, posts);
    })
};

exports.createPost = function (req, res, next) {
    console.log('Create a new post');
    Post.create({
        title: req.body.title,
        content: req.body.content,
        publishDate: moment(req.body.publishDate, 'DD-MM-YYYY HH:mm')
    }, function (err, post) {
        if (err) {
            return next(err);
        }
        next();
    })
};

exports.updatePost = function (req, res, next) {
    if (req.body.delete != undefined) {
        doDelete(req.post, function (err, removed) {
            if (err) {
                return next(err);
            }
            next();
        });
    } else {
        console.log('Update post: ' + req.post.title);
        Post.findById(req.post.id, function (err, post) {
            post.title = req.body.title;
            post.content = req.body.content;
            post.publishDate = moment(req.body.publishDate, 'DD-MM-YYYY HH:mm');

            post.save(function (err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        });
    }
};

exports.deletePost = function (req, res, next) {
    var post = req.body.post;
    doDelete(post, function (err, removed) {
        if (err) {
            return next(err);
        }
        next();
    });
};

exports.findById = function (id, callback) {
    Post.findById(id, function (err, post) {
        if (err) {
            return callback(err);
        }
        return callback(null, post);
    });
};

function _findAll(callback) {
    console.log('findAll posts');
    Post.find({'publishDate': {$lte: moment()}})
        .sort('-publishDate')
        .exec(function (err, posts) {
            if (err) {
                return callback(err);
            }
            return callback(null, posts);
        });
}

function doDelete(post, callback) {
    console.log('Delete post: ' + post.title);
    post.remove(function (err, removed) {
        if (err) {
            return callback(err);
        }
        return callback(null, removed);
    })
}
