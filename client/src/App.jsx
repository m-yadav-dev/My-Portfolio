/**
 * @file App.jsx
 * @description Application root. Declares the React Router v6 tree.
 *
 * SPEC ROUTES:
 *   /                    → LandingPage  (inside MainLayout)
 *   /projects/:projectId → ProjectDetail (inside MainLayout)
 *   *                    → Redirects to /
 */

import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LandingPage from "@/pages/LandingPage";
import ProjectDetail from "@/pages/ProjectDetail";

export default function App() {
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
