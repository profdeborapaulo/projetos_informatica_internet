// dashboard.js

const KEY_TX = 'flow-transacoes';
const KEY_BAL = 'flow-saldo';

const formatCurrency = v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// filtro dos inputs do saldo e receita do usuario
function parseCurrency(input) {
  if (input == null) return NaN;
  const s = String(input).replace(/\s/g, '')
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .replace(/[^\d.-]/g, '');
  return s === '' ? NaN : parseFloat(s);
}

// inserir a data atual automaticamente
const today = d => {
  const dt = new Date(d || Date.now());
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const yyyy = dt.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

// variáveis de mais importantes (estado da conta bancaria)
let transacoes = [];
let saldo = 0;

// vai carregar o estado que esta saldo mo LocalStorage
function loadState() {
  try {
    transacoes = JSON.parse(localStorage.getItem(KEY_TX) || '[]');
  } catch (err) {
    console.error('Erro lendo transações:', err);
    transacoes = [];
  }
  const rawBal = localStorage.getItem(KEY_BAL);
  const b = rawBal !== null ? parseFloat(rawBal) : NaN;
    saldo = Number.isFinite(b) ? b : (parseCurrency(document.getElementById('saldo')?.innerText) || 0);
}

// esse vai salvar os dados no LocalStorage
function saveState() {
  try {
    localStorage.setItem(KEY_TX, JSON.stringify(transacoes));
    localStorage.setItem(KEY_BAL, String(saldo));
  } catch (err) {
        console.error('Erro salvando estado:', err);
  }
}

// vai autalizar o saldo na tela
function renderSaldo() {
  const el = document.getElementById('saldo');
  if (!el) return;
  el.innerText = formatCurrency(saldo);
}

// vai atualizatr a lista de transações
function renderTransacoes() {
  const container = document.getElementById('transacoes');
  if (!container) return;
  container.innerHTML = '';
  for (let i = transacoes.length - 1; i >= 0; i--) {
    const t = transacoes[i];
    const node = document.createElement('div');
    node.className = 'tx';
    node.innerHTML = `
      <div class="tx-amount">${t.amount < 0 ? '-' : ''}${formatCurrency(Math.abs(t.amount))} - ${t.category || '-'}</div>
      <div class="tx-desc">Descrição: ${t.description || '-'}</div>
      <div class="tx-date">Dia ${today(t.date)}</div>
    `;
    container.appendChild(node);
  }
}

// vai atualizar a mini lista de receitas
function renderReceitaMini() {
  const ul = document.getElementById('receita-historico');
  if (!ul) return;
  ul.innerHTML = '';
  const incomes = transacoes.filter(t => t.amount > 0).slice(-5).reverse();
    if (!incomes.length) {
        ul.innerHTML = '<li>...</li>';
        return;
  }
  incomes.forEach(i => {
    const li = document.createElement('li');
     li.textContent = `${formatCurrency(i.amount)} - ${today(i.date)}`;
        ul.appendChild(li);
  });
}


// a função para adcionar novas transações na lista
function addTransaction(amount, category = '', description = '') {
  const tx = { id: Date.now(), amount: Number(amount), category, description, date: new Date().toISOString() };
  transacoes.push(tx);
  saldo += Number(amount);
  saveState();
  renderSaldo();
  renderTransacoes();
  renderReceitaMini();
}


// Organizar todas as informações e mostrar ao usuario
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderSaldo();
  renderTransacoes();
  renderReceitaMini();

  const inReceita = document.getElementById('input-receita');
  const btnReceita = document.getElementById('add-receita');
  const inDespesa = document.getElementById('input-despesa');
  const btnDespesa = document.getElementById('add-despesa');
  const selCategoria = document.getElementById('categoria');
  const inDescricao = document.getElementById('descricao');

  if (btnReceita && inReceita) {
    btnReceita.addEventListener('click', () => {
      const v = parseCurrency(inReceita.value || inReceita.placeholder || '');
        if (!isFinite(v) || v <= 0) return alert('Informe um valor válido para a receita.');
            addTransaction(v, 'Receita', 'Entrada');
                inReceita.value = '';
    });
  }

  if (btnDespesa && inDespesa) {
    btnDespesa.addEventListener('click', () => {
      const v = parseCurrency(inDespesa.value || inDespesa.placeholder || '');
        if (!isFinite(v) || v <= 0) return alert('Informe um valor válido para a despesa.');
        const cat = selCategoria?.value || 'Despesa';
        const desc = inDescricao?.value || '';
            addTransaction(-Math.abs(v), cat, desc);
                inDespesa.value = '';
                    if (inDescricao) inDescricao.value = '';
    });
  }
});