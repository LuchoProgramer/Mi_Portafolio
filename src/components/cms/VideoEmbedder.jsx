import React, { useState } from 'react';

const VideoEmbedder = ({ onEmbed }) => {
    const [videoUrl, setVideoUrl] = useState('');

    const handleEmbed = () => {
        if (videoUrl) {
            onEmbed(videoUrl); // Notificar al padre la URL del video
            setVideoUrl('');
        }
    };

    return (
        <div>
            <label className="block mb-2 font-bold text-gray-700">Insertar Video</label>
            <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Inserta la URL del video (YouTube, TikTok, etc.)"
                className="w-full px-4 py-2 border rounded mb-2"
            />
            <button
                onClick={handleEmbed}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
                Agregar Video
            </button>
        </div>
    );
};

export default VideoEmbedder;