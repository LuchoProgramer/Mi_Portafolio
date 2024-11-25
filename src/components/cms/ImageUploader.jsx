import React, { useState } from 'react';
import { uploadImageToCloudinary, getTransformedImageUrl } from '../../utils/cloudinaryUtils';

const ImageUploader = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(''); // Previsualización de la imagen seleccionada
    const [isUploading, setIsUploading] = useState(false);

    // Manejar cambio de archivo
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validar el tipo de archivo antes de establecerlo
            if (!selectedFile.type.startsWith('image/')) {
                alert('Por favor, selecciona un archivo de imagen válido.');
                return;
            }

            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); // Mostrar vista previa
        }
    };

    // Manejar subida de imagen
    const handleUpload = async () => {
        if (!file) return; // Evitar subir si no hay archivo seleccionado

        setIsUploading(true);
        try {
            // Subir la imagen a Cloudinary
            const uploadedUrl = await uploadImageToCloudinary(file);

            // Generar una URL transformada para usar dimensiones consistentes
            const transformedUrl = getTransformedImageUrl(uploadedUrl, {
                width: 600,
                height: 400,
                crop: 'fill',
                gravity: 'auto',
            });

            // Notificar al componente padre la URL transformada
            onUpload(transformedUrl);
            alert('Imagen subida exitosamente');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen, inténtalo nuevamente.');
        } finally {
            // Restaurar estado inicial
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
                        className="w-full h-[300px] object-cover rounded shadow" // Dimensiones consistentes en la vista previa
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