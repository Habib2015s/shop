"use client";
import React, { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Products from './components/Products';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import Favorites from './components/Favorites';
import './globals.css';
import {AppProvider, useApp} from "@/app/contexts/Appcontext";

function MainApp() {
    const { currentUser } = useApp();
    const [currentPage, setCurrentPage] = useState('products');

    if (!currentUser) {
        return <Login onLoginSuccess={() => setCurrentPage('products')} />;
    }

    return (
        <div className="app">
            <Header onNavigate={setCurrentPage} currentPage={currentPage} />
            <main>
                {currentPage === 'products' && <Products />}
                {currentPage === 'cart' && <Cart />}
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'favorites' && <Favorites />}
            </main>
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <MainApp />
        </AppProvider>
    );
}