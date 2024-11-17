import React from "react";
import { Link } from "react-router-dom";

const CMSDashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Blogs</h1>
            <div className="flex space-x-4">
                <Link
                    to="/cms/create"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Crear Blog
                </Link>
                <Link
                    to="/cms/list"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ver Blogs
                </Link>
            </div>
        </div>
    );
};

export default CMSDashboard;

