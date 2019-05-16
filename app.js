const express = require('express');
const path = require('path');
const ejsLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')


const app = express();

// Passport 的 资料
require('./config/passport')(passport)

// mongoose
mongoose.connect(
    'mongodb://localhost:27017/loginpage', {
    useNewUrlParser: true},
    (err) => {
        if(err){console.log("Failed to connected db")}
        else{console.log("Connect the Database")}
})

// EJS
app.use(ejsLayout);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// session 中間件 和 flash 組合 * 必須在flash中間件上面
app.use(session({
    // copy from github express-session
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
//  copy from passport documentary middleware
app.use(passport.initialize());
app.use(passport.session());

// 提醒已經做好賬號了 和setTimeout 一樣
app.use(flash())
// 全局  都能用这个flash
app.use((req, res, next) => {
    // flash(ejs 現實的信息)
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening PORT ${PORT} Now.`));

