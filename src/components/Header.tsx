// Header.js
import React from 'react';
import '../App.css';
import SearchBar from "../components/home/searchBar.tsx";

const Header = () => {
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
            <a href="/signin">登入</a>
            <a href="/signup">註冊</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
