const express = require('express');
const router = express.Router();
const { authenticated } = require('../config/auth');

router.get('/', (req, res) => {
    res.render('welcome')
})

router.get('/dashboard', authenticated, (req, res) => {
    res.render('dashboard', {
        // 是进入 database里的资料
        name: req.user.name
    });
})

module.exports = router;