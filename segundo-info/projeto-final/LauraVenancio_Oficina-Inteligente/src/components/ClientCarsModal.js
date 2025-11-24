/*
  ARQUIVO: src/components/ClientCarsModal.js
  DESCRIÇÃO: A janela flutuante (modal) para gerenciar os carros de um cliente.
  Ela abre por cima do Dashboard.
*/

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs // Usado para gerar o PDF
} from "firebase/firestore";
import ServiceRecordModal from './ServiceRecordModal'; // Importa o *outro* modal

// Importa as bibliotecas para gerar o PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Para as tabelas no PDF

// --- Componente: Histórico do Carro ---
// Um componente pequeno que só busca e mostra o histórico de um carro
function CarHistory({ carId }) {
  const [services, setServices] = useState([]); // Lista de serviços do carro

  // Busca os serviços no banco de dados
  useEffect(() => {
    // Consulta: "Me dê o HISTÓRICO ('serviceHistory') ONDE 'carId' == a este carro,
    // ordenado pela data mais recente"
    const q = query(
      collection(db, "serviceHistory"), // Lendo da coleção correta
      where("carId", "==", carId),
      orderBy("serviceDate", "desc")
    );
    // onSnapshot "ouve" essa lista em tempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe(); // Para de "ouvir" ao sair
  }, [carId]); // Roda de novo se o carId mudar

  return (
    <div className="mt-3">
      <h6 className="small text-muted border-bottom pb-1">Histórico de Serviços:</h6>
      {services.length === 0 && (
        <p className="small text-muted fst-italic">Nenhum serviço registrado.</p>
      )}
      {/* Lista de serviços */}
      <div className="list-group list-group-flush small">
        {services.map(service => (
          <div key={service.id} className="list-group-item px-0 py-2">
            <div className="d-flex justify-content-between">
              <span className="fw-bold">{service.serviceDone}</span>
              {/* Mostra o valor formatado como R$ */}
              <span className="fw-bold text-success">
                {service.serviceValue ? service.serviceValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}
              </span>
            </div>
            <div className="text-muted">Realizado em: {service.serviceDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Componente Principal do Modal de Carros ---
// Recebe 'client' (os dados do cliente) e 'onClose' (a função para fechar)
export default function ClientCarsModal({ client, onClose }) {
  const { currentUser } = useAuth(); // Pega o mecânico logado

  // Estados do formulário de NOVO CARRO
  const [carPlate, setCarPlate] = useState('');
  const [carMake, setCarMake] = useState(''); 
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  
  const [cars, setCars] = useState([]); // Lista de carros deste cliente
  
  // Controla o segundo modal (o de serviço)
  const [selectedCar, setSelectedCar] = useState(null); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Busca os carros do cliente no banco
  useEffect(() => {
    if (!client.id) return; // Se não tem cliente, não faz nada
    // Consulta: "Me dê os carros ONDE 'clientId' == ao cliente deste modal"
    const q = query(collection(db, "cars"), where("clientId", "==", client.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCars(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [client.id]); // Roda de novo se o cliente mudar

  // Função para adicionar um NOVO CARRO
  async function handleAddCar(e) {
    e.preventDefault();
    if (!carPlate || !carModel) return setError("Placa e Modelo são obrigatórios.");
    setLoading(true);
    setError('');
    try {
      // Adiciona o carro ao banco na coleção "cars"
      await addDoc(collection(db, "cars"), {
        plate: carPlate.toUpperCase(), // Salva a placa em maiúsculas
        make: carMake, 
        model: carModel, 
        year: carYear,
        clientId: client.id, // "Etiqueta" o carro com o ID do cliente
        mechanicId: currentUser.uid // "Etiqueta" o carro com o ID do mecânico
      });
      // Limpa o formulário
      setCarPlate(''); setCarMake(''); setCarModel(''); setCarYear('');
    } catch (err) {
      setError("Falha ao salvar carro.");
    }
    setLoading(false);
  }

  // --- Função para GERAR O PDF ---
  const handleGeneratePDF = async (car) => {
    alert("Gerando PDF... por favor, aguarde.");

    // 1. Busca todos os serviços desse carro (da coleção 'serviceHistory')
    const servicesQuery = query(
      collection(db, "serviceHistory"), // Lendo da coleção correta
      where("carId", "==", car.id),
      orderBy("serviceDate", "desc")
    );
    const querySnapshot = await getDocs(servicesQuery);
    const services = querySnapshot.docs.map(doc => doc.data());

    // 2. Inicia o documento PDF
    const doc = new jsPDF();

    // 3. Adiciona o Título e as Infos do Cliente/Carro
    doc.setFontSize(20);
    doc.text("Histórico de Serviços - Oficina Proativa", 15, 20);
    doc.setFontSize(12);
    doc.text(`Cliente: ${client.name}`, 15, 30);
    doc.text(`Telefone: ${client.phone}`, 15, 35);
    doc.text(`Email: ${client.email || 'N/A'}`, 15, 40);
    doc.setFontSize(16);
    doc.text(`Veículo: ${car.plate} - ${car.make} ${car.model} (${car.year})`, 15, 50);

    // 4. Prepara os dados para a tabela
    const tableColumn = ["Data", "Serviço Realizado", "Valor (R$)", "Observações"];
    const tableRows = [];
    let totalValue = 0;

    services.forEach(service => {
      const value = service.serviceValue || 0;
      tableRows.push([
        service.serviceDate,
        service.serviceDone,
        value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }), // Formata o valor
        service.notes || '' // Adiciona as observações
      ]);
      totalValue += value; // Soma o valor total
    });

    // 5. Adiciona a tabela ao PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60, // Posição Y onde a tabela começa
      theme: 'grid', // Estilo "grade"
    });

    // 6. Adiciona o Total no final
    const finalY = doc.lastAutoTable.finalY || 70; // Pega onde a tabela terminou
    doc.setFontSize(14);
    doc.text(`Valor Total Gasto: ${totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 15, finalY + 10);

    // 7. Adiciona o Rodapé com número da página
    const pageCount = doc.internal.getNumberOfPages();
    for(var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 15, doc.internal.pageSize.height - 10);
    }

    // 8. Salva o arquivo no computador do usuário
    doc.save(`historico_${client.name}_${car.plate}.pdf`);
  };

  // --- Renderização (O que aparece na tela) ---
  return (
    <>
      {/* Fundo escuro do Modal (backdrop) */}
      <div className="modal-backdrop show" style={{ zIndex: 1050 }}></div>
      
      {/* O Modal (usa 'modal-xl' para ser extra-grande) */}
      <div className="modal show d-block" style={{ zIndex: 1051 }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            
            <div className="modal-header">
              <h5 className="modal-title h4">
                Gerenciar Carros de: <span className="text-primary">{client.name}</span>
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
            </div>
            
            <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <div className="row g-4">
                {/* Coluna 1: Formulário de Adicionar Carro */}
                <div className="col-lg-4">
                  <div className="card h-100 bg-light">
                    <div className="card-body">
                      <h6 className="card-title fw-bold">Adicionar Novo Carro</h6>
                      <form onSubmit={handleAddCar}>
                        <div className="mb-2">
                          <label className="form-label small" htmlFor="carPlate">Placa</label>
                          <input id="carPlate" type="text" className="form-control" placeholder="ABC1234" value={carPlate} onChange={(e) => setCarPlate(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label className="form-label small" htmlFor="carMake">Marca</label>
                          <input id="carMake" type="text" className="form-control" placeholder="ex: Chevrolet" value={carMake} onChange={(e) => setCarMake(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label className="form-label small" htmlFor="carModel">Modelo</label>
                          <input id="carModel" type="text" className="form-control" placeholder="ex: Onix" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small" htmlFor="carYear">Ano</label>
                          <input id="carYear" type="text" className="form-control" placeholder="ex: 2020" value={carYear} onChange={(e) => setCarYear(e.target.value)} />
                        </div>
                        <div className="d-grid">
                          <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Salvando...' : 'Salvar Carro'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Coluna 2: Lista de Carros */}
                <div className="col-lg-8">
                  <h6 className="card-title fw-bold">Carros Cadastrados</h6>
                  {cars.length === 0 && (
                    <div className="card-body text-center text-muted">
                      Nenhum carro cadastrado para este cliente.
                    </div>
                  )}
                  {/* Mapeia e exibe cada carro */}
                  {cars.map(car => (
                    <div key={car.id} className="card mb-3 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="h5 text-primary fw-bold mb-0">{car.plate}</h5>
                            <div className="text-muted">{car.make} {car.model} - {car.year}</div>
                          </div>
                          {/* Botões de Ação de cada carro */}
                          <div className="d-flex flex-column gap-2" style={{minWidth: '200px'}}>
                            {/* 1. Botão de Registrar Serviço (Abre o outro modal) */}
                            <button className="btn btn-primary" onClick={() => setSelectedCar(car)}>
                              Registrar Serviço / Agendar
                            </button>
                            {/* 2. Botão de Gerar PDF */}
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => handleGeneratePDF(car)}>
                              Gerar PDF de Histórico
                            </button>
                          </div>
                        </div>
                        {/* Mostra o componente de histórico para este carro */}
                        <CarHistory carId={car.id} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Rodapé do Modal com botão de fechar */}
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Fechar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Renderiza o Modal de Serviço (se um carro for selecionado) */}
      {selectedCar && (
        <ServiceRecordModal 
          car={selectedCar}
          clientId={client.id}
          onClose={() => setSelectedCar(null)} // Função para fechar (limpa o estado)
        />
      )}
    </>
  );
}