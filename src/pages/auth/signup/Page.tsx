"use client"; // 標記為客戶端組件

import React from 'react';
import SignUpForm from '../../../components/auth/signup/signupForm.tsx'; // 刪除 .tsx 擴展名

const SignupPage = () => {
    return (
        <div>
            <SignUpForm />
        </div>
    );
};

export default SignupPage;