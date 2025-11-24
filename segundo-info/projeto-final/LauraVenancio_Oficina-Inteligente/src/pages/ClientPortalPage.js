/*
  ARQUIVO: src/pages/ClientPortalPage.js
  DESCRIÇÃO: O portal do cliente.
  O cliente vê os agendamentos pendentes, o histórico de serviços
  e as dicas de manutenção.
*/

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  getDocs,
  limit
} from "firebase/firestore";
import { GiAutoRepair } from 'react-icons/gi'; // Ícone

// --- Componente: Item do Histórico ---
// Um mini-componente para mostrar um serviço passado
const ServiceHistoryItem = ({ service }) => (
  <div className="list-group-item list-group-item-action bg-light">
    <div className="d-flex w-100 justify-content-between">
      <h6 className="mb-1 fw-bold">{service.serviceDone}</h6>
      {/* Mostra o valor formatado como R$ */}
      <span className="fw-bold text-success">
        {service.serviceValue ? service.serviceValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}
      </span>
    </div>
    <p className="mb-1 small text-muted">Realizado em: {service.serviceDate}</p>
    {/* Mostra as notas do mecânico, se existirem */}
    {service.notes && (
      <p className="mb-1 small fst-italic">Obs: "{service.notes}"</p>
    )}
  </div>
);

