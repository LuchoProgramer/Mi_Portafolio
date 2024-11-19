// src/components/Blogs.jsx
import React, { useEffect, useState } from 'react';
import { getBlogs } from '../../firebaseConfig';
import BlogCard from './BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogsList = await getBlogs();
            setBlogs(blogsList);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="py-20 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-veryDark dark:text-gray-light">
                Blog Posts
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
                {blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;