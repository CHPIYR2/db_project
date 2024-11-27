"use client"; // 標記為客戶端組件

import React from 'react';
import SigninForm from '../../../components/auth/signin/signinForm.tsx'; // 刪除 .tsx 擴展名

const SignupPage = () => {
    return (
        <div>
            <SigninForm />
        </div>
    );
};

export default SignupPage;