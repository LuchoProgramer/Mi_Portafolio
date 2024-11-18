import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ titulo, descripcion, enlace, enlaceGithub, tecnologias, imagen }) {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            {imagen && (
                <img
                    src={imagen}
                    alt={`Imagen de ${titulo}`}
                    className="w-full h-auto object-contain rounded-t-lg mb-4"
                />
            )}
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{titulo}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{descripcion}</p>
            <div className="flex items-center space-x-4 mb-4">
                {enlaceGithub && (
                    <a
                        href={enlaceGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                        aria-label="Ver en GitHub"
                    >
                        <FaGithub size={24} />
                    </a>
                )}
                {enlace && (
                    <a
                        href={enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                        aria-label="Ver Proyecto"
                    >
                        <FaExternalLinkAlt size={24} />
                    </a>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {tecnologias.map((tecnologia, index) => (
                    <span
                        key={index}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                    >
                        {tecnologia}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ProjectCard;