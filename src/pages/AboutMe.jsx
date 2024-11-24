import React from 'react';
import { FiGlobe, FiBookOpen, FiCode } from 'react-icons/fi';

function AboutMe() {
    return (
        <section id="about" className="py-12 bg-background-light dark:bg-background-dark">
            <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10">
                {/* Título */}
                <h2 className="text-3xl font-semibold text-text-primary dark:text-text-light mb-8 text-center">
                    Sobre Mí
                </h2>
                <div className="flex flex-col md:flex-row items-center">
                    {/* Imagen */}
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                        <img
                            src="https://res.cloudinary.com/dltfsttr7/image/upload/v1732416634/file-Jsh2amEnMytw75DmwtHCX4_1_kde3iy.webp"
                            alt="Foto de Luis Viteri"
                            className="w-48 h-48 rounded-full object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                    {/* Contenido */}
                    <div className="md:w-2/3 text-text-secondary dark:text-gray-light text-base leading-relaxed md:pl-8">
                        <p className="mb-4">
                            ¡Hola! Soy <span className="font-bold">Luis Viteri</span>, un{' '}
                            <span className="text-primary dark:text-primary-light font-bold">nómada digital</span> y desarrollador web con más de{' '}
                            <span className="font-bold">un año de experiencia</span> en la creación de aplicaciones dinámicas y eficientes.
                        </p>
                        <p>
                            Mi pasión por el desarrollo y mi espíritu aventurero me han llevado a trabajar desde diversos lugares alrededor del mundo, combinando mi amor por la tecnología y los viajes.
                        </p>
                    </div>
                </div>
                {/* Iconos Representativos */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-around">
                    <div className="flex flex-col items-center mb-6 sm:mb-0">
                        <FiGlobe
                            size={32}
                            className="text-primary hover:text-primary-hover active:text-primary-active dark:text-primary-light transition-colors duration-200 mb-2"
                        />
                        <p className="text-lg font-semibold text-text-primary dark:text-text-light">Nómada Digital</p>
                    </div>
                    <div className="flex flex-col items-center mb-6 sm:mb-0">
                        <FiCode
                            size={32}
                            className="text-primary hover:text-primary-hover active:text-primary-active dark:text-primary-light transition-colors duration-200 mb-2"
                        />
                        <p className="text-lg font-semibold text-text-primary dark:text-text-light">Desarrollador Web</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FiBookOpen
                            size={32}
                            className="text-primary hover:text-primary-hover active:text-primary-active dark:text-primary-light transition-colors duration-200 mb-2"
                        />
                        <p className="text-lg font-semibold text-text-primary dark:text-text-light">Aprendiz de por Vida</p>
                    </div>
                </div>
                {/* Eliminamos el botón de "Conecta Conmigo" */}
            </div>
        </section>
    );
}

export default AboutMe;

