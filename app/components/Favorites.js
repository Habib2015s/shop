import React from 'react';
import { Heart, Plus, Trash2 } from 'lucide-react';
import {useApp} from "@/app/contexts/Appcontext";

export default function Favorites() {
    const { favorites, addToCart, toggleFavorite } = useApp();

    const translateCategory = (cat) => {
        const translations = {
            'electronics': 'الکترونیک',
            'jewelery': 'جواهرات',
            "men's clothing": 'پوشاک مردانه',
            "women's clothing": 'پوشاک زنانه'
        };
        return translations[cat] || cat;
    };

    if (favorites.length === 0) {
        return (
            <div className="favorites-page" dir="rtl">
                <div className="empty-state">
                    <Heart size={80} />
                    <h2>لیست علاقه‌مندی‌های شما خالی است</h2>
                    <p>محصولی به لیست علاقه‌مندی‌ها اضافه نکرده‌اید</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page" dir="rtl">
            <h1 className="page-title">علاقه‌مندی‌ها</h1>
            <p className="page-subtitle">
                شما {favorites.length} محصول در لیست علاقه‌مندی‌ها دارید
            </p>

            <div className="products-grid">
                {favorites.map(product => (
                    <div key={product.id} className="product-card">
                        <button
                            className="favorite-btn active"
                            onClick={() => toggleFavorite(product)}
                            title="حذف از علاقه‌مندی‌ها"
                        >
                            <Heart size={20} fill="currentColor" />
                        </button>

                        <div className="product-image">
                            <img src={product.image} alt={product.title} />
                        </div>

                        <div className="product-info">
                            <h3>{product.title}</h3>
                            <p className="product-category">{translateCategory(product.category)}</p>

                            <div className="product-rating">
                                {product.rating && (
                                    <div className="rating">
                                        <span className="stars">⭐</span>
                                        <span>{product.rating.rate}</span>
                                        <span className="count">({product.rating.count})</span>
                                    </div>
                                )}
                            </div>

                            <div className="product-footer">
                                <span className="price">{product.price.toFixed(2)} دلار</span>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    <Plus size={18} />
                                    افزودن به سبد
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}