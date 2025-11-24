/*
  ARQUIVO: src/index.js
  DESCRIÇÃO: Este é o "botão de ignição" do projeto.
  Ele diz ao React onde começar a desenhar o aplicativo.
*/

// Importa as bibliotecas principais do React
import React from 'react';
import ReactDOM from 'react-dom/client';

// --- Importações de Estilo ---
// 1. O CSS base do Bootstrap (a "lata" do carro)
import 'bootstrap/dist/css/bootstrap.min.css';
// 2. O JavaScript do Bootstrap (para o menu-sanfona das Dicas funcionar)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// 3. Nosso CSS personalizado (a "pintura" e o "polimento")
import './index.css'; 

// Importa nosso componente principal
import App from './App';

// Encontra a "garagem" (a div 'root' no index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Manda o React "ligar" e desenhar o aplicativo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);