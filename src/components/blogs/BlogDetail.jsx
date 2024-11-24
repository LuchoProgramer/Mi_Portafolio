import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import Comments from './Comments';
import SEO from '../SEO';

const BlogDetail = () => {
    const { slug } = useParams(); // Obtener el slug desde la URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // Crear una consulta para buscar por slug
                const blogsRef = collection(db, 'blogs');
                const q = query(blogsRef, where("slug", "==", slug));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const blogDoc = querySnapshot.docs[0]; // Obtener el primer documento encontrado
                    setBlog({ id: blogDoc.id, ...blogDoc.data() });
                } else {
                    console.log("No se encontró un blog con este slug.");
                }
            } catch (error) {
                console.error("Error al obtener el blog:", error);
            }
        };

        fetchBlog();
    }, [slug]);

    if (!blog) return <p>Cargando los datos del blog...</p>;

    return (
        <>
            {/* Componente SEO para meta etiquetas dinámicas */}
            <SEO
                title={blog.title}
                description={blog.excerpt || "Lee este interesante artículo en mi blog de desarrollo web."}
                image={blog.image || "https://res.cloudinary.com/dltfsttr7/image/upload/v1732480322/default-blog-image.jpg"} // Imagen predeterminada si no hay destacada
                url={`https://luchodev.netlify.app/blog/${slug}`}
            />
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
                                        alt={block.alt || `Imagen del blog ${index}`} // Usar el texto alternativo almacenado
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
        </>
    );
};

export default BlogDetail;