//coração do site, junto ao arquivo "agendamento.js"
//cria a base de hospitais, filtra-os e detalha paginação

document.addEventListener('DOMContentLoaded', () => {

    // Configuração de exibição
    
    // paginação
    const HOSPITAIS_POR_PAGINA = 3; 
    let paginaAtual = 1; 
    let dadosAtualmenteFiltrados = []; 

    // Torna a variável global para que o agendamento.js possa acessá-la
    window.hospitalAtivo = null; 

    // Listas de Exames (Mantidas para Filtro e Modal)
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
    // Listas de Vacinas (Mantidas para Filtro e Modal)
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

    // Array principal de Hospitais
    const HOSPITAIS = [
        { id: 1, nome: "UBS Magdalena Macedo", 
            endereco: "R. do Desterro, 30 - Jardim Santa Cecilia", 
            cidade: "Barueri", 
            telefone: "11 4199-3126", 
            examesOferecidos: ["HEMO", "ECG", "LIPID", "ULTRA"], 
            vacinasOferecidas: ["BCG", "PENTA"], 
            img: "../IMGS/ubs-barueri1.png" 
        },
        { id: 2, nome: "Policlínica Cruz Preta", 
            endereco: "R. Clóvis Eduardo Silotto, 56 - Vila Sao Silvestre", 
            cidade: "Barueri", 
            telefone: "11 2543-0300", 
            examesOferecidos: ["HEMO", "TOMO", "RAIOX", "ECG", "GLICE", "PCR", "CREAT", "ULTRA"], 
            vacinasOferecidas: ["BCG", "FA", "GRIPE", "POLIO", "PNEUMO"], 
            img: "../IMGS/policlinica-barueri.png" },
        { id: 3, nome: "UBS Amaro José de Souza", 
            endereco: "R. Petrolina, 178 - Jardim Mutinga", 
            cidade: "Barueri", 
            telefone: "11 4199-3170", 
            examesOferecidos: ["HEMO", "GLICE", "EAS", "RAIOX"], 
            vacinasOferecidas: ["MENINGOC","TRIPLICE", "POLIO"], 
            img: "../IMGS/ubs-barueri2.png" },
        { id: 4, nome: "Policlínica Carapicuíba", 
            endereco: "R. Zacarias de Medeiros - Parque Santa Teresa", 
            cidade: "Carapicuíba", 
            telefone: "11 4182-2466", 
            examesOferecidos: ["HEMO", "TOMO", "RAIOX", "EAS", "CREAT", "ULTRA"], 
            vacinasOferecidas: ["POLIO","ROTA", "GRIPE", "FA"], 
            img: "../IMGS/policlinica-carapicuiba.png" },
        { id: 5, nome: "UBS Edini Cavalcante Consoli", 
            endereco: " R. João Cabral de Melo Neto, 66 - Jardim Tupa", 
            cidade: "Barueri", 
            telefone: "11 4199-3166", 
            examesOferecidos: ["ULTRA", "ECG", "RAIOX"], 
            vacinasOferecidas: ["PENTA", "BGC", "PNEUMO"], 
            img: "../IMGS/ubs-barueri3.png" },
        { id: 6, nome: "UBS Elzir Maria de Jesus", 
            endereco: "Estr. das Acácias, 202 - Parque Roseira", 
            cidade: "Carapicuíba", 
            telefone: "11 4207-9127", 
            examesOferecidos: ["GLICE", "PCR", "RAIOX"], 
            vacinasOferecidas: ["HEPB", "FA", "GRIPE", "POLIO", "PNEUMO"], 
            img: "../IMGS/ubs-carapicuiba.png" },
    ];

    // elementos gerais
    const resultadosContainer = document.getElementById('cards-container');
    const selectExames = document.getElementById('select-exames-detalhe');
    const selectVacinas = document.getElementById('select-vacinas-detalhe');
    
    // modal 
    const modalHospital = document.getElementById('modal-hospital');
    const btnDiminuirModal = document.getElementById('btn-diminuir-modal');


    const selectServicoAgendar = document.getElementById('select-servico-agendar');
    const inputDataAgendar = document.getElementById('input-data-agendar');
    const selectHorarioDisponivel = document.getElementById('select-horario-disponivel');
    const mensagemAgendamento = document.getElementById('mensagem-agendamento');
    
    // renderização

    const criarCardElemento = (hospital) => {
        const card = document.createElement('div');
        card.classList.add('hospital-card');
        card.dataset.id = hospital.id;

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('card-info');
        const nomeH3 = document.createElement('h3');
        nomeH3.textContent = hospital.nome;
        const enderecoP = document.createElement('p');
        enderecoP.innerHTML = `${hospital.endereco}<br>- ${hospital.cidade}`;
        const telefoneP = document.createElement('p');
        telefoneP.textContent = `(${hospital.telefone})`;
        
        const botaoDetalhes = document.createElement('div'); 
        botaoDetalhes.classList.add('card-botao', 'btn-abrir-modal'); 
        botaoDetalhes.dataset.hospitalId = hospital.id; 
        botaoDetalhes.textContent = 'Acessar';
        
        infoDiv.appendChild(nomeH3);
        infoDiv.appendChild(enderecoP);
        infoDiv.appendChild(telefoneP);
        infoDiv.appendChild(botaoDetalhes);
        
        const imagemDiv = document.createElement('div');
        imagemDiv.classList.add('card-imagem');
        const imagem = document.createElement('img');
        imagem.src = hospital.img;
        imagem.alt = `Imagem de ${hospital.nome}`;
        imagemDiv.appendChild(imagem);

        card.appendChild(infoDiv);
        card.appendChild(imagemDiv);
        return card;
    };

    const renderizarHospitais = (dados) => {
        if (resultadosContainer) {
            resultadosContainer.querySelectorAll('.hospital-card').forEach(card => card.remove());
            
            const totalPaginas = Math.ceil(dados.length / HOSPITAIS_POR_PAGINA);
            const indiceInicial = (paginaAtual - 1) * HOSPITAIS_POR_PAGINA;
            const indiceFinal = indiceInicial + HOSPITAIS_POR_PAGINA;
            const hospitaisDaPagina = dados.slice(indiceInicial, indiceFinal);
            
            if (hospitaisDaPagina.length === 0) {
                resultadosContainer.innerHTML = '<p style="padding: 20px;">Nenhuma unidade de saúde encontrada com o filtro selecionado.</p>';
                const paginacaoContainer = document.getElementById('paginacao-container');
                if(paginacaoContainer) paginacaoContainer.remove();
                return;
            }

            const fragment = document.createDocumentFragment();
            hospitaisDaPagina.forEach(hospital => {
                fragment.appendChild(criarCardElemento(hospital));
            });
            
            const paginacaoContainer = document.getElementById('paginacao-container');
            if (paginacaoContainer) {
                resultadosContainer.insertBefore(fragment, paginacaoContainer);
            } else {
                resultadosContainer.appendChild(fragment);
            }
            
            renderizarPaginacao(totalPaginas);
        }
    };
    

    // logica do modal (preenchimento de dados)

    
    const fecharModalDetalhes = () => {
        modalHospital.style.display = 'none';
    };

    const abrirModalDetalhes = (hospitalId) => {
        const hospital = HOSPITAIS.find(h => h.id == hospitalId);
        
        if (!hospital) return;

        // Atualiza a variável global que o agendamento.js lê
        window.hospitalAtivo = hospital; 

        // Preenche os dados 
        document.getElementById('modal-nome').textContent = hospital.nome;
        document.getElementById('modal-endereco').innerHTML = `${hospital.endereco}<br>${hospital.cidade}`;
        document.getElementById('modal-telefone').textContent = `(${hospital.telefone})`;
        
        const modalImagem = document.getElementById('modal-imagem');
        modalImagem.src = hospital.img;
        modalImagem.alt = `Imagem de ${hospital.nome}`;
        
        // preenche o select
        selectServicoAgendar.innerHTML = '<option value="">Selecione um serviço</option>';
        
        // exames (e)
        hospital.examesOferecidos.forEach(cod => {
            const exame = EXAMES_DETALHE.find(e => e.codigo === cod);
            if (exame) {
                const opt = new Option(`Exame: ${exame.nome}`, `E-${cod}`);
                selectServicoAgendar.appendChild(opt);
            }
        });

        // vacinas (v)
        hospital.vacinasOferecidas.forEach(cod => {
            const vacina = VACINAS_DETALHE.find(v => v.codigo === cod);
            if (vacina) {
                const opt = new Option(`Vacina: ${vacina.nome}`, `V-${cod}`);
                selectServicoAgendar.appendChild(opt);
            }
        });

        // Configura e limpa os campos de agendamento (Preparando para o outro script)
        inputDataAgendar.min = new Date().toISOString().split('T')[0];
        inputDataAgendar.value = '';
        selectHorarioDisponivel.innerHTML = '<option value="">Selecione a data primeiro</option>';
        mensagemAgendamento.textContent = '';
        mensagemAgendamento.className = 'mensagem-status';
        
        modalHospital.style.display = 'flex';
    };
    

    // logica de paginação
    
    const mudarPagina = (delta) => {
        const totalPaginas = Math.ceil(dadosAtualmenteFiltrados.length / HOSPITAIS_POR_PAGINA);
        
        paginaAtual += delta;
        
        if (paginaAtual < 1) paginaAtual = 1;
        if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

        renderizarHospitais(dadosAtualmenteFiltrados);
        
        resultadosContainer.scrollIntoView({ behavior: 'smooth' });
    };

    const renderizarPaginacao = (totalPaginas) => {
        let paginacaoContainer = document.getElementById('paginacao-container');

        if (!paginacaoContainer) {
            paginacaoContainer = document.createElement('div');
            paginacaoContainer.id = 'paginacao-container';
            resultadosContainer.appendChild(paginacaoContainer); 
        }
        
        paginacaoContainer.innerHTML = '';
        paginacaoContainer.classList.add('paginacao-estilo'); 

        if (totalPaginas <= 1) return;

        const btnAnterior = document.createElement('button');
        btnAnterior.textContent = 'Anterior';
        btnAnterior.disabled = paginaAtual === 1;
        btnAnterior.onclick = () => mudarPagina(-1);
        paginacaoContainer.appendChild(btnAnterior);

        const indicador = document.createElement('span');
        indicador.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
        paginacaoContainer.appendChild(indicador);

        const btnProximo = document.createElement('button');
        btnProximo.textContent = 'Próximo';
        btnProximo.disabled = paginaAtual === totalPaginas;
        btnProximo.onclick = () => mudarPagina(1);
        paginacaoContainer.appendChild(btnProximo);
    };

    // logica de filtragem
    
    const aplicarFiltro = (tipoFiltro, codigo) => {
        let resultadosFiltrados = HOSPITAIS;

        if (codigo === 'todos' || !codigo) {
            resultadosFiltrados = HOSPITAIS;
        } 
        else if (tipoFiltro === 'exame') {
            resultadosFiltrados = HOSPITAIS.filter(hospital => 
                hospital.examesOferecidos && hospital.examesOferecidos.includes(codigo)
            );
        } 
        else if (tipoFiltro === 'vacina') {
            resultadosFiltrados = HOSPITAIS.filter(hospital => 
                hospital.vacinasOferecidas && hospital.vacinasOferecidas.includes(codigo)
            );
        }
        
        dadosAtualmenteFiltrados = resultadosFiltrados;
        paginaAtual = 1; 
        
        renderizarHospitais(dadosAtualmenteFiltrados);
    };

    const preencherSelectFiltro = (selectElement, lista) => {
        lista.forEach(item => {
            const option = document.createElement('option');
            option.value = item.codigo; 
            option.textContent = item.nome; 
            selectElement.appendChild(option);
        });
    };
    
    // select de filtro
    preencherSelectFiltro(selectExames, EXAMES_DETALHE);
    preencherSelectFiltro(selectVacinas, VACINAS_DETALHE);

    // listener de filtro
    selectExames.addEventListener('change', function() {
        const codigoSelecionado = this.value; 
        selectVacinas.value = ""; // Limpa o outro filtro
        aplicarFiltro('exame', codigoSelecionado);
    });

    selectVacinas.addEventListener('change', function() {
        const codigoSelecionado = this.value;
        selectExames.value = ""; 
        aplicarFiltro('vacina', codigoSelecionado);
    });

    // listener do modal
    resultadosContainer.addEventListener('click', function(event) {
        const botao = event.target.closest('.btn-abrir-modal');
        if (botao) {
            const hospitalId = botao.dataset.hospitalId;
            abrirModalDetalhes(hospitalId);
        }
    });

    btnDiminuirModal.addEventListener('click', fecharModalDetalhes);
    
    // Renderiza a primeira página ao carregar
    aplicarFiltro('todos', 'todos'); 
});