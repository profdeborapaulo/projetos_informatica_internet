/*
  ARQUIVO: src/components/ServiceRecordModal.js
  DESCRIÇÃO: O segundo "modal" (aninhado).
  É a "prancheta" onde o mecânico registra o serviço feito (passado)
  e agenda a próxima revisão (futuro).
*/

import React, { useState } from 'react';
import { db, auth } from '../firebase';
// 'writeBatch' permite salvar duas coisas ao mesmo tempo
import { collection, serverTimestamp, writeBatch, doc } from "firebase/firestore"; 

// Recebe o 'carro', o 'clientId' e a função 'onClose'
export default function ServiceRecordModal({ car, clientId, onClose }) {
  // Estados para o SERVIÇO FEITO HOJE
  const [serviceDone, setServiceDone] = useState(''); // O que foi feito
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split('T')[0]); // Data de hoje
  const [serviceValue, setServiceValue] = useState(''); // O valor R$
  const [notes, setNotes] = useState(''); // Observações

  // Estados para o AGENDAMENTO FUTURO
  const [nextServiceDesc, setNextServiceDesc] = useState(''); // Ex: "Inspeção de rotina"
  const [nextServiceDate, setNextServiceDate] = useState(''); // A data futura

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- Função para SALVAR (Salva 2 coisas) ---
  async function handleAddService(e) {
    e.preventDefault();
    // Validação
    if (!serviceDone || !serviceValue || !nextServiceDesc || !nextServiceDate) {
      return setError("Todos os 4 campos são obrigatórios.");
    }
    setLoading(true);
    setError('');
    
    try {
      const mechanicId = auth.currentUser.uid;
      
      // 1. Prepara um "lote" de gravação.
      // Isso garante que ou salvamos TUDO ou não salvamos NADA.
      const batch = writeBatch(db);

      // 2. Prepara o Histórico de Serviço (O que foi feito HOJE)
      // Salva na nova coleção 'serviceHistory'
      const historyRef = doc(collection(db, "serviceHistory"));
      batch.set(historyRef, {
        mechanicId: mechanicId,
        clientId: clientId,
        carId: car.id,
        carPlate: car.plate,
        carModel: car.model,
        // Infos do Serviço (Passado)
        serviceDone: serviceDone,
        serviceDate: serviceDate,
        serviceValue: parseFloat(serviceValue), // Salva o valor como número
        notes: notes,
        createdAt: serverTimestamp()
      });

      // 3. Prepara o Agendamento (O que será feito AMANHÃ)
      // Salva na nova coleção 'appointments'
      const apptRef = doc(collection(db, "appointments"));
      batch.set(apptRef, {
        mechanicId: mechanicId,
        clientId: clientId,
        carId: car.id,
        carPlate: car.plate,
        carModel: car.model,
        // Infos do Agendamento (Futuro)
        serviceDescription: nextServiceDesc, // A descrição do agendamento
        apptDate: nextServiceDate, // A data futura
        status: 'pending', // Começa como pendente
        relatedServiceId: historyRef.id, // Linka ao serviço que o originou
        createdAt: serverTimestamp()
      });

      // 4. Executa as 2 gravações no banco de dados
      await batch.commit();

      setLoading(false);
      onClose(); // Fecha o modal
      
    } catch (err) {
      console.error(err);
      setError("Falha ao salvar. Tente novamente.");
      setLoading(false);
    }
  }

  // --- Renderização ---
  return (
    <>
      {/* O backdrop (fundo escuro) deste modal, mais escuro para sobrepor */}
      <div className="modal-backdrop show" style={{ zIndex: 1055, backgroundColor: 'rgba(0,0,0,0.8)' }}></div>

      {/* O Modal */}
      <div className="modal show d-block" style={{ zIndex: 1056 }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered"> 
          <div className="modal-content">
            
            <div className="modal-header">
              <h5 className="modal-title h4">
                Registrar Serviço - <span className="text-primary">{car.plate}</span>
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
            </div>
            
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              
              {/* O formulário de registro */}
              <form onSubmit={handleAddService}>
                
                {/* Seção do Serviço Realizado */}
                <h4 className="h5 text-primary">Serviço Realizado (Hoje)</h4>
                <div className="mb-3">
                  <label className="form-label" htmlFor="serviceDone">Descrição do Serviço:</label>
                  <textarea 
                    className="form-control" id="serviceDone" rows="3" 
                    placeholder="Ex: Troca de óleo e filtro de ar" 
                    value={serviceDone} onChange={(e) => setServiceDone(e.target.value)} 
                  />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="serviceDate">Data do Serviço:</label>
                    <input className="form-control" id="serviceDate" type="date" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="serviceValue">Valor (R$):</label>
                    <input 
                      className="form-control" id="serviceValue" type="number" 
                      placeholder="Ex: 150.00" step="0.01" // Permite centavos
                      value={serviceValue} onChange={(e) => setServiceValue(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="notes">Observações (Opcional):</label>
                  <textarea 
                    className="form-control" id="notes" rows="2" 
                    placeholder="Ex: Cliente relatou barulho na suspensão." 
                    value={notes} onChange={(e) => setNotes(e.target.value)} 
                  />
                </div>

                <hr className="my-4" />

                {/* Seção do Agendamento Proativo */}
                <h4 className="h5 text-primary">⭐ Agendamento Proativo (Futuro)</h4>
                <div className="mb-3">
                  <label className="form-label fw-bold" htmlFor="nextServiceDesc">Descrição do Agendamento:</label>
                  <input 
                    className="form-control" id="nextServiceDesc" type="text" 
                    placeholder="Ex: Inspeção de rotina" 
                    value={nextServiceDesc} onChange={(e) => setNextServiceDesc(e.target.value)} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold" htmlFor="nextServiceDate">Data do Agendamento:</label>
                  <input 
                    className="form-control" id="nextServiceDate" type="date" 
                    value={nextServiceDate} onChange={(e) => setNextServiceDate(e.target.value)} 
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
                    {loading ? 'Salvando...' : 'Salvar Serviço e Agendar Próxima'}
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}