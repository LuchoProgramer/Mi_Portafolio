import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1 style={{ fontSize: "5rem", color: "red" }}>404</h1>
            <h2>Página No Encontrada</h2>
            <p>Lo sentimos, no podemos encontrar la página que buscas.</p>
            <Link to="/" style={{ textDecoration: "none", fontSize: "1.5rem", color: "blue" }}>
                Volver al Inicio
            </Link>
        </div>
    );
};

export default NotFound;

