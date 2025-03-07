const express = require('express');
const {getAllUsers} = require('../controllers/getusers.controllers');
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router();

router.get('/getusers', authMiddleware, getAllUsers);


module.exports = router

