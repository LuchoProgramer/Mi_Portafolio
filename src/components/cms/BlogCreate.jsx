// BlogCreate.jsx
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import RichTextEditor from '../cms/RichTextEditor';
import ImageUploader from '../cms/ImageUploader';
import VideoEmbedder from '../cms/VideoEmbedder';

const BlogCreate = () => {
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]); // Arreglo de bloques dinámicos
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Agregar un bloque de texto al final
    const handleAddText = () => {
        setBlocks([...blocks, { type: 'text', content: '' }]);
    };

    // Agregar un bloque de imagen al final
    const handleAddImage = (url) => {
        setBlocks([...blocks, { type: 'image', src: url }]);
    };

    // Agregar un bloque de video al final
    const handleAddVideo = (url) => {
        setBlocks([...blocks, { type: 'video', src: url }]);
    };

    // Manejar cambios en un bloque
    const handleBlockChange = (index, updatedBlock) => {
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = updatedBlock;
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
            // Obtén la primera imagen del blog como destacada
            const firstImageBlock = blocks.find((block) => block.type === 'image');
            const image = firstImageBlock ? firstImageBlock.src : null;

            // Genera un resumen a partir del primer bloque de texto
            const firstTextBlock = blocks.find((block) => block.type === 'text');
            const excerpt = firstTextBlock
                ? firstTextBlock.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
                : 'No hay contenido disponible.';

            // Guarda el blog en Firestore
            await addDoc(collection(db, "blogs"), {
                title: title.trim(),
                blocks,
                image,
                excerpt,
                createdAt: new Date(),
            });

            alert('Blog creado exitosamente');
            setTitle('');
            setBlocks([]);
        } catch (error) {
            setError(`Hubo un error al crear el blog: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
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
                            <div key={index} className="p-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 shadow-sm">
                                {block.type === 'text' && (
                                    <RichTextEditor
                                        value={block.content}
                                        onChange={(content) =>
                                            handleBlockChange(index, { ...block, content })
                                        }
                                    />
                                )}
                                {block.type === 'image' && (
                                    <img src={block.src} alt="Imagen" className="max-w-full h-auto rounded" />
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
                        <div className="flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={handleAddText}
                                className="flex-1 min-w-[120px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Agregar Texto
                            </button>
                            <ImageUploader onUpload={handleAddImage} />
                            <VideoEmbedder onEmbed={handleAddVideo} />
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