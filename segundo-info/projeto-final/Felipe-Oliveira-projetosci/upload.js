document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const messageContainer = document.getElementById('message-container');
    const API_URL = 'http://localhost:3000';

    // 1. Verificação de Segurança (Cliente)
    // O utilizador está logado? Se não, não devia estar aqui.
    const token = localStorage.getItem('scientia_token');
    if (!token) {
        // Redireciona para o login se não houver token
        window.location.href = 'login.html?error=acesso_negado';
        return;
    }

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        messageContainer.textContent = '';
        messageContainer.className = 'message';
        
        // 2. Obter os dados do formulário
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const fileInput = document.getElementById('datasetFile');
        const file = fileInput.files[0];

        if (!titulo || !descricao || !file) {
            mostrarMensagem('Todos os campos são obrigatórios.', 'error');
            return;
        }

        // 3. Usar 'FormData' (Obrigatório para enviar ficheiros!)
        // Não podemos usar JSON.stringify aqui.
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descricao', descricao);
        formData.append('datasetFile', file); // O 'nome' tem de ser igual ao do multer: 'datasetFile'

        mostrarMensagem('A enviar dataset... Por favor, aguarde.', 'success');

        try {
            const response = await fetch(`${API_URL}/api/datasets/upload`, {
                method: 'POST',
                headers: {
                    // 4. Enviar o nosso "passaporte" (Token JWT)
                    // O 'authMiddleware' no back-end vai procurar por isto!
                    'Authorization': `Bearer ${token}`
                    // Nota: NÃO definas 'Content-Type' aqui. O 'fetch'
                    // com 'FormData' trata disso automaticamente (boundary, etc.)
                },
                body: formData // Envia o formulário
            });

            const result = await response.json();

            if (response.ok) { // Status 201
                mostrarMensagem(result.mensagem + ' A redirecionar para o dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html'; // De volta ao início
                }, 2000);
            } else { // Status 400, 401, 500
                mostrarMensagem(result.mensagem, 'error');
            }

        } catch (error) {
            console.error('Erro no upload:', error);
            mostrarMensagem('Erro de conexão com o servidor.', 'error');
        }
    });

    function mostrarMensagem(mensagem, tipo) {
        messageContainer.textContent = mensagem;
        messageContainer.className = `message ${tipo}`;
    }
});