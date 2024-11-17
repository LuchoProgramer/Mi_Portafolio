// src/components/layout/MainLayout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
