const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// 連接數據model
const User = require('../models/User')

module.exports = function(passport){
    // 密碼 當作中間件 去使用 localStrategy
    passport.use(
        // cb接受3個參數 | 檢查email 如果有username的話 也能說通過username
        // usernameField 是固定有的 另外一个是 passwordField 
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            // 對比 model 裏的密碼
            User.findOne({
                // email true的話 就會放回 那個整組user資料
                email: email
            })
            .then(user => {
                if(!user){
                    // 沒有的話 就是 email 還沒被使用
                    return done(null, false, { message: ' Email is NOT registered' })
                } 

                // compare(密碼， 已經被加密的密碼)
                bcrypt.compare(password, user.password, (err, match) => {
                    if(err) throw err;

                    if(match){
                        // 現在密碼 和 被加密的密碼 相同 就反回 user
                        return done(null, user);
                    } else {
                        // 密碼 不對的話 就熬 false 然後send一個信息過去
                        return done(null, false, {message: 'Password incorrect'})
                    }
                })
            }).catch(e => console.err(e));
        })
    )
    // Copy from passport documentary
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
            done(err, user);
        });
    });   
}