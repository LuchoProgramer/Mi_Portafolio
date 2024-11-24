import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import RichTextEditor from '../cms/RichTextEditor';
import ImageUploader from '../cms/ImageUploader';
import VideoEmbedder from '../cms/VideoEmbedder';

// Función para generar slugs
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres no alfanuméricos
        .trim()
        .replace(/\s+/g, '-'); // Reemplaza espacios por guiones
};

const BlogCreate = () => {
    const navigate = useNavigate(); // Hook para redirección
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]); // Arreglo de bloques dinámicos
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Agregar un bloque de texto
    const handleAddText = () => {
        setBlocks([...blocks, { type: 'text', content: '' }]);
    };

    // Agregar un bloque de imagen con texto alt
    const handleAddImage = (url) => {
        const alt = prompt("Describe brevemente la imagen (para SEO y accesibilidad):") || "Imagen relacionada con el blog";
        setBlocks([...blocks, { type: 'image', src: url, alt }]);
    };

    // Agregar un bloque de video
    const handleAddVideo = (url) => {
        setBlocks([...blocks, { type: 'video', src: url }]);
    };

    // Manejar cambios en un bloque
    const handleBlockChange = (index, updatedBlock) => {
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = updatedBlock;
        setBlocks(updatedBlocks);
    };

    // Eliminar un bloque
    const handleRemoveBlock = (index) => {
        const updatedBlocks = blocks.filter((_, i) => i !== index);
        setBlocks(updatedBlocks);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim() || blocks.length === 0) {
            setError('Por favor, completa el título y agrega al menos un bloque.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Generar el slug
            let slug = generateSlug(title);

            // Verificar si el slug ya existe en la base de datos
            const slugExists = await checkSlugExists(slug);
            if (slugExists) {
                slug = `${slug}-${Date.now()}`; // Añadir un sufijo único si el slug ya existe
            }

            // Primera imagen del blog como destacada
            const firstImageBlock = blocks.find((block) => block.type === 'image');
            const image = firstImageBlock ? firstImageBlock.src : null;

            // Generar resumen del primer bloque de texto
            const firstTextBlock = blocks.find((block) => block.type === 'text');
            const excerpt = firstTextBlock
                ? firstTextBlock.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
                : 'No hay contenido disponible.';

            // Guardar el blog en Firestore
            await addDoc(collection(db, "blogs"), {
                title: title.trim(),
                slug, // Guardar el slug generado
                blocks,
                image,
                excerpt,
                createdAt: new Date(),
            });

            alert('Blog creado exitosamente');
            setTitle('');
            setBlocks([]);

            // Redirigir al listado de blogs
            navigate('/cms/list');
        } catch (error) {
            setError(`Hubo un error al crear el blog: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función para verificar unicidad del slug
    const checkSlugExists = async (slug) => {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Devuelve `true` si el slug ya existe
    };

    return (
        <div className="py-12 mt-6 max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                Crear Nuevo Blog
            </h2>
            {error && (
                <div className="mb-4 text-red-500 text-center">
                    {error}
                </div>
            )}
            <form onSubmit={handleCreate}>
                {/* Campo de Título */}
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                    >
                        Título
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título del blog"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Contenedor de Bloques */}
                <div className="mb-6">
                    {/* Lista de Bloques */}
                    <div className="space-y-4">
                        {blocks.map((block, index) => (
                            <div
                                key={index}
                                className="relative p-8 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 shadow-sm"
                            >
                                {/* Botón para eliminar el bloque */}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBlock(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition"
                                    title="Eliminar bloque"
                                >
                                    X
                                </button>

                                {block.type === 'text' && (
                                    <RichTextEditor
                                        value={block.content}
                                        onChange={(content) =>
                                            handleBlockChange(index, { ...block, content })
                                        }
                                    />
                                )}
                                {block.type === 'image' && (
                                    <div>
                                        <img
                                            src={block.src}
                                            alt={block.alt || "Imagen del blog"}
                                            className="max-w-full h-auto rounded"
                                        />
                                        <input
                                            type="text"
                                            value={block.alt}
                                            onChange={(e) =>
                                                handleBlockChange(index, { ...block, alt: e.target.value })
                                            }
                                            placeholder="Descripción de la imagen"
                                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                )}
                                {block.type === 'video' && (
                                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                                        <iframe
                                            src={block.src}
                                            title={`Video ${index}`}
                                            className="absolute top-0 left-0 w-full h-full rounded"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Separador entre Bloques y Botones */}
                    <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            Agregar Bloques
                        </h3>
                        <div className="flex flex-wrap gap-4 items-start">
                            {/* Sección de Texto */}
                            <div className="flex-1 min-w-[150px] min-h-[150px] border border-gray-300 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between bg-white dark:bg-gray-800">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Texto
                                </h4>
                                <div className="flex-grow"></div>
                                <button
                                    type="button"
                                    onClick={handleAddText}
                                    className="mt-auto w-full h-12 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                                >
                                    Agregar Texto
                                </button>
                            </div>

                            {/* Sección de Imagen */}
                            <div className="flex-1 min-w-[150px] min-h-[150px] border border-gray-300 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between bg-white dark:bg-gray-800">
                                <ImageUploader onUpload={(url) => handleAddImage(url)} />
                            </div>

                            {/* Sección de Video */}
                            <div className="flex-1 min-w-[150px] min-h-[150px] border border-gray-300 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between bg-white dark:bg-gray-800">
                                <VideoEmbedder onEmbed={handleAddVideo} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón de Envío */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                >
                    {isSubmitting ? 'Guardando...' : 'Crear Blog'}
                </button>
            </form>
        </div>
    );
};

export default BlogCreate;