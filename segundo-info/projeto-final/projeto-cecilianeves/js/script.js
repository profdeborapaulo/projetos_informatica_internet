// configuração inicial do usuário (exibe o nome do usuário na sidebar)
function setupUserGreeting() {
    const userName = localStorage.getItem('userName') || 'Usuário';
    const userElement = document.getElementById('userName');
    if (userElement) {
        userElement.textContent = userName;
    }
}

// preenche select com as áreas escolhidas no onboarding
function populateAreaSelect() {
    const userAreas = JSON.parse(localStorage.getItem('userAreas')) || ['Trabalho', 'Saúde', 'Estudos'];
    const areaSelect = document.getElementById('taskArea');
    
    if (areaSelect) {
        // reseta o select mantendo a opção padrão
        areaSelect.innerHTML = '<option value="">Selecione uma área</option>';
        
        userAreas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });
    }
    return userAreas;
}

// dark mode
function setupThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeBtn ? themeBtn.querySelector('i') : null;

    // verifica se já existe uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // evento de clique
    if (themeBtn && icon) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                // tema escuro: salva e muda ícone (sol)
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                // tema claro: salva e muda ícone (lua)
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
}

// inicializa a função quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle(); 
});

// controle do menu mobile
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('menuToggle');
    
    if (sidebar && toggleButton) {
        sidebar.classList.toggle('active');
        toggleButton.classList.toggle('active');
        
        // alterna ícone
        const icon = toggleButton.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    }
}

// fecha o menu ao clicar em links (mobile)
function setupMobileMenuClose() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });
}

// controle de modals
function openModal(modalId = 'taskModal') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        
        // se for o modal de criar tarefa, preenche data/hora padrão
        if (modalId === 'taskModal') {
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            const dateInput = document.getElementById('taskDate');
            const timeInput = document.getElementById('taskTime');
            
            if (dateInput) dateInput.value = dateStr;
            if (timeInput) timeInput.value = '09:00';
        }
    }
}
//fecha o modal e limpa o formulário
function closeModal(modalId = 'taskModal') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        
        // se for modal de tarefa, limpa o formulário
        if (modalId === 'taskModal') {
            const form = document.getElementById('taskForm');
            if (form) form.reset();
        }
    }
}

// configura fechamento ao clicar fora do modal
function setupModalListeners(modalId = 'taskModal') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === modalId) closeModal(modalId);
        });
    }
}
// sistema de logout
// função de sair e limpar dados(redireciona para o início)
function logoutAndClearData() {
    if (confirm('Tem certeza que deseja sair? Todos os seus dados salvos serão perdidos.')) {
        localStorage.removeItem('userName');
        localStorage.removeItem('userAreas');
        localStorage.removeItem('tasks');
        localStorage.removeItem('onboardingComplete');
        
        window.location.href = 'index.html'; 
    }
}

// inicialização
//executa ao carregar qualquer página
document.addEventListener('DOMContentLoaded', () => {
    setupUserGreeting();
    populateAreaSelect();
    setupMobileMenuClose();
    setupModalListeners();
});