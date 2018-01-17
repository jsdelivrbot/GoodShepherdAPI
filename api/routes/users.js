const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/setup', (request, response, next) => {

    var luis = new User({
        username : 'Luis',
        password : 'master',
        admin : true
    });

    luis.save()
    .then(result => {
        console.log(result);
        response.status(201).json({
            success: true,
            message:'The admin has been created',
            data : luis
        });
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({
            success: false,
            message: err
        });
    });

});

router.get('/', (request, response, next) => {
    User.find().exec()
    .then(docs => {
        console.log(docs)
        response.status(200).json({
            success: true,
            message:'Users has been fetched',
            data : docs
        });
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({
            success: false,
            message: err
        });
    });

   
});

module.exports = router;