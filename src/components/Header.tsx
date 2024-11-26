// Header.js
import React from 'react';
import '../App.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">
        <a href="/">
        <span className="app-name">Tickify</span> 快速訂票
        </a>
      </div>
      <div className="header-links">
        <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Header;
