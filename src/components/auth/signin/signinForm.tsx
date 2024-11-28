import React, { useState } from 'react';
import '../../../App.css';
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/signin', formData);
      console.log('登入成功:', response.data);

      // 儲存登入 token 到 localStorage
      localStorage.setItem('authToken', response.data.token);

      // 顯示提示字樣
      const successMessage = document.createElement('div');
      successMessage.innerText = '登入成功';
      successMessage.style.position = 'fixed';
      successMessage.style.bottom = '20px';
      successMessage.style.right = '20px';
      successMessage.style.backgroundColor = 'green';
      successMessage.style.color = 'white';
      successMessage.style.padding = '10px';
      successMessage.style.borderRadius = '5px';
      document.body.appendChild(successMessage);

      // 3秒後移除提示字樣並跳轉回首頁
      setTimeout(() => {
        document.body.removeChild(successMessage);
        window.location.href = '/'; // 跳轉回首頁
      }, 1000);
    } catch (err) {
      console.error('登入錯誤:', err);
      setError(err.response?.data?.message || '登入失敗，請再試一次');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">登入</h1>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="用戶名"
          value={formData.username}
          onChange={handleChange}
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          下一步 →
        </button>
        <div className="signin-link">
          沒有帳號？ <a href="/signup">註冊</a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
