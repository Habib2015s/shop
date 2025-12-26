"use client";
import React, { useState } from 'react';
import {useApp} from "@/app/contexts/Appcontext";

export default function Login({ onLoginSuccess }) {
    const { login } = useApp();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('لطفا تمام فیلدها را پر کنید');
            return;
        }

        if (login(username, password)) {
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } else {
            setError('نام کاربری یا رمز عبور اشتباه است');
        }
    };

    return (
        <div className="login-page" dir="rtl">
            <div className="login-decoration"></div>
            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-title">فروشگاه آنلاین</h1>
                    <p className="login-subtitle">
                        {isSignup ? 'حساب کاربری جدید بسازید' : 'به حساب خود وارد شوید'}
                    </p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>نام کاربری</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="نام کاربری خود را وارد کنید"
                            />
                        </div>

                        <div className="form-group">
                            <label>رمز عبور</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="رمز عبور خود را وارد کنید"
                            />
                        </div>

                        {isSignup && (
                            <div className="form-group">
                                <label>تکرار رمز عبور</label>
                                <input
                                    type="password"
                                    placeholder="رمز عبور را دوباره وارد کنید"
                                />
                            </div>
                        )}

                        <button type="submit" className="login-btn">
                            {isSignup ? 'ثبت نام' : 'ورود'}
                        </button>
                    </form>

                    <p className="toggle-auth">
                        {isSignup ? 'قبلا ثبت نام کرده‌اید؟' : 'حساب کاربری ندارید؟'}
                        <button onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? 'وارد شوید' : 'ثبت نام کنید'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}