import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogsSnapshot = await getDocs(collection(db, "blogs"));
            const blogsData = blogsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBlogs(blogsData);
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este blog?")) return;
        try {
            await deleteDoc(doc(db, "blogs", id));
            setBlogs(blogs.filter((blog) => blog.id !== id));
            alert("Blog eliminado");
        } catch (error) {
            console.error("Error al eliminar el blog:", error);
        }
    };

    return (
        <div className="py-12 mt-6 max-w-5xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                Lista de Blogs
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 dark:border-gray-700">
                    <thead className="bg-gray-300 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Título</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Imagen</th>
                            <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="border-b border-gray-300 dark:border-gray-700">
                                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{blog.title}</td>
                                <td className="px-4 py-2">
                                    {blog.image ? (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-500">Sin imagen</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button
                                        onClick={() => navigate(`/cms/edit/${blog.id}`)}
                                        className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        <AiOutlineEdit size={16} />
                                        <span>Editar</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="flex items-center space-x-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        <AiOutlineDelete size={16} />
                                        <span>Eliminar</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogList;

