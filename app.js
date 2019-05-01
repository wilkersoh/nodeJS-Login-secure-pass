const express = require('express');
const path = require('path');
const ejsLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');


const app = express();

// mongoose
mongoose.connect(
    'mongodb://localhost:27017/logins', {
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


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening PORT ${PORT} Now.`));