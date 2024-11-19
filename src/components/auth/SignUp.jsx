import React, { useState, useRef, useEffect } from 'react';
import { auth, db, googleProvider } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const SignUp = ({ onSuccess, switchToSignIn }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const nameRef = useRef(null);

    // Enfocar el primer campo al abrir el modal
    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        try {
            // Crear usuario en Firebase Authentication
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            // Verificar si el usuario ya existe en Firestore
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                // Si no existe, crear el documento
                await setDoc(userRef, {
                    email: user.email,
                    name: name || 'Usuario sin nombre',
                    role: 'viewer',
                    createdAt: new Date(),
                });
            } else {
                console.log('El usuario ya existe en Firestore.');
            }

            alert('Registro exitoso.');
            onSuccess(); // Notificar al Header que el registro fue exitoso
        } catch (error) {
            console.error('Error al registrar:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError('');
        try {
            // Iniciar sesión con Google
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Verificar si el usuario ya existe en Firestore
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                // Si no existe, crear el documento
                await setDoc(userRef, {
                    email: user.email,
                    name: user.displayName || 'Usuario sin nombre',
                    role: 'viewer',
                    createdAt: new Date(),
                });
            } else {
                console.log('El usuario ya existe en Firestore.');
            }

            onSuccess(); // Notificar al Header que el registro fue exitoso
        } catch (error) {
            console.error('Error al registrarse con Google:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Registrarse</h2>
            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    required
                    className="px-3 py-2 border rounded"
                    ref={nameRef}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    required
                    className="px-3 py-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    required
                    className="px-3 py-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-primary-dark text-white py-2 rounded hover:bg-primary-light transition"
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Registrarse'}
                </button>
            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={handleGoogleSignUp}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Registrarse con Google'}
                </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-center">
                ¿Ya tienes una cuenta?{' '}
                <button onClick={switchToSignIn} className="text-primary-dark hover:underline">
                    Iniciar sesión
                </button>
            </p>
        </div>
    );
};

export default SignUp;