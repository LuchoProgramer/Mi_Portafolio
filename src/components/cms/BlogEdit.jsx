import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUtils";

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            const blogDoc = await getDoc(doc(db, "blogs", id));
            if (blogDoc.exists()) {
                const blogData = blogDoc.data();
                setTitle(blogData.title);
                setContent(blogData.content);
                setImageUrl(blogData.image || ""); // Cargar la imagen existente
            } else {
                console.error("El blog no existe.");
            }
        };

        fetchBlog();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        setIsSubmitting(true);
        setError("");

        try {
            await updateDoc(doc(db, "blogs", id), {
                title,
                content,
                image: imageUrl, // Actualizar la URL de la imagen
            });
            alert("Blog actualizado exitosamente");
            navigate("/cms/list");
        } catch (error) {
            console.error("Error al actualizar el blog:", error);
            setError("Hubo un error al actualizar el blog.");
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
            const url = await uploadImageToCloudinary(file); // Subir la imagen a Cloudinary
            setImageUrl(url); // Actualizar la URL en el estado
            return { default: url }; // Retornar la URL al editor
        }

        abort() {
            // Manejo de abort si es necesario
        }
    }

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new CloudinaryUploadAdapter(loader);
        };
    }

    return (
        <div className="py-8 mt-8 max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                Editar Blog
            </h2>
            {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
            <form onSubmit={handleUpdate}>
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
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                        config={{
                            extraPlugins: [CustomUploadAdapterPlugin],
                            toolbar: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "bulletedList",
                                "numberedList",
                                "blockQuote",
                                "|",
                                "imageUpload",
                                "insertTable",
                                "mediaEmbed",
                                "|",
                                "undo",
                                "redo",
                            ],
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md transition duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                        }`}
                >
                    {isSubmitting ? "Actualizando..." : "Guardar Cambios"}
                </button>
            </form>
        </div>
    );
};

export default BlogEdit;

