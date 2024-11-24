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

    if (!blog) return <p>Cargando los datos del blog...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4 mt-12 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                {blog.title}
            </h2>
            {/* Iterar y renderizar los bloques */}
            <div className="space-y-6">
                {blog.blocks.map((block, index) => {
                    if (block.type === 'text') {
                        return (
                            <div
                                key={index}
                                className="prose prose-lg dark:prose-invert"
                                dangerouslySetInnerHTML={{ __html: block.content }}
                            />
                        );
                    }
                    if (block.type === 'image') {
                        return (
                            <div key={index} className="flex justify-center">
                                <img
                                    src={block.src}
                                    alt={`Imagen ${index}`}
                                    className="rounded-lg shadow-md"
                                />
                            </div>
                        );
                    }
                    if (block.type === 'video') {
                        return (
                            <div key={index} className="relative" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    src={block.src}
                                    title={`Video ${index}`}
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            {/* Componente de Comentarios */}
            <Comments blogId={blog.id} />
        </div>
    );
};

export default BlogDetail;
