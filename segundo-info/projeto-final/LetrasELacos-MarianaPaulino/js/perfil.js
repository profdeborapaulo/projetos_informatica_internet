// === PERFIL ===
const perfilDiv = document.getElementById("perfilUsuario");
const boasVindas = document.getElementById("boasVindas");

// verifica se os elementos de perfil existem antes de tentar usá-los
if (perfilDiv && boasVindas) {
    // recupera o usuário logado do localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    // se não existir usuário logado, mostra mensagem genérica
    if (!usuario) {
        boasVindas.textContent = "Olá, visitante!";
        perfilDiv.innerHTML = "<p>Nenhum usuário logado. <a href='login.html'>Faça login</a></p>";
    } else {
        // mostra saudação personalizada com o nome do usuário
        boasVindas.textContent = `Olá, ${usuario.nome}!`;

        // limpa o conteúdo atual da div de perfil
        perfilDiv.innerHTML = ''; 

        // cria o container principal do bloco de gêneros favoritos
        const blocoPrincipal = document.createElement('div');
        blocoPrincipal.classList.add('d-flex', 'flex-wrap', 'align-items-baseline', 'gap-3', 'mt-1');

        // cria o título “gêneros favoritos:”
        const tituloGenero = document.createElement('span');
        tituloGenero.classList.add('fw-bold', 'text-nowrap', 'mb-0', 'mt-0'); 
        tituloGenero.textContent = 'Gêneros favoritos:';
        blocoPrincipal.appendChild(tituloGenero);

        // cria o container que vai conter os spans de cada gênero
        const generosContainer = document.createElement('div');
        generosContainer.classList.add('generos', 'd-flex', 'flex-wrap', 'gap-2'); 
        
        // verifica se o usuário tem gêneros favoritos salvos
        if (usuario.generos && usuario.generos.length > 0) {
            usuario.generos.forEach(genero => {
                const span = document.createElement('span');
                span.textContent = genero;
                span.classList.add('active'); // marca como ativo para aplicar estilo
                generosContainer.appendChild(span);
            });
        } else {
            // caso não tenha gêneros selecionados
            const spanNenhum = document.createElement('span');
            spanNenhum.textContent = "Nenhum selecionado";
            generosContainer.appendChild(spanNenhum);
        }

        // monta o bloco completo no html
        blocoPrincipal.appendChild(generosContainer);
        perfilDiv.appendChild(blocoPrincipal);
    }
}

// === edição de perfil ===

// seleciona os elementos da interface do perfil
const btnEditarPerfil = document.getElementById('btnEditarPerfil');
const formEditarPerfil = document.getElementById('formEditarPerfil');
const elementoBio = document.querySelector('.card-text');
const elementoFoto = document.querySelector('.foto-usuario');

// inicializa o modal do bootstrap somente se ele existir
const modalElement = document.getElementById('modalEditarPerfil');
let modalEditarPerfil;
if (modalElement) {
    modalEditarPerfil = new bootstrap.Modal(modalElement);
}

