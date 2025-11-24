/*
  ARQUIVO: src/pages/LoginPage.js
  DESCRIÇÃO: A tela de login para usuários (mecânicos ou clientes).
  Ela usa o "AuthLayout" para manter o visual limpo e centralizado.
*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GiAutoRepair } from 'react-icons/gi';

// --- Componente: Layout de Autenticação ---
// Uma "casca" que reusamos na tela de Login e Cadastro
const AuthLayout = ({ title, error, children, footer }) => (
  // Fundo cinza claro que cobre a tela toda
  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: 'var(--cor-fundo)' }}>
    {/* O "card" (caixa) branco no centro */}
    <div className="card shadow-lg" style={{ width: '100%', maxWidth: '450px' }}>
      <div className="card-body p-4 p-md-5">
        {/* Logo (Laranja, definida no index.css) */}
        <div className="text-center mb-4">
          <GiAutoRepair className="text-primary" style={{ fontSize: '3rem', color: 'var(--cor-acento)' }} />
          <h3 className="fw-bold mt-2" style={{ color: 'var(--cor-secundaria)' }}>Oficina Proativa</h3>
        </div>
        <h2 className="card-title text-center h4 mb-4">{title}</h2>
        
        {/* Caixa de erro (só aparece se 'error' não estiver vazio) */}
        {error && <div className="alert alert-danger">{error}</div>}
        
        {/* Aqui é onde o formulário (children) é colocado */}
        {children}
        
        {/* O rodapé do card */}
        <div className="text-center mt-3">
          {footer}
        </div>
      </div>
    </div>
  </div>
);

// --- Página de Login Principal ---
export default function LoginPage() {
  // Estados para guardar o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Mensagem de erro
  const [loading, setLoading] = useState(false); // Controla o botão "Entrando..."

  // Pega as funções de 'login' e 'currentUser' do nosso "cofre" (AuthContext)
  const { login, currentUser } = useAuth();
  const navigate = useNavigate(); // Para redirecionar o usuário

  // Efeito que "ouve" se o login foi bem-sucedido
  useEffect(() => {
    // Se o currentUser mudou (ou seja, o login funcionou)...
    if (currentUser) {
      // ...verifica o tipo de usuário e redireciona para o painel certo.
      if (currentUser.userType === 'mecanico') navigate('/dashboard');
      else navigate('/portal');
    }
  }, [currentUser, navigate]); // Roda sempre que o 'currentUser' mudar

  // Função chamada quando o usuário clica em "Entrar"
  async function handleSubmit(e) {
    e.preventDefault(); // Impede o recarregamento da página
    try {
      setError(''); // Limpa erros antigos
      setLoading(true); // Ativa o "carregando"
      await login(email, password);
      // Se o login funcionar, o useEffect acima cuida do redirecionamento
    } catch (err) {
      // Se o Firebase der erro (ex: senha errada)
      setError('Falha ao fazer login. Verifique seu e-mail e senha.');
    }
    setLoading(false); // Desativa o "carregando"
  }

  return (
    <AuthLayout
      title="Acesse sua conta"
      error={error}
      footer={<p className="text-muted">Não tem uma conta? <Link to="/signup">Cadastre-se</Link></p>}
    >
      {/* O formulário de login */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input 
            className="form-control form-control-lg" 
            id="email" type="email" value={email} 
            onChange={(e) => setEmail(e.target.value)} required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Senha</label>
          <input 
            className="form-control form-control-lg" 
            id="password" type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)} required 
          />
        </div>
        <div className="d-grid">
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}