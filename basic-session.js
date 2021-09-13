// https://www.codexpedia.com/node-js/a-very-basic-session-auth-in-node-js-with-express-js/

const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 3333

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
 
// 過濾未登入的操作
var requireLogin = function(req, res, next) {
  if (req.session && req.session.isLogin)
    return next();
  else
    return res.sendStatus(401);
};
 
// 登入
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    return res.json({
      ok: false,
      message: '缺資料'
    })
    // res.send('login failed');
  } else if(req.query.username === "user" || req.query.password === "pass") {
    req.session.userId = 9527;
    req.session.isLogin = true;
    return res.json({
      ok: true,
      userId: 9527
    })
    // res.send("login success!");
  }
});
 
// 登出
app.get('/logout', function (req, res) {
  req.session.destroy();
  return res.json({
    ok: true,
    message: '已登出'
  })
  // res.send("logout success!");
});
 
// 確認登入狀態
app.get('/is_login', requireLogin, function (req, res) {
  msg = req.session.isLogin ? "已登入" : "未登入"
  return res.json({
    ok: true,
    message: msg
  })
});
 
app.listen(PORT);
console.log(`app running at http://localhost:${PORT}`);