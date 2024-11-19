import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = ({ isOpen, user, toggleMenu, setIsOpen }) => {
    return (
        <nav
            className={`${isOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-primary-dark md:static md:block md:w-auto`}
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
                {/* Opciones de autenticación en pantallas pequeñas */}
                {!user && (
                    <>
                        <li className="md:hidden">
                            <Link
                                to="/signin"
                                className="block px-4 py-2 text-white hover:text-primary-light"
                                onClick={() => setIsOpen(false)}
                            >
                                Iniciar sesión
                            </Link>
                        </li>
                        <li className="md:hidden">
                            <Link
                                to="/signup"
                                className="block px-4 py-2 text-white hover:text-primary-light"
                                onClick={() => setIsOpen(false)}
                            >
                                Registrarse
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavigationMenu;
