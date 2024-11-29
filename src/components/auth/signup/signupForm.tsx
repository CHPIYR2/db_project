// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${apiUrl}/signup`, formData);
      setSuccess(response.data.message);
      setError('');
      
      // 顯示提示字樣
      const successMessage = document.createElement('div');
      successMessage.innerText = '註冊成功';
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
        window.location.href = '/signin'; // 跳轉回首頁
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || '註冊失敗，請再試一次');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">註冊</h1>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
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
        <input
          type="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          下一步 →
        </button>
        <div className="signin-link">
          已有帳號？ <a href="/signin">登入</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
