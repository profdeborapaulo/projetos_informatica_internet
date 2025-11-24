/*
  ARQUIVO: src/App.js
  DESCRIÇÃO: Este é o "GPS" do seu site.
  Ele diz ao React qual página mostrar para cada URL.
*/

import React from 'react';
// Importa o sistema de rotas (o GPS)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa os "seguranças" do login
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Importa todas as "páginas" (as telas) do site
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import AgendaPage from './pages/AgendaPage';
import ClientPortalPage from './pages/ClientPortalPage';

function App() {
  return (
    // O AuthProvider "abraça" o site,
    // para que toda página saiba quem está logado.
    <AuthProvider>
      <Router>
        {/* O <Routes> escolhe qual página (Route) mostrar */}
        <Routes>
          
          {/* --- Rotas Públicas (Abertas para todos) --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* --- Rotas Protegidas (Só para Mecânicos) --- */}
          <Route 
            path="/dashboard" 
            element={
              // O ProtectedRoute é o "segurança" na porta do dashboard.
              // Ele só deixa entrar quem tiver o "cargo" (allowedRoles) de 'mecanico'.
              <ProtectedRoute allowedRoles={['mecanico']}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agenda" 
            element={
              <ProtectedRoute allowedRoles={['mecanico']}>
                <AgendaPage />
              </ProtectedRoute>
            } 
          />
          
          {/* --- Rotas Protegidas (Só para Clientes) --- */}
          <Route 
            path="/portal" 
            element={
              // Este "segurança" só deixa entrar quem for 'cliente'.
              <ProtectedRoute allowedRoles={['cliente']}>
                <ClientPortalPage />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;