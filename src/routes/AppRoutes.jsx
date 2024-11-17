import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import SignIn from "../components/auth/SignIn";
import CMSDashboard from "../components/cms/CMSDashboard";
import BlogCreate from "../components/cms/BlogCreate";
import BlogEdit from "../components/cms/BlogEdit";
import BlogList from "../components/cms/BlogList";
import ProtectedRoute from "../components/ProtectedRoute";
import SignUp from "../components/auth/SignUp";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Rutas del CMS (protegidas) */}
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
        </Routes>
    );
};

export default AppRoutes;
