const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Fetched products'
    });
});

router.post('/', (req, res, next) => {
    //const product = {
    //    name: req.body.name,
    //    price: req.body.price
    //};

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'Product created',
        productCreated: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    //if(id === 'special'){
    //    res.status(200).json({
    //        message: 'You won a prize!!',
    //        id: id
    //    });
    //} else {
    //    res.status(200).json({
    //        message: 'You passed an ID'
    //    });
    //}
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});

// update product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Updated product',
        id: id
    });
});

// delete product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Deleted product',
        id: id
    });
});

module.exports = router;