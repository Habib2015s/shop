"use client";
import React, { useState } from 'react';
import { Heart, Plus, Search } from 'lucide-react';
import {useApp} from "@/app/contexts/Appcontext";

export default function Products() {
    const { products, addToCart, toggleFavorite, favorites } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const translateCategory = (cat) => {
        const translations = {
            'all': 'همه',
            'electronics': 'الکترونیک',
            'jewelery': 'جواهرات',
            "men's clothing": 'پوشاک مردانه',
            "women's clothing": 'پوشاک زنانه'
        };
        return translations[cat] || cat;
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        // می‌تونید یک نوتیفیکیشن یا پیام موفقیت نمایش بدید
    };

    return (
        <div className="products-page" dir="rtl">
            <div className="hero-section">
                <h1>به فروشگاه ما خوش آمدید</h1>
                <p>بهترین محصولات را با قیمت عالی پیدا کنید</p>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="جستجوی محصول..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={selectedCategory === cat ? 'active' : ''}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {translateCategory(cat)}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-products">
                    <p>محصولی یافت نشد</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => {
                        const isFavorite = favorites.some(fav => fav.id === product.id);
                        return (
                            <div key={product.id} className="product-card">
                                <button
                                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(product)}
                                >
                                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                                </button>

                                <div className="product-image">
                                    <img src={product.image} alt={product.title} />
                                </div>

                                <div className="product-info">
                                    <h3>{product.title}</h3>
                                    <p className="product-category">{translateCategory(product.category)}</p>
                                    <div className="product-footer">
                                        <span className="price">{product.price.toFixed(2)} دلار</span>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <Plus size={18} />
                                            افزودن
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}