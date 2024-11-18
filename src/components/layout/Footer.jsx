// src/components/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="bg-primary-dark text-white py-6 mt-8">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm sm:text-base">&copy; 2024 Luis Viteri. Todos los derechos reservados.</p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                    <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37258 0 0 5.37258 0 12C0 17.3033 3.43836 21.799 8.20507 23.385C8.80507 23.4851 9.02507 23.1251 9.02507 22.805C9.02507 22.5151 9.01507 21.7551 9.01007 20.7551C5.6725 21.4351 4.96875 19.1551 4.96875 19.1551C4.4225 17.9551 3.6325 17.5951 3.6325 17.5951C2.5475 16.9751 3.7125 16.9851 3.7125 16.9851C4.9125 16.9751 6.0475 18.1051 6.0475 18.1051C7.1725 19.9751 8.6025 19.4851 9.2125 19.1551C9.3125 18.3751 9.6125 17.8151 10.0025 17.4951C7.3925 17.1751 4.5725 16.3051 4.5725 11.5551C4.5725 10.2351 5.0225 9.15507 5.80507 8.33507C5.69007 7.01507 5.2125 5.95507 4.42507 5.10507C4.42507 5.10507 5.38007 4.78507 9.0025 6.42507C9.9825 6.15507 11.0225 6.03507 12.0625 6.03007C13.1025 6.03507 14.1425 6.15507 15.1225 6.42507C18.7425 4.78507 19.6975 5.10507 19.6975 5.10507C18.9125 5.95507 18.435 7.01507 18.32 8.33507C19.1025 9.15507 19.5525 10.2351 19.5525 11.5551C19.5525 16.3151 16.7275 17.1751 14.1175 17.4951C14.5225 17.8651 14.9025 18.6051 14.9025 19.7151C14.9025 21.2851 14.89 22.6351 14.89 22.805C14.89 23.1251 15.1025 23.4851 15.7125 23.385C20.4784 21.799 24 17.3033 24 12C24 5.37258 18.6274 0 12 0Z" />
                        </svg>
                    </a>
                    <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.084-.916-2-2-2s-2 .916-2 2v4.5h-3v-9h3v1.268c.584-.867 1.583-1.268 2.5-1.268 2.485 0 4.5 2.015 4.5 4.5v4.732z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