// garante que todos os elementos necessários existem antes de ativar o código de edição
if (btnEditarPerfil && formEditarPerfil && modalEditarPerfil) {
    
    // carrega o usuário logado atual
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    // guarda a bio atual do html como valor inicial
    const bioInicial = elementoBio.textContent.trim();
    
    // ao clicar em “editar perfil”, abre o modal preenchendo com dados atuais
    btnEditarPerfil.addEventListener('click', () => {
        usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        
        document.getElementById('inputNome').value = usuarioLogado.nome || '';
        document.getElementById('inputBio').value = usuarioLogado.bio || bioInicial; 
        document.getElementById('inputGeneros').value = (usuarioLogado.generos && usuarioLogado.generos.length > 0) ? usuarioLogado.generos.join(', ') : '';
        document.getElementById('inputFoto').value = null; 

        modalEditarPerfil.show();
    });

    // evento de salvar alterações do modal
    formEditarPerfil.addEventListener('submit', (event) => {
        event.preventDefault();

        // coleta os novos valores digitados
        const novoNome = document.getElementById('inputNome').value.trim();
        const novaBio = document.getElementById('inputBio').value.trim();
        const novosGenerosStr = document.getElementById('inputGeneros').value.trim();
        const novaFotoFile = document.getElementById('inputFoto').files[0];
        
        // transforma a string de gêneros em um array
        const novosGeneros = novosGenerosStr.split(',').map(g => g.trim()).filter(g => g.length > 0);

        // cria um novo objeto do usuário com os dados atualizados
        const usuarioAtualizado = {
            ...usuarioLogado,
            nome: novoNome,
            bio: novaBio,
            generos: novosGeneros
        };
        
        // salva o usuário atualizado como logado
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
        
        // também atualiza o usuário base do cadastro (para manter consistência no login)
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioSalvo && usuarioSalvo.email === usuarioAtualizado.email) {
            localStorage.setItem("usuario", JSON.stringify({
                ...usuarioSalvo,
                nome: novoNome,
                generos: novosGeneros
            }));
        }

        // atualiza a interface com os novos dados
        boasVindas.textContent = `Olá, ${novoNome}!`;
        elementoBio.textContent = novaBio;

        // mostra a nova foto selecionada (apenas visual, não persistente)
        if (novaFotoFile) {
            const objectURL = URL.createObjectURL(novaFotoFile);
            elementoFoto.src = objectURL;
        }
        
        // atualiza o bloco de gêneros favoritos
        const perfilDiv = document.getElementById("perfilUsuario");
        if (perfilDiv) {
            perfilDiv.innerHTML = '';
            
            const blocoPrincipal = document.createElement('div');
            blocoPrincipal.classList.add('d-flex', 'flex-wrap', 'align-items-baseline', 'gap-3', 'mt-1');
            
            const tituloGenero = document.createElement('span');
            tituloGenero.classList.add('fw-bold', 'text-nowrap', 'mb-0', 'mt-0'); 
            tituloGenero.textContent = 'Gêneros favoritos:';
            blocoPrincipal.appendChild(tituloGenero);

            const generosContainer = document.createElement('div');
            generosContainer.classList.add('generos', 'd-flex', 'flex-wrap', 'gap-2'); 
            
            if (novosGeneros.length > 0) {
                novosGeneros.forEach(genero => {
                    const span = document.createElement('span');
                    span.textContent = genero;
                    span.classList.add('active'); 
                    generosContainer.appendChild(span);
                });
            } else {
                const spanNenhum = document.createElement('span');
                spanNenhum.textContent = "Nenhum selecionado";
                generosContainer.appendChild(spanNenhum);
            }
            
            blocoPrincipal.appendChild(generosContainer);
            perfilDiv.appendChild(blocoPrincipal);
        }

        // fecha o modal e mostra mensagem de sucesso
        modalEditarPerfil.hide();
        alert("Perfil atualizado com sucesso!");
    });
}

