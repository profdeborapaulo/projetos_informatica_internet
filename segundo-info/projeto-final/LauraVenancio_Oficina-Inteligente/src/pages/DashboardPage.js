/*
  ARQUIVO: src/pages/DashboardPage.js
  DESCRIÇÃO: O painel de controle principal do mecânico.
  Mostra os gráficos de resumo e permite cadastrar e ver clientes.
*/

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import ClientCarsModal from '../components/ClientCarsModal';
import { GiAutoRepair } from 'react-icons/gi'; 

// Importa os componentes de Gráfico
import { Line, Doughnut } from 'react-chartjs-2';
// Importa as "peças" necessárias do Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// "Registra" as peças para que o Chart.js saiba como desenhar
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- Componente: Gráfico de Faturamento (Linha) ---
// Este gráfico lê da coleção 'serviceHistory'
const RevenueChart = ({ services }) => {
  // Prepara os "rótulos" (meses) e os "dados" (começando em zero)
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: [
      {
        label: 'Faturamento Mensal (R$)',
        data: Array(12).fill(0), // [0, 0, 0, ...]
        fill: true,
        backgroundColor: 'rgba(30, 58, 138, 0.2)', // Azul-cobalto transparente
        borderColor: 'rgba(30, 58, 138, 1)',     // Azul-cobalto sólido
        tension: 0.1
      }
    ]
  };

  // Preenche o array de dados com o faturamento
  services.forEach(service => {
    // Pega o mês (0 = Jan, 1 = Fev, etc.)
    const month = new Date(service.serviceDate + 'T00:00:00').getMonth(); 
    // Soma o valor do serviço no mês correspondente
    data.datasets[0].data[month] += service.serviceValue || 0;
  });

  return <Line data={data} options={{ responsive: true, plugins: { title: { display: true, text: 'Faturamento de Serviços Concluídos' } } }} />;
};

