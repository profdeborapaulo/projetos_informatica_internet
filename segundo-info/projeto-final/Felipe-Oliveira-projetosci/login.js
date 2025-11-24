document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageContainer = document.getElementById('message-container');
    const API_URL = 'http://localhost:3000';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        messageContainer.textContent = '';
        messageContainer.className = 'message';

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_URL}/api/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    senha: data.senha
                })
            });

            const result = await response.json();

            if (response.ok) { // Status 200
                // SUCESSO! Onde guardamos o passaporte?
                // O localStorage é um "cofre" do navegador.
                localStorage.setItem('scientia_token', result.token);

                mostrarMensagem(result.mensagem + ' A redirecionar para o dashboard...', 'success');
                
                // Redireciona para a página principal
                setTimeout(() => {
                    window.location.href = 'index.html'; // Vai para o dashboard
                }, 1500);

            } else { // Status 401, 500
                mostrarMensagem(result.mensagem, 'error');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            mostrarMensagem('Erro de conexão com o servidor. Tente novamente.', 'error');
        }
    });

    function mostrarMensagem(mensagem, tipo) {
        messageContainer.textContent = mensagem;
        messageContainer.className = `message ${tipo}`;
    }
});