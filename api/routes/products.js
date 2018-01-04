const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message:'Products were fetched'
    });
});

router.post('/', (request, response, next) => {
    const product = {
        name: request.body.name,
        price: request.body.price
    };
    response.status(201).json({
        message:'Product was created',
        createdProduct: product
    });
});

router.get('/:productID', (request, response, next) => {
    const id = request.params.productID;
    if (id === 'special') {
        response.status(200).json({
            message:'You discovered the special ID',
            id: id
        });
    }
    else {
        response.status(200).json({
            message: 'You passed an ID'
        });
    }
    
});

router.patch('/:productID', (request, response, next) => {
    response.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productID', (request, response, next) => {
    response.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;