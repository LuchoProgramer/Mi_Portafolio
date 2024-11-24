import React, { useEffect, useState } from 'react';
import { getBlogs } from '../../firebaseConfig'; // Función que obtiene los blogs desde Firebase
import BlogCard from './BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsList = await getBlogs();
                setBlogs(blogsList);
            } catch (error) {
                console.error('Error al cargar los blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="py-20 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                Blog Posts
            </h2>
            {loading ? (
                <p className="text-center text-gray-600 dark:text-gray-400">Cargando blogs...</p>
            ) : blogs.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400">
                    No hay blogs disponibles en este momento.
                </p>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;