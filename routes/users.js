const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// mongoose model
const User = require('../models/User');
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
    // register 时出现错误的话 显示通知
    const { name, email, password, password2 } = req.body
    let errors = [];

    // custom for those data
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please filled in all fileds' });
    }

    if(password !== password2){
        errors.push({msg: "Password do not match"});
    }

    if(password.length < 8){
        errors.push({msg: 'Please provide longer than 8 password'});
    }

    if(errors.length > 0){
        res.render('register', {
            // popup errors 的 DOM
            errors,
            // render 回去 input里
            name,
            email,
            password,
            password2
        })
    } else {
        // 没有错误但查看有没有重叠的email | Validation
        User.findOne({email: email})
          .then(user => {
            if(user){
                // push to errors
                errors.push({msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                // 创建 新用户资料
                const newUser = new User({
                    name,
                    email,
                    password
                });
                // 加密加盐 密码
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    // hash 是加密后生成的密码来的
                    newUser.password = hash

                    // save 下来
                    newUser.save()
                      .then(() => {
                          req.flash('success_msg', 'You are now registered.')
                          /** 不能使用render去 那樣的話 資料會save 但是頁面 不會轉跳去login page */
                          // res.render('/users/login')
                          res.redirect('/users/login');
                      })
                }))
            }
        })
    }

});

// Login | check documentary!!!
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        // 成功的话去这里
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        // badRequestMessage: 'Failed to Log in',
        failureFlash: true
    })(req, res, next)
})

// logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;

