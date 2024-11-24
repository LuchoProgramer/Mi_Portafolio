import axios from 'axios';

/**
 * Sube una imagen a Cloudinary y aplica transformaciones básicas durante la carga.
 * @param {File} file - Archivo de imagen seleccionado.
 * @returns {Promise<string>} - URL pública de la imagen subida.
 */
export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ckeditor_upload_preset'); // Reemplaza con tu preset
    formData.append('folder', 'blogs'); // Carpeta opcional para organizar imágenes

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Asegúrate de configurar esta variable en tu entorno

    try {
        // Realiza la subida a Cloudinary
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );

        // Devuelve la URL pública de la imagen subida
        return response.data.secure_url;
    } catch (error) {
        console.error('Error subiendo la imagen a Cloudinary:', error);
        throw error;
    }
};

/**
 * Genera una URL dinámica con transformaciones específicas para una imagen ya subida.
 * @param {string} imageUrl - URL original de la imagen en Cloudinary.
 * @param {Object} options - Opciones de transformación (width, height, crop, etc.).
 * @returns {string} - URL transformada con las opciones aplicadas.
 */
export const getTransformedImageUrl = (imageUrl, options = {}) => {
    const {
        width = 600, // Ancho por defecto
        height = 400, // Alto por defecto
        crop = 'fill', // Recorte por defecto
        gravity = 'auto', // Centrar automáticamente
    } = options;

    // Reemplaza la parte '/upload/' en la URL para agregar las transformaciones
    return imageUrl.replace(
        '/upload/',
        `/upload/w_${width},h_${height},c_${crop},g_${gravity}/`
    );
};
