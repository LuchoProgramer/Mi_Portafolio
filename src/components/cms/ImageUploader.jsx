// ImageUploader.jsx
import React, { useState } from 'react';
import { uploadImageToCloudinary } from '../../utils/cloudinaryUtils';

const ImageUploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(''); // Previsualización de la imagen seleccionada
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); // Mostrar vista previa
        }
    };

    const handleUpload = async () => {
        if (!file) return; // Evitar subir si no hay archivo seleccionado

        setIsUploading(true);
        try {
            const uploadedUrl = await uploadImageToCloudinary(file); // Subir a Cloudinary
            onUpload(uploadedUrl); // Notificar al componente padre la URL subida
            alert('Imagen subida exitosamente');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen, inténtalo nuevamente.');
        } finally {
            setIsUploading(false);
            setFile(null); // Limpiar el archivo seleccionado
            setPreview(''); // Limpiar la vista previa
        }
    };

    return (
        <div className="flex-1 min-w-[120px] flex flex-col">
            <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
                Seleccionar Imagen
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2"
            />
            {preview && (
                <div className="mb-2">
                    <img
                        src={preview}
                        alt="Vista previa"
                        className="max-w-full h-auto rounded shadow"
                    />
                </div>
            )}
            <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={`py-2 px-4 text-white font-bold rounded ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    } transition`}
            >
                {isUploading ? 'Subiendo...' : 'Subir Imagen'}
            </button>
        </div>
    );
};

export default ImageUploader;