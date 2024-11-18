// src/components/Button.jsx
import React from 'react';

function Button({ children, onClick, type = 'button', className = '' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;