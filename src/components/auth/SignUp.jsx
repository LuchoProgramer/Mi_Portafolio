import React from 'react';
import { auth, db, googleProvider } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            // Guardar el usuario en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                name: name,
                createdAt: new Date(),
            });

            alert('Registro exitoso.');
            navigate('/signin');
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Guardar el usuario en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                name: user.displayName,
                createdAt: new Date(),
            });

            navigate('/cms');
        } catch (error) {
            console.error('Error al registrarse con Google:', error);
            alert('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Registrarse</h1>
            <form onSubmit={handleSignUp}>
                <input type="text" name="name" placeholder="Nombre" required />
                <input type="email" name="email" placeholder="Correo electrónico" required />
                <input type="password" name="password" placeholder="Contraseña" required />
                <button type="submit">Registrarse</button>
            </form>
            <button onClick={handleGoogleSignUp}>Registrarse con Google</button>
        </div>
    );
};

export default SignUp;