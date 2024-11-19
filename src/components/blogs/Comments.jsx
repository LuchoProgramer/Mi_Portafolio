// src/components/Comments.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user] = useAuthState(auth);

    useEffect(() => {
        // Escucha en tiempo real para los comentarios de este blog
        const q = query(
            collection(db, 'blogs', blogId, 'comments'),
            orderBy('createdAt', 'desc') // Ordena los comentarios por fecha
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsArray);
        });

        return () => unsubscribe(); // Desuscribirse al desmontar el componente
    }, [blogId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        try {
            await addDoc(collection(db, 'blogs', blogId, 'comments'), {
                userId: user.uid,
                userName: user.displayName || 'Anónimo',
                text: newComment,
                createdAt: new Date()
            });
            setNewComment(''); // Limpiar el input después de enviar
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Comentarios</h3>
            {user ? (
                <form onSubmit={handleCommentSubmit} className="mb-4">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario..."
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Comentar
                    </button>
                </form>
            ) : (
                <div className="mb-4">
                    <p className="text-gray-600">Debes <Link to="/signin" className="text-blue-500 hover:underline">iniciar sesión</Link> para comentar.</p>
                </div>
            )}
            <div>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="mb-4 p-2 border-b border-gray-300">
                            <p className="text-sm text-gray-600">
                                <strong>{comment.userName}</strong> - {new Date(comment.createdAt?.toDate()).toLocaleString()}
                            </p>
                            <p className="text-gray-800">{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                )}
            </div>
        </div>
    );
};

export default Comments;