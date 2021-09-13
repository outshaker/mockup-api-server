# API Spec on Mockup Server

## API 格式
- 路由 / 路徑
- 參數
- 回傳值
- 錯誤訊息
- 狀態碼
- 額外功能描述 (補充)

---
`*` 代表需要登入狀態下才能執行的 API

## 會員

- 註冊
參數: username, email, password, password2
OK | error

- 登入
參數: id_text, password
=> {user}

- *登出
OK | error

- *修改個人資訊 #Later
參數: avatar, banner, user_name
OK | error

- *禁用使用者 #Later
參數: user_id
OK | error

## 食記

- *取得食記
參數: post_id
=> {post}

- *新增食記
參數: title, content, post_date, images, place_id
OK | error
=> {post}

- *編輯食記
參數: post_id, title, content, post_date, images, place_id
OK | error

- *刪除食記
參數: post_id

## 其他 (未定)

以下 API 沒有經過 express server，如果有需要要透過 express 呼叫的話再跟 six 說一下

- 搜尋餐廳
參數: keyword
=> [{restaurant}...]

- 好手氣
參數: address
=> {restaurant}

- 上傳照片
參數: <file>
=> <img_url>
