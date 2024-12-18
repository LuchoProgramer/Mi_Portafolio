import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../../firebaseConfig';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import Comments from './Comments';

const BlogDetail = () => {
    const { slug } = useParams(); // Obtener el slug desde la URL
    const [blog, setBlog] = useState(null); // Datos del blog
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Error en la carga

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Crear una consulta para buscar por slug
                const blogsRef = collection(db, 'blogs');
                const q = query(blogsRef, where("slug", "==", slug));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const blogDoc = querySnapshot.docs[0]; // Obtener el primer documento encontrado
                    setBlog({ id: blogDoc.id, ...blogDoc.data() });
                } else {
                    setError("No se encontró un blog con este slug.");
                }
            } catch (error) {
                console.error("Error al obtener el blog:", error);
                setError("Hubo un error al cargar el blog. Por favor, inténtalo más tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    // Mostrar estado de carga
    if (isLoading) {
        return (
            <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
                Cargando los datos del blog...
            </p>
        );
    }

    // Mostrar mensaje de error
    if (error) {
        return (
            <p className="text-center mt-6 text-red-500 dark:text-red-400">
                {error}
            </p>
        );
    }

    return (
        <>
            {/* Metaetiquetas dinámicas para SEO */}
            <Helmet>
                <title>{blog.title} - Blog de Luis Viteri</title>
                <meta
                    name="description"
                    content={blog.excerpt || "Lee este interesante artículo en mi blog de desarrollo web."}
                />
                <meta property="og:title" content={blog.title} />
                <meta
                    property="og:description"
                    content={blog.excerpt || "Lee este interesante artículo en mi blog de desarrollo web."}
                />
                <meta
                    property="og:image"
                    content={blog.image || "https://res.cloudinary.com/dltfsttr7/image/upload/v1732480322/default-blog-image.jpg"}
                />
                <meta
                    property="og:url"
                    content={`https://luchodev.netlify.app/blog/${slug}`}
                />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog.title} />
                <meta
                    name="twitter:description"
                    content={blog.excerpt || "Lee este interesante artículo en mi blog de desarrollo web."}
                />
                <meta
                    name="twitter:image"
                    content={blog.image || "https://res.cloudinary.com/dltfsttr7/image/upload/v1732480322/default-blog-image.jpg"}
                />
            </Helmet>

            <div className="max-w-3xl mx-auto p-4 mt-12 mb-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    {blog.title}
                </h2>
                {/* Renderizar bloques dinámicamente */}
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