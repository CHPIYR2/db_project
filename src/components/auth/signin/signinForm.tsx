// SignUp.js
import React, { useState } from 'react';
import '../../../App.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('註冊資料:', formData);
    // 此處可以添加表單提交邏輯，例如 API 調用
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">登入</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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

export default SignUp;
