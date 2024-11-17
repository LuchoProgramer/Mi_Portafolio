import { useNavigate } from "react-router-dom";

const BlogPage = () => {
    const navigate = useNavigate();

    const handleRedirectToSignUp = () => {
        navigate("/signup", { state: { from: "/blogs" } }); // Guardar la página actual como "from"
    };

    return (
        <div>
            <h1>Bienvenido al Blog</h1>
            <p>¿Quieres comentar? Por favor, regístrate primero.</p>
            <button onClick={handleRedirectToSignUp} className="bg-blue-500 text-white p-2 rounded">
                Registrarse
            </button>
        </div>
    );
};

export default BlogPage;
