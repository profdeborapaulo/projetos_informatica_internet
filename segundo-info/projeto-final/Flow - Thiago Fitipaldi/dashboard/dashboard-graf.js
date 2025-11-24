//grafico em pizza babyyyyyy


(function () {
    const categorias = ['Comida', 'Transporte', 'Moradia', 'Lazer'];
    const RESTO = 'Outros';
    const graf_CDN = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    const Graf_ID = 'chart-root';
    const STORAGE_KEY = 'flow-transacoes';

    function formatCurrency(v) {
        return Number(v).toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
        });
    }

    function getSaldo() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            console.error('Erro lendo transações do storage', e);
            return [];
        }
    }

//todo calculo para fazer o grafico expressar porcentagem e o calculo para funcionar em si
    function calculo() {
        const tx = getSaldo();
            const gasto = tx.filter(t => Number(t.amount) < 0);
            const soma = new Map(categorias.map(c => [c, 0]));
                let outros = 0;
                let total = 0;

                for (const t of gasto) {
                    const amt = Math.abs(Number(t.amount) || 0);
                    total += amt;
                    const cat = (t.category || '').toString();
                    if (categorias.includes(cat)) {
                        soma.set(cat, soma.get(cat) + amt);
                    } else {
                        outros += amt;
                    }
                }

                const nome = [...categorias];
                const valores = categorias.map(c => soma.get(c) || 0);

                    if (outros > 0) {
                        nome.push(RESTO);
                        valores.push(outros);
                    }

                    const porcentagem = valores.map(v => (total > 0 ? (v / total) * 100 : 0));

                    return { nome, valores, porcentagem, total };
    }

//Responsavel pela criação e verificação do graf se ele existe ou não e se ele deve ser criado ou não
    function criarGraf(root) {
        root.innerHTML = '';
        const canvas = document.createElement('canvas');
        canvas.id = 'graf-canvas';
        canvas.style.maxWidth = '100%';
        root.appendChild(canvas);
        return root;
    }
// ve se o grafico ja existe ou precisa criar um novo
    function ensureGraf() {
        const root = document.getElementById(Graf_ID);
        if (!root) return null;
        if (!root.querySelector('canvas')) criarGraf(root);
        return root;
    }

//carrega a grafico
    function load_Graf(lg) {
        if (window.Chart) return lg();
        const existe = document.querySelector(`script[src="${graf_CDN}"]`);
        if (existe) {
            existe.addEventListener('load', lg);
            return;
        }

        const s = document.createElement('script');
        s.src = graf_CDN;
        s.onload = lg;
        s.onerror = () => console.error('Falha ao carregar Chart.js');
        document.head.appendChild(s);
    }

        let graf_n = null;
        let sair = '';

        // atualiza o grafico conforme os dados inseridos 
        function graf_atu() {
                const root = ensureGraf();
                if (!root) return;
                const { nome, valores, total } = calculo();
                const sig = nome.join('|') + '::' + valores.join('.');
                if (sig === sair) return;
                sair = sig;

                const canvas = root.querySelector('canvas');
                const gtx = canvas.getContext('2d');

                const graf_cor = [
                        '#FF7A7A', // Comida
                        '#FFD26B', // Transporte
                        '#8BD3B7', // Moradia
                        '#6EA8FE', // Lazer
                        '#C6C6C6'  // Outros
                ];

                const cor_usada = graf_cor.slice(0, nome.length);

                if (graf_n) {
                        graf_n.data.labels = nome;
                        graf_n.data.datasets[0].data = valores;
                        graf_n.data.datasets[0].backgroundColor = cor_usada;
                        graf_n.update();
                        return;
                }

                graf_n = new Chart(gtx, {
                        type: 'pie',
                        data: {
                                labels: nome,
                                datasets: [{
                                        data: valores,
                                        backgroundColor: cor_usada,
                                        borderColor: '#fff',
                                        borderWidth: 2
                                }]
                        },
                        options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                        tooltip: {
                                                callbacks: {
                                                        label: (ctx) => {
                                                                const v = ctx.raw || 0;
                                                                const pct = total > 0 ? (v / total) * 100 : 0;
                                                                return `${ctx.label}: ${formatCurrency(v)} (${pct.toFixed(1)}%)`;
                                                        }
                                                }
                                        },
                                        legend: {
                                                position: 'bottom',
                                                labels: {
                                                        boxWidth: 12,
                                                        padding: 12
                                                }
                                        }
                                }
                        }
                });

                canvas.style.minHeight = '180px';
                canvas.style.display = 'block';
        }

        // que função linda, vai atualizar o grafico a cada 1 segundo
    function inicio() {
        const graf = ensureGraf();
        if (!graf) return;
        load_Graf(() => {
            graf_atu();
            setInterval(graf_atu, 1000);
        });
    }

    // inicia quando o documento estiber proto
    if (document.readyState === "completo" || document.readyState === 'interativo') {
        inicio();
    } else {
        document.addEventListener('DOMContentLoaded', inicio);
    }
})();