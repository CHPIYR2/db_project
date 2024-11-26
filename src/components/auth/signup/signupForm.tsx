// SignUp.js
import React, { useState } from 'react';
import '../../../App.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('註冊資料:', formData);
    // 此處可以添加表單提交邏輯，例如 API 調用
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">註冊</h1>
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          下一步 →
        </button>
        <div className="signin-link">
          已有帳號？ <a href="#sign-in">登入</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
