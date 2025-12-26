import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import {useApp} from "@/app/contexts/Appcontext";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice } = useApp();

    const handleCheckout = () => {
        // اینجا می‌تونید لاجیک پرداخت رو اضافه کنید
        alert('در حال انتقال به صفحه پرداخت...');
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page" dir="rtl">
                <div className="empty-state">
                    <ShoppingCart size={80} />
                    <h2>سبد خرید شما خالی است</h2>
                    <p>محصولی به سبد خرید اضافه نکرده‌اید</p>
                </div>
            </div>
        );
    }

    const total = getTotalPrice();

    return (
        <div className="cart-page" dir="rtl">
            <h1 className="page-title">سبد خرید</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} />

                            <div className="cart-item-info">
                                <h3>{item.title}</h3>
                                <p className="item-price">{item.price.toFixed(2)} دلار</p>
                                <p className="item-subtotal">
                                    جمع: {(item.price * item.quantity).toFixed(2)} دلار
                                </p>
                            </div>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                    title="حذف از سبد خرید"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>خلاصه سبد خرید</h2>

                    <div className="summary-details">
                        <div className="summary-row">
                            <span>تعداد اقلام:</span>
                            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
                        </div>

                        <div className="summary-row">
                            <span>جمع جزء:</span>
                            <span>{total.toFixed(2)} دلار</span>
                        </div>

                        <div className="summary-row">
                            <span>هزینه ارسال:</span>
                            <span>رایگان</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span>جمع کل:</span>
                            <span className="total-price">{total.toFixed(2)} دلار</span>
                        </div>
                    </div>

                    <button className="checkout-btn" onClick={handleCheckout}>
                        تکمیل خرید
                    </button>

                    <p className="secure-payment">
                        🔒 پرداخت امن و محافظت شده
                    </p>
                </div>
            </div>
        </div>
    );
}