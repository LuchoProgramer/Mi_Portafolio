import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth); // Estado de autenticación
    const [role, setRole] = useState(null); // Estado del rol del usuario
    const [isInitializing, setIsInitializing] = useState(true); // Nuevo: Indica si se está inicializando

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setRole(userData.role); // Asigna el rol obtenido
                    } else {
                        console.error("No se encontró el documento del usuario en Firestore.");
                        setRole("viewer"); // Rol por defecto
                    }
                } catch (error) {
                    console.error("Error al obtener el rol del usuario:", error);
                } finally {
                    setIsInitializing(false); // Finaliza la inicialización
                }
            } else if (!loading) {
                // Si no hay usuario y ya no está cargando, finaliza la inicialización
                setIsInitializing(false);
            }
        };

        fetchUserRole();
    }, [user, loading]);

    // Mostrar mensaje de carga mientras se inicializa
    if (isInitializing) {
        return <p>Cargando información del usuario...</p>;
    }

    // Redirigir si no hay usuario autenticado
    if (!user) {
        return <Navigate to="/signin" />;
    }

    // Redirigir si el usuario no es admin
    if (role !== "admin") {
        alert("No tienes permisos para acceder a esta sección.");
        return <Navigate to="/" />;
    }

    // Renderizar el contenido protegido si todo está en orden
    return children;
};

export default ProtectedRoute;
