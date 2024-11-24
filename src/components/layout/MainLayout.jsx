import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import ToggleDarkMode from "../../ToggleDarkMode";

function MainLayout({ children, title, description, keywords, image, url }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Meta etiquetas globales y dinámicas */}
            <Helmet>
                {/* Global */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                {/* Dinámico */}
                <title>{title || "Portafolio de Luis Viteri | Desarrollo Full Stack"}</title>
                <meta
                    name="description"
                    content="Descubre cómo podemos ayudarte a desarrollar tu próximo proyecto. Soluciones web únicas y personalizadas para cada cliente."
                />
                <meta name="keywords" content="Luis Viteri, portafolio, desarrollador full stack, React, Django, soluciones tecnológicas, desarrollo web personalizado, programación" />

                {/* Open Graph para redes sociales */}
                <meta property="og:title" content="Portafolio de Luis Viteri | Desarrollador Full Stack" />
                <meta
                    property="og:description"
                    content="Explora soluciones personalizadas en desarrollo web con React y Django. ¡Conéctate conmigo para crear tu próximo proyecto!"
                />
                <meta property="og:image" content="https://misitioweb.com/static/images/portfolio-home.jpg" />
                <meta property="og:url" content="https://misitioweb.com" />
                <meta property="og:type" content="website" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title || "Mi Sitio Web"} />
                <meta name="twitter:description" content={description || "Bienvenido a mi sitio web."} />
                <meta name="twitter:image" content={image || "/default-image.jpg"} />
            </Helmet>

            {/* Estructura del layout */}
            <Header />
            <ToggleDarkMode />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

export default MainLayout;