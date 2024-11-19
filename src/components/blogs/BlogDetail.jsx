// src/components/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import Comments from './Comments';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const docRef = doc(db, 'blogs', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBlog({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No existe tal documento!");
                }
            } catch (error) {
                console.error("Error al obtener el documento:", error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading blog data...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4 mt-12 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-veryDark dark:text-gray-light">
                {blog.title}
            </h2>
            {/* Renderiza el contenido HTML con un límite de ancho y estilos */}
            <div
                className="prose prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            {/* Componente de Comentarios */}
            <Comments blogId={blog.id} />
        </div>
    );
};

export default BlogDetail;