// --- Componente: Dicas de Cuidado ---
// O menu-sanfona (Accordion) com as dicas para o cliente
const CarCareTips = () => (
  <div className="card shadow-sm border-0 mb-4">
    <div className="card-header bg-white border-0">
      <h2 className="h4 mb-0 text-dark fw-bold">💡 Dicas de Cuidado com o Veículo</h2>
    </div>
    <div className="card-body p-4">
      {/* 'accordion' é o componente sanfona do Bootstrap */}
      <div className="accordion" id="tipsAccordion">
        
        {/* Dica 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              <strong>Verificação Semanal: Pneus e Nível do Óleo</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#tipsAccordion">
            <div className="accordion-body">
              <strong>Pneus:</strong> Mantenha os pneus calibrados de acordo com o manual. Pneus murchos aumentam o consumo de combustível e desgastam mais rápido.
              <br /><br />
              <strong>Óleo:</strong> Com o motor frio, verifique a vareta de óleo. O nível deve estar entre as marcas "MÍN" e "MÁX". Óleo baixo pode fundir o motor.
            </div>
          </div>
        </div>
        
        {/* Dica 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>Atenção aos Sinais: Luzes do Painel e Barulhos</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#tipsAccordion">
            <div className="accordion-body">
              Nunca ignore as luzes de advertência no painel. A luz de injeção (amarela) ou a de temperatura (vermelha) indicam problemas sérios. Barulhos metálicos ao frear ou chiados constantes também são sinais de que uma visita à oficina é necessária.
            </div>
          </div>
        </div>

        {/* Dica 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>Fluidos e Filtros: O "Sangue" do Carro</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#tipsAccordion">
            <div className="accordion-body">
              Além do óleo, verifique regularmente o nível do fluido de arrefecimento (água do radiador) e o fluido de freio. O filtro de ar do motor também é vital: um filtro sujo "sufoca" o motor, aumentando o consumo.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);


// --- Componente Principal do Portal do Cliente ---
export default function ClientPortalPage() {
  const { currentUser, logout } = useAuth(); // Pega o cliente logado
  const navigate = useNavigate();

  // Estados (memória) da página
  const [clientProfileId, setClientProfileId] = useState(null); // O ID do cliente (ex: qT...)
  const [myCars, setMyCars] = useState([]); // Lista de carros
  const [myAppointments, setMyAppointments] = useState([]); // Lista de agendamentos futuros
  const [myHistory, setMyHistory] = useState([]); // Lista de serviços passados
  const [loading, setLoading] = useState(true);
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

  // --- ETAPA 1: Encontrar o Perfil de Cliente ---
  // Roda quando o usuário (currentUser) é carregado
  useEffect(() => {
    if (!currentUser) return;

    // Procura na coleção 'clients' por um cliente com o MESMO e-mail do login
    const findClientProfile = async () => {
      setError('');
      try {
        const q = query(
          collection(db, "clients"), 
          where("email", "==", currentUser.email), // A condição de busca
          limit(1) // Pára assim que encontrar um
        );
        
        const querySnapshot = await getDocs(q); // Executa a busca

        if (querySnapshot.empty) {
          // Se não achou, o mecânico não cadastrou esse e-mail
          setError("Sua conta de cliente não foi encontrada nos registros de uma oficina. Peça para sua oficina cadastrar seu e-mail.");
          setLoading(false);
        } else {
          // Se achou, guarda o ID do perfil (ex: "qT...xyz") no estado
          setClientProfileId(querySnapshot.docs[0].id); 
        }
      } catch (err) {
        setError("Erro ao buscar seu perfil de cliente.");
        setLoading(false);
      }
    };

    findClientProfile();
  }, [currentUser]); // Roda sempre que o 'currentUser' mudar

  // --- ETAPA 2: Buscar Carros, Agendamentos e Histórico ---
  // Roda DEPOIS que a Etapa 1 encontra o ID do perfil
  useEffect(() => {
    // Se ainda não temos o ID do perfil, não faz nada
    if (!clientProfileId) return;

    // 1. Busca os Carros (Onde 'clientId' == ao ID que achamos)
    const carsQuery = query(collection(db, "cars"), where("clientId", "==", clientProfileId));
    const unsubscribeCars = onSnapshot(carsQuery, (snapshot) => {
      setMyCars(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false); // Para de carregar
    }, (err) => setError("Erro ao carregar veículos."));

    // 2. Busca os Agendamentos Futuros ('appointments')
    const apptQuery = query(
      collection(db, "appointments"),
      where("clientId", "==", clientProfileId),
      orderBy("apptDate", "desc") // Mais recentes primeiro
    );
    const unsubscribeAppts = onSnapshot(apptQuery, (snapshot) => {
      setMyAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false); 
    }, (err) => setError("Erro ao carregar agendamentos."));

    // 3. Busca o Histórico de Serviços ('serviceHistory')
    const historyQuery = query(
      collection(db, "serviceHistory"),
      where("clientId", "==", clientProfileId),
      orderBy("serviceDate", "desc") // Mais recentes primeiro
    );
    const unsubscribeHistory = onSnapshot(historyQuery, (snapshot) => {
      setMyHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => setError("Erro ao carregar histórico."));

    // Limpa os "ouvintes" ao sair da página
    return () => {
      unsubscribeCars();
      unsubscribeAppts();
      unsubscribeHistory();
    };
  }, [clientProfileId]); // Roda sempre que o 'clientProfileId' for encontrado

  // --- Ação de Confirmar o Agendamento ---
  const handleConfirmAppointment = async (serviceId) => {
    try {
      // Encontra o agendamento pelo ID e atualiza o status para 'confirmed'
      await updateDoc(doc(db, "appointments", serviceId), { status: 'confirmed' });
      alert("Agendamento confirmado com sucesso! Sua oficina foi notificada.");
    } catch (error) {
      alert("Falha ao confirmar agendamento.");
    }
  };

  // Filtra os agendamentos pendentes
  const pendingAppts = myAppointments.filter(a => a.status === 'pending');

  // --- Renderização (O que aparece na tela) ---
  return (
    <div style={{ backgroundColor: 'var(--cor-fundo)', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* 1. Header (Navbar) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/portal">
            {/* Logo Laranja */}
            <GiAutoRepair className="text-primary me-2" style={{fontSize: '2rem'}} />
            <span className="fs-4 fw-bold">Meu Portal</span>
          </Link>
          <button onClick={handleLogout} className="btn btn-danger" aria-label="Sair da conta">
            Sair
          </button>
        </div>
      </nav>

      {/* 2. Conteúdo da Página */}
      <div className="container mt-4">
        <div className="alert alert-info shadow-sm">
          Bem-vindo, <strong>{currentUser?.email}</strong>!
        </div>

        {/* Mostra "Carregando..." ou o Erro */}
        {loading && <p className="text-center">Carregando suas informações...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* === 1. SEÇÃO DE AGENDAMENTOS PENDENTES (O FOCO!) === */}
        {!loading && !error && (
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-warning border-0">
              <h2 className="h4 mb-0 text-dark fw-bold">Ações Pendentes</h2>
            </div>
            <div className="card-body p-4">
              {pendingAppts.length === 0 && (
                <p className="text-muted">Você não tem nenhuma revisão pendente para confirmar. 😄</p>
              )}
              {/* Mapeia e mostra cada agendamento pendente */}
              {pendingAppts.map(appt => (
                <div key={appt.id} className="card border-warning shadow-sm mb-3">
                  <div className="card-body">
                    <h4 className="card-title text-danger fw-bold">
                      Revisão Recomendada: {new Date(appt.apptDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </h4>
                    <h5 className="card-subtitle mb-2 fw-bold">{appt.carPlate} - {appt.carModel}</h5>
                    <p className="card-text text-muted">Sua oficina recomendou este agendamento referente a: "{appt.serviceDescription}"</p>
                    {/* O botão de confirmar */}
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={() => handleConfirmAppointment(appt.id)}
                      aria-label={`Confirmar agendamento para ${appt.carPlate}`}
                    >
                      ✅ Confirmar Agendamento
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === 2. SEÇÃO DE MEUS VEÍCULOS E HISTÓRICO === */}
        {!loading && !error && (
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0">
              <h2 className="h4 mb-0 text-dark fw-bold">Meus Veículos e Histórico</h2>
            </div>
            <div className="card-body p-4">
              {myCars.length === 0 && <p className="text-muted">Você ainda não tem veículos cadastrados pela sua oficina.</p>}
              
              {/* Mapeia e mostra cada carro */}
              {myCars.map(car => (
                <div key={car.id} className="mb-4">
                  <h4 className="h5 text-primary fw-bold p-3 bg-light rounded-3">
                    {car.plate} - {car.make} {car.model} ({car.year})
                  </h4>
                  
                  <h6 className="ms-1">Histórico de Serviços:</h6>
                  <div className="list-group">
                    {/* Filtra a lista de histórico SÓ para este carro */}
                    {myHistory.filter(s => s.carId === car.id).length === 0 && (
                      <p className="ms-1 small text-muted">Nenhum histórico de serviço para este carro.</p>
                    )}
                    {myHistory.filter(s => s.carId === car.id).map(service => (
                      <ServiceHistoryItem key={service.id} service={service} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* === 3. SEÇÃO DE DICAS === */}
        {!loading && !error && (
          <CarCareTips />
        )}
        
      </div>
    </div>
  );
}