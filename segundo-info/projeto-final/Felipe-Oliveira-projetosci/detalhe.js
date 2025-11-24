/*
 * ========================================
 * SCRIPT DA PÁGINA DE DETALHE (detalhe.html)
 * ========================================
 */

// Espera que o HTML esteja pronto
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELETORES DO DOM & ESTADO GLOBAL ---
    // Apanhamos todos os elementos HTML e variáveis que vamos usar
    const detalheContainer = document.getElementById('detalhe-container');
    const commentForm = document.getElementById('comment-form');
    const commentLoginNotice = document.getElementById('comment-login-notice');
    const commentListContainer = document.getElementById('comment-list');
    const commentTextarea = commentForm.querySelector('textarea');
    
    const API_URL = 'http://localhost:3000';
    
    // Apanha o ID do dataset do URL (ex: ...?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const datasetId = urlParams.get('id');
    
    // Apanha o token do utilizador (se existir)
    const token = localStorage.getItem('scientia_token');

    
    // --- 2. FUNÇÃO DE INICIALIZAÇÃO ---
    // Esta é a função principal que corre quando a página abre
    
    function init() {
        if (!datasetId) {
            detalheContainer.innerHTML = '<h1>Erro</h1><p>Nenhum ID de dataset fornecido. <a href="index.html">Voltar</a>.</p>';
            return;
        }

        // 1. Configura a UI de comentários (mostra/esconde formulário)
        setupComentariosUI();

        // 2. Busca os dados do dataset e os comentários
        fetchDetalhesDataset();
        fetchComentarios();

        // 3. "Ouve" pelo envio do formulário de comentário
        commentForm.addEventListener('submit', handleCommentSubmit);
    }

    
    // --- 3. FUNÇÕES DE API (FETCH) ---
    // Funções que falam com o back-end

    /**
     * Busca os detalhes do dataset (título, descrição, autor).
     */
    async function fetchDetalhesDataset() {
        try {
            const response = await fetch(`${API_URL}/api/datasets/${datasetId}`);
            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.mensagem);
            }
            const dataset = await response.json();
            renderizarDetalhes(dataset); // Envia para ser "desenhado"
        } catch (error) {
            console.error('Erro ao buscar detalhes:', error);
            detalheContainer.innerHTML = `<h1>Erro</h1><p>${error.message}</p>`;
        }
    }

    /**
     * Busca a lista de comentários para este dataset.
     */
    async function fetchComentarios() {
        try {
            const response = await fetch(`${API_URL}/api/datasets/${datasetId}/comentarios`);
            if (!response.ok) throw new Error('Falha ao carregar comentários.');
            
            const comentarios = await response.json();
            renderizarComentarios(comentarios); // Envia para ser "desenhado"
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
            commentListContainer.innerHTML = '<p>Não foi possível carregar os comentários.</p>';
        }
    }

    
    // --- 4. FUNÇÕES DE "HANDLER" (EVENTOS) ---
    // Funções que são chamadas por uma ação do utilizador (clique, envio)

    /**
     * Chamado quando o formulário de comentário é enviado.
     */
    async function handleCommentSubmit(e) {
        e.preventDefault();
        const texto = commentTextarea.value.trim();

        if (!texto) {
            alert('Por favor, escreve o teu comentário.');
            return;
        }
        
        if (!token) { // Segurança extra
            alert('Sessão expirada. Por favor, faz login novamente.');
            return;
        }

        try {
            // Envia o comentário para a API
            const response = await fetch(`${API_URL}/api/datasets/${datasetId}/comentarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ texto: texto })
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.mensagem);
            }

            const novoComentario = await response.json(); // A API devolve o comentário criado
            
            adicionarComentarioNaLista(novoComentario); // Adiciona-o ao ecrã
            commentTextarea.value = ''; // Limpa a caixa de texto

        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            alert(`Erro: ${error.message}`);
        }
    }

    /**
     * Chamado quando o utilizador clica em "Fazer Download".
     */
    async function handleDownloadClick(e) {
        e.preventDefault();
        
        if (!token) {
            alert('Apenas utilizadores logados podem fazer download. Por favor, faça login.');
            window.location.href = `login.html?redirect=detalhe.html?id=${datasetId}`;
            return;
        }

        try {
            // Pede o ficheiro à API (enviando o token)
            const response = await fetch(`${API_URL}/api/datasets/download/${datasetId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.mensagem);
            }

            // O ficheiro veio!
            const blob = await response.blob(); // Converte a resposta num "blob"
            
            // Pega o nome do ficheiro do cabeçalho da resposta
            const contentDisposition = response.headers.get('content-disposition');
            let filename = 'download';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch && filenameMatch[1]) filename = filenameMatch[1];
            }

            // Cria um link <a> invisível para forçar o download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            
            a.click(); // "Clica" no link
            
            // Limpa o link da memória
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            console.error('Erro no download:', error);
            alert(`Erro ao tentar descarregar o ficheiro: ${error.message}`);
        }
    }

    
    // --- 5. FUNÇÕES DE RENDERIZAÇÃO (UI) ---
    // Funções que "desenham" o HTML na página
    
    /**
     * "Desenha" os detalhes do dataset no topo da página.
     */
    function renderizarDetalhes(dataset) {
        const dataFormatada = new Date(dataset.data_upload).toLocaleDateString('pt-BR');
        
        detalheContainer.innerHTML = `
            <h1>${dataset.titulo}</h1>
            <p class="meta-info">
                Enviado por: <strong>${dataset.autor_nome || 'Desconhecido'}</strong> <br>
                Em: ${dataFormatada}
            </p>
            <p class="dataset-descricao">
                ${dataset.descricao.replace(/\n/g, '<br>')}
            </p>
            <a href="#" id="download-button" class="btn-download">
                Fazer Download (${dataset.nome_arquivo})
            </a>
        `;

        // Agora que o botão existe, liga o "ouvinte" de clique nele
        document.getElementById('download-button').addEventListener('click', handleDownloadClick);
    }

    /**
     * "Desenha" a lista inteira de comentários.
     */
    function renderizarComentarios(comentarios) {
        commentListContainer.innerHTML = ''; // Limpa a lista
        if (comentarios.length === 0) {
            commentListContainer.innerHTML = '<p>Ainda não existem comentários. Sê o primeiro!</p>';
            return;
        }
        comentarios.forEach(adicionarComentarioNaLista); // Adiciona um por um
    }

    /**
     * "Desenha" um único comentário na lista.
     */
    function adicionarComentarioNaLista(comentario) {
        // Se a mensagem "nenhum comentário" estiver, apaga-a
        const pVazio = commentListContainer.querySelector('p');
        if (pVazio) pVazio.remove();
        
        const dataFormatada = new Date(comentario.data_criacao).toLocaleString('pt-BR');
        const cardHTML = `
            <article class="comment-card">
                <strong>${comentario.autor_nome || 'Utilizador Removido'}</strong>
                <p>${comentario.texto.replace(/\n/g, '<br>')}</p>
                <small>Em: ${dataFormatada}</small>
            </article>
        `;
        commentListContainer.innerHTML += cardHTML; // Adiciona no fim
    }
    
    /**
     * Mostra ou esconde o formulário de comentário baseado no estado de login.
     */
    function setupComentariosUI() {
        if (token) {
            commentForm.style.display = 'block';
            commentLoginNotice.style.display = 'none';
        } else {
            commentForm.style.display = 'none';
            commentLoginNotice.style.display = 'block';
        }
    }

    // --- 6. PONTO DE ENTRADA ---
    // Chama a função principal para iniciar a página
    init();
    
}); // Fim do DOMContentLoaded