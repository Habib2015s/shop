"use client";
import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, Home, Package, Heart, Menu, X } from 'lucide-react';
import {useApp} from "@/app/contexts/Appcontext";

export default function Header({ onNavigate, currentPage }) {
    const { cart, logout, getTotalItems } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        if (window.confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
            logout();
        }
    };

    const navigate = (page) => {
        if (onNavigate) {
            onNavigate(page);
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="header" dir="rtl">
                <div className="header-content">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    <div className="logo" onClick={() => navigate('products')}>
                        <ShoppingCart size={28} />
                        <span>فروشگاه آنلاین</span>
                    </div>

                    <nav className="nav-desktop">
                        <button
                            className={currentPage === 'products' ? 'active' : ''}
                            onClick={() => navigate('products')}
                        >
                            <Home size={20} />
                            خانه
                        </button>
                        <button
                            className={currentPage === 'dashboard' ? 'active' : ''}
                            onClick={() => navigate('dashboard')}
                        >
                            <User size={20} />
                            داشبورد
                        </button>
                        <button
                            className={currentPage === 'favorites' ? 'active' : ''}
                            onClick={() => navigate('favorites')}
                        >
                            <Heart size={20} />
                            علاقه‌مندی‌ها
                        </button>
                    </nav>

                    <div className="header-actions">
                        <button
                            className="cart-btn"
                            onClick={() => navigate('cart')}
                        >
                            <ShoppingCart size={22} />
                            {getTotalItems() > 0 && (
                                <span className="cart-badge">{getTotalItems()}</span>
                            )}
                        </button>
                        <button className="logout-btn" onClick={handleLogout}>
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-menu-header">
                            <h2>منو</h2>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="mobile-nav">
                            <button
                                className={currentPage === 'products' ? 'active' : ''}
                                onClick={() => navigate('products')}
                            >
                                <Home size={20} />
                                خانه
                            </button>
                            <button
                                className={currentPage === 'dashboard' ? 'active' : ''}
                                onClick={() => navigate('dashboard')}
                            >
                                <User size={20} />
                                داشبورد
                            </button>
                            <button
                                className={currentPage === 'cart' ? 'active' : ''}
                                onClick={() => navigate('cart')}
                            >
                                <ShoppingCart size={20} />
                                سبد خرید
                            </button>
                            <button
                                className={currentPage === 'favorites' ? 'active' : ''}
                                onClick={() => navigate('favorites')}
                            >
                                <Heart size={20} />
                                علاقه‌مندی‌ها
                            </button>
                            <button onClick={handleLogout}>
                                <LogOut size={20} />
                                خروج
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}