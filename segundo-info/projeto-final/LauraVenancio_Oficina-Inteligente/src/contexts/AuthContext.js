/*
  ARQUIVO: src/contexts/AuthContext.js
  DESCRIÇÃO: Este é o "cérebro" do login.
  Ele guarda quem está logado (o 'currentUser') e
  fornece as funções de 'login', 'logout' e 'signup'.
*/

import React, { useContext, useState, useEffect } from 'react';
// Importa o "motor" de auth e banco de dados
import { auth, db } from '../firebase'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
// Importa funções do banco para salvar o TIPO de usuário
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Cria o "cofre" (o Contexto)
const AuthContext = React.createContext();

// Cria um atalho "useAuth()" para que outros arquivos
// possam acessar facilmente o que está no cofre.
export function useAuth() {
  return useContext(AuthContext);
}

// Este é o componente "Provedor" que "abraça" nosso site (no App.js)
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Guarda quem está logado
  const [loading, setLoading] = useState(true); // Controla o "carregando" inicial

  // --- Função de Cadastro (signup) ---
  async function signup(email, password, userType) {
    // 1. Cria o usuário no Firebase Authentication (login e senha)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Salva o "cargo" (Mecânico ou Cliente) no Banco de Dados (Firestore)
    // Isso é crucial para sabermos quem é quem.
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      userType: userType // 'mecanico' ou 'cliente'
    });
    
    return userCredential;
  }

  // --- Função de Login ---
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // --- Função de Logout ---
  function logout() {
    return signOut(auth);
  }

  // --- O "Ouvinte" de Autenticação ---
  // Este useEffect roda uma vez e fica "ouvindo" o status do login
  useEffect(() => {
    // O 'onAuthStateChanged' avisa sempre que alguém faz login ou logout
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Se um usuário fez login...
        // 1. Busca o perfil dele no banco de dados (Firestore)
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          // 2. Se achamos o perfil, junta os dados do Login + Perfil
          // Agora o currentUser sabe o email E o userType!
          setCurrentUser({ ...user, ...userDocSnap.data() });
        } else {
          setCurrentUser(user); 
        }
      } else {
        // Se fez logout, limpa o usuário
        setCurrentUser(null);
      }
      // Acabou o carregamento inicial
      setLoading(false);
    });

    // Limpa o "ouvinte" quando o componente sai da tela
    return unsubscribe;
  }, []); // O array vazio [] significa "rode isso apenas uma vez"

  // O "valor" que nosso cofre (Contexto) vai prover para todo o site
  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  // Só renderiza o site (children) quando o carregamento inicial (loading) terminar.
  // Isso evita que o site "pisque" e mostre a tela de login por 1 segundo.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}