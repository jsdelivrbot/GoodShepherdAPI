const express   = require('express');
const router    = express.Router();
const jwt       = require('jsonwebtoken');
const app       = express();

var db = require('../../db.js');

var config = require('../../config'); // get our config file

app.set('superSecret', config.secret); // secret variable

const bcrypt = require('bcrypt');



const User = require('../models/user');
const Person = require('../models/person');




// Authentication Method


router.post('/signup', (request, response) => {

    var password  = bcrypt.hashSync(request.body.password, 10);

    db.none('INSERT INTO users(id, email, password, first_name, last_name)'+'VALUES($1, $2, $3, $4, $5)', [request.body.id, request.body.email, password, request.body.firstName, request.body.lastName])
    .then(function (data) {
        response.status(200).json(
            {
                data    : {message : 'User succesfully created.'},
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

});
















router.post('/login', (request, response) => {
    var email = request.body.email
    var password = request.body.password

    db.one("SELECT * FROM users WHERE email = $1", email)
    .then(function (data) {
        
        if(bcrypt.compareSync(password, data['password'])) {

            console.log('entro'); 
            var JWToken = jwt.sign({email:data['email'], id:data['id']}, app.get('superSecret'), {expiresIn: 1440});
            delete data.password
            data.token = JWToken

            response.status(200).json(
                {
                    data    : data,
                    success : true
                }   
            );

        } else {
            // Passwords don't match
            response.status(401).json(
                {
                    error   : { code : 401, message : 'Authentication failed' },
                    success : false
                }
            );
            
        }
        
    })
    .catch(function (err) {
        
        response.status(401).json(
            {
                error:{
                    code: 401,
                    message:'Authentication failed'
                },
                success: false
            }
        );
        
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