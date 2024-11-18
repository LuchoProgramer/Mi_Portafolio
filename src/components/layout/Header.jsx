import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { FiMenu, FiX } from 'react-icons/fi';
import ToggleDarkMode from '../../ToggleDarkMode';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Para el menú del avatar
    const [user] = useAuthState(auth);

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleUserMenu = () => setMenuOpen(!menuOpen);

    const handleSignOut = async () => {
        await signOut(auth);
        setMenuOpen(false);
    };

    const renderAvatar = () => {
        if (user?.photoURL) {
            return (
                <img
                    src={user.photoURL}
                    alt={user.displayName || 'Usuario'}
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={toggleUserMenu}
                />
            );
        }

        // Inicial del nombre si no hay foto
        const initial = user?.displayName?.charAt(0).toUpperCase() || 'U';
        return (
            <div
                className="w-8 h-8 bg-primary-light text-primary-dark rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleUserMenu}
            >
                {initial}
            </div>
        );
    };

    return (
        <header className="bg-primary-dark text-white p-4 fixed w-full z-20 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="font-mono bg-gray-800 px-3 py-1 rounded text-lg flex items-center"
                    aria-label="Inicio"
                >
                    {'<Lucho_dev />'}
                    <span className="ml-1 w-1 h-5 bg-white animate-pulse"></span>
                </Link>

                {/* Toggle Dark Mode */}
                <div className="hidden md:block">
                    <ToggleDarkMode />
                </div>


                {/* Menú de Navegación */}
                <nav
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
                                to="/blog"
                                className="block px-4 py-2 text-white hover:text-primary-light transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Blog
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Botones / Avatar */}
                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <Link to="/signin" className="text-white hover:text-primary-light">
                                Iniciar sesión
                            </Link>
                            <Link to="/signup" className="text-white hover:text-primary-light">
                                Registrarse
                            </Link>
                        </>
                    ) : (
                        <>
                            {renderAvatar()}
                            {/* Menú Desplegable del Avatar */}
                            {menuOpen && (
                                <div className="absolute top-14 right-4 bg-white text-black shadow-lg rounded-lg py-2 w-48">
                                    <ul>
                                        {user?.email === 'admin@correo.com' && ( // Verifica el rol de admin
                                            <>
                                                <li>
                                                    <Link
                                                        to="/cms/create"
                                                        className="block px-4 py-2 hover:bg-gray-200"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        Crear Blog
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/cms/list"
                                                        className="block px-4 py-2 hover:bg-gray-200"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        Lista de Blogs
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Botón de Menú para Móviles */}
                <button
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                    className="md:hidden focus:outline-none"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </header>
    );
};

export default Header;

