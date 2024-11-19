import React from 'react';

const BlogCard = ({ blog }) => {
    return (
        <div className="group flex flex-col gap-y-4 p-4 bg-background-light dark:bg-background-dark rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-1/2 lg:w-1/3 max-w-xs">
            {/* Imagen del blog */}
            <img
                src={blog.image || '/assets/default-image.jpg'}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
                loading="lazy"
                onError={(e) => (e.target.src = '/assets/default-image.jpg')}
            />
            {/* Título */}
            <h3 className="text-xl font-semibold text-gray-veryDark dark:text-gray-light">
                {blog.title}
            </h3>
            {/* Descripción */}
            <p className="text-gray-dark dark:text-gray-light line-clamp-3">
                {blog.excerpt}
            </p>
            {/* Enlace */}
            <a
                href={`/blog/${blog.id}`}
                aria-label={`Leer más sobre ${blog.title}`}
                className="text-primary-dark dark:text-primary-light hover:text-primary-light dark:hover:text-primary-dark hover:underline focus:outline-none focus:ring-2 focus:ring-primary-dark dark:focus:ring-primary-light self-end transition-colors duration-200"
            >
                Leer más
            </a>
        </div>
    );
};

export default BlogCard;

