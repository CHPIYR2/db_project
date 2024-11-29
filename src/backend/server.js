// server.js - Node.js Express API
const express = require('express');
const sql = require('mssql');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000'
  }));

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

// 使用中介軟體
app.use(express.json());
app.use(cookieParser());

// 登入 API
app.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '請提供用戶名和密碼' });
  }

  try {
    // 查詢資料庫中的使用者
    const result = await sql.query`SELECT * FROM users WHERE username = ${username}`;
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: '用戶名或密碼錯誤' });
    }

    const user = result.recordset[0];

    // 比對密碼
    if (!(user.password == password)) {
    return res.status(401).json({ message: '密碼錯誤' });
    }

    // 登入成功，設置 cookie
    res.cookie('userId', user.id, { httpOnly: true });
    return res.status(200).json({ message: '登入成功', userId: user.id });
  } catch (err) {
    console.error('伺服器錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// 註冊 API
app.post('/api/signup', async (req, res) => {
    const { username, password, phone } = req.body;
  
    if (!username || !password || !phone) {
      return res.status(400).json({ message: '請提供用戶名、密碼和電話' });
    }
  
    try {
      // 檢查用戶名是否已存在
      const existingUser = await sql.query`SELECT * FROM users WHERE username = ${username}`;
      if (existingUser.recordset.length > 0) {
        return res.status(409).json({ message: '用戶名已存在' });
      }
  
      // 插入新的使用者資料到資料庫
      await sql.query`INSERT INTO users (username, password, phone) VALUES (${username}, ${password}, ${phone})`;
  
      return res.status(201).json({ message: '註冊成功' });
    } catch (err) {
      console.error('伺服器錯誤:', err);
      res.status(500).json({ message: '伺服器錯誤' });
    }
  });

// 新增票券的 API
app.post('/api/tickets', async (req, res) => {
  const { activity_id, seat, user_id } = req.body;

  // 驗證請求的必要資料
  if (!activity_id || !seat || !user_id) {
      return res.status(400).json({ message: '請提供活動 ID、座位資訊和使用者 ID' });
  }

  try {
      // 插入新的票券資料到 ticket 表中
      const result = await sql.query`
          INSERT INTO ticket (activity_id, seat, user_id) 
          VALUES (${activity_id}, ${seat}, ${user_id});
          SELECT SCOPE_IDENTITY() AS ticket_id;`;

      // 返回新增的票券 ID
      return res.status(201).json({ 
          message: '票券新增成功', 
          ticket_id: result.recordset[0]?.ticket_id || null 
      });
  } catch (err) {
      console.error('新增票券失敗:', err);
      res.status(500).json({ message: '伺服器錯誤' });
  }
});

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

// 獲取所有活動的 API
app.get('/api/area', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM area');
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
