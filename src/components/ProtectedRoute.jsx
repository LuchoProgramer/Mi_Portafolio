import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [role, setRole] = useState(null);
    const [fetchingRole, setFetchingRole] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setRole(userData.role);
                    } else {
                        console.error('No se encontró el documento del usuario en Firestore.');
                        setRole('viewer'); // Asignar rol por defecto si no se encuentra
                    }
                } catch (error) {
                    console.error('Error al obtener el rol del usuario:', error);
                } finally {
                    setFetchingRole(false);
                }
            } else {
                setFetchingRole(false);
            }
        };
        fetchUserRole();
    }, [user]);

    if (loading || fetchingRole) return <p>Cargando...</p>;

    if (!user) {
        return <Navigate to="/signin" />;
    }

    if (role !== 'admin') {
        alert('No tienes permisos para acceder a esta sección.');
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
