// src/components/Header.js
import React, { useState } from 'react';
import ToggleDarkMode from '../../ToggleDarkMode';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-primary-dark text-white p-4 fixed w-full z-20 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo / Título */}
                <Link
                    to="/"
                    className="font-mono bg-gray-800 px-3 py-1 rounded text-lg flex items-center"
                    aria-label="Inicio"
                >
                    {'<Luis_Viteri />'}
                    <span className="ml-1 w-1 h-5 bg-white animate-pulse"></span>
                </Link>

                {/* Toggle Dark Mode en dispositivos grandes */}
                <div className="hidden md:block">
                    <ToggleDarkMode />
                </div>

                {/* Botón de Menú para Móviles */}
                <button
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                    aria-expanded={isOpen}
                    aria-controls="navigation-menu"
                    className="md:hidden focus:outline-none"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Menú de Navegación */}
                <nav
                    id="navigation-menu"
                    className={`${isOpen ? 'block' : 'hidden'
                        } absolute top-full left-0 w-full bg-primary-dark md:static md:block md:w-auto`}
                    aria-label="Menú principal"
                >
                    <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0">
                        <li>
                            <Link
                                to="/#home"
                                className="block px-4 py-2 text-white hover:text-primary-light transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/#projects"
                                className="block px-4 py-2 text-white hover:text-primary-light transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Proyectos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/#about"
                                className="block px-4 py-2 text-white hover:text-primary-light transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Sobre mí
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/#contact"
                                className="block px-4 py-2 text-white hover:text-primary-light transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Contacto
                            </Link>
                        </li>
                        {/* Enlace al Blog */}
                        <li>
                            <Link
                                to="/blog"
                                className="block px-4 py-2 text-white hover:text-primary-light transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Blog
                            </Link>
                        </li>
                        {/* Toggle Dark Mode para móviles */}
                        <li className="md:hidden">
                            <ToggleDarkMode />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
