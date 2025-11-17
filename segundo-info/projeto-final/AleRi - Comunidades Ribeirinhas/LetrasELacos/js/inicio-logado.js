// === INÍCIO LOGADO - DASHBOARD ===

// função que cria o card visual de cada livro na seção "lendo agora" 
function criarCardLendoAgora(livro) {
    const div = document.createElement("div");
    div.className = "col-md-12 mb-3"; 

    // define o progresso atual do livro (caso não exista, usa 0)
    const progresso = livro.progresso || 0;

    // estrutura visual do card
    div.innerHTML = `
        <div class="card h-100 shadow-sm d-flex flex-row">
            <img src="${livro.img}" class="capalivro me-3" alt="${livro.titulo}" style="width: 120px; object-fit: cover; border-radius: 0.25rem 0 0 0.25rem;">
            <div class="card-body d-flex flex-column justify-content-between p-3">
                <div>
                    <h5 class="card-title mb-1">${livro.titulo}</h5>
                    <p class="card-title autor text-muted mb-1">${livro.autor}</p>
                    <p class="card-title text-sm">${livro.totalPaginas} páginas</p>
                </div>
                <div class="mt-2">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="text-muted text-sm" style="font-size: 1.3rem">Progresso</span>
                        <span class="fw-bold text-sm" style="font-size: 1.3rem">${progresso}%</span>
                    </div>
                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar" role="progressbar" 
                             style="width: ${progresso}%; transition: width 0.5s; background-color: #305167;" 
                             aria-valuenow="${progresso}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    return div;
}

// === função que renderiza o progresso circular da missão no painel ===
function renderizarProgressoCircularDash() {
    const progressoContainer = document.getElementById("progressoMissaoCircular");
    if (!progressoContainer) return;

    // configurações visuais de tamanho e cor do círculo
    const corBase = '#305167'; 
    const corConcluido = '#4CAF50'; 
    const raio = 40;
    const strokeWidth = 12;
    const svgSize = 120;
    const fontSize = 20;

    // tenta carregar o estado dos desafios armazenado localmente
    const desafios = JSON.parse(localStorage.getItem("desafios"));

    // define a chave e meta do desafio ativo (exemplo: Maratonista Literário)
    const DESAFIO_CHAVE = 'maratonistaLiterario';
    const DESAFIO_INFO = { meta: 5, titulo: "Maratonista Literário" };

    const estadoDesafio = desafios ? desafios[DESAFIO_CHAVE] : null;

    let progressoReal = 0; 
    let progressoExibido = 0; 
    let meta = DESAFIO_INFO.meta;
    let titulo = DESAFIO_INFO.titulo;
    let progressoPercent = 0;
    let textoProgresso = "Aguardando primeira leitura...";
    let corCirculo = corBase; 
    let isConcluido = false; 

    // verifica se há progresso salvo e calcula os valores corretamente
    if (estadoDesafio) {
        isConcluido = ["true", true, 1, "1", "True"].includes(estadoDesafio.concluido);
        
        progressoReal = estadoDesafio.progresso || 0;
        progressoExibido = Math.min(progressoReal, meta); 
        
        // define a aparência de acordo com o status da missão
        if (isConcluido) { 
            textoProgresso = "MISSÃO CONCLUÍDA!";
            progressoPercent = 100; 
            corCirculo = corConcluido; 
        } else {
            progressoPercent = Math.min((progressoExibido / meta) * 100, 100);
            textoProgresso = `Você concluiu ${progressoExibido}/${meta} livros.`; 
            corCirculo = corBase;
        }

    } else {
        // caso ainda não haja dados, mostra mensagem para iniciar o desafio
        progressoContainer.innerHTML = `
            <i class="fas fa-medal fa-3x text-muted mb-2"></i>
            <h6 class="mt-2 mb-1 fw-bold">Missão do Mês</h6>
            <p class="mt-0 mb-0 text-muted" style="font-size: 1rem;">Visite a página Missões para iniciar!</p>
        `;
        return; 
    }
    
    // calcula a proporção do círculo a ser preenchida
    const circunferencia = 2 * Math.PI * raio;
    const offset = circunferencia - (progressoPercent / 100) * circunferencia;
    
    // monta o svg circular com texto e título da missão
    const circularHTML = `
        <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="${raio}" fill="none" stroke="#eee" stroke-width="${strokeWidth}"></circle>
            <circle cx="50" cy="50" r="${raio}" fill="none" 
                    stroke="${corCirculo}" 
                    stroke-width="${strokeWidth}" 
                    stroke-dasharray="${circunferencia}" 
                    stroke-dashoffset="${offset}"
                    style="transition: stroke-dashoffset 1s linear; 
                           transform: rotate(-90deg); 
                           transform-origin: 50% 50%;">
            </circle>
            <text x="50" y="55" text-anchor="middle" font-size="${fontSize}" fill="${corCirculo}" font-weight="bold">
                ${Math.floor(progressoPercent)}%
            </text>
        </svg>
        <h5 class="mt-2 mb-1 fw-bold">${titulo}</h5>
        <p class="mt-0 mb-0 text-muted" style="font-size: 1rem;">${textoProgresso}</p>
    `;
    
    // exibe o conteúdo dentro do container
    progressoContainer.innerHTML = circularHTML;
}

// === inicialização principal do dashboard ===
document.addEventListener('DOMContentLoaded', () => {
    // carrega o usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    // redireciona para o login se não houver usuário ativo
    if (!usuarioLogado || !usuarioLogado.nome) {
        window.location.href = "login.html"; 
        return; 
    }
    
    // seleciona elementos principais do painel
    const nome = usuarioLogado.nome;
    const boasVindasInicio = document.getElementById("boasVindas");
    const nomeUsuarioCard = document.getElementById("nomeUsuarioCard");

    // atualiza as mensagens de saudação e o nome no card lateral
    if (boasVindasInicio) boasVindasInicio.textContent = `Olá, ${nome}!`;
    if (nomeUsuarioCard) nomeUsuarioCard.textContent = nome;

    // === função que exibe os livros sendo lidos atualmente ===
    function renderizarLendoAgora() {
        if (!atividadeRecenteContainer) return;
        
        atividadeRecenteContainer.innerHTML = "";

        const livros = JSON.parse(localStorage.getItem("livrosBiblioteca")) || { lendoAgora: [] };
        const lendoAgora = livros.lendoAgora || [];

        // caso o usuário não esteja lendo nenhum livro
        if (lendoAgora.length === 0) {
            atividadeRecenteContainer.innerHTML = `<p class="text-center text-muted mt-4">Nenhum livro sendo lido no momento.</p>`;
            return;
        }

        // cria um card para cada livro em andamento
        lendoAgora.forEach(livro => {
            const card = criarCardLendoAgora(livro);
            atividadeRecenteContainer.appendChild(card);
        });
    }

    // === geração de sugestões de leitura com base nos gêneros favoritos ===
    const listaDeLivrosGeral = [ // FANTASIA 
        { id: 1, titulo: "O Ladrão de Raios", genero: "Fantasia", capa: "/img/fantasia.png" },
        { id: 2, titulo: "Cidade da Lua Crescente", genero: "Fantasia", capa: "/img/fantasia.png" },

        // ROMANCE
        { id: 4, titulo: "Orgulho e Preconceito", genero: "Romance", capa: "/img/romance.png" },
        { id: 5, titulo: "Um Encontro no Café", genero: "Romance", capa: "/img/romance.png" },

        // SUSPENSE
        { id: 6, titulo: "O Código Da Vinci", genero: "Suspense", capa: "/img/suspense.png" },
        { id: 7, titulo: "A Garota no Trem", genero: "Suspense", capa: "/img/suspense.png" },

        // TERROR
        { id: 8, titulo: "O Exorcista", genero: "Terror", capa: "/img/terror.png" },
        { id: 9, titulo: "It: A Coisa", genero: "Terror", capa: "/img/terror.png" },

        // FICÇÃO CIENTÍFICA
        { id: 10, titulo: "Duna", genero: "Ficção Científica", capa: "/img/ficcao.png" },
        { id: 11, titulo: "Neuromancer", genero: "Ficção Científica", capa: "/img/ficcao.png" },

        // MISTÉRIO
        { id: 12, titulo: "Garota Exemplar", genero: "Mistério", capa: "/img/misterio.png" },
        { id: 13, titulo: "O Silêncio dos Inocentes", genero: "Mistério", capa: "/img/misterio.png" },

        // AVENTURA
        { id: 14, titulo: "A Ilha do Tesouro", genero: "Aventura", capa: "/img/aventura.png" },
        { id: 15, titulo: "Vinte Mil Léguas Submarinas", genero: "Aventura", capa: "/img/aventura.png" },

        // DRAMA
        { id: 16, titulo: "Cem Anos de Solidão", genero: "Drama", capa: "/img/drama.png" },
        { id: 17, titulo: "O Sol é Para Todos", genero: "Drama", capa: "/img/drama.png" },

        // HISTÓRIA
        { id: 18, titulo: "Sapiens: Uma Breve História da Humanidade", genero: "História", capa: "/img/historia.png" },
        { id: 19, titulo: "1499: O Brasil antes de Cabral", genero: "História", capa: "/img/historia.png" },

        // AUTOAJUDA
        { id: 20, titulo: "O Poder do Hábito", genero: "Autoajuda", capa: "/img/autoajuda.png" },
        { id: 21, titulo: "Mais Esperto que o Diabo", genero: "Autoajuda", capa: "/img/autoajuda.png" },

        // POESIA
        { id: 22, titulo: "Antologia Poética", genero: "Poesia", capa: "/img/poesia.png" },
        { id: 23, titulo: "Toda Poesia", genero: "Poesia", capa: "/img/poesia.png" },
        
        // POPULARES / MISTURA (Fallback)
        { id: 24, titulo: "Assassinato no Expresso do Oriente", genero: "Mistério", capa: "/img/misterio.png" },
        { id: 25, titulo: "Harry Potter e a Pedra Filosofal", genero: "Fantasia", capa: "/img/fantasia.png" },
        { id: 26, titulo: "Romeu e Julieta", genero: "Drama", capa: "/img/drama.png" },
    ];

    const tituloSugestoes = document.getElementById('tituloSugestoes');
    const sugestoesContainer = document.getElementById('sugestoesLivrosContainer');
    
    if (sugestoesContainer) {
        const generosFavoritos = usuarioLogado.generos || [];

        // define o título da seção de acordo com os gêneros favoritos
        if (tituloSugestoes) {
            if (generosFavoritos.length > 0) {
                let generosFormatados;
                if (generosFavoritos.length === 1) generosFormatados = generosFavoritos[0];
                else if (generosFavoritos.length === 2) generosFormatados = `${generosFavoritos[0]} e ${generosFavoritos[1]}`;
                else {
                    const ultimo = generosFavoritos.at(-1);
                    const restantes = generosFavoritos.slice(0, -1).join(', ');
                    generosFormatados = `${restantes} e ${ultimo}`;
                }
                tituloSugestoes.textContent = `Sugestões em ${generosFormatados}`;
            } else {
                tituloSugestoes.textContent = 'Sugestões Populares';
            }
        }

        // filtra os livros sugeridos conforme o perfil do usuário
        let livrosSugeridos = [];
        if (generosFavoritos.length > 0) {
            livrosSugeridos = listaDeLivrosGeral.filter(livro => 
                generosFavoritos.some(generoFav => generoFav === livro.genero)
            );
            if (livrosSugeridos.length > 3) livrosSugeridos.sort(() => 0.5 - Math.random());
        } else {
            livrosSugeridos = listaDeLivrosGeral.slice(-3);
        }

        // limita a exibição a 3 sugestões
        livrosSugeridos = livrosSugeridos.slice(0, 3);
        sugestoesContainer.innerHTML = '';

        // renderiza os cards de sugestões
        if (livrosSugeridos.length > 0) {
            livrosSugeridos.forEach(livro => {
                const cardHTML = `
                    <div class="col">
                      <div class="card h-100 text-center shadow-sm">
                        <img src="${livro.capa}" alt="Capa de ${livro.titulo}" class="card-img-top mx-auto d-block"
                             style="width: 60%; height: auto; object-fit: cover; margin-top: 10px;">
                        <div class="card-body p-2">
                          <span class="fw-semibold" style="font-size: 1.3rem; color: #272727">${livro.titulo}</span>
                          <p class="text-muted mb-0" style="font-size: 1.2rem">${livro.genero}</p>
                        </div>
                      </div>
                    </div>`;
                sugestoesContainer.innerHTML += cardHTML;
            });

            // garante alinhamento visual mesmo com menos de 3 sugestões
            for (let i = livrosSugeridos.length; i < 3; i++) {
                sugestoesContainer.innerHTML += `<div class="col"></div>`;
            }

        } else if (generosFavoritos.length > 0) {
            sugestoesContainer.innerHTML = `<p class="alert alert-info w-100">Não encontramos sugestões no momento.</p>`;
        } else {
            sugestoesContainer.innerHTML = `<p class="alert alert-warning w-100">Atualize seu perfil com seus gêneros favoritos para receber sugestões!</p>`;
        }
    }

    // renderiza o conteúdo inicial
    renderizarLendoAgora();
    renderizarProgressoCircularDash();

    // monitora alterações no localStorage para atualizar painel dinamicamente
    window.addEventListener('storage', (e) => {
        if (e.key === 'desafios') renderizarProgressoCircularDash();
        if (e.key === "livrosBiblioteca") renderizarLendoAgora();
    });
});
