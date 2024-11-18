// src/components/BlogCard.jsx
import React from 'react';

const BlogCard = ({ blog }) => {
    return (
        <div className="group flex flex-col p-4 bg-background-light dark:bg-background-dark rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-72 md:w-80">
            <img
                src={blog.image || '/assets/default-image.jpg'}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-veryDark dark:text-gray-light">
                {blog.title}
            </h3>
            <p className="text-gray-dark dark:text-gray-light mb-4">
                {blog.excerpt}
            </p>
            <a
                href={`/blog/${blog.id}`}
                className="text-primary-dark dark:text-primary-light hover:text-primary-light dark:hover:text-primary-dark hover:underline self-end transition-colors duration-200"
            >
                Leer más
            </a>
        </div>
    );
};

export default BlogCard;
