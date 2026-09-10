/**
 * @file layouts/MainLayout.jsx
 * @description Semantic page wrapper. Composes Header → <Outlet> → Footer.
 * ChatWidget is mounted here so it is globally available on ALL routes.
 * Zero business logic lives here — purely structural.
 */

import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer     from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0C10] text-[#94A3B8]">
      <Header />
      <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24" role="main">
        <Outlet />
      </main>
      <Footer />

      {/* Floating AI assistant — fixed position, available on all pages */}
      <ChatWidget />
    </div>
  );
}
