/*
  ARQUIVO: src/pages/LandingPage.js
  DESCRIÇÃO: Esta é a "vitrine" do seu site.
  É a primeira página que um visitante vê.
*/

import React from 'react';
import { Link } from 'react-router-dom';

// Importa todos os ícones que vamos usar nesta página
import { GiAutoRepair, GiCarKey, GiCarWheel } from 'react-icons/gi';
import { FaUserFriends, FaFilePdf, FaWrench, FaCalendarCheck } from 'react-icons/fa';

export default function LandingPage() {
  return (
    // Usa o 'backgroundColor' do nosso index.css
    <div style={{ backgroundColor: 'var(--cor-fundo)' }}>
      
      {/* 1. Header (Menu de Navegação) */}
      {/* 'sticky-top' faz o menu "grudar" no topo quando o usuário rola */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container py-2">
          {/* O Link 'to="/"' leva para a página inicial */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            {/* A logo que fica laranja no fundo escuro (graças ao index.css) */}
            <GiAutoRepair className="text-primary me-2" style={{fontSize: '2.2rem'}} />
            <span className="fs-3 fw-bold">Oficina Proativa</span>
          </Link>
          {/* Links de ação à direita */}
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-light me-2 fs-5">
              Entrar
            </Link>
            <Link to="/signup" className="btn btn-primary fs-5">
              Criar Conta
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Seção Principal (Chamada de Ação) */}
      <header className="bg-white">
        <div className="container text-center py-5 my-5">
          <h1 className="display-3 fw-bolder text-dark mb-3">
            Mude da <span className="text-danger">Reação</span> para a <span className="text-primary">Proação</span>.
          </h1>
          <p className="lead text-muted col-lg-8 mx-auto">
            Pare de esperar o cliente ter um problema. Com a Oficina Proativa, você antecipa as necessidades, fideliza clientes e enche sua agenda.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/signup" className="btn btn-primary btn-lg px-5 py-3 fs-5 fw-bold">
              Comece Agora (É Grátis)
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Seção de Recursos (O que o site faz) */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bolder mb-5">Uma Ferramenta Completa para sua Oficina</h2>
          <div className="row g-4 text-center">
            {/* Card de Recurso 1 */}
            <div className="col-lg-4">
              <div className="card h-100 p-3">
                <FaUserFriends className="text-primary" style={{ fontSize: '3rem', margin: '0 auto' }} />
                <div className="card-body">
                  <h4 className="fw-bold">Gestão de Clientes e Carros</h4>
                  <p className="card-text text-muted">Mantenha um cadastro organizado de todos os seus clientes e os veículos de cada um.</p>
                </div>
              </div>
            </div>
            {/* Card de Recurso 2 */}
            <div className="col-lg-4">
              <div className="card h-100 p-3">
                <FaCalendarCheck className="text-primary" style={{ fontSize: '3rem', margin: '0 auto' }} />
                <div className="card-body">
                  <h4 className="fw-bold">Agenda Proativa</h4>
                  <p className="card-text text-muted">A cada serviço, agende a próxima revisão e deixe o cliente confirmar online.</p>
                </div>
              </div>
            </div>
            {/* Card de Recurso 3 */}
            <div className="col-lg-4">
              <div className="card h-100 p-3">
                <FaFilePdf className="text-primary" style={{ fontSize: '3rem', margin: '0 auto' }} />
                <div className="card-body">
                  <h4 className="fw-bold">Histórico e PDF</h4>
                  <p className="card-text text-muted">Acesse o histórico completo e gere um PDF profissional para o seu cliente com um clique.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Seção "Como Funciona" */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bolder mb-5">Como Funciona o Fluxo Proativo</h2>
          <div className="row g-4 align-items-center">
            {/* Passo 1 */}
            <div className="col-md-3 text-center">
              <FaWrench style={{ fontSize: '4rem', color: 'var(--cor-primaria)' }} />
              <h5 className="fw-bold mt-2">1. Registre o Serviço</h5>
              <p className="text-muted">O cliente veio à oficina. Você registra o serviço feito e o valor.</p>
            </div>
            {/* Passo 2 */}
            <div className="col-md-3 text-center">
              <FaCalendarCheck style={{ fontSize: '4rem', color: 'var(--cor-acento)' }} />
              <h5 className="fw-bold mt-2">2. Agende o Próximo</h5>
              <p className="text-muted">Você agenda a próxima revisão (ex: daqui a 6 meses) com status "Pendente".</p>
            </div>
            {/* Passo 3 */}
            <div className="col-md-3 text-center">
              <GiCarKey style={{ fontSize: '4rem', color: 'var(--cor-sucesso)' }} />
              <h5 className="fw-bold mt-2">3. Cliente Confirma</h5>
              <p className="text-muted">O cliente acessa o portal dele, vê o agendamento pendente e confirma com um clique.</p>
            </div>
            {/* Passo 4 */}
            <div className="col-md-3 text-center">
              <GiCarWheel style={{ fontSize: '4rem', color: 'var(--cor-primaria)' }} />
              <h5 className="fw-bold mt-2">4. Agenda Cheia</h5>
              <p className="text-muted">Sua agenda de mecânico atualiza sozinha. Você garante o retorno do cliente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer (Rodapé) */}
      <footer className="bg-dark text-white text-center p-5">
        <div className="container">
          <p className="lead mb-0">Transforme sua oficina hoje mesmo.</p>
          <p className="mb-0">© 2025 Oficina Proativa. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}