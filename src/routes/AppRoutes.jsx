import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "../components/blogs/Blogs";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import CMSDashboard from "../components/cms/CMSDashboard";
import BlogCreate from "../components/cms/BlogCreate";
import BlogEdit from "../components/cms/BlogEdit";
import BlogList from "../components/cms/BlogList";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layout/MainLayout";
import AboutMe from "../pages/AboutMe";
import Technologies from "../pages/Technologies";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import Languages from "../pages/Languages";
import Hobbies from "../pages/Hobbies";
import TravelMap from "../pages/TravelMap";
import BlogDetail from "../components/blogs/BlogDetail";
import SEO from "../components/SEO";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Ruta principal */}
            <Route
                path="/"
                element={
                    <MainLayout>
                        {/* Agregar meta etiquetas dinámicas */}
                        <SEO
                            title="LuchoDev | Inicio"
                            description="Explora el portafolio de Luis Viteri. Soluciones personalizadas en desarrollo web con React y Firebase."
                            image="https://res.cloudinary.com/dltfsttr7/image/upload/v1732480322/Screenshot_2024-11-24_at_15-31-19_netlify.app.jpg_JPEG_Image_1280_4301_pixels_l1ugdf.png"
                            url="https://luchodev.netlify.app/"
                        />
                        <Home />
                        <AboutMe />
                        <Technologies />
                        <Projects />
                        <Experience />
                        <Languages />
                        <Hobbies />
                        <TravelMap />
                    </MainLayout>
                }
            />
            {/* Rutas públicas */}
            <Route path="/blog" element={<MainLayout><Blogs /></MainLayout>} />
            <Route path="/blog/:slug" element={<MainLayout><BlogDetail /></MainLayout>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Rutas protegidas con MainLayout */}
            <Route
                path="/cms"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <CMSDashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cms/create"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <BlogCreate />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cms/list"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <BlogList />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cms/edit/:id"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <BlogEdit />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;