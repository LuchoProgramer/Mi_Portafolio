// src/utils/cloudinaryUtils.js
import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ckeditor_upload_preset'); // Reemplaza con el nombre de tu preset en Cloudinary

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );

        return response.data.secure_url; // URL pública de la imagen
    } catch (error) {
        console.error('Error subiendo la imagen a Cloudinary:', error);
        throw error;
    }
};
