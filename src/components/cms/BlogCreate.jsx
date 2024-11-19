import React, { useState, useContext, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ThemeContext from '../../ThemeContext';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { uploadImageToCloudinary } from '../../utils/cloudinaryUtils';

const BlogCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { isDark } = useContext(ThemeContext);
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            const editor = editorRef.current;
            editor.editing.view.change((writer) => {
                writer.setStyle(
                    "background-color",
                    isDark ? "#2d3748" : "#ffffff",
                    editor.editing.view.document.getRoot()
                );
                writer.setStyle(
                    "color",
                    isDark ? "#ffffff" : "#000000",
                    editor.editing.view.document.getRoot()
                );
            });
        }
    }, [isDark]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            await addDoc(collection(db, "blogs"), {
                title,
                content,
                image: imageUrl,
                createdAt: new Date(),
            });
            alert('Blog creado exitosamente');
            setTitle('');
            setContent('');
            setImageUrl('');
        } catch (error) {
            setError(`Hubo un error al crear el blog: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Adaptador personalizado para CKEditor
    class CloudinaryUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        async upload() {
            const file = await this.loader.file;
            const url = await uploadImageToCloudinary(file); // Subida a Cloudinary
            setImageUrl(url); // Guardar URL en el estado
            return { default: url };
        }

        abort() {
            // Manejo de abort si es necesario
        }
    }

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CloudinaryUploadAdapter(loader);
        };
    }

    return (
        <div className="py-12 mt-6 max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                Crear Nuevo Blog
            </h2>
            {error && (
                <div className="mb-4 text-red-500 text-center">
                    {error}
                </div>
            )}
            <form onSubmit={handleCreate}>
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
                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                    >
                        Contenido
                    </label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onReady={(editor) => {
                            editorRef.current = editor;
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "background-color",
                                    isDark ? "#2d3748" : "#ffffff",
                                    editor.editing.view.document.getRoot()
                                );
                                writer.setStyle(
                                    "color",
                                    isDark ? "#ffffff" : "#000000",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                        config={{
                            extraPlugins: [CustomUploadAdapterPlugin],
                            toolbar: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                'blockQuote',
                                '|',
                                'imageUpload',
                                'insertTable',
                                'mediaEmbed',
                                '|',
                                'undo',
                                'redo',
                            ],
                        }}
                    />
                </div>
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