// === estatísticas e leitura ===
document.addEventListener("DOMContentLoaded", () => {
    // define valores iniciais fictícios de xp e resenhas
    const XP_INICIAL = 750;
    const RESENHAS_INICIAIS = 0;
    
    // seleciona os elementos dos cards de estatísticas
    const livrosLidosElem = document.getElementById("livros-lidos-count");
    const resenhasElem = document.getElementById("resenhas-count");
    const pontosElem = document.getElementById("pontos-count");
    const lendoAgoraPerfil = document.getElementById("lendoAgoraPerfil");

    // função que inicializa valores padrão se ainda não existirem
    function inicializarDadosFicticios() {
        if (!localStorage.getItem("xpTotalAtual")) {
            localStorage.setItem("xpTotalAtual", XP_INICIAL.toString());
        }

        const resenhasSalvas = localStorage.getItem("resenhas");
        if (!resenhasSalvas) {
            const resenhasFicticias = [];
            for (let i = 0; i < RESENHAS_INICIAIS; i++) {
                resenhasFicticias.push({ id: i, ficticio: true }); 
            }
            localStorage.setItem("resenhas", JSON.stringify(resenhasFicticias));
        }
    }

    // obtém o número de livros lidos
    function getLivrosLidosCount() {
        const livrosSalvos = localStorage.getItem("livrosBiblioteca");
        try {
            const livros = livrosSalvos ? JSON.parse(livrosSalvos) : { jaLi: [] };
            return livros.jaLi ? livros.jaLi.length : 0;
        } catch (e) {
            console.error("erro ao ler livrosBiblioteca do localStorage:", e);
            return 0;
        }
    }

    // obtém a contagem de resenhas
    function getResenhasCount() {
        const resenhasSalvas = localStorage.getItem("resenhas");
        try {
            const resenhas = resenhasSalvas ? JSON.parse(resenhasSalvas) : [];
            return resenhas.length; 
        } catch (e) {
            console.error("erro ao ler resenhas do localStorage:", e);
            return RESENHAS_INICIAIS; 
        }
    }

    // obtém a contagem de xp
    function getPontosCount() {
        const xpSalvo = localStorage.getItem("xpTotalAtual");
        return xpSalvo ? parseInt(xpSalvo) : XP_INICIAL; 
    }

    // atualiza as informações de estatísticas na interface
    function carregarDadosPerfil() {
        if (livrosLidosElem) livrosLidosElem.textContent = getLivrosLidosCount();
        if (resenhasElem) resenhasElem.textContent = getResenhasCount();
        if (pontosElem) pontosElem.textContent = getPontosCount();
    }

    // renderiza a lista de livros que o usuário está lendo agora
    function renderizarLendoAgora() {
        if (!lendoAgoraPerfil) return;
        lendoAgoraPerfil.innerHTML = "";

        const livros = JSON.parse(localStorage.getItem("livrosBiblioteca")) || { lendoAgora: [] };
        const lendoAgora = livros.lendoAgora || [];

        if (lendoAgora.length === 0) {
            lendoAgoraPerfil.innerHTML = `<p class="text-center text-muted mt-4">Nenhum livro sendo lido no momento.</p>`;
            return;
        }

        lendoAgora.forEach(livro => {
            const card = criarCardLendoAgora(livro);
            lendoAgoraPerfil.appendChild(card);
        });
    }

    // cria o card visual de cada livro “lendo agora”
    function criarCardLendoAgora(livro) {
        const div = document.createElement("div");
        div.className = "col-md-12 mb-3";

        const progresso = livro.progresso || 0;

        div.innerHTML = `
            <div class="card h-100 shadow-sm d-flex flex-row">
                <img src="${livro.img}" class="capalivro me-3" alt="${livro.titulo}" style="width: 120px; object-fit: cover; border-radius: 0.25rem 0 0 0.25rem;">
                <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                        <h5 class="card-title mb-1">${livro.titulo}</h5>
                        <p class="card-text autor text-muted mb-1">${livro.autor}</p>
                        <p class="card-text text-sm">${livro.totalPaginas} páginas</p>
                    </div>
                    <div class="mt-2">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="text-muted text-sm">Progresso</span>
                            <span class="fw-bold text-sm">${progresso}%</span>
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

    // executa as funções de inicialização
    inicializarDadosFicticios();
    carregarDadosPerfil();
    renderizarLendoAgora();

    // monitora alterações no localStorage para atualizar a interface em tempo real
    window.addEventListener("storage", e => {
        if (e.key === 'xpTotalAtual' || e.key === 'resenhas') {
            carregarDadosPerfil();
        }
        if (e.key === "livrosBiblioteca") {
            carregarDadosPerfil();
            renderizarLendoAgora();
        }
    });
});
