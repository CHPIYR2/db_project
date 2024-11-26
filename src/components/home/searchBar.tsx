// SignUp.js
import React, { useState } from 'react';
import '../../App.css';

const SearchBar = () => {
    return (
        <div>
            <input
            type="text"
            placeholder="請輸入活動名稱"
            className="text-input"
            />
        </div>
    );
};

export default SearchBar;