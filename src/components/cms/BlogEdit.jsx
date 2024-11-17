import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            const blogDoc = await getDoc(doc(db, "blogs", id));
            if (blogDoc.exists()) {
                const blogData = blogDoc.data();
                setTitle(blogData.title);
                setContent(blogData.content);
            }
        };

        fetchBlog();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "blogs", id), { title, content });
            alert("Blog actualizado");
            navigate("/cms/list");
        } catch (error) {
            console.error("Error al actualizar el blog:", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Editar Blog</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full p-2 mb-4 border rounded"
                />
                <textarea
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full p-2 mb-4 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default BlogEdit;
