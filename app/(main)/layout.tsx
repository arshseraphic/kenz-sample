// app/[main]/layout.tsx
"use client";

import ClientLayout from "../components/ClientLayout";
import { AuthProvider } from "@/lib/context/AuthContext";
import { CountryProvider } from "@/lib/context/CountryContext";
import { ToastContainer } from "react-toastify";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <AuthProvider>
        <CountryProvider>
          <ClientLayout>{children}</ClientLayout>
        </CountryProvider>
      </AuthProvider>
    </>
  );
}
