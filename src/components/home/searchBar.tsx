import React, { useState } from 'react';
import '../../App.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // 使用 window.location.href 來刷新頁面並導航到目標頁面
            window.location.href = `/search=${searchTerm}`;
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="請輸入活動名稱 (按ENTER開始查詢)"
                className="text-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default SearchBar;
