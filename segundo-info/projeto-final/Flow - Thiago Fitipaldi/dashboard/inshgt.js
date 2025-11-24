// versão enxuta: só puxa transações e faz checks simples para mudar o texto no #insights
(function () {
    const STORAGE_KEY = 'flow-transacoes';

    function readTx() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        }  catch (e) {
                console.error('Erro lendo transações para insights', e);
                return [];
        }
    }

    function formatCurrency(v) {
        return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function renderSimple() {
        const el = document.getElementById('insights');
            if (!el) return;
            const tx = readTx();
                if (!tx.length) {
                    el.textContent = 'Sem transações. Por favor registre despesas/receitas para ver insights.';
                        return;
        }

        const totalGasto = tx.filter(t => Number(t.amount) < 0).reduce((s, t) => s + Math.abs(Number(t.amount) || 0), 0);
        const totalEntrada = tx.filter(t => Number(t.amount) > 0).reduce((s, t) => s + Number(t.amount) || 0, 0);

        //os IF para dar os insights
        if (totalGasto === 0) {
            el.textContent = 'Nenhuma despesa registrada. Continue assim ou registre despesas para acompanhar.';
            return;
        }
        if (totalGasto > totalEntrada) {
            el.innerHTML = `Atenção: suas despesas totais ${formatCurrency(totalGasto)} são maiores que suas entradas ${formatCurrency(totalEntrada)}.`;
            return;
        }
        const ratio = totalGasto / Math.max(totalEntrada, 1);
        if (ratio > 0.7) {
            el.textContent = `Cuidado: suas despesas representam ${Math.round(ratio * 100)}% das suas entradas.`;
            return;
        }
        el.textContent = `Bom trabalho! Suas despesas ${formatCurrency(totalGasto)} vs entradas ${formatCurrency(totalEntrada)}.`;
    }
    //iniciar e atulizar periodicamente os insights
    function inicio() {
        renderSimple();
        window.addEventListener('storage', renderSimple);
        setInterval(renderSimple, 2000);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') inicio();
    else document.addEventListener('DOMContentLoaded', inicio);

})();
