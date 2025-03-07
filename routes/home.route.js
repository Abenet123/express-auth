const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


router.get('/welcome',authMiddleware, (req, res) => {
     res.json({
        message: "welcome to home page"
     })
});

module.exports = router;