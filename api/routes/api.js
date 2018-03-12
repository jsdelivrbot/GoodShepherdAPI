const express   = require('express');
const router    = express.Router();
const jwt       = require('jsonwebtoken');
const app       = express();

var db = require('../../db.js');
var config = require('../../config'); // get our config file

app.set('superSecret', config.secret); // secret variable
const bcrypt = require('bcrypt');



// Authentication Method


router.post('/signup', (request, response) => {

    var password  = bcrypt.hashSync(request.body.password, 10);

    db.none('INSERT INTO users(email, password, first_given_name, second_given_name, first_surname, second_surname)'+'VALUES($1, $2, $3, $4, $5, $6)', [request.body.email, password, request.body.first_given_name, request.body.second_given_name, request.body.first_surname, request.body.second_surname])
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

    var email = "lpramirez2413@gmail.com"
    var password = "master"
    var firstName = "Luis"
    var lastName = "Perez"

    var hashedPassword  = bcrypt.hashSync(password, 10);

    db.none('INSERT INTO users(email, password, first_name, last_name)'+'VALUES($1, $2, $3, $4, $5)', [email, hashedPassword, firstName, lastName])
    .then(function (data) {
        response.status(200).json(
            {
                data    : {message : 'Default User succesfully created.'},
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







router.use((request, response, next) => {

    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(request.headers.authorization.split(' ')[1], app.get('superSecret'), function(err, decoded) {
            if (err) {
                
                return response.json(
                    {  
                        message: 'Failed to authenticate token' ,
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