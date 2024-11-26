// Header.js
import React from 'react';
import '../App.css';
import SearchBar from "../components/home/searchBar";

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
        <a href="/signup">註冊</a>
      </div>
    </div>
  );
};

export default Header;
