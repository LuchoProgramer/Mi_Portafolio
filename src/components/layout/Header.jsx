// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebaseConfig';
import { FiMenu, FiX } from 'react-icons/fi';
import ToggleDarkMode from '../../ToggleDarkMode';
import { doc, getDoc } from 'firebase/firestore';

// Importar los nuevos componentes
import NavigationMenu from './NavigationMenu';
import UserMenu from './UserMenu';
import Modal from '../Modal/Modal'; // Ajusta la ruta según tu estructura
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false); // Para el menú hamburguesa
    const [user] = useAuthState(auth);
    const [role, setRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Para el Modal
    const [isSignIn, setIsSignIn] = useState(true); // Para alternar entre SignIn y SignUp

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setRole(userData.role);
                    } else {
                        console.error('No se encontró el documento del usuario en Firestore.');
                        setRole(null);
                    }
                } catch (error) {
                    console.error('Error al obtener el rol del usuario:', error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
        };

        fetchUserRole();
    }, [user]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const openModal = () => {
        setIsModalOpen(true);
        setIsSignIn(true); // Por defecto, mostrar SignIn
    };
    const openSignUpModal = () => {
        setIsModalOpen(true);
        setIsSignIn(false); // Mostrar SignUp
    };
    const closeModal = () => setIsModalOpen(false);

    const handleSignInSuccess = () => {
        closeModal();
        // Puedes realizar acciones adicionales aquí si es necesario
    };

    const handleSignUpSuccess = () => {
        closeModal();
        // Puedes realizar acciones adicionales aquí si es necesario
    };

    const switchToSignUp = () => setIsSignIn(false);
    const switchToSignIn = () => setIsSignIn(true);

    return (
        <header className="bg-primary-dark text-white p-4 fixed w-full z-20 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="font-mono bg-gray-800 rounded flex items-center 
                    px-2 py-0.5 text-sm md:px-3 md:py-1 md:text-lg"
                    aria-label="Inicio"
                >
                    {'<Lucho_dev />'}
                    <span className="ml-1 w-1 bg-white animate-pulse h-4 md:h-5"></span>
                </Link>

                {/* Contenedor del menú y opciones de usuario */}
                <div className="flex items-center space-x-4">
                    {/* Menú de Navegación */}
                    <NavigationMenu
                        isOpen={isOpen}
                        user={user}
                        setIsOpen={setIsOpen}
                    />

                    {/* Toggle Dark Mode siempre visible */}
                    <ToggleDarkMode />

                    {/* Opciones de autenticación */}
                    {!user ? (
                        <div className="hidden md:flex space-x-4">
                            <button
                                onClick={openModal}
                                className="text-white hover:text-primary-light"
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={openSignUpModal}
                                className="text-white hover:text-primary-light"
                            >
                                Registrarse
                            </button>
                        </div>
                    ) : (
                        <UserMenu user={user} role={role} />
                    )}

                    {/* Botón de Menú para Móviles */}
                    <button
                        onClick={toggleMenu}
                        aria-label="Abrir menú"
                        className="md:hidden focus:outline-none"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Modal para Iniciar Sesión y Registrarse */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="dark:bg-gray-800 dark:text-gray-200">
                    {isSignIn ? (
                        <SignIn onSuccess={handleSignInSuccess} switchToSignUp={switchToSignUp} />
                    ) : (
                        <SignUp onSuccess={handleSignUpSuccess} switchToSignIn={switchToSignIn} />
                    )}
                </div>
            </Modal>
        </header>
    );
};

export default Header;