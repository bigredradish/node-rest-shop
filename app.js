// dependences
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routing
const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');

// logging
app.use(morgan('dev'));

// what inputs to parse
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next(); // to be able to move on to the routes
});

// forward anything that starts in url with /products to routes->products.js as defined above
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// path from mongodb atlas online
mongoose.connect('mongodb+srv://mongoDave:'+ process.env.MONGO_ATLAS_PW + '@radish-patch-lrixa.mongodb.net/test?retryWrites=true',{useNewUrlParser: true});

// if you get here - something went wrong - give error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500); // return the error status or 500 if none set
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;