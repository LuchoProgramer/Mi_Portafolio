import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
        try {
            await deleteDoc(doc(db, "blogs", id));
            setBlogs(blogs.filter((blog) => blog.id !== id));
            alert("Blog eliminado");
        } catch (error) {
            console.error("Error al eliminar el blog:", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Lista de Blogs</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Título</th>
                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => navigate(`/cms/edit/${blog.id}`)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogList;
