import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProjectDetail from "@/pages/ProjectDetail";
import LandingPage from "./pages/LandingPage";

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
