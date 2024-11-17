import React from 'react';
import { auth, googleProvider } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    if (loading) return <p>Cargando...</p>;
    if (user) return <Navigate to="/cms" />;

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/cms');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/cms');
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            alert('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleEmailSignIn}>
                <input type="email" name="email" placeholder="Correo electrónico" required />
                <input type="password" name="password" placeholder="Contraseña" required />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <button onClick={handleGoogleSignIn}>Iniciar con Google</button>
        </div>
    );
};

export default SignIn;
