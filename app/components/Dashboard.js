import React from 'react';
import { ShoppingCart, Heart, Package, User, TrendingUp, Clock } from 'lucide-react';
import {useApp} from "@/app/contexts/Appcontext";

export default function Dashboard() {
    const { currentUser, cart, favorites, products, getTotalPrice, getTotalItems } = useApp();

    const totalSpent = getTotalPrice();
    const itemsInCart = getTotalItems();

    const stats = [
        {
            icon: ShoppingCart,
            title: 'محصولات در سبد خرید',
            value: itemsInCart,
            color: '#667eea'
        },
        {
            icon: Heart,
            title: 'محصولات مورد علاقه',
            value: favorites.length,
            color: '#ff4757'
        },
        {
            icon: Package,
            title: 'کل محصولات',
            value: products.length,
            color: '#2ed573'
        },
        {
            icon: TrendingUp,
            title: 'مجموع خرید',
            value: `${totalSpent.toFixed(2)} $`,
            color: '#ffa502'
        }
    ];

    return (
        <div className="dashboard" dir="rtl">
            <h1 className="page-title">داشبورد کاربری</h1>

            <div className="dashboard-welcome">
                <div className="welcome-icon">
                    <User size={48} />
                </div>
                <div className="welcome-text">
                    <h2>سلام {currentUser?.name}!</h2>
                    <p>به داشبورد خود خوش آمدید</p>
                </div>
            </div>

            <div className="dashboard-stats">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="stat-card">
                            <div className="stat-icon" style={{ background: stat.color }}>
                                <Icon size={32} />
                            </div>
                            <div className="stat-info">
                                <h3>{stat.value}</h3>
                                <p>{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-section">
                    <h3>
                        <User size={24} />
                        اطلاعات کاربری
                    </h3>
                    <div className="user-info-card">
                        <div className="info-row">
                            <span className="label">نام کاربری:</span>
                            <span className="value">{currentUser?.username}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">نام:</span>
                            <span className="value">{currentUser?.name}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">ایمیل:</span>
                            <span className="value">{currentUser?.email}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">وضعیت حساب:</span>
                            <span className="value status-active">فعال</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h3>
                        <Clock size={24} />
                        فعالیت اخیر
                    </h3>
                    <div className="activity-list">
                        {cart.length > 0 ? (
                            cart.slice(0, 3).map(item => (
                                <div key={item.id} className="activity-item">
                                    <div className="activity-icon">
                                        <ShoppingCart size={18} />
                                    </div>
                                    <div className="activity-text">
                                        <p>{item.title.substring(0, 40)}...</p>
                                        <span>اضافه شده به سبد خرید</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-activity">
                                <p>فعالیت اخیری وجود ندارد</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="dashboard-section quick-actions">
                <h3>دسترسی سریع</h3>
                <div className="actions-grid">
                    <button className="action-btn">
                        <ShoppingCart size={24} />
                        <span>مشاهده سبد خرید</span>
                    </button>
                    <button className="action-btn">
                        <Heart size={24} />
                        <span>علاقه‌مندی‌ها</span>
                    </button>
                    <button className="action-btn">
                        <Package size={24} />
                        <span>سفارش‌های من</span>
                    </button>
                    <button className="action-btn">
                        <User size={24} />
                        <span>ویرایش پروفایل</span>
                    </button>
                </div>
            </div>
        </div>
    );
}