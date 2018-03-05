var User = require('../models/user.js');
var db = require('../../db.js');





exports.getAll = function(request, response) {
    db.any('SELECT * FROM users')
    .then(function (data) {
        response.status(200).json(
            {
                data    : {users : data},
                success : true
            }
        );
    })
    .catch(function (err) {
        response.status(500).json(
            {
                error   : {code : 500, message : err},
                success : false
            }
        );
    });
};


exports.create = function(request, response) {

    req.body.age = parseInt(req.body.age);
    db.none('insert into pups(name, breed, age, sex)'+'values(${name}, ${breed}, ${age}, ${sex})', req.body)
    .then(function () {
        response.status(200).json(
            {
                data    : {users : data},
                success : true
            }
        );
    })
    .catch(function (err) {
        response.status(500).json(
            {
                error   : {code : 500, message : err},
                success : false
            }
        );
    });
};





exports.findOne = function(req, res) {
    // Find a single note with a noteId

};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request

};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request

};

