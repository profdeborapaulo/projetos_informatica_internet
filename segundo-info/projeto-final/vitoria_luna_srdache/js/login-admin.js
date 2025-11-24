// js/login-admin.js
// Depende do session.js para getSession, createSession, ADMINS

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('adminLoginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');
    const errorMessage = document.getElementById('errorMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            errorMessage.textContent = '';

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (ADMINS[email] === password) {
                createSession(email, true); // true para administrador
                alert(`Bem-vindo(a) Admin! Você será redirecionado(a) para o Painel de Gerenciamento.`);
                window.location.href = 'dashboard-admin.html'; // Redireciona para o painel de admin
                return;
            }

            if (USERS[email] === password) {
                errorMessage.textContent = 'Use o formulário de login Comum.';
                return;
            }

            errorMessage.textContent = 'E-mail ou senha do Administrador incorretos.';
        });
    }
});