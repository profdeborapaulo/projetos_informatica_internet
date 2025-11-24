// Novo objeto para mapear unidades e seus respectivos horários
const unidadesDisponiveis = {
    CEPABarueri: {
        nome: "CEPA Barueri",
        horarios: ["09:00", "10:30", "14:00", "15:30"]
    },
    USAItapevi: {
        nome: "USA Itapevi",
        horarios: ["08:00", "09:30", "11:00", "13:30"]
    },
    CCZOsasco: {
        nome: "CCZ Osasco",
        horarios: ["10:00", "11:30", "14:30", "16:00"]
    }
};

// 🌟 NOVO: Objeto para SIMULAR agendamentos já ocupados
// A chave é o formato: "DIA_MES_UNIDADE" e o valor é um array de horários ocupados.
const agendamentosOcupados = {
    "15_novembro_CEPABarueri": ["09:00"], // Ex: Horário ocupado em Novembro
    "5_dezembro_USAItapevi": ["11:00", "13:30"], // Ex: Horários ocupados em Dezembro
    "15_dezembro_CCZOsasco": ["10:00"]
};

// Seletores dos campos
const selectExame = document.getElementById("exame");
const selectUnidade = document.getElementById("unidade");
const selectHorario = document.getElementById("horario");

// Variáveis para armazenar o dia e mês selecionados no calendário
let diaSelecionado = null;
let mesSelecionado = null;

// --- Funções de Lógica de Agendamento ---

// 2. 🌟 NOVO: Função que verifica se um horário está ocupado
function isHorarioOcupado(unidadeKey, horario) {
    const chave = `${diaSelecionado}_${mesSelecionado}_${unidadeKey}`;
    return agendamentosOcupados[chave] && agendamentosOcupados[chave].includes(horario);
}


// 3. Função para popular o campo de horário, considerando os ocupados
function popularHorarios() {
    const unidadeKey = selectUnidade.value;
    
    // Limpa e desabilita por padrão
    selectHorario.innerHTML = '<option value="">Selecione um horário</option>';
    selectHorario.disabled = true;

    if (!unidadeKey) return;

    const unidade = unidadesDisponiveis[unidadeKey];
    if (unidade) {
        unidade.horarios.forEach(horario => {
            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            
            // 🌟 NOVO: Marca o horário como ocupado se for o caso
            if (isHorarioOcupado(unidadeKey, horario)) {
                option.disabled = true;
                option.textContent += " (Ocupado)";
                option.classList.add('horario-ocupado'); // Para estilização no CSS
            }
            selectHorario.appendChild(option);
        });
        selectHorario.disabled = false;
    }
}

// 4. Funções do Modal
function abrirModal(dia, mes) {
  // Chamada de enforceLogin mantida, assumindo que enforceLogin() existe no session.js
  if (typeof enforceLogin === 'function' && !enforceLogin(null, 'login.html')) {
    return; // Impede a abertura do modal se não estiver logado
  }
  
  diaSelecionado = dia; // Armazena o dia selecionado
  mesSelecionado = mes; // Armazena o mês selecionado
    
  const modal = document.getElementById("modal");
  const dataSelecionada = document.getElementById("dataSelecionada");
    
  dataSelecionada.textContent = `Data selecionada: ${dia} de ${mes} de 2025`;
    
  // Reseta os selects para o estado inicial
  selectExame.value = "";
  selectUnidade.value = "";
  popularHorarios(); // Recarrega os horários (que agora checam a ocupação)

  modal.style.display = "block";
}


// 5. 🌟 MODIFICADO: Função para gerar os calendários (aplica a indisponibilidade de Novembro)
function gerarCalendario(mesId, totalDias, nomeMes) {
  const container = document.getElementById(`days-${mesId}`);
  
  // 🚨 Regra: Define Novembro como indisponível
  const indisponivel = (mesId === "novembro"); 

  for (let i = 1; i <= totalDias; i++) {
    const dia = document.createElement("div");
    dia.classList.add("day");
    dia.textContent = i;
    
    if (indisponivel) {
      // Novembro inteiro está indisponível para agendamento
      dia.classList.add("day-indisponivel");
    } else {
      // Dezembro está disponível e é clicável
      dia.addEventListener("click", () => abrirModal(i, nomeMes));
    }
    container.appendChild(dia);
  }
}

// 6. 🌟 MODIFICADO: Função de Confirmação para simular a ocupação do horário
document.getElementById("confirmar").onclick = function() {
    const exame = selectExame.value;
    const unidadeKey = selectUnidade.value;
    const horario = selectHorario.value;

    if (!exame || !unidadeKey || !horario) {
        alert("Por favor, selecione o exame, a unidade e o horário.");
        return;
    }

    // 🌟 NOVO: Simula a ocupação do horário
    const chave = `${diaSelecionado}_${mesSelecionado}_${unidadeKey}`;
    
    if (!agendamentosOcupados[chave]) {
        agendamentosOcupados[chave] = [];
    }
    // Adiciona o novo horário à lista de ocupados
    agendamentosOcupados[chave].push(horario);
    
    // Obtém o nome completo da unidade para a mensagem de confirmação
    const nomeUnidade = unidadesDisponiveis[unidadeKey].nome;

    alert(`✅ Agendamento confirmado!\\nData: ${diaSelecionado} de ${mesSelecionado}\\nExame: ${exame}\\nUnidade: ${nomeUnidade}\\nHorário: ${horario}`);
    
    // Fecha o modal
    document.getElementById("modal").style.display = "none";
};


// --- Event Listeners e Inicialização ---

// Atualiza horários quando a unidade muda
selectUnidade.addEventListener("change", popularHorarios);

// Fechar modal
document.getElementById("fechar").onclick = function() {
    document.getElementById("modal").style.display = "none";
};

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


// Inicialização
gerarCalendario("novembro", 30, "novembro");
gerarCalendario("dezembro", 31, "dezembro");
popularHorarios(); // Inicializa o seletor de horário na carga da página