/**
 * @file layouts/MainLayout.jsx
 * @description Semantic page wrapper. Composes Header → <Outlet> → Footer.
 * Zero business logic lives here — purely structural.
 */

import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian">
      <Header />
      <main id="main-content" className="flex-1 pt-16" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
