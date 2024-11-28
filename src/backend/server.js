// server.js
const express = require('express');
const sql = require('mssql');
const app = express();
const port = 5000;

require('dotenv').config();  // 讀取 .env 文件中的變數

const dbConfig = {
    user: process.env.DB_USER,               // 從環境變數中讀取資料庫使用者名稱
    password: process.env.DB_PASSWORD,       // 從環境變數中讀取資料庫密碼
    server: process.env.DB_SERVER,           // 從環境變數中讀取伺服器名稱
    database: process.env.DB_DATABASE,       // 從環境變數中讀取資料庫名稱
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',   // 將字串 'true' 轉換為布林值
      trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true' // 同樣轉換
    }
  };

  
// 連接到資料庫
sql.connect(dbConfig).catch(err => console.error('資料庫連接失敗:', err));

// 使用 JSON 格式來處理請求
app.use(express.json());

// 獲取所有票券的 API
app.get('/api/tickets', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM ticket');
    res.json(result.recordset);
  } catch (err) {
    console.error('獲取票券失敗:', err);
    res.status(500).send('伺服器錯誤');
  }
});

// 獲取所有用戶的 API
app.get('/api/users', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM users');
    res.json(result.recordset);
  } catch (err) {
    console.error('獲取用戶失敗:', err);
    res.status(500).send('伺服器錯誤');
  }
});

// 獲取所有活動的 API
app.get('/api/activities', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM activity');
    res.json(result.recordset);
  } catch (err) {
    console.error('獲取活動失敗:', err);
    res.status(500).send('伺服器錯誤');
  }
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器運行於 http://localhost:${port}`);
});
