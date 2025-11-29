document.addEventListener('DOMContentLoaded', () => {

    const STORAGE_METAS = 'metasDashboard';
    const STORAGE_CONSUMO = 'consumoSimulado';
    const DARK_KEY = 'darkModeEnabled';

    // metas padrão //
    const metasPadrao = {
        energia: 200,
        agua: 10,
        gas: 15,
        internet: 300,
        lixo: 50,
        alimentacao: 1000
    };

    // cores usadas no dashboard
    const cores = {
        energia: '#ffb703',
        agua: '#219ebc',
        gas: '#fb8500',
        internet: '#8338ec',
        lixo: '#3a86ff',
        alimentacao: '#8ac926'
    };
    

    // UTILITÁRIAS //
    function getCor(k) { return cores[k] || '#cccccc'; }

    function saveJSON(key, obj) { localStorage.setItem(key, JSON.stringify(obj)); }
    function loadJSON(key, fallback = null) {
        try {
            const v = localStorage.getItem(key);
            return v ? JSON.parse(v) : fallback;
        } catch (e) { return fallback; }
    }

    function carregarMetas() {
        return loadJSON(STORAGE_METAS, metasPadrao);
    }
    function salvarMetas(metas) { saveJSON(STORAGE_METAS, metas); }

    function carregarConsumo() {
        return loadJSON(STORAGE_CONSUMO, {
            energia: 40,
            agua: 80,
            gas: 30,
            internet: 60,
            lixo: 20,
            alimentacao: 90
        });
    }
    function salvarConsumo(c) { saveJSON(STORAGE_CONSUMO, c); }

    function formatBR(value, decimals = 1) {
        return Number(value).toFixed(decimals).replace('.', ',');
    }

    // MODO ESCURO //
    const body = document.body;
    const darkToggle = document.getElementById('dark-mode-toggle');

    function applyDarkMode(on) { body.classList.toggle('dark-mode', on); }

    (function initDark() {
        const on = localStorage.getItem(DARK_KEY) === 'true';
        applyDarkMode(on);
        if (darkToggle) darkToggle.checked = on;

        if (darkToggle)
            darkToggle.addEventListener('change', (e) => {
                localStorage.setItem(DARK_KEY, e.target.checked);
                applyDarkMode(e.target.checked);
                showFeedback('feedbackConfig', e.target.checked ? '🌙 Modo Escuro ativado.' : '☀️ Modo Claro ativado.', 'ok', 2000);
            });
    })();

    // FEEDBACKS VISUAIS //
    function showFeedback(id, message, type = 'ok', duration = 2500) {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = message;
        el.classList.remove('status-ok', 'status-error');
        el.classList.add(type === 'ok' ? 'status-ok' : 'status-error');
        el.style.display = 'inline-block';
        setTimeout(() => { el.style.display = 'none'; }, duration);
    }

    // MAPA DE INPUTS DAS METAS //
    const metaInputMap = [
        { key: 'energia', ids: ['metaEnergia'] },
        { key: 'agua', ids: ['metaAgua'] },
        { key: 'gas', ids: ['metaGas'] },
        { key: 'internet', ids: ['metaInternet'] },
        { key: 'lixo', ids: ['metaLixo'] },
        { key: 'alimentacao', ids: ['metaAlimentacao'] }
    ];

    function findMetaInputElement(key) {
        const map = metaInputMap.find(m => m.key === key);
        if (!map) return null;
        for (const id of map.ids) {
            const el = document.getElementById(id);
            if (el) return el;
        }
        return null;
    }

    // FORMULÁRIO DE METAS //
    (function initFormMetas() {
        const formIds = ['goalForm', 'forms-metas-form'];
        let form = null;

        for (const id of formIds) {
            const f = document.getElementById(id);
            if (f) { form = f; break; }
        }

        if (!form) return;

        const metas = carregarMetas();

        // Preenche inputs
        metaInputMap.forEach(m => {
            const el = findMetaInputElement(m.key);
            if (el && metas[m.key] !== undefined) el.value = metas[m.key];
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const novas = {};
            metaInputMap.forEach(m => {
                const el = findMetaInputElement(m.key);
                let val = metasPadrao[m.key];
                if (el) {
                    const v = String(el.value).replace(',', '.');
                    val = isNaN(Number(v)) ? metasPadrao[m.key] : Number(v);
                }
                novas[m.key] = val;
            });

            salvarMetas(novas);

            showFeedback('feedbackFormsMetas', 'Metas salvas com sucesso!', 'ok', 2000);

            setTimeout(() => window.location.reload(), 350);
        });
    })();

    // FORMULÁRIO REGISTRO DE GASTO //
    (function initFormRegistro() {
        const form = document.getElementById('forms-registro-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            showFeedback('feedbackFormsRegistro', 'Gasto registrado com sucesso!', 'ok', 2500);

            const valorInput = document.getElementById('valor_gasto');
            const categoriaEl = document.getElementById('categoria_gasto');
            const categoria = categoriaEl ? categoriaEl.value : 'alimentacao';

            const raw = valorInput ? String(valorInput.value).replace(',', '.') : '';
            const valor = parseFloat(raw);

            if (!isNaN(valor)) {
                const consumoAtual = carregarConsumo();
                if (consumoAtual[categoria] === undefined) consumoAtual[categoria] = 0;

                if (categoria === 'alimentacao') consumoAtual.alimentacao += valor / 100;
                else consumoAtual[categoria] += valor;

                salvarConsumo(consumoAtual);
            }

            form.reset();
        });
    })();

    // DASHBOARD //
    (function initDashboard() {
        if (!document.querySelector('.dashboard')) return;

        function barraId(item) {
            return {
                energia: 'barraEnergia',
                agua: 'barraAgua',
                gas: 'barraGas',
                internet: 'barraInternet',
                lixo: 'barraLixo',
                alimentacao: 'barraAlimentacao'
            }[item];
        }

        const ids = ['energia', 'agua', 'gas', 'internet', 'lixo', 'alimentacao'];

        const elementos = Object.fromEntries(ids.map(i => [i, document.getElementById(i)]));
        const barras = Object.fromEntries(ids.map(i => [i, document.getElementById(barraId(i))]));

        const colunas = Object.fromEntries(ids.map(i =>
            [i, document.getElementById('col' + i.charAt(0).toUpperCase() + i.slice(1))]
        ));

        const percentSpans = {};
        ids.forEach(k => {
            if (colunas[k]) percentSpans[k] = colunas[k].querySelector('.percent');
        });

        const graficoPizzaEl = document.querySelector('.grafico-pizza');
        const legendaEl = document.querySelector('.legenda');
        const alertasContainer = document.getElementById('alertasMetas');
        const custoProjetadoEl = document.getElementById('custoProjetado');

        const custoUnidade = {
            energia: 0.85,
            agua: 7,
            gas: 4.5,
            alimentacao: 1
        };

        let consumo = carregarConsumo();

        function montarConic(dados, porcentagens) {
            let acumulado = 0;

            return `conic-gradient(${dados.map((d, idx) => {
                const pct = porcentagens[idx];
                const start = acumulado;
                const end = acumulado + pct;
                acumulado = end;
                return `${getCor(d.nome)} ${start}% ${end}%`;
            }).join(', ')})`;
        }

        function atualizar() {
            const metas = carregarMetas();

            // Atualiza valores com flutuação
            ids.forEach(item => {
                consumo[item] = (consumo[item] || 0) + (Math.random() * 6 - 3);
                if (consumo[item] < 0) consumo[item] = 0;
            });
            salvarConsumo(consumo);

            // Update cards
            ids.forEach(item => {
                if (elementos[item]) {
                    elementos[item].textContent =
                        `${formatBR(consumo[item], 1)} / ${formatBR(metas[item], 1)}`;
                }
            });

            const dadosGrafico = [];
            let totalCusto = 0;
            let alertasHTML = '';

            const nomesAcento = {
                energia: 'Energia',
                agua: 'Água',
                gas: 'Gás',
                internet: 'Internet',
                lixo: 'Lixo',
                alimentacao: 'Alimentação'
            };

            ids.forEach(item => {
                const valor = consumo[item] || 0;
                const meta = metas[item] || 1;
                const pctMeta = (valor / meta) * 100;

                const barra = barras[item];
                if (barra)
                    barra.style.width = Math.min(pctMeta, 100) + '%';

                if (pctMeta > 105) {
                    alertasHTML += `<div class="alerta alerta-perigo"><b>${nomesAcento[item]}</b> pode exceder a meta (${meta}).</div>`;
                }

                const custoItem = (custoUnidade[item] || 0) * valor;
                totalCusto += custoItem;

                dadosGrafico.push({ nome: item, valor });
            });

            if (custoProjetadoEl)
                custoProjetadoEl.textContent = formatBR(totalCusto, 2);

            if (alertasContainer) {
                if (alertasHTML) {
                    alertasContainer.innerHTML = `<h2>Alertas</h2>${alertasHTML}`;
                    alertasContainer.style.display = 'block';
                }
                else alertasContainer.style.display = 'none';
            }

            
            const totalValor = dadosGrafico.reduce((s, d) => s + d.valor, 0);
            const divisor = totalValor === 0 ? 1 : totalValor;

           
            let acumulado = 0;
            const porcentagens = dadosGrafico.map((d, idx) => {
                let pct = (d.valor / divisor) * 100;

                if (idx < dadosGrafico.length - 1)
                    pct = Number(pct.toFixed(1));
                else
                    pct = Number((100 - acumulado).toFixed(1));

                acumulado += pct;
                return pct;
            });

            // Gráfico de colunas
            dadosGrafico.forEach((d, idx) => {
                const coluna = colunas[d.nome];
                const pct = porcentagens[idx];

                if (coluna) {
                    const altura = Math.max(6, pct * 2);
                    coluna.style.height = `${altura}px`;
                    coluna.style.backgroundColor = getCor(d.nome);

                    if (percentSpans[d.nome]) {
                        percentSpans[d.nome].textContent = `${pct}%`;
                        percentSpans[d.nome].style.display = 'block';
                    }
                }
            });

            // Pizza
            if (graficoPizzaEl)
                graficoPizzaEl.style.background = montarConic(dadosGrafico, porcentagens);

            // Legenda
            if (legendaEl) {
                legendaEl.innerHTML = dadosGrafico.map((d, idx) =>
                    `<span style="color:${getCor(d.nome)}">${nomesAcento[d.nome]}: ${porcentagens[idx]}%</span>`
                ).join(' ');
            }
        }

        atualizar();
        setInterval(atualizar, 2000);
    })();



     // BOTÕES //
    (function initButtons() {
        const b1 = document.getElementById('btnDownload') || document.getElementById('btn-download');
        if (b1) b1.addEventListener('click', (e) => {
            e.preventDefault();
            showFeedback('feedbackConfig', 'Download do histórico iniciado. Verifique sua pasta.', 'ok', 4000);
        });

        const b2 = document.getElementById('btnHistoricoNotificacoes') || document.getElementById('btn-historico-notificacoes');
        if (b2) b2.addEventListener('click', (e) => {
            e.preventDefault();
            showFeedback('feedbackConfig', 'Histórico de notificações baixado.', 'ok', 4000);
        });
    })();

    
    // FORMULÁRIOS ADICIONAIS //
    (function initOtherForms() {
        const contato = document.querySelector('.contact-form');
        if (contato) {
            contato.addEventListener('submit', (e) => {
                e.preventDefault();
                showFeedback('feedbackContato', 'Sua mensagem foi enviada com sucesso!', 'ok', 2500);
                contato.reset();
            });
        }

        const usuarioForm = document.querySelector('.user-profile form');
        if (usuarioForm) {
            usuarioForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showFeedback('feedbackUsuario', 'Alterações salvas!', 'ok', 2000);
            });
        }

    })();

    if (!loadJSON(STORAGE_METAS)) saveJSON(STORAGE_METAS, metasPadrao);
    if (!loadJSON(STORAGE_CONSUMO)) saveJSON(STORAGE_CONSUMO, carregarConsumo());

});

