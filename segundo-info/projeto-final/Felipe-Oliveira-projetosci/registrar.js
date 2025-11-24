document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message-container');
    const API_URL = 'http://localhost:3000'; // O teu URL do back-end

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Limpa mensagens antigas
        messageContainer.textContent = '';
        messageContainer.className = 'message';

        // Recolhe os dados do formulário
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        // Validação básica da senha (podes melhorar isto)
        if (data.senha.length < 6) {
            mostrarMensagem('A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/usuarios/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) { // Status 201
                mostrarMensagem(result.mensagem + ' A redirecionar para o login...', 'success');
                // Espera 2 segundos e redireciona para o login
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else { // Status 400, 500, etc.
                mostrarMensagem(result.mensagem, 'error');
            }

        } catch (error) {
            console.error('Erro ao registar:', error);
            mostrarMensagem('Erro de conexão com o servidor. Tente novamente.', 'error');
        }
    });

    function mostrarMensagem(mensagem, tipo) {
        messageContainer.textContent = mensagem;
        messageContainer.className = `message ${tipo}`;
    }
});