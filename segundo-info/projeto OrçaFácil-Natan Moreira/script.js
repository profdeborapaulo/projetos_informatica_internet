document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES GERAIS ---
    const body = document.body;
    
    // 1. TELAS
    const loginPage = document.getElementById('login-page');
    const landingPage = document.getElementById('landing-page');
    const appSection = document.getElementById('app');
    
    // 2. BOTÕES DE FLUXO
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username-input');
    const guestBtn = document.getElementById('guest-btn');
    const startBtn = document.getElementById('start-btn');
    const userGreeting = document.getElementById('user-greeting');

    // 3. HEADER
    const themeToggle = document.getElementById('theme-toggle');
    const faqBtn = document.getElementById('faq-btn');
    const tutorialBtn = document.getElementById('tutorial-btn'); // NOVO

    // 4. MODAIS
    const faqModal = document.getElementById('faq-modal');
    const closeFaqBtn = document.getElementById('close-faq');
    
    const tutorialModal = document.getElementById('tutorial-modal'); // NOVO
    const closeTutorialBtn = document.getElementById('close-tutorial'); // NOVO
    const finishTutorialBtn = document.getElementById('finish-tutorial'); // NOVO

    // --- INICIALIZAÇÃO DE USUÁRIO (FLUXO) ---
    const savedUser = localStorage.getItem('orcafacil_user');
    if (savedUser) {
        userGreeting.textContent = savedUser;
        showLandingPage();
    } else {
        loginPage.classList.remove('hidden');
    }

    function handleLogin(name) {
        if (name) {
            localStorage.setItem('orcafacil_user', name);
            userGreeting.textContent = name;
        } else {
            userGreeting.textContent = 'Visitante';
        }
        loginPage.style.opacity = '0';
        setTimeout(() => {
            loginPage.classList.add('hidden');
            showLandingPage();
        }, 500);
    }

    function showLandingPage() {
        landingPage.classList.remove('hidden');
        landingPage.style.opacity = '1';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = usernameInput.value.trim();
        if (name) handleLogin(name);
        else alert('Digite seu nome.');
    });

    guestBtn.addEventListener('click', () => handleLogin(null));

    startBtn.addEventListener('click', () => {
        landingPage.classList.add('fade-out');
        setTimeout(() => {
            landingPage.classList.add('hidden');
            appSection.classList.remove('hidden');
        }, 500);
    });

    // --- LÓGICA DE MODAIS (FAQ e TUTORIAL) ---
    
    function openModal(modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open'), 10);
    }

    function closeModal(modal) {
        modal.classList.remove('open');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    // FAQ
    faqBtn.addEventListener('click', () => openModal(faqModal));
    closeFaqBtn.addEventListener('click', () => closeModal(faqModal));
    faqModal.addEventListener('click', (e) => { if(e.target === faqModal) closeModal(faqModal); });

    // TUTORIAL
    tutorialBtn.addEventListener('click', () => openModal(tutorialModal));
    closeTutorialBtn.addEventListener('click', () => closeModal(tutorialModal));
    finishTutorialBtn.addEventListener('click', () => closeModal(tutorialModal));
    tutorialModal.addEventListener('click', (e) => { if(e.target === tutorialModal) closeModal(tutorialModal); });

    // Accordion do FAQ
    document.querySelectorAll('.accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) panel.style.maxHeight = panel.scrollHeight + "px";
            else panel.style.maxHeight = null;
        });
    });

    // --- TEMA (DARK MODE) ---
    const themeIcon = themeToggle.querySelector('i');
    if (localStorage.getItem('orcafacil_theme') === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        if (isDark) themeIcon.classList.replace('fa-moon', 'fa-sun');
        else themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('orcafacil_theme', isDark ? 'dark' : 'light');
    });

    // --- APP FINANCEIRO ---
    const expenseForm = document.getElementById('expense-form');
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');
    const categoriaInput = document.getElementById('categoria');
    const dataInput = document.getElementById('data');
    const expenseList = document.getElementById('list');
    const totalGastoEl = document.getElementById('total-gasto');
    const currencySelect = document.getElementById('currency-select');
    const settingsForm = document.getElementById('settings-form');
    const metaInput = document.getElementById('meta-input');
    const goalDisplay = document.getElementById('goal-display');
    const progressBar = document.getElementById('progress-bar');
    const goalPercentage = document.getElementById('goal-percentage');
    const submitBtn = document.getElementById('submit-btn');
    const resetAppBtn = document.getElementById('reset-app-btn');
    
    const pieChartCtx = document.getElementById('category-chart').getContext('2d');
    const lineChartCtx = document.getElementById('timeline-chart').getContext('2d');

    let currentCurrency = localStorage.getItem('orcafacil_currency') || 'BRL';
    currencySelect.value = currentCurrency;
    
    let transactions = JSON.parse(localStorage.getItem('orcafacil_despesas')) || [];
    let metaMensal = JSON.parse(localStorage.getItem('orcafacil_meta')) || 0;
    
    let myPieChart = null;
    let myLineChart = null;
    let isEditing = false;
    let editID = null;

    const categoryIcons = { 'Alimentação': '🍔', 'Transporte': '🚗', 'Lazer': '🎬', 'Moradia': '🏠', 'Outros': '📦' };

    function formatCurrency(val) {
        let locale = 'pt-BR';
        if (currentCurrency === 'USD') locale = 'en-US';
        if (currentCurrency === 'EUR') locale = 'de-DE';
        return val.toLocaleString(locale, { style: 'currency', currency: currentCurrency });
    }

    function formatDate(dateStr) { const d = new Date(dateStr); d.setDate(d.getDate() + 1); return d.toLocaleDateString('pt-BR'); }
    function saveTransactions() { localStorage.setItem('orcafacil_despesas', JSON.stringify(transactions)); }
    function saveMeta() { localStorage.setItem('orcafacil_meta', JSON.stringify(metaMensal)); }
    function generateID() { return Math.floor(Math.random() * 1000000); }
    function setDefaultDate() { dataInput.value = new Date().toISOString().split('T')[0]; }

    function updateDashboard() {
        const total = transactions.reduce((acc, t) => acc + t.valor, 0);
        totalGastoEl.textContent = formatCurrency(total);
        let percent = (metaMensal > 0) ? (total / metaMensal) * 100 : 0;
        let displayPercent = Math.min(percent, 100);
        goalDisplay.textContent = formatCurrency(metaMensal);
        progressBar.style.width = `${displayPercent}%`;
        goalPercentage.textContent = `${percent.toFixed(1)}%`;
        progressBar.classList.remove('warning', 'danger');
        if (percent >= 90) progressBar.classList.add('danger'); else if (percent >= 70) progressBar.classList.add('warning');
    }

    function updateCharts() {
        const catTotals = transactions.reduce((acc, t) => { acc[t.categoria] = (acc[t.categoria] || 0) + t.valor; return acc; }, {});
        if (myPieChart) myPieChart.destroy();
        myPieChart = new Chart(pieChartCtx, {
            type: 'doughnut',
            data: { labels: Object.keys(catTotals), datasets: [{ data: Object.values(catTotals), backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'], borderWidth: 2 }] },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });

        const timeTotals = transactions.reduce((acc, t) => { acc[t.data] = (acc[t.data] || 0) + t.valor; return acc; }, {});
        const sortedDates = Object.keys(timeTotals).sort((a, b) => new Date(a) - new Date(b));
        if (myLineChart) myLineChart.destroy();
        myLineChart = new Chart(lineChartCtx, {
            type: 'line',
            data: { labels: sortedDates, datasets: [{ label: 'Gastos', data: sortedDates.map(d => timeTotals[d]), borderColor: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.2)', fill: true, tension: 0.3 }] },
            options: { responsive: true, scales: { x: { type: 'time', time: { unit: 'day', tooltipFormat: 'dd/MM' } } } }
        });
    }

    function renderTransactions() {
        expenseList.innerHTML = '';
        if (transactions.length === 0) expenseList.innerHTML = '<li style="padding:15px; text-align:center; opacity:0.6;">Nenhuma despesa.</li>';
        else {
            const sorted = [...transactions].sort((a, b) => new Date(b.data) - new Date(a.data));
            sorted.forEach(t => addTransactionToDOM(t));
        }
        updateDashboard(); updateCharts();
    }

    function addTransactionToDOM(t) {
        const item = document.createElement('li'); item.classList.add('expense-item');
        const icon = categoryIcons[t.categoria] || '💰';
        item.innerHTML = `
            <div class="info"><span class="date-tag">${formatDate(t.data)}</span><strong>${t.descricao}</strong><span class="category-tag">${icon} ${t.categoria}</span></div>
            <div class="actions"><span class="expense-value">${formatCurrency(t.valor)}</span>
            <button class="action-btn edit-btn" data-id="${t.id}"><i class="fas fa-pencil-alt"></i></button>
            <button class="action-btn delete-btn" data-id="${t.id}"><i class="fas fa-trash"></i></button></div>`;
        item.querySelector('.delete-btn').addEventListener('click', () => deleteTransaction(t.id));
        item.querySelector('.edit-btn').addEventListener('click', () => editTransaction(t.id));
        expenseList.appendChild(item);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!descricaoInput.value || !valorInput.value || !dataInput.value) { alert('Preencha tudo.'); return; }
        const data = { descricao: descricaoInput.value, valor: parseFloat(valorInput.value), categoria: categoriaInput.value, data: dataInput.value };
        if (isEditing) { transactions = transactions.map(t => t.id === editID ? { ...t, ...data } : t); isEditing = false; editID = null; submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Adicionar'; submitBtn.classList.remove('editing'); }
        else { transactions.push({ id: generateID(), ...data }); }
        saveTransactions(); renderTransactions(); expenseForm.reset(); setDefaultDate();
    }

    function editTransaction(id) {
        const t = transactions.find(x => x.id === id); if (!t) return;
        descricaoInput.value = t.descricao; valorInput.value = t.valor; categoriaInput.value = t.categoria; dataInput.value = t.data;
        isEditing = true; editID = id; submitBtn.innerHTML = '<i class="fa-solid fa-save"></i> Salvar'; submitBtn.classList.add('editing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function deleteTransaction(id) { if (confirm('Deletar?')) { transactions = transactions.filter(t => t.id !== id); saveTransactions(); renderTransactions(); } }
    
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault(); currentCurrency = currencySelect.value; localStorage.setItem('orcafacil_currency', currentCurrency);
        const val = parseFloat(metaInput.value); if(!isNaN(val) && val >= 0) { metaMensal = val; saveMeta(); }
        loadMeta(); renderTransactions(); alert('Salvo!');
    });

    resetAppBtn.addEventListener('click', () => { if(confirm('Apagar tudo?')) { localStorage.clear(); location.reload(); } });
    expenseForm.addEventListener('submit', handleFormSubmit);

    // Init App
    setDefaultDate(); metaInput.value = metaMensal; renderTransactions();
});