var User = require('../models/user.js');


exports.setup = function(req, res) {

    var luis = new User({email : 'luisperez.r@icloud.com', password : 'master', admin : true});

    luis.save(function(err, data) {
        if(err) {
            response.status(500).json(
                {
                    error   : {code : 500, message : err}, 
                    success : false
                }
            );
        } else {
            // save person info
            
            var person = new Person({userID : luis._id.toString(), firstName : 'Luis Arturo', lastName : 'Perez Ramirez', email : luis.email});

            person.save(function(err, data){
                if (err) {
                    response.status(500).json(
                        {
                            error   : {code : 500, message : err}, 
                            success : false
                        }
                    );
                }
                else {
                    response.status(200).json(
                        {
                            data    : {user : luis, info: person},
                            success : true
                        }
                    );
                }
            });

        }
    });


};



exports.findAll = function(request, response) {

    User.find(function(err, docs){
        if(err) {
            response.status(500).json(
                {
                    error   : {code : 500, message : err},
                    success : false
                }
            );
        } else {
            response.status(200).json(
                {
                    data    : {users : docs},
                    success : true
                }
            );
        }
    });

};

exports.create = function(req, res) {
    // Create and Save a new Note
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

