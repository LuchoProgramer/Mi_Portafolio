import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <p>Cargando...</p>;
    if (!user) return <Navigate to="/signin" />;

    return children;
};

export default ProtectedRoute;
