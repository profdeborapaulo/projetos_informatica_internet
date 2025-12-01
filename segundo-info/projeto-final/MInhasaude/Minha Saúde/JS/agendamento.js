// função principal do site: agendamento

document.addEventListener('DOMContentLoaded', () => {

    // dados e inicialização
    
    const HORARIO_INICIO = 8;
    const HORARIO_FIM = 17;
    const INTERVALO_MINUTOS = 30;
    const STORAGE_KEY = 'agendamentos_minha_saude';
    
    // Chaves de login
    const USUARIO_LOGADO_SESSION_KEY = 'usuarioLogado'; 

    // Carrega dados de agendamento
    let AGENDAMENTOS_REALIZADOS = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    if (AGENDAMENTOS_REALIZADOS.length === 0) {
        AGENDAMENTOS_REALIZADOS = [
            // Dados de teste
            { hospitalId: 2, servico: "E-HEMO", dataHora: new Date('2025-12-10T08:00:00'), userEmail: "teste@exemplo.com" }, 
            { hospitalId: 2, servico: "V-POLIO", dataHora: new Date('2025-12-10T08:30:00'), userEmail: "teste@exemplo.com" }
        ].map(a => ({
            ...a,
            dataHora: new Date(a.dataHora) 
        }));
    } else {
        AGENDAMENTOS_REALIZADOS = AGENDAMENTOS_REALIZADOS.map(a => ({
            ...a,
            dataHora: new Date(a.dataHora)
        }));
    }

    const salvarAgendamentos = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(AGENDAMENTOS_REALIZADOS));
    };

    // verificação de login
    const verificarLoginParaAgendamento = () => {
        // Checa se o objeto 'usuarioLogado' existe no sessionStorage
        return sessionStorage.getItem(USUARIO_LOGADO_SESSION_KEY) !== null; 
    };

    //dados dos hospitais (foram divididas pra evitar um arquivo com 1500 linhas :p)
    const EXAMES_DETALHE = [
        { codigo: "HEMO", nome: "Hemograma Completo" }, 
        { codigo: "GLICE", nome: "Glicemia em Jejum" },
        { codigo: "EAS", nome: "Exame de Urina Tipo I (EAS)" }, 
        { codigo: "RAIOX", nome: "Radiografia (Raio-X)" },
        { codigo: "ECG", nome: "Eletrocardiograma (ECG)" }, 
        { codigo: "CREAT", nome: "Creatinina e Ureia" },
        { codigo: "LIPID", nome: "Perfil Lipídico (Colesterol e Triglicerídeos)" }, 
        { codigo: "PCR", nome: "Proteína C Reativa (PCR)" },
        { codigo: "ULTRA", nome: "Ultrassonografia" }, 
        { codigo: "TOMO", nome: "Tomografia Computadorizada (TC)" }
    ];
    const VACINAS_DETALHE = [
        { codigo: "BCG", nome: "BCG (Tuberculose)" }, 
        { codigo: "HEPB", nome: "Hepatite B" },
        { codigo: "PENTA", nome: "Penta (Pentavalente)" }, 
        { codigo: "POLIO", nome: "VIP / VOP (Poliomielite)" },
        { codigo: "PNEUMO", nome: "Pneumocócica 10 Valente" }, 
        { codigo: "ROTA", nome: "Rotavírus Humano (VORH)" },
        { codigo: "MENINGOC", nome: "Meningocócica C (Meningite)" }, 
        { codigo: "TRIPLICE", nome: "Tríplice Viral (Sarampo, Caxumba e Rubéola)" },
        { codigo: "FA", nome: "Febre Amarela" }, 
        { codigo: "GRIPE", nome: "Influenza (Gripe)" }
    ];

    // variaveis- dom

    const selectServicoAgendar = document.getElementById('select-servico-agendar');
    const inputDataAgendar = document.getElementById('input-data-agendar');
    const selectHorarioDisponivel = document.getElementById('select-horario-disponivel');
    const btnConfirmarAgendamento = document.getElementById('btn-confirmar-agendamento');

    // logica do agendamento

    const calcularHorariosDisponiveis = (hospitalId, dataString) => {
        const horarios = [];
        const hoje = new Date();
        const dataSelecionada = new Date(dataString + 'T00:00:00'); 
        let horaInicioBusca = HORARIO_INICIO; 
        
        if (dataSelecionada.toDateString() === hoje.toDateString()) {
            const minutosAtuais = hoje.getHours() * 60 + hoje.getMinutes();
            const proximoIntervalo = Math.ceil((minutosAtuais + 1) / INTERVALO_MINUTOS) * INTERVALO_MINUTOS;
            horaInicioBusca = Math.floor(proximoIntervalo / 60);
        }
        
        for (let hora = horaInicioBusca; hora < HORARIO_FIM; hora++) {
            for (let minuto = 0; minuto < 60; minuto += INTERVALO_MINUTOS) {
                
                if (hora >= HORARIO_FIM) break; 
                
                const dataHoraTentativa = new Date(dataString);
                dataHoraTentativa.setHours(hora, minuto, 0, 0);

                const horarioFormatado = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;
                
                const estaAgendado = AGENDAMENTOS_REALIZADOS.some(agendamento => 
                    agendamento.hospitalId === hospitalId &&
                    agendamento.dataHora.getTime() === dataHoraTentativa.getTime()
                );

                if (!estaAgendado) {
                    horarios.push({
                        display: horarioFormatado,
                        value: dataHoraTentativa.toISOString()
                    });
                }
            }
        }
        return horarios;
    };

    const preencherHorariosDisponiveis = () => {
        const hospitalId = window.hospitalAtivo ? window.hospitalAtivo.id : null;
        const dataString = inputDataAgendar.value;
        const servico = selectServicoAgendar.value;
        
        selectHorarioDisponivel.innerHTML = '<option value="">Selecione um horário</option>';

        if (!dataString || !hospitalId || !servico) return;

        const horarios = calcularHorariosDisponiveis(hospitalId, dataString);

        if (horarios.length === 0) {
            const opt = new Option("Nenhum horário disponível.", "");
            selectHorarioDisponivel.appendChild(opt);
            return;
        }
        
        horarios.forEach(h => {
            const opt = new Option(h.display, h.value);
            selectHorarioDisponivel.appendChild(opt);
        });
    };
    
    const confirmarAgendamento = () => {
        
        // checagem de login
        if (!verificarLoginParaAgendamento()) {
            alert('Você precisa estar logado para confirmar um agendamento. Você será redirecionado para a tela de login.');
            window.location.href = 'login.html'; 
            return; 
        }
        
        const hospitalId = window.hospitalAtivo ? window.hospitalAtivo.id : null;
        const servico = selectServicoAgendar.value;
        const dataHoraString = selectHorarioDisponivel.value;
        
        if (!hospitalId || !servico || !dataHoraString) {
            alert(' Por favor, selecione todos os campos: Serviço, Data e Horário Disponível.');
            return;
        }
        
        const dataHora = new Date(dataHoraString);
        const horarioDisplay = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const estaAgendado = AGENDAMENTOS_REALIZADOS.some(agendamento => 
            agendamento.hospitalId === hospitalId &&
            agendamento.dataHora.getTime() === dataHora.getTime()
        );

        if (estaAgendado) {
            alert('Erro: Este horário foi reservado. Tente novamente.');
        } else {
            // Rrecupera o email do usuario logado
            const usuarioJSON = sessionStorage.getItem(USUARIO_LOGADO_SESSION_KEY);
            const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : {};

            AGENDAMENTOS_REALIZADOS.push({ 
                hospitalId, 
                servico, 
                dataHora, 
                userEmail: usuario.email 
            });
            
            salvarAgendamentos();

            const tipo = servico.startsWith('E-') ? 'Exame' : 'Vacina';
            const listaDetalhe = tipo === 'Exame' ? EXAMES_DETALHE : VACINAS_DETALHE;
            const nomeServico = listaDetalhe.find(item => item.codigo === servico.substring(2))?.nome;
            
            alert(`✅ Agendamento confirmado!\n\nServiço: ${tipo}: ${nomeServico}\nData: ${dataHora.toLocaleDateString('pt-BR')} às ${horarioDisplay}`);
            
            preencherHorariosDisponiveis(); 
        }
    };

    const forcarCalculoNaAbertura = () => {
        setTimeout(() => {
            if (selectServicoAgendar.value && inputDataAgendar.value) {
                 preencherHorariosDisponiveis();
            }
        }, 50); 
    };

    // listener de agendamento
    
    selectServicoAgendar.addEventListener('change', preencherHorariosDisponiveis);
    inputDataAgendar.addEventListener('change', preencherHorariosDisponiveis);

    selectServicoAgendar.addEventListener('change', forcarCalculoNaAbertura); 
    inputDataAgendar.addEventListener('change', forcarCalculoNaAbertura);

    btnConfirmarAgendamento.addEventListener('click', confirmarAgendamento);
});