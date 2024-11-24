import React from 'react';

const BlogCard = ({ blog }) => {
    return (
        <div className="group flex flex-col gap-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-1/2 lg:w-1/3 max-w-xs">
            {/* Imagen del blog */}
            <img
                src={blog.image || '/assets/default-image.jpg'}
                alt={blog.title || 'Sin título'}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
                loading="lazy"
                onError={(e) => (e.target.src = '/assets/default-image.jpg')}
            />
            {/* Título */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {blog.title || 'Sin título'}
            </h3>
            {/* Descripción */}
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                {blog.excerpt || 'No hay descripción disponible.'}
            </p>
            {/* Enlace */}
            <a
                href={`/blog/${blog.id}`}
                aria-label={`Leer más sobre ${blog.title}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 self-end transition-colors duration-200"
            >
                Leer más
            </a>
        </div>
    );
};

export default BlogCard;


