import React from 'react';
import { auth, db, googleProvider } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

            // Obtener o crear el documento del usuario en Firestore
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                // Si el documento no existe, crearlo
                await setDoc(userRef, {
                    email: user.email,
                    name: user.displayName || 'Usuario sin nombre',
                    role: 'viewer', // Asigna el rol predeterminado
                    createdAt: new Date(),
                });
            }

            navigate('/cms');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Obtener o crear el documento del usuario en Firestore
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                // Si el documento no existe, crearlo
                await setDoc(userRef, {
                    email: user.email,
                    name: user.displayName || 'Usuario sin nombre',
                    role: 'viewer', // Asigna el rol predeterminado
                    createdAt: new Date(),
                });
            }

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

