const express = require('express');
const bodyParser = require('body-parser');
//const {API_VERSION} = require("./constants");
require("dotenv").config();
const app = express();

//Import routes
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const courseRoutes = require('./router/course');


//Configure body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configure Static files
app.use(express.static('uploads'));



//Configure headers HTTP - CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Configure routes
app.use(`/api/${process.env.API_VERSION}`, authRoutes);
app.use(`/api/${process.env.API_VERSION}`, userRoutes);
app.use(`/api/${process.env.API_VERSION}`, courseRoutes);



module.exports = app;