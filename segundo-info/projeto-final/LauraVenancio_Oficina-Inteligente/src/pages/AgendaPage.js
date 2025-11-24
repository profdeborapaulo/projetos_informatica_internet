/*
  ARQUIVO: src/pages/AgendaPage.js
  DESCRIÇÃO: A Agenda Proativa (Kanban).
  Mostra os agendamentos em colunas e permite
  enviar notificações por E-mail e WhatsApp.
*/

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { GiAutoRepair } from 'react-icons/gi'; 
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Ícones de notificação

// --- Componente: Cartão de Agendamento ---
// Este é o "card" que aparece na coluna da agenda
const AppointmentCard = ({ appt, client, onUpdateStatus }) => {
  // Pega as informações de dentro do agendamento
  const { status, apptDate, carPlate, carModel, serviceDescription } = appt;
  
  // Define o estilo da borda com base no status
  let cardClass = "card shadow-sm mb-3";
  let dateClass = "h4 fw-bold";

  if (status === 'pending') {
    cardClass += " border-warning border-3";
    dateClass += " text-danger";
  } else if (status === 'confirmed') {
    cardClass += " border-success border-3";
  } else {
    cardClass += " border-light";
  }

  // --- Lógica de Notificação ---
  
  // Pega os dados do cliente para usar na mensagem
  const clientName = client ? client.name.split(' ')[0] : 'Cliente';
  const clientEmail = client ? client.email : '';
  const clientPhone = client ? client.phone.replace(/\D/g, '') : ''; // Remove "()" e "-"
  
  const siteLink = "`https://oficina-proativa.web.app/`"; 

// Cria o template (texto pronto) para o WhatsApp
  const whatsappText = encodeURIComponent(
`Olá ${clientName}! Aqui é da Oficina Proativa.

Temos um agendamento de revisão recomendado para o seu ${carModel} (Placa: ${carPlate}) referente a: "${serviceDescription}".

Data Sugerida: ${new Date(apptDate + 'T00:00:00').toLocaleDateString('pt-BR')}

Para confirmar este agendamento, por favor, acesse o nosso portal:
${siteLink}

Obrigado!
`
  );

  // Cria o template (texto pronto) para o Email
  const emailSubject = encodeURIComponent(`Lembrete de Agendamento - Oficina Proativa`);
  const emailBody = encodeURIComponent(
`Olá ${clientName},

Temos uma revisão recomendada para o seu veículo ${carModel} (Placa: ${carPlate}).

Agendamento: "${serviceDescription}"
Data Sugerida: ${new Date(apptDate + 'T00:00:00').toLocaleDateString('pt-BR')}

Para confirmar, acesse o nosso portal:
${siteLink}

Obrigado,
Equipe Oficina Proativa
`
  );

  // Gera os links que abrem o WhatsApp e o E-mail
  const whatsappLink = `https://wa.me/55${clientPhone}?text=${whatsappText}`;
  const emailLink = `mailto:${clientEmail}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className={cardClass}>
      <div className="card-body">
        {/* Informações do Agendamento */}
        <div className={dateClass}>{new Date(apptDate + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
        <h6 className="card-subtitle mb-2 fw-bold">{carPlate} - {carModel}</h6>
        <p className="card-text small text-muted">Agendamento de: "{serviceDescription}"</p>
        
        {/* Botões de Ação */}
        <div className="d-flex flex-wrap gap-2">
          
          {/* Botões de Notificação (só aparecem se o status for 'pending') */}
          {status === 'pending' && client && (
            <>
              {clientEmail && (
                <a 
                  href={emailLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                  aria-label="Notificar cliente por e-mail"
                >
                  <FaEnvelope /> Email
                </a>
              )}
              {clientPhone && (
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                  aria-label="Notificar cliente por WhatsApp"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              )}
              <div className="border-end" style={{ width: '1px', backgroundColor: '#eee', margin: '0 5px' }}></div>
            </>
          )}

          {/* Botões de Status */}
          {status === 'pending' && (
            <button className="btn btn-success btn-sm" onClick={() => onUpdateStatus(appt.id, 'confirmed')}>
              Confirmar (Manual)
            </button>
          )}
          {status === 'confirmed' && (
            <button className="btn btn-primary btn-sm" onClick={() => onUpdateStatus(appt.id, 'done')}>
              Marcar como Concluído
            </button>
          )}
          {(status === 'pending' || status === 'confirmed') && (
           <button className="btn btn-danger btn-sm" onClick={() => onUpdateStatus(appt.id, 'cancelled')}>
              Cancelar
            </button>
          )}
          
          {/* Emblemas de Status (para concluídos/cancelados) */}
          {status === 'done' && (
            <span className="badge bg-light text-dark">Serviço Concluído</span>
          )}
          {status === 'cancelled' && (
            <span className="badge bg-light text-danger">Cancelado</span>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Componente: Coluna Kanban ---
// Esta é a "casca" para cada uma das 3 colunas (Pendente, Confirmado, Concluído)
const KanbanColumn = ({ title, count, bgColorClass, children }) => (
  <div className={`col-lg-4 ${bgColorClass} p-3 rounded-3`}>
    <h3 className={`h4 mb-3 border-bottom pb-2 border-dark`}>{title} ({count})</h3>
    <div>
      {/* Aqui é onde os cartões (children) são colocados */}
      {children}
    </div>
  </div>
);

// --- Componente Principal da Agenda ---
export default function AgendaPage() {
  const { currentUser } = useAuth(); // Pega o mecânico logado
  
  // Estados (memória) da página
  const [appointments, setAppointments] = useState([]); // Guarda a lista de agendamentos
  const [clientsMap, setClientsMap] = useState({}); // Guarda um "mapa" de clientes
  const [loading, setLoading] = useState(true);

  // Busca os dados do Firebase quando a página carrega
  useEffect(() => {
    if (!currentUser) return; // Se ninguém estiver logado, não faz nada
    
    // 1. Busca os agendamentos ('appointments') deste mecânico
    const qAppointments = query(
      collection(db, "appointments"),
      where("mechanicId", "==", currentUser.uid),
      orderBy("apptDate", "asc") // Ordena por data
    );
    // onSnapshot "ouve" a lista em tempo real
    const unsubscribeAppointments = onSnapshot(qAppointments, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar agendamentos (Verifique os Índices!): ", error);
      setLoading(false);
    });

    // 2. Busca os clientes ('clients') deste mecânico
    const qClients = query(collection(db, "clients"), where("mechanicId", "==", currentUser.uid));
    // onSnapshot "ouve" a lista de clientes
    const unsubscribeClients = onSnapshot(qClients, (snapshot) => {
      const clientsData = {};
      // Transforma a lista de clientes em um "mapa" (objeto)
      // para podermos achar o cliente pelo ID facilmente
      snapshot.forEach(doc => {
        clientsData[doc.id] = doc.data(); 
      });
      setClientsMap(clientsData); // Salva o mapa no estado
    });
    
    // Função de "limpeza": para de "ouvir" o banco quando o usuário sai da página
    return () => {
      unsubscribeAppointments();
      unsubscribeClients();
    };
  }, [currentUser]); // Roda a busca de novo se o usuário mudar

  // --- Ações ---
  // Função chamada pelos botões para mudar o status de um agendamento
  const handleUpdateStatus = async (serviceId, newStatus) => {
    try {
      // Encontra o agendamento pelo ID e atualiza o campo "status"
      await updateDoc(doc(db, "appointments", serviceId), { status: newStatus });
      // O 'onSnapshot' (nosso "ouvinte") vê a mudança e atualiza a tela sozinho
    } catch (error) {
      console.error("Erro ao atualizar status: ", error);
    }
  };

  // Filtra a lista principal em 3 listas menores (uma para cada coluna)
  const pendingAppts = appointments.filter(a => a.status === 'pending');
  const confirmedAppts = appointments.filter(a => a.status === 'confirmed');
  const doneAppts = appointments.filter(a => a.status === 'done' || a.status === 'cancelled');

  return (
    <div style={{ backgroundColor: 'var(--cor-fundo)', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* 1. Header (Navbar) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
            <GiAutoRepair className="text-primary me-2" style={{fontSize: '2rem'}} />
            <span className="fs-4 fw-bold">Minha Agenda Proativa</span>
          </Link>
          <Link to="/dashboard" className="btn btn-outline-light">
            Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* 2. Conteúdo da Página (O Kanban) */}
      <div className="container mt-4">
        {loading && <p className="text-center">Carregando agenda...</p>}
        
        <div className="row g-3">
          
          {/* Coluna 1: Pendentes */}
          <KanbanColumn title="Pendentes" count={pendingAppts.length} bgColorClass="bg-light">
            {pendingAppts.length === 0 && !loading && (
              <p className="text-muted small">Nenhum agendamento pendente.</p>
            )}
            {/* Mapeia e mostra cada agendamento pendente */}
            {pendingAppts.map(appt => {
              // Encontra o cliente correspondente no "mapa" de clientes
              const client = clientsMap[appt.clientId];
              return (
                // Passa o agendamento (appt) e o cliente (client) para o cartão
                <AppointmentCard 
                  key={appt.id} 
                  appt={appt} 
                  client={client}
                  onUpdateStatus={handleUpdateStatus} 
                />
              )
            })}
          </KanbanColumn>
          
          {/* Coluna 2: Confirmados */}
          <KanbanColumn title="Confirmados" count={confirmedAppts.length} bgColorClass="bg-light">
            {confirmedAppts.length === 0 && !loading && (
              <p className="text-muted small">Nenhum agendamento confirmado.</p>
            )}
            {confirmedAppts.map(appt => {
              const client = clientsMap[appt.clientId];
              return (
                <AppointmentCard 
                  key={appt.id} 
                  appt={appt} 
                  client={client}
                  onUpdateStatus={handleUpdateStatus} 
                />
              )
            })}
          </KanbanColumn>
          
          {/* Coluna 3: Concluídos/Cancelados */}
          <KanbanColumn title="Concluídos" count={doneAppts.length} bgColorClass="bg-light-subtle">
             {doneAppts.length === 0 && !loading && (
              <p className="text-muted small">Nenhum serviço concluído ou cancelado.</p>
            )}
            {doneAppts.map(appt => {
              const client = clientsMap[appt.clientId];
              return (
                <AppointmentCard 
                  key={appt.id} 
                  appt={appt} 
                  client={client}
                  onUpdateStatus={handleUpdateStatus} 
                />
              )
            })}
          </KanbanColumn>
        </div>
      </div>
    </div>
  );
}