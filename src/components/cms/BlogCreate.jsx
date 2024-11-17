import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const BlogCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "blogs"), { title, content, createdAt: new Date() });
            alert("Blog creado");
        } catch (error) {
            console.error("Error al crear el blog:", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Crear Blog</h2>
            <form onSubmit={handleCreate}>
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
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear
                </button>
            </form>
        </div>
    );
};

export default BlogCreate;
