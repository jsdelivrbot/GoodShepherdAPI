const express   = require('express');
const router    = express.Router();

router.post('/', (request, response, next) => {
    response.status(200).json({
        message:'This is the GoodShepherd API, authenticate to start using it'
    });
});

router.get('/', (request, response, next) => {
    response.status(200).json({
        message:'This is the GoodShepherd API, authenticate to start using it'
    });
});

router.put('/', (request, response, next) => {
    response.status(200).json({
        message:'This is the GoodShepherd API, authenticate to start using it'
    });
});

router.delete('/', (request, response, next) => {
    response.status(200).json({
        message:'This is the GoodShepherd API, authenticate to start using it'
    });
});



module.exports = router;