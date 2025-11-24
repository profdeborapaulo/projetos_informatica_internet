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

// Seletores dos novos campos
const selectUnidade = document.getElementById("unidade");
const selectHorario = document.getElementById("horario");


// 1. Função para gerar os calendários (mantida)
function gerarCalendario(mesId, totalDias, nomeMes) {
  const container = document.getElementById(`days-${mesId}`);
  for (let i = 1; i <= totalDias; i++) {
    const dia = document.createElement("div");
    dia.classList.add("day");
    dia.textContent = i;
    dia.addEventListener("click", () => abrirModal(i, nomeMes));
    container.appendChild(dia);
  }
}

// 2. Função para popular o campo de horário (NOVA)
function popularHorarios() {
    const unidadeId = selectUnidade.value;
    selectHorario.innerHTML = '<option value="">Selecione...</option>'; // Limpa e adiciona default

    if (unidadeId && unidadesDisponiveis[unidadeId]) {
        const horarios = unidadesDisponiveis[unidadeId].horarios;
        horarios.forEach(horario => {
            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            selectHorario.appendChild(option);
        });
        selectHorario.disabled = false;
    } else {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Selecione a unidade primeiro";
        selectHorario.appendChild(option);
        selectHorario.disabled = true;
    }
}

// 3. Event listener para atualizar os horários ao mudar a unidade
selectUnidade.addEventListener("change", popularHorarios);


// 4. Funções do Modal (atualizadas)
function abrirModal(dia, mes) {
  if (!enforceLogin(null, 'login.html')) {
    return; // Impede a abertura do modal se não estiver logado
  }
  const modal = document.getElementById("modal");
  const dataSelecionada = document.getElementById("dataSelecionada");
  dataSelecionada.textContent = `Data selecionada: ${dia} de ${mes} de 2025`;
  
  // Reseta os selects para o estado inicial
  document.getElementById("exame").value = "";
  document.getElementById("unidade").value = "";
  popularHorarios(); // Recarrega o select de horário para o estado default

  modal.style.display = "block";
}

document.getElementById("fechar").onclick = function() {
  document.getElementById("modal").style.display = "none";
};

window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.getElementById("confirmar").onclick = function() {
  const exame = document.getElementById("exame").value;
  const unidade = document.getElementById("unidade").value;
  const horario = document.getElementById("horario").value; // NOVO CAMPO

  // Validação dos três campos
  if (!exame || !unidade || !horario) {
    alert("Por favor, selecione o exame, a unidade e o horário.");
    return;
  }
  
  // Obtém o nome completo da unidade para a mensagem de confirmação
  const nomeUnidade = unidadesDisponiveis[unidade].nome;

  alert(`✅ Agendamento confirmado!\nExame: ${exame}\nUnidade: ${nomeUnidade}\nHorário: ${horario}`);
  document.getElementById("modal").style.display = "none";
};


// Inicialização
gerarCalendario("novembro", 30, "novembro");
gerarCalendario("dezembro", 31, "dezembro");
// Inicializa o seletor de horário na carga da página
popularHorarios();