import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "../components/blogs/Blogs"
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
import TravelMap from "../pages/TravelMap"
import BlogDetail from "../components/blogs/BlogDetail";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Ruta principal */}
            <Route
                path="/"
                element={
                    <MainLayout>
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
            <Route path="/blog/:id" element={<MainLayout><BlogDetail /></MainLayout>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Rutas protegidas */}
            <Route
                path="/cms"
                element={
                    <ProtectedRoute>
                        <CMSDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cms/create"
                element={
                    <ProtectedRoute>
                        <BlogCreate />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cms/list"
                element={
                    <ProtectedRoute>
                        <BlogList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/cms/edit/:id"
                element={
                    <ProtectedRoute>
                        <BlogEdit />
                    </ProtectedRoute>
                }
            />

            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
