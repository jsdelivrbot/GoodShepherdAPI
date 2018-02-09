const express = require('express');
const jwt = require('jsonwebtoken');
var config = require('../../config'); // get our config file
const app = express();
app.set('superSecret', config.secret); // secret variable

const bcrypt = require('bcrypt');


const router = express.Router();
const User = require('../models/user');
const Person = require('../models/person');




// Authentication Method


router.post('/signup', (request, response, next) => {

    var user = new User({email : request.body.email, password : request.body.password, admin : false});

    user.save(function(err, data) {
        if(err) {
            response.status(500).json(
                {
                    error   : {code : 500, message : err}, 
                    success : false
                }
            );
        } else {
            // save person info
            var person = new Person({userID : user._id.toString(), firstName : request.body.firstName, lastName : request.body.lastName, email : user.email});

            person.save(function(err, data){
                if (err) {
                    // delete User
                    response.status(500).json(
                        {
                            error   : {code : 500, message : err}, 
                            success : false
                        }
                    );
                }
                else {
                    var userJSON = user.toJSON();
                    var personJSON = person.toJSON();
                    delete userJSON.password
                    delete personJSON._id
                    response.status(200).json(
                        {
                            data    : {user : userJSON, info: personJSON},
                            success : true
                        }
                    );
                }
            });

        }
    });

});







router.post('/login', (request, response, next) => {
    
    User.findOne({email: request.body.email}).exec()
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                console.log('si entra');
                var JWToken = jwt.sign({email:user.email, id:user._id}, app.get('superSecret'), {expiresIn: 1440});
                
                var userJSON = user.toJSON();
                delete userJSON.password


                Person.findOne({ 'userID': user._id.toString() }, function (err, person) {
                    if(err) {
                        response.status(500).json(
                            {
                                error   : {code : 500, message : err},
                                success : false
                            }
                        );
                    } else {
                        var userJSON = user.toJSON();
                        var personJSON = person.toJSON();
                        delete userJSON.password
                        delete personJSON._id
                        userJSON.token = JWToken
                        response.status(200).json(
                            {
                                data    : {user : userJSON, info: personJSON},
                                success : true
                            }   
                        );
                    }
                });

            }
            else {
                response.status(401).json(
                    {
                        error:{
                            code: 401,
                            message:'Authentication failed'
                        },
                        success: false
                    }
                );
            }


        } else {
            response.status(401).json(
                {
                    error:{
                        code: 401,
                        message:'Authentication failed'
                    },
                    success: false
                }
            );
        }
        
    })
    .catch(err =>{
        console.log(err)
        response.status(500).json({
            error: err
        });
    });



});










router.post('/setup', (request, response, next) => {

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

});



router.post('/authenticate', (request, response, next) => {
    
    
    User.findOne({email: request.body.email}).exec()

    .then(user => {
        console.log('user'+user)
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                var JWToken = jwt.sign({email:user.email, id:user._id}, app.get('superSecret'), {expiresIn: 1440});
                
                var userJSON = user.toJSON();
                delete userJSON.password
                response.status(200).json({
                    data: {
                        user:userJSON,
                        token:JWToken
                    },
                    success: true
                });
            }
            else {
                response.status(401).json(
                    {
                        error:{
                            code: 401,
                            message:'Authentication failed'
                        },
                        success: false
                    }
                );
            }


        } else {
            response.status(401).json(
                {
                    error:{
                        code: 401,
                        message:'Authentication failed'
                    },
                    success: false
                }
            );
        }
        
    })
    .catch(err =>{
        console.log(err)
        response.status(500).json({
            error: err
        });
    });
});



router.use((request, response, next) => {

    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(request.headers.authorization.split(' ')[1], app.get('superSecret'), function(err, decoded) {
            if (err) {
                
                return response.json(
                    {  
                        message: 'Failed to authenticate token.' ,
                        success: false
                    }
                );    
            } else {
                console.log('encoded')
                // if everything is good, save to request for use in other routes
                request.decoded = decoded;    
                next();
            }

        });
    }
    else {
        // if there is no token
        // return an error
        return response.status(403).send(
            {  
                message: 'No token provided.',
                success: false
            }
        );
    }
});


router.post('/', (request, response, next) => {
    response.status(200).json({
        message:'Welcome to the GoodShepherd API'
    });
});



module.exports = router;