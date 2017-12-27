// UserController.js

var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}))

var user = require('../models/User')

//  creates a new user
router.post('/', function (request, response){
    user.create({
        name : request.body.name,
        email : request.body.email,
        password : request.body.password 
    },
    function (error, user){
        if (error) 
            return response.status(500).send("There was a problem adding the information to the database.");
        response.status(200).send(user);
    });
    
});


// Get all users
router.get('/', function(request, response){
    user.find({}, function (error, users){
        if (error)
            return response.status(500).send("There was a problem finding the users");
        response.status(200).send(users);    
    });
});

module.exports = router