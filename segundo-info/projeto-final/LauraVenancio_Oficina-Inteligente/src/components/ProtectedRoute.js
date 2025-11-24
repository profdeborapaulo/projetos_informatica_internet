/*
  ARQUIVO: src/components/ProtectedRoute.js
  DESCRIÇÃO: O "Segurança" que protege nossas rotas.
  Ele verifica se o usuário pode ou não acessar uma página.
*/

import React from 'react';
// Navigate é usado para "chutar" o usuário para outra página
import { Navigate } from 'react-router-dom';
// Importa o atalho para o "cofre" de autenticação
import { useAuth } from '../contexts/AuthContext';

// Este componente recebe a página (children) e os cargos permitidos (allowedRoles)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth(); // Pergunta ao "cofre": quem está logado?

  // --- Verificação 1: Está logado? ---
  if (!currentUser) {
    // Se NÃO está logado, chuta ele para a página de login.
    return <Navigate to="/login" />;
  }

  // --- Verificação 2: Tem o cargo certo? ---
  if (allowedRoles && !allowedRoles.includes(currentUser.userType)) {
    // Se a página exige um cargo (ex: 'mecanico')
    // e o usuário logado NÃO tem esse cargo (ex: é 'cliente')...
    // Chuta ele de volta para a página inicial.
    return <Navigate to="/" />; 
  }

  // Se passou nas duas verificações...
  // Deixa ele ver a página (children).
  return children;
};

export default ProtectedRoute;