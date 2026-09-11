/**
 * @file app/routes.jsx
 * @description Centralised route definitions for the application.
 */

import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProjectDetail from "@/pages/ProjectDetail";
import LandingPage from "@/pages/LandingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
