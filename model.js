'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blog');

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected');
});

var PostSchema = new Schema({
    title: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    publishDate: {type: Date, default: Date.now()}
});

mongoose.model('post', PostSchema);