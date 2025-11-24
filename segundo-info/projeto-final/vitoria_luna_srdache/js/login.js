// js/login.js
// Depende do session.js para getSession, createSession, USERS

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');
    const errorMessage = document.getElementById('errorMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            errorMessage.textContent = '';

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (USERS[email] === password) {
                createSession(email, false); // false para usuário comum
                alert(`Bem-vindo(a), ${email.split('@')[0]}! Você será redirecionado(a) para a página de Adoção.`);
                window.location.href = 'adote.html'; // Redireciona para Adote
                return;
            }

            if (ADMINS[email] === password) {
                errorMessage.textContent = 'Use o formulário de login de Administrador.';
                return;
            }

            errorMessage.textContent = 'E-mail ou senha incorretos.';
        });
    }
});