import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const UserMenu = ({ user, role }) => {
    const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="relative">
            {renderAvatar()}
            {/* Menú Desplegable del Avatar */}
            {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg py-2 w-48 z-30">
                    <ul>
                        {role === 'admin' && (
                            <>
                                <li>
                                    <Link
                                        to="/cms"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        CMS Dashboard
                                    </Link>
                                </li>
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
        </div>
    );
};

export default UserMenu;
