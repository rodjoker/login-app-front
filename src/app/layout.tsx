// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login & Dashboard App",
  description: "Aplicación de login y dashboard con Next.js, Radix UI y Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}