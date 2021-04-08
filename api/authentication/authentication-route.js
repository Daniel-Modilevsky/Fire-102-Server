const express = require('express');
const logger = require('../../lib/logs');
const router = express.Router();
const upload = require('../../lib/images');

const {checkEmail, signup, login, logout} = require('./authentication-controller');

router.post('/api/authentication/signup' , checkEmail,  upload.single('image') ,signup);
router.post('/api/authentication/login', login);
router.post('/api/authentication/logout', logout);

module.exports = router; 


