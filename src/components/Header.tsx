// Header.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchBar from "../components/home/searchBar.tsx";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 檢查是否有已登入的狀態（這裡假設是使用 localStorage 儲存的 token）
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // 處理登出邏輯，例如移除 token
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    window.location.href = '/'; // 回到首頁
  };

  return (
    <div className="header">
      <div className="header-title">
        <a href="/">
          Tickify 快速訂票
        </a>
      </div>
      <div className="header-links">
        <SearchBar />
        <div className="dropdown">
          <span className="dropdown-title">會員專區</span>
          <div className="dropdown-content">
            {isLoggedIn ? (
              <a href="/">首頁</a>
            ) : (
              <a href="/signin">登入</a>
            )}
            {isLoggedIn ? (
              <a href="/order">訂單查詢</a>
            ) : (
              <a href="/signup">註冊</a>
            )}
            {isLoggedIn ? (
              <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}>登出</a>
            ) : (
              <a href="/">首頁</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
