document.addEventListener('DOMContentLoaded', () => {

    // SISTEMA DE MODO ESCURO (Dark Mode) //

    const DARK_MODE_STORAGE_KEY = 'darkModeEnabled';
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Aplica ou remove a classe "dark-mode" no <body>
    function applyDarkMode(isEnabled) {
        if (isEnabled) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // Carrega preferência salva no localStorage e aplica
    function loadAndApplyDarkMode() {
        const isDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY) === 'true';
        applyDarkMode(isDarkMode);
        if (darkModeToggle) darkModeToggle.checked = isDarkMode;
    }

    loadAndApplyDarkMode();

    // Evento do botão toggle (ativa/desativa modo escuro)
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            const isEnabled = darkModeToggle.checked;
            localStorage.setItem(DARK_MODE_STORAGE_KEY, isEnabled);
            applyDarkMode(isEnabled);
            showFeedback(
                'feedbackConfig',
                isEnabled ? '🌙 Modo Escuro ativado.' : '☀️ Modo Claro ativado.',
                'ok',
                2000
            );
        });
    }


    // DADOS SIMULADOS E METAS PADRÃO //

    const STORAGE_KEY_METAS = 'metasResidenciais';

    // Dados simulados iniciais de consumo
    let dadosSimulados = {
        energia: 40,
        agua: 80,
        gas: 30,
        internet: 60,
        lixo: 20,
        alimentacao: 90
    };

    // Informações temporais (para projeção de consumo)
    const diasCorridos = 15;
    const diasNoMes = 30;
    const progressoMes = diasCorridos / diasNoMes;

    // Custos por unidade de consumo
    const fatoresCusto = {
        energia: 0.85,
        agua: 7.00,
        gas: 4.50,
        alimentacao: 1
    };

    // Metas de consumo padrão
    const metasPadrao = {
        metaEnergia: 200,
        metaAgua: 10,
        metaGas: 15,
        metaInternet: 300,
        metaLixo: 50,
        metaAlimentacao: 1000
    };

    // SEÇÃO 3 — FUNÇÕES DE APOIO //

    // Coloca a primeira letra em maiúscula
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Carrega metas salvas no localStorage ou retorna as padrão
    const carregarMetas = () => {
        const metasSalvas = localStorage.getItem(STORAGE_KEY_METAS);
        return metasSalvas ? JSON.parse(metasSalvas) : metasPadrao;
    };

    // Salva novas metas no localStorage
    const salvarMetas = (metas) => {
        localStorage.setItem(STORAGE_KEY_METAS, JSON.stringify(metas));
    };

    // Formata valores conforme unidade (kWh, m³, R$, etc.)
    const formatarConsumo = (valor, unidade) => {
        if (unidade === 'L') return (valor * 1000).toFixed(0).replace('.', ',');
        if (unidade === 'm³' && valor < 100) return valor.toFixed(1).replace('.', ',');
        if (unidade === 'kWh') return valor.toFixed(0).replace('.', ',');
        if (unidade === 'R$') return valor.toFixed(2).replace('.', ',');
        return valor.toFixed(0).replace('.', ',');
    };

    // Define cores para cada tipo de dado
    function getCor(key) {
        const cores = {
            energia: '#ffb703',
            agua: '#219ebc',
            gas: '#fb8500',
            internet: '#8338ec',
            lixo: '#3a86ff',
            alimentacao: '#8ac926'
        };
        return cores[key] || '#cccccc';
    }

    // Exibe feedbacks visuais (mensagens temporárias)
    function showFeedback(elementId, message, type = 'ok', duration = 3000) {
        const msgElement = document.getElementById(elementId);
        if (!msgElement) return;

        msgElement.textContent = message;
        msgElement.classList.remove('status-ok', 'status-error');
        msgElement.classList.add(`status-${type}`);

        msgElement.style.display = 'inline-block';

        setTimeout(() => {
            msgElement.style.display = 'none';
            msgElement.textContent = '';
        }, duration);
    }

    // Gera gradiente circular (gráfico de pizza)
    function gerarConicGradient(dados) {
        const total = dados.reduce((sum, item) => sum + item.valor, 0);
        let pontoInicial = 0;
        let cssString = [];

        dados.forEach(item => {
            const percentual = (item.valor / total) * 100;
            const pontoFinal = pontoInicial + percentual;
            cssString.push(`${item.cor} ${pontoInicial}% ${pontoFinal}%`);
            pontoInicial = pontoFinal;
        });

        return `conic-gradient(${cssString.join(', ')})`;
    }


    // DASHBOARD DINÂMICO DE CONSUMO //

    if (document.querySelector('.dashboard')) {
        const alertasContainer = document.getElementById('alertasMetas');
        const elementos = {};
        const barras = {};
        const colunas = {};
        let custoProjetadoTotal = 0;

        // Liga variáveis JS aos elementos HTML do dashboard
        for (let chave in dadosSimulados) {
            elementos[chave] = document.getElementById(chave);
            barras[chave] = document.getElementById("barra" + capitalize(chave));
            colunas[chave] = document.getElementById("col" + capitalize(chave));
        }

        // -- Função principal que atualiza os gráficos e alertas --
        function atualizarDashboard() {
            let alertasHTML = '';
            custoProjetadoTotal = 0;
            const metas = carregarMetas();
            const dadosParaGraficos = [];

            // Loop para atualizar cada item de consumo
            for (let item in dadosSimulados) {

                // Simula variação de consumo com o tempo
                dadosSimulados[item] += Math.random() * 6 - 3;
                if (dadosSimulados[item] < 0) dadosSimulados[item] = 0;

                const metaItem = metas['meta' + capitalize(item)] || 1;
                if (dadosSimulados[item] > metaItem * 1.5)
                    dadosSimulados[item] = metaItem * 1.5;

                // Define unidade de medida
                const unidade =
                    item === 'agua' ? 'm³' :
                    item === 'energia' ? 'kWh' :
                    item === 'gas' ? 'm³' :
                    item === 'internet' ? 'GB' :
                    item === 'lixo' ? 'kg' : '';

                // Calcula custo projetado
                const fator = fatoresCusto[item] || 0;
                const consumoProjetado = dadosSimulados[item] / progressoMes;
                let custoProjetadoItem = fator > 0 ? consumoProjetado * fator : 0;
                custoProjetadoTotal += custoProjetadoItem;

                // Guarda dados para o gráfico
                dadosParaGraficos.push({
                    label: capitalize(item),
                    valor: custoProjetadoItem > 0 ? custoProjetadoItem : dadosSimulados[item],
                    cor: getCor(item)
                });

                // Atualiza o valor mostrado no HTML
                if (elementos[item])
                    elementos[item].textContent = formatarConsumo(dadosSimulados[item], unidade);

                // Atualiza barra de progresso
                const porcentagem = (dadosSimulados[item] / metaItem) * 100;
                const barraElemento = barras[item];

                if (barraElemento) {
                    barraElemento.style.width = `${Math.min(porcentagem, 100)}%`;
                    if (porcentagem >= 90) barraElemento.style.backgroundColor = 'red';
                    else if (porcentagem >= 70) barraElemento.style.backgroundColor = 'orange';
                    else barraElemento.style.backgroundColor = 'var(--cor-' + item + ')';
                }

                // Gera alertas se projeção ultrapassar a meta
                const porcentagemProjetada = (consumoProjetado / metaItem) * 100;
                if (progressoMes > 0.1 && porcentagemProjetada > 105) {
                    const excedente = consumoProjetado - metaItem;
                    alertasHTML += `
                        <div class="alerta alerta-perigo">
                            <span class="alert-icon">🚨</span>
                            <b>ALERTA:</b> ${capitalize(item)} pode <b>exceder a meta</b> em 
                            ${formatarConsumo(excedente, unidade)} ${unidade}!
                        </div>
                    `;
                }
            }

            // Mostra custo total projetado
            const custoProjetadoElement = document.getElementById('custoProjetado');
            if (custoProjetadoElement)
                custoProjetadoElement.textContent = formatarConsumo(custoProjetadoTotal, 'R$');

            // Atualiza contêiner de alertas
            if (alertasContainer) {
                if (alertasHTML !== '') {
                    alertasContainer.innerHTML = `<h2>Alertas e Dicas (${diasCorridos}/${diasNoMes} dias)</h2>` + alertasHTML;
                    alertasContainer.style.display = 'block';
                } else {
                    alertasContainer.style.display = 'none';
                }
            }

            // -- Atualiza gráfico de pizza e legendas --
            const totalGeral = dadosParaGraficos.reduce((soma, d) => soma + d.valor, 0);
            const graficoDiv = document.querySelector('.grafico-pizza');
            if (graficoDiv)
                graficoDiv.style.backgroundImage = gerarConicGradient(dadosParaGraficos.filter(d => d.valor > 0));

            const legendaDiv = document.querySelector('.legenda');
            if (legendaDiv)
                legendaDiv.innerHTML = dadosParaGraficos.map(d => {
                    const pct = totalGeral > 0 ? ((d.valor / totalGeral) * 100).toFixed(1) : 0;
                    return `<span style="color:${d.cor}">${d.label}: ${pct}%</span>`;
                }).join(' ');

            // -- Atualiza gráfico de colunas --
            const escalaVisualMaxima = 200;
            for (let item in dadosSimulados) {
                const dadoItem = dadosParaGraficos.find(d => d.label.toLowerCase() === item);
                if (!dadoItem) continue;

                const colunaElemento = colunas[item];
                const percentSpan = colunaElemento?.querySelector('.percent');

                const porcentagemColuna = totalGeral > 0 ? (dadoItem.valor / totalGeral) * 100 : 0;
                const alturaProporcional = (porcentagemColuna / 100) * escalaVisualMaxima;

                if (colunaElemento) {
                    colunaElemento.style.height = `${alturaProporcional}px`;
                    colunaElemento.style.backgroundColor = getCor(item);
                }

                if (percentSpan) {
                    percentSpan.textContent = `${porcentagemColuna.toFixed(1)}%`;
                    percentSpan.style.display = porcentagemColuna > 0 ? 'block' : 'none';
                }
            }
        }

        // Atualiza o dashboard a cada 2 segundos
        atualizarDashboard();
        setInterval(atualizarDashboard, 2000);
    }

    
    // FORMULÁRIOS E FEEDBACKS DE AÇÃO //

    // -- Formulário de metas --
    const goalForm = document.getElementById('goalForm');
    if (goalForm) {
        const metasAtuais = carregarMetas();
        for (const [key, value] of Object.entries(metasAtuais)) {
            const input = document.getElementById(key);
            if (input) input.value = value;
        }

        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const novasMetas = {
                metaEnergia: parseFloat(document.getElementById('metaEnergia').value),
                metaAgua: parseFloat(document.getElementById('metaAgua').value),
                metaGas: parseFloat(document.getElementById('metaGas').value),
                metaInternet: parseFloat(document.getElementById('metaInternet').value),
                metaLixo: parseFloat(document.getElementById('metaLixo').value),
                metaAlimentacao: parseFloat(document.getElementById('metaAlimentacao').value)
            };
            salvarMetas(novasMetas);
            showFeedback('feedbackMetas', '🎯 Metas salvas com sucesso!', 'ok');
        });
    }

    // -- Formulário de metas --
    const formsMetasForm = document.querySelector('#forms-metas-form');
    if (formsMetasForm) {
        formsMetasForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showFeedback('feedbackFormsMetas', '🎯 Metas de consumo salvas com sucesso!', 'ok');
        });
    }

    // -- Formulário de registro de gastos --
    const formsRegistroForm = document.querySelector('#forms-registro-form');
    if (formsRegistroForm) {
        formsRegistroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showFeedback('feedbackFormsRegistro', '📝 Gasto registrado com sucesso!', 'ok');
            const valorGasto = parseFloat(document.getElementById('valor_gasto').value);
            if (!isNaN(valorGasto)) dadosSimulados.alimentacao += valorGasto / 100;
            formsRegistroForm.reset();
        });
    }

    // -- Formulário de usuário --
    const usuarioForm = document.querySelector('.user-profile form');
    if (usuarioForm) {
        usuarioForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showFeedback('feedbackUsuario', '👤 Alterações e Senha salvas com sucesso!', 'ok');
        });
    }

    // -- Botão de download de configuração --
    const configBtn = document.getElementById('btnDownload');
    if (configBtn) {
        configBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showFeedback('feedbackConfig', '💾 Download do histórico iniciado. Verifique sua pasta de downloads.', 'ok', 5000);
        });
    }

// -- Botão de histórico da página de notificações--
 const historicoNotificacoesBtn = document.getElementById('btnHistoricoNotificacoes');
 if (historicoNotificacoesBtn) {
  historicoNotificacoesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showFeedback('feedbackConfig', '💾 Download do histórico das notificações iniciado. Verifique sua pasta de downloads.', 'ok', 5000);
});
 }

    // -- Formulário de contato --
    const contatoForm = document.querySelector('.contact-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showFeedback('feedbackContato', '📞 Sua mensagem foi enviada com sucesso! Entraremos em contato.', 'ok');
            contatoForm.reset();
        });
    }

});