// --- Componente: Gráfico de Status (Rosca) ---
// Este gráfico lê da coleção 'appointments'
const StatusChart = ({ appointments }) => {
  // Conta quantos agendamentos existem para cada status
  const statusCounts = {
    pending: 0,
    confirmed: 0,
    done: 0,
    cancelled: 0
  };
  appointments.forEach(appt => {
    if (statusCounts[appt.status] !== undefined) {
      statusCounts[appt.status]++;
    }
  });

  // Prepara os dados para o gráfico
  const data = {
    labels: ['Pendentes', 'Confirmados', 'Concluídos', 'Cancelados'],
    datasets: [
      {
        label: 'Status de Agendamentos',
        data: [statusCounts.pending, statusCounts.confirmed, statusCounts.done, statusCounts.cancelled],
        // Usa nossa paleta de cores "automotiva"
        backgroundColor: [
          '#F59E0B', // Laranja Acento (Pendente)
          '#198754', // Verde Sucesso (Confirmado)
          '#1E3A8A', // Azul Primário (Concluído)
          '#dc3545'  // Vermelho Perigo (Cancelado)
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={{ responsive: true, plugins: { title: { display: true, text: 'Status dos Agendamentos' } } }} />;
};


// --- Componente Principal do Dashboard ---
export default function DashboardPage() {
  const { currentUser, logout } = useAuth(); // Pega o usuário logado
  const navigate = useNavigate();

  // Estados (memória) da página
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clients, setClients] = useState([]);         // Lista de clientes
  const [serviceHistory, setServiceHistory] = useState([]); // Histórico (para gráfico de faturamento)
  const [appointments, setAppointments] = useState([]);   // Agendamentos (para gráfico de status)
  const [selectedClient, setSelectedClient] = useState(null); // Controla o modal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- Função de Sair ---
  async function handleLogout() {
    try { 
      await logout(); 
      navigate('/'); // Envia para a Landing Page
    } catch { 
      alert("Falha ao sair."); 
    }
  }

  // --- Efeito de Busca de Dados ---
  // Roda quando a página carrega para buscar os dados do mecânico
  useEffect(() => {
    if (!currentUser) return; // Se não tem usuário, não faz nada

    // 1. Busca Clientes (só deste mecânico)
    const qClients = query(collection(db, "clients"), where("mechanicId", "==", currentUser.uid));
    const unsubscribeClients = onSnapshot(qClients, (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // 2. Busca o Histórico de Serviços (para o gráfico de faturamento)
    const qHistory = query(collection(db, "serviceHistory"), where("mechanicId", "==", currentUser.uid));
    const unsubscribeHistory = onSnapshot(qHistory, (snapshot) => {
      setServiceHistory(snapshot.docs.map(doc => doc.data()));
    });

    // 3. Busca os Agendamentos Futuros (para o gráfico de status)
    const qAppointments = query(collection(db, "appointments"), where("mechanicId", "==", currentUser.uid));
    const unsubscribeAppointments = onSnapshot(qAppointments, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => doc.data()));
    });

    // Limpa os "ouvintes" quando o usuário sai da página
    return () => {
      unsubscribeClients();
      unsubscribeHistory();
      unsubscribeAppointments();
    };
  }, [currentUser]); // Roda de novo se o usuário mudar

  // --- Função de Adicionar Cliente ---
  async function handleAddClient(e) {
    e.preventDefault(); // Impede o formulário de recarregar
    setError('');
    if (!clientName || !clientPhone) return setError("Nome e Telefone são obrigatórios.");
    
    setLoading(true);
    try {
      // Adiciona o novo cliente ao banco de dados na coleção "clients"
      await addDoc(collection(db, "clients"), {
        name: clientName, 
        email: clientEmail, 
        phone: clientPhone,
        mechanicId: currentUser.uid // "Etiqueta" o cliente com o ID do mecânico
      });
      // Limpa o formulário
      setClientName(''); setClientEmail(''); setClientPhone('');
    } catch (err) {
      setError("Falha ao cadastrar cliente.");
    }
    setLoading(false);
  }

  // --- Renderização (O que aparece na tela) ---
  return (
    <div style={{ backgroundColor: 'var(--cor-fundo)', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* 1. Header (Navbar) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
            {/* A logo laranja (definida no index.css) */}
            <GiAutoRepair className="text-primary me-2" style={{fontSize: '2rem'}} />
            <span className="fs-4 fw-bold">Dashboard do Mecânico</span>
          </Link>
          <div className="d-flex">
            {/* Botão de navegação fácil para a Agenda */}
            <Link to="/agenda" className="btn btn-primary me-2" aria-label="Ver minha agenda de serviços">
              Ver Minha Agenda
            </Link>
            <button onClick={handleLogout} className="btn btn-danger" aria-label="Sair da conta">
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Conteúdo da Página */}
      <div className="container mt-4">
        
        <div className="alert alert-info shadow-sm">
          Bem-vindo, <strong>{currentUser?.email}</strong>!
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}

        {/* --- SEÇÃO DE GRÁFICOS --- */}
        <h2 className="h3 fw-bold mb-3">Visão Geral</h2>
        <div className="row g-4 mb-4">
          {/* Gráfico de Linha (Faturamento) */}
          <div className="col-lg-8">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                {/* Passa o 'serviceHistory' para o gráfico de faturamento */}
                <RevenueChart services={serviceHistory} />
              </div>
            </div>
          </div>
          {/* Gráfico de Rosca (Status) */}
          <div className="col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4 d-flex align-items-center justify-content-center">
                {/* Passa os 'appointments' para o gráfico de status */}
                <StatusChart appointments={appointments} />
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="h3 fw-bold mb-3">Gerenciamento de Clientes</h2>
        {/* Layout em 2 Colunas (Clientes) */}
        <div className="row g-4">
          
          {/* Coluna 1: Formulário de Adicionar Cliente */}
          <div className="col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h4 card-title mb-3">Adicionar Novo Cliente</h3>
                <form onSubmit={handleAddClient}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="clientName">Nome completo</label>
                    <input className="form-control" id="clientName" type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="clientEmail">Email (para login do cliente)</label>
                    <input className="form-control" id="clientEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="clientPhone">Telefone</label>
                    <input className="form-control" id="clientPhone" type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
                  </div>
                  <div className="d-grid">
                    <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
                      {loading ? 'Salvando...' : 'Salvar Cliente'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Coluna 2: Lista de Clientes */}
          <div className="col-lg-8">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h4 card-title mb-3">Meus Clientes ({clients.length})</h3>
                <div className="list-group">
                  {clients.length === 0 && <p className="text-muted">Nenhum cliente cadastrado ainda.</p>}
                  
                  {clients.map(client => (
                    // Cada cliente vira um item na lista
                    <div key={client.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold fs-6">{client.name}</div>
                        <div className="text-muted small">
                          {client.email && <span>{client.email} | </span>}
                          <span>{client.phone}</span>
                        </div>
                      </div>
                      {/* Botão que abre o modal */}
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setSelectedClient(client)}
                        aria-label={`Gerenciar carros de ${client.name}`}
                      >
                        Gerenciar Carros
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Renderiza o Modal de Carros (se 'selectedClient' não for nulo) */}
      {selectedClient && (
        <ClientCarsModal 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
    </div>
  );
}