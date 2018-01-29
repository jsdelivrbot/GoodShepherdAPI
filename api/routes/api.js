const express = require('express');
const jwt = require('jsonwebtoken');
var config = require('../../config'); // get our config file
const app = express();
app.set('superSecret', config.secret); // secret variable

const bcrypt = require('bcrypt');


const router = express.Router();
const User = require('../models/user');

router.get('/', (request, response, next) => {
    response.status(200).json({
        message:'Welcome to the GoodShepherd API'
    });
});

router.post('/authenticate', (request, response, next) => {
    
    User.findOne({
        username: request.body.username
      }).exec()
    .then(user => {
        
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                
                const payload = {
                    admin: user.admin 
                };
                
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440 // minutes (ej expires in 24 hours)
                });
                // return the information including token as JSON
                var userJSON = user.toJSON();
                delete userJSON.password
                response.status(200).json({
                    data: {
                        user:userJSON,
                        token:token
                    }
                });
            }
            else {

            }


        } else {
            response.status(401).json(
                {
                    message:'Authentication failed'
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

    /*
    User.findOne({
        name: request.body.username
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
          response.status(401).json({
              success: false, 
              message: 'Authentication failed. User not found.'
            });
          
        } 
        else if (user) {
            // check if password matches
            if (user.password != request.body.password) {
                response.json({ 
                    success: false, 
                    message: 'Authentication failed. Wrong password.'
                });
            } else {    
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin 
                };
                
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresInMinutes: 1440 // minutes (ej expires in 24 hours)
                });
          
                // return the information including token as JSON
                response.status(201).json({
                    message:'Enjoy your token!',
                    token: token
                });
            }   
        }
    });
    */
});









module.exports = router;