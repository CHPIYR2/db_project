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

  // 驗證錯誤訊息狀態
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // 驗證使用者名稱
  const validateUsername = (username) => {
    if (username.length < 3) {
      return '使用者名稱至少需要3個字符';
    }
    if (username.length > 15) {
      return '使用者名稱不能超過15個字符';
    }
    // 只允許英文字母、數字和底線
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return '使用者名稱只能包含英文字母、數字和底線';
    }
    return '';
  };

  // 驗證密碼
  const validatePassword = (password) => {
    if (password.length < 8) {
      return '密碼至少需要8個字符';
    }
    if (password.length > 20) {
      return '密碼不能超過20個字符';
    }
    // 要求包含至少一個大寫字母、一個小寫字母、一個數字和一個特殊字符
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      return '密碼必須包含至少一個大寫字母、一個小寫字母、一個數字和一個特殊字符';
    }
    return '';
  };

  // 驗證電話號碼
  const validatePhone = (phone) => {
    // 移除所有空格和破折號
    const cleanPhone = phone.replace(/[\s-]/g, '');
    // 台灣手機號碼格式（09開頭後接8位數字）
    if (!/^09\d{8}$/.test(cleanPhone)) {
      return '請輸入有效的台灣手機號碼（格式：09xxxxxxxx）';
    }
    return '';
  };

  // 處理輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // 即時驗證
    let error = '';
    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      default:
        break;
    }

    setValidationErrors({
      ...validationErrors,
      [name]: error
    });
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 進行所有欄位的驗證
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const phoneError = validatePhone(formData.phone);

    // 更新驗證錯誤狀態
    setValidationErrors({
      username: usernameError,
      password: passwordError,
      phone: phoneError
    });

    // 如果有任何驗證錯誤，阻止提交
    if (usernameError || passwordError || phoneError) {
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/signup`, formData);
      setSuccess(response.data.message);
      //setError('');
      
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
        {validationErrors.username && (
            <p className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
              {validationErrors.username}
            </p>
          )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
        />
        {validationErrors.password && (
            <p className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
              {validationErrors.password}
            </p>
          )}
        <input
          type="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="signup-input"
        />
        {validationErrors.phone && (
            <p className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
              {validationErrors.phone}
            </p>
          )}
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
