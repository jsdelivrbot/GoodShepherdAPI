const express = require('express');
const router = express.Router();
const Product = require('../models/product');



// GET

router.get('/', (request, response, next) => {
    Product.find().exec()
    .then(docs => {
        console.log(docs)
        response.status(200).json(docs);
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({
            error: err
        });
    });
});



router.get('/:productID', (request, response, next) => {
    const id = request.params.productID;
    Product.findById(id).exec()
    .then(doc => {
        console.log(doc)
        if (doc) {
            response.status(200).json(doc);
        } else {
            response.status(404).json({message:'No valid entry found for provided ID'});
        }
        
    })
    .catch(err =>{
        console.log(err)
        response.status(500).json({
            error: err
        });
    });
    
});




// POST

router.post('/', (request, response, next) => {
    const product = new Product({
        name: request.body.name,
        price: request.body.price
    });
    product.save()
    .then(result => {
        console.log(result);
        response.status(201).json({
            message:'Product was created',
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({
            error: err
        });
    });
});





// PATCH

router.patch('/:productID', (request, response, next) => {
    const id = request.params.productID;
    const updateOps = {};
    for (const ops of request.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id : id }, { $set : updateOps }).exec()
    .then(result => {
        console.log(result);
        response.status(200).json(result);
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({
            error: err
        });
    });
    
});





router.delete('/:productID', (request, response, next) => {
    const id = request.params.productID;
    Product.remove({_id: id}).exec()
    .then(result => {
        response.status(200).json(result);
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({
            error: err
        });
    });
});

module.exports = router;