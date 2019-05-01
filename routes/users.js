const express = require('express');


const router = express.Router();

// login route
router.get('/login', (req, res) => {
    res.render('login',{
        title: 'Login'
    });
})

// Register
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    })
})

// Register the form
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = [];

    // custom for those data
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please filled in all fileds' });
    }

    if(password !== password2){
        errors.push({msg: "Password do not match"});
    }


})

module.exports = router;

