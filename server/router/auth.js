const express = require('express');
const multiparty = require('connect-multiparty');
const AuthController = require('../controllers/auth');
const api = express.Router();

api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refreshAccessToken", AuthController.refreshToken);

module.exports = api;
