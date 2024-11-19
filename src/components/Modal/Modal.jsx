import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, children }) => {
    // Cerrar el modal al presionar "Escape"
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        // Fondo oscuro con transiciones
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            {/* Contenedor del Modal con transiciones */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 transform transition-transform duration-300"
                role="dialog"
                aria-modal="true"
            >
                {/* Botón de cerrar */}
                <div className="flex justify-end p-2">
                    <button onClick={onClose} aria-label="Cerrar modal">
                        <FiX size={24} />
                    </button>
                </div>
                {/* Contenido del Modal */}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
