var db = require('../../db.js');





exports.getAll = function(request, response) {
    db.any('SELECT id, email, first_given_name, second_given_name, first_surname, second_surname FROM users')
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

