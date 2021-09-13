# Mockup API server

給前端測試的 mockup  API server，可以在本地端建立一個模擬 API 的測試環境。
相關規格請參照[APIspec.md](APIspec.md)

Fork from [lidemy-student-json-api-server](https://github.com/Lidemy/lidemy-student-json-api-server)

使用 `express-session` 實作身分認證

## 安裝文件

```sh
cd <DIR> # 切換到目標路徑
git clone https://github.com/outshaker/mockup-api-server.git # 複製 repo 到本地端
cd mockup-api-server/ # 切換到該資料夾
git checkout dev-login # 切換到 dev-login 分支
npm install # 安裝相依套件
node basic-session.js # 啟動測試伺服器
```

