import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import RichTextEditor from '../cms/RichTextEditor';
import ImageUploader from '../cms/ImageUploader';
import VideoEmbedder from '../cms/VideoEmbedder';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const BlogCreate = () => {
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]); // Bloques de contenido
    const [layout, setLayout] = useState([]); // Layout del grid
    const [selectedBlock, setSelectedBlock] = useState(null); // Bloque seleccionado para editar
    const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Agregar un nuevo bloque
    const addBlock = (type) => {
        const id = Date.now().toString();
        const newBlock = { id, type, content: '' };
        const newLayoutItem = { i: id, x: 0, y: Infinity, w: 4, h: 2 };

        setBlocks([...blocks, newBlock]);
        setLayout([...layout, newLayoutItem]);

        // Abrir el modal para editar el bloque
        setSelectedBlock(newBlock);
        setIsModalOpen(true);
    };

    // Manejar cambios en el contenido del bloque seleccionado
    const handleBlockChange = (content) => {
        setSelectedBlock((prevBlock) => ({
            ...prevBlock,
            content,
        }));
    };

    // Guardar los cambios y cerrar el modal
    const handleSave = () => {
        // Actualizar el bloque en la lista de bloques
        setBlocks((prevBlocks) =>
            prevBlocks.map((block) =>
                block.id === selectedBlock.id ? selectedBlock : block
            )
        );
        setIsModalOpen(false);
        setSelectedBlock(null);
    };

    // Manejar el clic en un bloque para editarlo
    const handleBlockClick = (block) => {
        setSelectedBlock(block);
        setIsModalOpen(true);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title || blocks.length === 0) {
            setError('Por favor, completa el título y agrega al menos un bloque.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            await addDoc(collection(db, "blogs"), {
                title,
                blocks,
                layout,
                createdAt: new Date(),
            });
            alert('Blog creado exitosamente');
            setTitle('');
            setBlocks([]);
            setLayout([]);
        } catch (error) {
            setError(`Hubo un error al crear el blog: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex">
            {/* Barra lateral */}
            <div className="w-1/4 bg-gray-100 dark:bg-gray-800 p-4">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Herramientas
                </h3>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => addBlock('text')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Agregar Texto
                    </button>
                    <button
                        onClick={() => addBlock('image')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Agregar Imagen
                    </button>
                    <button
                        onClick={() => addBlock('video')}
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    >
                        Agregar Video
                    </button>
                </div>
            </div>

            {/* Área principal */}
            <div className="w-3/4 p-4">
                <form onSubmit={handleCreate}>
                    {/* Título del blog */}
                    <div className="mb-4">
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

                    {/* Mostrar errores */}
                    {error && (
                        <div className="mb-4 text-red-500">
                            {error}
                        </div>
                    )}

                    {/* GridLayout */}
                    <GridLayout
                        className="layout"
                        layout={layout}
                        cols={12}
                        rowHeight={30}
                        width={800}
                        onLayoutChange={(newLayout) => setLayout(newLayout)}
                        draggableHandle=".drag-handle"
                    >
                        {blocks.map((block) => (
                            <div key={block.id} data-grid={layout.find(item => item.i === block.id)}>
                                <div
                                    className="bg-white border rounded shadow p-4 cursor-pointer"
                                    onDoubleClick={() => handleBlockClick(block)}
                                >
                                    <div className="drag-handle cursor-move mb-2">
                                        <span className="text-gray-500">Arrastra aquí para mover</span>
                                    </div>
                                    {block.type === 'text' && (
                                        <div dangerouslySetInnerHTML={{ __html: block.content }} />
                                    )}
                                    {block.type === 'image' && block.content && (
                                        <img
                                            src={block.content}
                                            alt="Imagen"
                                            className="max-w-full h-auto rounded"
                                        />
                                    )}
                                    {block.type === 'video' && block.content && (
                                        <iframe
                                            src={block.content}
                                            title={`Video ${block.id}`}
                                            className="w-full h-64 rounded"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </div>
                            </div>
                        ))}
                    </GridLayout>

                    {/* Botón para crear el blog */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md transition duration-200 mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                            }`}
                    >
                        {isSubmitting ? 'Guardando...' : 'Crear Blog'}
                    </button>
                </form>
            </div>

            {/* Modal para el editor */}
            {isModalOpen && selectedBlock && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
                        <h2 className="text-2xl mb-4 text-gray-800 dark:text-white">
                            {selectedBlock.type === 'text' ? 'Editar Texto' : selectedBlock.type === 'image' ? 'Agregar Imagen' : 'Agregar Video'}
                        </h2>
                        {/* Contenido del modal según el tipo de bloque */}
                        {selectedBlock.type === 'text' && (
                            <RichTextEditor
                                value={selectedBlock.content}
                                onChange={handleBlockChange}
                            />
                        )}
                        {selectedBlock.type === 'image' && (
                            <ImageUploader
                                onUpload={(url) => handleBlockChange(url)}
                            />
                        )}
                        {selectedBlock.type === 'video' && (
                            <VideoEmbedder
                                onEmbed={(url) => handleBlockChange(url)}
                            />
                        )}
                        {/* Botones del modal */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedBlock(null);
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogCreate;
