import axios from 'axios';

/**
 * Configuración centralizada para Cloudinary.
 */
export const CLOUDINARY_CONFIG = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: 'ckeditor_upload_preset', // Cambiar por tu preset
    defaultFolder: 'blogs', // Carpeta opcional
};

/**
 * Sube una imagen a Cloudinary con validación y optimización básica.
 * @param {File} file - Archivo de imagen seleccionado.
 * @returns {Promise<string>} - URL pública de la imagen subida.
 */
export const uploadImageToCloudinary = async (file) => {
    // Validación del archivo
    if (!file || !file.type.startsWith('image/')) {
        throw new Error('El archivo seleccionado no es una imagen válida.');
    }
    if (file.size > 5 * 1024 * 1024) { // Límite de 5 MB
        throw new Error('El tamaño de la imagen supera el límite de 5 MB.');
    }

    // Configurar los datos para la subida
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('folder', CLOUDINARY_CONFIG.defaultFolder);

    try {
        // Subida a Cloudinary
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
            formData
        );

        // Devuelve la URL pública de la imagen subida
        return response.data.secure_url;
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            console.error('Cloudinary Error:', error.response.data);
            throw new Error(`Cloudinary Error: ${error.response.data.error?.message || 'Error desconocido.'}`);
        } else {
            console.error('Error de red o servidor:', error.message);
            throw new Error('Error de red o servidor. Inténtalo de nuevo.');
        }
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
        quality = 'auto', // Calidad automática
        format = 'auto', // Formato automático
        radius = 0, // Sin bordes redondeados por defecto
        effect = '', // Sin efectos adicionales por defecto
    } = options;

    // Validación de la URL
    if (!imageUrl || !imageUrl.startsWith('https://res.cloudinary.com/')) {
        throw new Error('URL de imagen no válida o no proviene de Cloudinary.');
    }

    // Reemplaza la parte '/upload/' en la URL para agregar transformaciones
    return imageUrl.replace(
        '/upload/',
        `/upload/w_${width},h_${height},c_${crop},g_${gravity},q_${quality},f_${format},r_${radius},e_${effect}/`
    );
};