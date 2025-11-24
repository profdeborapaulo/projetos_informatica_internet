const feirasAdocao = [
  {
    nome: "Feira de Adoção – Parque Dom José",
    endereco: "Rua Ângela Mirella, 500 – Vila Porto",
    cidade: "Barueri",
    descricao: "Cães e gatos castrados, vacinados, vermifugados e prontos para adoção responsável.",
    servicos: ["Adoção", "Vacinação", "Castração"],
    dias: "Todo segundo sábado do mês – 9h às 16h"
  },
  {
    nome: "Feira de Adoção – Shopping Flamingo Alphaville",
    endereco: "Alameda Araguaia, 762 – Alphaville",
    cidade: "Barueri",
    descricao: "Evento com microchipagem, produtos pet e presença de ONGs locais.",
    servicos: ["Adoção", "Microchipagem"],
    dias: "A cada 15 dias – Domingos das 10h às 17h"
  },
  {
    nome: "Feira Pet Legal – Supermercado Barbosa",
    endereco: "Via de Acesso João de Góes, 35 – Jardim Alvorada",
    cidade: "Jandira",
    descricao: "Feira com cães e gatos resgatados da rua, já tratados. Adoções acompanhadas pela Secretaria de Meio Ambiente.",
    servicos: ["Adoção", "Vacinação"],
    dias: "Último sábado do mês – 9h às 15h"
  },
  {
    nome: "Feira Municipal de Adoção – UBS Raimundo Guedes",
    endereco: "Rua Áquila, 24 – Jardim Novo Horizonte",
    cidade: "Carapicuíba",
    descricao: "Programa 'Meu Pet Legal'. Animais castrados e microchipados.",
    servicos: ["Adoção", "Castramento", "Microchipagem"],
    dias: "Primeiro domingo do mês – 8h às 14h"
  }
];

const laresTemporarios = [
  {
    nome: "Instituto Animais de Rua",
    endereco: "Rua Vicente de Carvalho, 120 – Osasco",
    cidade: "Osasco",
    descricao: "ONG que resgata animais de rua e oferece tratamento e abrigo temporário.",
    servicos: ["Adoção", "Reabilitação", "Castração"],
    dias: "Atendimento contínuo (com agendamento)"
  },
  {
    nome: "ONG Toca do PET",
    endereco: "Rua Amadeu Tuma, 500 – Região Oeste de SP",
    cidade: "Região Oeste de SP",
    descricao: "Organização voltada ao resgate e reabilitação de cães e gatos.",
    servicos: ["Lar temporário", "Campanhas de Adoção"],
    dias: "De segunda a sábado – 9h às 17h"
  },
  {
    nome: "Projeto Segunda Chance",
    endereco: "Av. Governador Mário Covas, 210 – Barueri / Itapevi",
    cidade: "Barueri / Itapevi",
    descricao: "Projeto independente que resgata cães e gatos feridos ou abandonados.",
    servicos: ["Lar temporário", "Reabilitação"],
    dias: "Atendimento mediante contato prévio"
  }
];

// NOVO ARRAY PARA CENTROS DE SERVIÇO (Exames, Consultas, etc.)
const centrosDeServico = [
  {
    nome: "CEPAD – Centro de Proteção ao Animal Doméstico",
    endereco: "Rua Dr. Fernando Costa, s/n – Barueri",
    cidade: "Barueri",
    descricao: "Serviços veterinários gratuitos (consultas, cirurgias de castração, vacinação) para munícipes.",
    servicos: ["Consultas", "Cirurgia", "Vacinação", "Exames"],
    dias: "De segunda a sexta – 8h às 17h (com agendamento)"
  },
  {
    nome: "Centro de Controle de Zoonoses (CCZ)",
    endereco: "Rua Santa Rita, 220 – Osasco",
    cidade: "Osasco",
    descricao: "Oferece vacinação antirrábica gratuita e orientações sobre posse responsável. Atende emergências de saúde pública.",
    servicos: ["Vacinação Antirrábica", "Orientações"],
    dias: "De segunda a sexta – 9h às 16h"
  },
  {
    nome: "Unidade de Saúde Animal (USA)",
    endereco: "Av. João de Góes, 850 – Itapevi",
    cidade: "Itapevi",
    descricao: "Unidade de atendimento veterinário municipal que realiza exames e procedimentos básicos para a população de baixa renda.",
    servicos: ["Consultas", "Exames", "Castração"],
    dias: "Atendimento agendado"
  }
];


// ===============================
// FILTRO E EXIBIÇÃO DE RESULTADOS
// ===============================
const selectCidade = document.getElementById("cidades");
const selectTipo = document.getElementById("larfeira"); 
const btnFiltrar = document.getElementById("btnFiltrar");
const mostrarFeira = document.getElementById("mostrarfeira");

// Função para criar os cards
function criarCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h3>${item.nome}</h3>
    <p><strong>📍 Endereço:</strong> ${item.endereco}</p>
    <p><strong>🏙️ Cidade:</strong> ${item.cidade}</p>
    <button class="btnModal">Ver mais</button>
  `;

  // Botão abre o modal
  card.querySelector(".btnModal").addEventListener("click", () => abrirModal(item));
  return card;
}

// Função de filtro CORRIGIDA
function filtrar() {
  const cidadeSelecionada = selectCidade.value;
  const tipoSelecionado = selectTipo.value;
  mostrarFeira.innerHTML = "";

  let resultados = [];

  // LÓGICA DE FILTRO CORRIGIDA (usa comparação exata ===)
  if (tipoSelecionado === "feiraAdocao") {
    resultados = feirasAdocao;
  } else if (tipoSelecionado === "centrosServico") { 
    resultados = centrosDeServico;
  } else {
    // larTemporario é o valor padrão
    resultados = laresTemporarios;
  }
  
  // Filtra por cidade
  if (cidadeSelecionada !== "") {
    resultados = resultados.filter(item =>
      // Inclui a cidade selecionada, mesmo em casos de múltiplas cidades no campo (ex: "Barueri / Itapevi")
      item.cidade.toLowerCase().includes(cidadeSelecionada.toLowerCase())
    );
  }

  if (resultados.length > 0) {
    resultados.forEach(item => mostrarFeira.appendChild(criarCard(item)));
  } else {
    mostrarFeira.innerHTML = "<p style='text-align:center; color:#666;'>Nenhum resultado encontrado 🐾</p>";
  }
}

btnFiltrar.addEventListener("click", filtrar);
// Executa o filtro ao carregar a página (para mostrar o conteúdo inicial)
filtrar(); 

// ===============================
// MODAL
// ===============================
function abrirModal(item) {
  // Se o item não tiver 'dias', coloca uma mensagem default
  const diasInfo = item.dias ? item.dias : 'Consulte o site ou telefone do local.'; 
  
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <button class="fecharmodal">&times;</button>
      <h1>${item.nome}</h1>
      <p><strong>📍 Endereço:</strong> ${item.endereco}</p>
      <p><strong>🏙️ Cidade:</strong> ${item.cidade}</p>
      <p><strong>🗓️ Dias e horários:</strong> ${diasInfo}</p>
      <p><strong>💬 Descrição:</strong> ${item.descricao}</p>
      <p><strong>🐾 Serviços:</strong> ${item.servicos.join(", ")}</p>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = "flex";

  modal.querySelector(".fecharmodal").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });
}