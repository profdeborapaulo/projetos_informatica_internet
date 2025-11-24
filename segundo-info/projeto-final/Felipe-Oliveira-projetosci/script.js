/*
 * SCRIPT PRINCIPAL DA PLATAFORMA SCIENTIA (index.html)
 *
 * Responsabilidades:
 * 1. Gerir o estado de autenticação (UI de login/logout).
 * 2. Buscar e renderizar a lista inicial de datasets.
 * 3. Gerir a funcionalidade de busca.
 */

// Espera que todo o HTML esteja carregado para começar
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONSTANTES E SELETORES DO DOM ---
    // Define todas as nossas "peças" do HTML num só lugar.
    
    const API_URL = 'http://localhost:3000';
    const navContainer = document.getElementById('main-nav');
    const uploadSection = document.getElementById('upload-section');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const datasetListContainer = document.getElementById('dataset-list-container');

    // --- 2. LÓGICA DE AUTENTICAÇÃO (AUTH) ---
    // Funções relacionadas com saber quem é o utilizador.

    /**
     * Verifica o token no localStorage e atualiza a UI (nav, botão de upload).
     */
    function setupAuthUI() {
        const token = localStorage.getItem('scientia_token');

        if (token) {
            // --- UTILIZADOR ESTÁ LOGADO ---
            try {
                // Descodifica o token para pegar o nome
                const payload = JSON.parse(atob(token.split('.')[1]));
                const nomeUsuario = payload.nome;

                // Atualiza a navegação
                navContainer.innerHTML = `
                    <span class="welcome-message">Bem-vindo(a), ${nomeUsuario}!</span>
                    <a href="#" id="logout-button" class="btn btn-secondary">Sair</a>
                `;
                
                // Mostra o botão de Upload
                uploadSection.style.display = 'block';

                // Adiciona o evento de clique ao botão "Sair"
                document.getElementById('logout-button').addEventListener('click', handleLogout);

            } catch (e) {
                // Token inválido ou corrompido
                console.error('Erro ao descodificar token:', e);
                handleLogout(null); // Força o logout
            }
        } else {
            // --- UTILIZADOR ESTÁ DESLOGADO ---
            navContainer.innerHTML = `
                <a href="login.html" class="btn btn-primary">Login / Registar</a>
            `;
            uploadSection.style.display = 'none';
        }
    }

    /**
     * Lida com o clique no botão "Sair".
     * Limpa o token e recarrega a página.
     */
    function handleLogout(e) {
        if (e) e.preventDefault(); // Impede o link de navegar
        localStorage.removeItem('scientia_token');
        window.location.reload();
    }

    // --- 3. API / LÓGICA DE DADOS ---
    // Funções que comunicam com o nosso back-end.

    /**
     * Busca TODOS os datasets da API.
     */
    async function fetchTodosDatasets() {
        try {
            const response = await fetch(`${API_URL}/api/datasets`);
            if (!response.ok) throw new Error('Falha ao carregar dados');
            
            const datasets = await response.json();
            renderizarDatasets(datasets, 'Datasets Recentes'); // Envia para renderizar
            
        } catch (error) {
            console.error('Erro ao buscar todos os datasets:', error);
            datasetListContainer.innerHTML = '<p class="error-message">Não foi possível carregar os datasets.</p>';
        }
    }

    /**
     * Busca datasets filtrados por um termo de pesquisa.
     */
    async function fetchDatasetsPorTermo(termo) {
        try {
            const url = `${API_URL}/api/datasets/buscar?termo=${encodeURIComponent(termo)}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            
            const datasets = await response.json();
            renderizarDatasets(datasets, 'Resultados da Busca'); // Envia para renderizar
            
        } catch (error) {
            console.error('Erro ao buscar datasets:', error);
            datasetListContainer.innerHTML = '<p class="error-message">Erro ao carregar os dados. Tente novamente.</p>';
        }
    }
    
    // --- 4. RENDERIZAÇÃO (ATUALIZAÇÃO DA UI) ---
    // Funções que desenham coisas no ecrã.

    /**
     * Pega numa lista de datasets (JSON) e transforma-os em HTML.
     */
    function renderizarDatasets(datasets, tituloSecao) {
        // Limpa a lista atual e define o título da secção
        datasetListContainer.innerHTML = `<h2>${tituloSecao}</h2>`;

        if (datasets.length === 0) {
            datasetListContainer.innerHTML += '<p>Nenhum dataset encontrado.</p>';
            return;
        }

        // Cria um card para cada item da lista
        datasets.forEach(dataset => {
            const dataFormatada = new Date(dataset.data_upload).toLocaleDateString('pt-BR');
            
            const cardHTML = `
                <article class="dataset-card">
                    <h3>${dataset.titulo}</h3>
                    <p class="card-meta">
                        <span class="author">Por: ${dataset.autor_nome || 'Autor Desconhecido'}</span>
                        <span class="date">Upload em: ${dataFormatada}</span>
                    </p>
                    <p class="description">
                        ${dataset.descricao}
                    </p>
                    <a href="detalhe.html?id=${dataset.id}" class="btn btn-secondary">
                        Ver Detalhes e Comentar
                    </a>
                </article>
            `;
            // Adiciona o novo card ao container
            datasetListContainer.innerHTML += cardHTML;
        });
    }

    // --- 5. EVENTOS E INICIALIZAÇÃO ---
    // Código que "cola" tudo e corre quando a página carrega.

    /**
     * Lida com o envio (submit) do formulário de busca.
     */
    function handleSearchSubmit(evento) {
        evento.preventDefault(); // Impede o recarregamento da página
        const termo = searchInput.value.trim();

        if (termo) {
            // Se houver um termo, busca por ele
            fetchDatasetsPorTermo(termo);
        } else {
            // Se a busca estiver vazia, carrega todos os datasets
            fetchTodosDatasets();
        }
    }

    /**
     * Função de inicialização
     * Corre assim que o DOM está pronto.
     */
    function init() {
        // 1. Configura a barra de navegação (Login ou Logout)
        setupAuthUI();
        
        // 2. Anexa o "ouvinte" ao formulário de busca
        searchForm.addEventListener('submit', handleSearchSubmit);

        // 3. Carrega a lista inicial de datasets
        fetchTodosDatasets();
    }
    
    // --- PONTO DE ENTRADA ---
    init();

}); // Fim do DOMContentLoaded