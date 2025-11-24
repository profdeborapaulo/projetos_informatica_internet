/*
  ARQUIVO: src/pages/SignUpPage.js
  DESCRIÇÃO: A tela de cadastro de novas contas.
*/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GiAutoRepair } from 'react-icons/gi';

// --- Componente: Layout de Autenticação (Reusado) ---
const AuthLayout = ({ title, error, children, footer }) => (
  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: 'var(--cor-fundo)' }}>
    <div className="card shadow-lg" style={{ width: '100%', maxWidth: '450px' }}>
      <div className="card-body p-4 p-md-5">
        <div className="text-center mb-4">
          <GiAutoRepair className="text-primary" style={{ fontSize: '3rem', color: 'var(--cor-acento)' }} />
          <h3 className="fw-bold mt-2" style={{ color: 'var(--cor-secundaria)' }}>Oficina Proativa</h3>
        </div>
        <h2 className="card-title text-center h4 mb-4">{title}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {children}
        <div className="text-center mt-3">
          {footer}
        </div>
      </div>
    </div>
  </div>
);

// --- Página de Cadastro Principal ---
export default function SignUpPage() {
  // Estados para o formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('cliente');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pega as funções do "cofre" de autenticação
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  // Efeito que redireciona após o cadastro
  useEffect(() => {
    if (currentUser) {
      if (currentUser.userType === 'mecanico') navigate('/dashboard');
      else navigate('/portal');
    }
  }, [currentUser, navigate]);

  // Função chamada ao clicar em "Criar Conta"
  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 6) return setError("A senha precisa ter no mínimo 6 caracteres.");
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password, userType);
      
    } catch (err) {
      // --- Bloco de Erro Melhorado ---
      // Agora ele nos dirá o erro real
      console.error("Erro no cadastro:", err.code); 
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso por outra conta.');
      } else if (err.code === 'permission-denied') {
        // Este era o erro que estava acontecendo
        setError('Erro de Permissão: O banco de dados recusou a escrita. Verifique as Regras do Firestore.');
      } else if (err.code === 'auth/operation-not-allowed') {
        // Este era o outro erro provável
        setError('Erro de Configuração: O login por e-mail e senha não está ativado no Firebase.');
      }
      else {
        setError('Falha ao criar conta. Tente novamente.');
      }
      // --- Fim do Bloco ---
    }
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      error={error}
      footer={<p className="text-muted">Já tem uma conta? <Link to="/login">Acesse</Link></p>}
    >
      <form onSubmit={handleSubmit}>
        {/* Seleção de Tipo de Conta (Cliente/Oficina) */}
        <div className="mb-3">
          <label className="form-label">Eu sou:</label>
          <div className="btn-group d-flex" role="group">
            <input 
              type="radio" className="btn-check" name="userType" id="userTypeCliente" 
              value="cliente" checked={userType === 'cliente'} onChange={(e) => setUserType(e.target.value)} 
            />
            <label className="btn btn-outline-primary w-100" htmlFor="userTypeCliente">Cliente</label>
            
            <input 
              type="radio" className="btn-check" name="userType" id="userTypeMecanico" 
              value="mecanico" checked={userType === 'mecanico'} onChange={(e) => setUserType(e.target.value)} 
            />
            <label className="btn btn-outline-primary w-100" htmlFor="userTypeMecanico">Oficina</label>
          </div>
        </div>

        {/* Campos de Email e Senha */}
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input 
            className="form-control form-control-lg" 
            id="email" type="email" value={email} 
            onChange={(e) => setEmail(e.target.value)} required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Senha (mín. 6 caracteres)</label>
          <input 
            className="form-control form-control-lg" 
            id="password" type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)} required 
          />
        </div>
        <div className="d-grid">
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}