* bcrypt 密码加密
  
``` javascript
    // 两个参数
  genSalt(10, (err, salt) => {
    // hash 3个参数 | (err, hash) 是生成加密后的密码
    bcrypt.hash(密码, salt, (err, hash)) 
  })
```
1. 10 是 定义加密密码计算强度
2. genSalt 设置加强 然后使用hash 进行加密 
3. hash 接受3个参数

``` javascript
// 设置 hash 去 instanceFromDataBase.password
// 对他进行 save 
instanceFromDataBase.save()
// 通知 成功 使用 插件 flash
  
```
* 使用中間件 flash 然後成功做id后 出現提示 像 setTimeout一樣
* express-session 和flash 同時使用
1. 中間件 flash需要用 next()， 不然他會一直卡這在那裏的函數 不會去結束
2. 如果沒有session 中間件 flash 不能使用
3. session 必須在flash中間件上面


* ejs 假如沒有這個信息的話 就不顯示 需要這樣寫

``` javascript
// 不能夠<% if(success_msg){ %>罷了 那樣他還是會顯示空間 但是沒有裏面資料
<% if(success_msg != ''){ %>
```

* passport 去 config folder裏查看