const express = require('express');
const path = require('path');
const ejsLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')


const app = express();

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
// session 中間件 和 flash 組合
app.use(session({
    // copy from github express-session
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))

// 提醒已經做好賬號了 和setTimeout 一樣
app.use(flash())
// 全局 var 都能用
app.use((req, res, next) => {
    // flash(ejs 現實的信息)
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening PORT ${PORT} Now.`));