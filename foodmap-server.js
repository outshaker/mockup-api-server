// https://www.codexpedia.com/node-js/a-very-basic-session-auth-in-node-js-with-express-js/

// const express = require('express')
// const session = require('express-session')
// const app = express()
// const PORT = 3333

const jsonServer = require('json-server')
const session = require('express-session')
const app = jsonServer.create()
const router = jsonServer.router('foodmap-db.json')
const middlewares = jsonServer.defaults()

const db = router.db
const PORT = 3310 || process.env.PORT

app.use(middlewares)
app.use(jsonServer.bodyParser)
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}))
 
// 過濾未登入的操作
const requireLogin = function(req, res, next) {
  if (req.session && req.session.isLogin)
    return next()
  else
    return res.sendStatus(401)
}

// 註冊
app.post('/register', (req, res) => {
  const { username, email, password, password2 } = req.body
  if (!username || !email || !password || !password2) {
    res.status(400)
    return res.json({
      ok: false,
      message: '缺資料'
    })
  }

  const user = db.get('users').find({ username }).value()
  if (user) {
    res.status(500)
    return res.json({
      ok: false,
      message: '此帳號已註冊'
    })
  }

  if (password !== password2) {
    res.status(400)
    return res.json({
      ok: false,
      message: '密碼不一致，請重新輸入'
    })
  }

  const userId = Math.random().toString('16').replace('.', '')
  // TODO: userId 自動遞增
  
  const dateString = new Date().toISOString()
  const insertData = {
    id: userId, 
    username,
    nickname: username,
    password,
    email,
    user_level: 1,
    picture_url:'https://img.foodmap.com/default_avatar.png',
    background_pic_url:'https://img.foodmap.com/default_cover.png',
    createdAt: dateString,
    updatedAt: dateString
  }

  db.get('users')
    .push(insertData)
    .write()

  res.json({
    ok: true,
    user: insertData
  })
})

// 登入
app.post('/login', function (req, res) {
  const username = req.query.username
  const password = req.query.password
  if (!username || !password) {
    res.status(400)
    return res.json({
      ok: false,
      message: '缺資料'
    })
    // res.send('login failed');
  }

  const user = db.get('users')
    .find({ username, password })
    .value()

  if (!user) {
    res.status(400)
    return res.json(user)
  }
  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.isLogin = true;

  return res.json({
    ok: true,
    user
  })
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

// 顯示目前 session 狀態
app.get('/me', requireLogin, function (req, res) {
  const { userId, username } = req.session
  return res.json({
    ok: true,
    userId,
    username
  })
});

app.listen(PORT);
console.log(`app running at http://localhost:${PORT}`);