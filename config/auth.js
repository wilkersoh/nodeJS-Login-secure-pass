module.exports = {
    // 登出后 防止对方通过url 进入
    authenticated: function(req, res, next){
        // console.log(req.isAuthenticated())  要求登录 返回 true
        if(req.isAuthenticated()){
            
            console.log('You are logged in')
            return next();
        }
        // 当通过 url会来这里，然后req.isAuthenticated是 false 它就不能在没有登入的时候通过url进入
        req.flash('error_msg', 'Please log in again')
        res.redirect('/users/login');
    }
}