/*
  ARQUIVO: src/firebase.js
  DESCRIÇÃO: Este arquivo conecta o projeto ao Firebase.
*/

// Importa as ferramentas do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Configuração do Seu Projeto ---
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsv7sxnRsqqbHMaPCi5Ib25KoQqXrMGjU",
  authDomain: "oficina-proativa.firebaseapp.com",
  projectId: "oficina-proativa",
  storageBucket: "oficina-proativa.firebasestorage.app",
  messagingSenderId: "955379383765",
  appId: "1:955379383765:web:31b8ff7b1e0fa9a296915c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Disponibiliza os dois serviços que vamos usar no site:
// 1. auth: O sistema de Login (Quem é você?)
export const auth = getAuth(app);
// 2. db: O Banco de Dados (Onde guardamos tudo)
export const db = getFirestore(app);