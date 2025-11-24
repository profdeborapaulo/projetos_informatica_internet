// js/session.js

// Credenciais de simulação
const USERS = {
    "usuario@srdache.com.br": "senha123", // Usuário comum
};
const ADMINS = {
    "admin@srdache.com.br": "admin123", // Administrador
};

// --- Funções de Sessão ---

function getSession() {
    const sessionData = sessionStorage.getItem('srdache_session');
    if (sessionData) {
        try {
            return JSON.parse(sessionData);
        } catch (e) {
            console.error("Erro ao parsear sessão:", e);
            return null;
        }
    }
    return null;
}

function createSession(email, isAdmin) {
    const session = {
        email: email,
        isAdmin: isAdmin,
        loginTime: new Date().toISOString()
    };
    sessionStorage.setItem('srdache_session', JSON.stringify(session));
}

function destroySession() {
    sessionStorage.removeItem('srdache_session');
    // Redireciona para a home
    window.location.href = 'index.html'; 
}

// --- Funções de Validação e UI ---

/**
 * Redireciona para o login se não houver sessão ativa.
 * @param {Event} event - O evento de clique (opcional, para prevenir ações).
 * @param {string} path - Caminho da página de login.
 * @returns {boolean} Retorna true se a sessão existir, false caso contrário.
 */
function enforceLogin(event, path = 'login.html') {
    if (!getSession()) {
        if (event) event.preventDefault();
        alert("🔒 Você precisa fazer login para acessar esta funcionalidade.");
        window.location.href = path;
        return false;
    }
    return true;
}

/**
 * Atualiza o link de Login/Logout e gerencia elementos visíveis (como o botão de Admin).
 */
function updateUI(loginPath = 'login.html') {
    const session = getSession();
    const navLists = document.querySelectorAll('.nav-links');
    // Pega o nome do arquivo atual, ex: 'dashboard-admin.html'
    const currentPath = window.location.pathname.split('/').pop(); 

    navLists.forEach(ul => {
        // 1. Limpeza: Remove links dinâmicos antigos para evitar duplicação
        ul.querySelectorAll('.nav-login, .nav-dashboard').forEach(el => el.parentElement.remove());

        // Variável auxiliar para o link de Sair/Login
        const liLogin = document.createElement('li');
        const loginLink = document.createElement('a');
        loginLink.classList.add('nav-login');
        
        if (session) {
            // USUÁRIO LOGADO: Adiciona Painel Admin (se for Admin) e Sair
            
            if (session.isAdmin) {
                const liDashboard = document.createElement('li');
                const dashboardLink = document.createElement('a');
                dashboardLink.classList.add('nav-dashboard');
                dashboardLink.href = 'dashboard-admin.html';
                dashboardLink.textContent = 'Painel Admin';

                // 🌟 CORREÇÃO 1: Adiciona a marcação 'active' no link do Painel Admin
                if (currentPath === 'dashboard-admin.html') {
                    dashboardLink.classList.add('active');
                }
                
                liDashboard.appendChild(dashboardLink);
                ul.appendChild(liDashboard);
            }

            // Cria o link de Sair
            loginLink.href = '#';
            loginLink.textContent = 'Sair';
            loginLink.title = `Logado como: ${session.email}`;
            loginLink.onclick = destroySession;
            liLogin.appendChild(loginLink);

        } else {
            // USUÁRIO DESLOGADO: Cria o link de Login
            loginLink.href = loginPath;
            loginLink.textContent = 'Login';
            loginLink.title = 'Faça login';
            loginLink.onclick = null;

            // 🌟 CORREÇÃO 2: Marca o link de Login como ativo (se estiver em login.html ou login-admin.html)
            if (currentPath === 'login.html' || currentPath === 'login-admin.html') {
                 loginLink.classList.add('active');
            }
            liLogin.appendChild(loginLink);
        }

        // Adiciona o link de Login/Sair como o último item
        ul.appendChild(liLogin);
    });

    // 2. Gerenciar visibilidade do card 'Adicionar Pet' (ID: adicionarPetCard)
    // ... (restante do código que controla a visibilidade do 'adicionarPetCard' permanece igual) ...
    const adminElement = document.getElementById('adicionarPetCard');
    if (adminElement) {
        if (session && session.isAdmin) {
            adminElement.style.display = 'flex'; 
        } else {
            adminElement.style.display = 'none'; 
        }
    }
}

// Inicializa a atualização da UI ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});