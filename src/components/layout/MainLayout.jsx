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

                {/* Open Graph Tags */}
                <meta property="og:title" content="LuchoDev | Desarrollador Full Stack" />
                <meta property="og:description" content="Explora el portafolio de Luis Viteri. Soluciones personalizadas en desarrollo web con React y Firebase." />
                <meta property="og:image" content="https://res.cloudinary.com/dltfsttr7/image/upload/v1732480322/Screenshot_2024-11-24_at_15-31-19_netlify.app.jpg_JPEG_Image_1280_4301_pixels_l1ugdf.png" />
                <meta property="og:url" content="https://luchodev.netlify.app/" />
                <meta property="og:type" content="website" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="LuchoDev | Desarrollador Full Stack" />
                <meta name="twitter:description" content="Explora el portafolio de Luis Viteri. Soluciones personalizadas en desarrollo web con React y Firebase." />
                <meta name="twitter:image" content="https://res.cloudinary.com/dltfsttr7/image/upload/v1732480322/Screenshot_2024-11-24_at_15-31-19_netlify.app.jpg_JPEG_Image_1280_4301_pixels_l1ugdf.png" />
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