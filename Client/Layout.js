import React from 'react';
import { AuthProvider } from './components/auth/AuthContext';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import RoleRedirect from './components/auth/RoleRedirect';

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <RoleRedirect />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}