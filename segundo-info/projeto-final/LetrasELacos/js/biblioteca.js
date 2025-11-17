// === BIBLIOTECA DE LIVROS ===

// espera o carregamento completo do DOM antes de rodar o script
document.addEventListener("DOMContentLoaded", () => {

    // === ELEMENTOS PRINCIPAIS DA PÁGINA ===
    const paginasLidas = document.getElementById("paginasLidas");
    const totalPaginas = document.getElementById("totalPaginas");
    const cardAtivo = document.getElementById("cardAtivo");
    const btnSalvar = document.getElementById("btnSalvarProgresso");

    // containers das seções da biblioteca
    const lendoAgoraContainer = document.querySelector("#lendo .row");
    const queroLerContainer = document.querySelector("#quero .row");
    const jaLiContainer = document.querySelector("#lidos .row");


    // === MODAL DE NOTA (criado dinamicamente) ===
    const modalNota = document.createElement("div");
    modalNota.className = "modal fade";
    modalNota.id = "notaModal";
    modalNota.tabIndex = -1;
    modalNota.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Avaliar Livro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <p id="tituloLivroNota" class="fw-bold mb-3"></p>
                    <label for="notaLivro" class="form-label">Qual sua nota (0 a 5)?</label>
                    <input type="number" id="notaLivro" class="form-control" min="0" max="5" step="0.1" placeholder="Ex: 4.5" required>
                    <input type="hidden" id="livroIdNota">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn cancelar" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn salvar" id="btnSalvarNota">Salvar Nota</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalNota); // adiciona o modal ao final do body

    // seleciona os elementos internos do modal
    const notaInput = modalNota.querySelector("#notaLivro");
    const tituloLivroNota = modalNota.querySelector("#tituloLivroNota");
    const livroIdNota = modalNota.querySelector("#livroIdNota");
    const btnSalvarNota = modalNota.querySelector("#btnSalvarNota");


    // === CARREGAMENTO E CONFIGURAÇÃO DOS DADOS NO LOCALSTORAGE ===
    let livros = JSON.parse(localStorage.getItem("livrosBiblioteca")) || {
        queroLer: [
            { id: 4, titulo: "O Iluminado", autor: "Stephen King", img: "/img/quero-ler.png", totalPaginas: 464, nota: "5.0" },
            { id: 5, titulo: "Frankenstein", autor: "Mary Shelley", img: "/img/quero-ler.png", totalPaginas: 264, nota: "4.5" },
            { id: 6, titulo: "Orgulho e Preconceito", autor: "Jane Austen", img: "/img/quero-ler.png", totalPaginas: 424, nota: "3.0" },
            { id: 7, titulo: "Cemitério Maldito", autor: "Stephen King", img: "/img/quero-ler.png", totalPaginas: 424, nota: "4" },
            { id: 8, titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", img: "/img/quero-ler.png", totalPaginas: 480, nota: "4.5" },
            { id: 9, titulo: "O Sol é Para Todos", autor: "Harper Lee", img: "/img/quero-ler.png", totalPaginas: 364, nota: "4.5" }
        ],
        lendoAgora: [
            { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", img: "/img/lendo-agora.png", totalPaginas: 288, progresso: 10 },
            { id: 2, titulo: "A Metamorfose", autor: "Franz Kafka", img: "/img/lendo-agora.png", totalPaginas: 104, progresso: 70 },
            { id: 3, titulo: "Crepúsculo", autor: "Stephenie Meyer", img: "/img/lendo-agora.png", totalPaginas: 416, progresso: 50 }
        ],
        jaLi: [
            { id: 10, titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", img: "/img/ja-li.png", nota: 4.0 },
            { id: 11, titulo: "A Culpa é das Estrelas", autor: "John Green", img: "/img/ja-li.png", nota: 4.8 },
            { id: 12, titulo: "O Conto da Aia", autor: "Margaret Atwood", img: "/img/ja-li.png", nota: 5.0 }
        ]
    };

    // caso ainda não exista nada salvo, inicializa o LocalStorage
    if (!localStorage.getItem("livrosBiblioteca")) {
        localStorage.setItem("livrosBiblioteca", JSON.stringify(livros));
    }


    // === LISTA DE AUTORES BRASILEIROS (para os desafios) ===
    const autoresBrasileiros = [
        "Machado de Assis",
        "Clarice Lispector",
        "Jorge Amado",
        "Paulo Coelho",
        "Carolina Maria de Jesus",
        "José de Alencar"
    ];

    // Renderiza a interface logo ao iniciar
    renderizarTudo();


    // === FUNÇÃO DE SALVAR OS DADOS ===
    function salvar() {
        localStorage.setItem("livrosBiblioteca", JSON.stringify(livros));
    }


    // === FUNÇÕES DE DESAFIOS ===

    // verifica se o autor é brasileiro
    function ehAutorBrasileiro(autor) {
        const autorNormalizado = autor.trim().toLowerCase();
        return autoresBrasileiros.some(br => br.toLowerCase() === autorNormalizado);
    }

    // atualiza os desafios com base no livro finalizado
    function atualizarDesafiosLivros(livro) {
        let desafios = JSON.parse(localStorage.getItem("desafios")) || {};

        // garante que os desafios existem
        desafios.leitorNacionalFacil = desafios.leitorNacionalFacil || { progresso: 0, concluido: false };
        desafios.maratonistaLiterario = desafios.maratonistaLiterario || { progresso: 0, concluido: false };

        // incrementa o desafio "Maratonista Literário" (5 livros no mês)
        if (!desafios.maratonistaLiterario.concluido) {
            desafios.maratonistaLiterario.progresso++;
        }

        // incrementa o desafio "Leitor Nacional Fácil" (2 autores brasileiros)
        if (ehAutorBrasileiro(livro.autor) && !desafios.leitorNacionalFacil.concluido) {
            desafios.leitorNacionalFacil.progresso++;
        }

        localStorage.setItem("desafios", JSON.stringify(desafios));
    }


    // === FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO ===
    function renderizarTudo() {
        // limpa os containers
        queroLerContainer.innerHTML = "";
        lendoAgoraContainer.innerHTML = "";
        jaLiContainer.innerHTML = "";

        // cria os cards novamente
        livros.queroLer.forEach(l => queroLerContainer.appendChild(criarCardQueroLer(l)));
        livros.lendoAgora.forEach(l => lendoAgoraContainer.appendChild(criarCardLendoAgora(l)));
        livros.jaLi.forEach(l => jaLiContainer.appendChild(criarCardJaLi(l)));
    }


    // === FUNÇÕES DE CRIAÇÃO DE CARDS ===

    // Card da seção "Quero Ler"
    function criarCardQueroLer(livro) {
        const div = document.createElement("div");
        div.className = "col-md-6 col-lg-4";
        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${livro.img}" class="card-img-top capalivro" alt="${livro.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${livro.titulo}</h5>
                    <p class="card-text autor">${livro.autor}</p>
                    <p class="card-text autor">${livro.totalPaginas} páginas</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold"><i class="fas fa-star" style="color: goldenrod;"></i> ${livro.nota}</span>
                        <a href="#" class="btn btn-sm ler-agora">Ler Agora</a>
                    </div>
                </div>
            </div>
        `;

        // quando o botão "Ler Agora" é clicado, move o livro para "Lendo Agora"
        div.querySelector(".ler-agora").addEventListener("click", e => {
            e.preventDefault();
            moverParaLendoAgora(livro);
        });
        return div;
    }


    // Card da seção "Lendo Agora"
    function criarCardLendoAgora(livro) {
        const div = document.createElement("div");
        div.className = "col-md-6 col-lg-4";
        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${livro.img}" class="card-img-top capalivro" alt="${livro.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${livro.titulo}</h5>
                    <p class="card-text autor">${livro.autor}</p>
                    <p class="card-text paginas">${livro.totalPaginas} páginas</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="text-muted">Progresso</span>
                        <span class="fw-bold">${livro.progresso}%</span>
                    </div>
                    <div class="progress mb-3">
                        <div class="progress-bar" role="progressbar" style="width: ${livro.progresso}%; transition: width 0.5s;"></div>
                    </div>
                    <a href="#" class="btn continuar-lendo w-100" data-id="${livro.id}" data-total="${livro.totalPaginas}" data-bs-toggle="modal" data-bs-target="#progressoModal">Continuar Lendo</a>
                </div>
            </div>
        `;

        // abre o modal de progresso ao clicar em "Continuar Lendo"
        div.querySelector(".continuar-lendo").addEventListener("click", abrirModalProgresso);
        return div;
    }


    // Card da seção "Já Li"
    function criarCardJaLi(livro) {
        const div = document.createElement("div");
        div.className = "col-md-6 col-lg-4";
        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${livro.img}" class="card-img-top capalivro" alt="${livro.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${livro.titulo}</h5>
                    <p class="card-text autor">${livro.autor}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold"><i class="fas fa-star" style="color: goldenrod;"></i> ${livro.nota ?? "–"}</span>
                        <button class="btn avaliar-livro">Avaliar</button>
                    </div>
                </div>
            </div>
        `;

        // abre o modal para avaliar o livro
        div.querySelector(".avaliar-livro").addEventListener("click", () => abrirModalNota(livro));
        return div;
    }


    // === FUNÇÕES DE MOVIMENTAÇÃO ENTRE LISTAS ===

    // move um livro de "Quero Ler" para "Lendo Agora"
    function moverParaLendoAgora(livro) {
        livros.queroLer = livros.queroLer.filter(l => l.id !== livro.id);
        livros.lendoAgora.push({ ...livro, progresso: 0, totalPaginas: livro.totalPaginas || 200 });
        salvar();
        renderizarTudo();
    }

    // move um livro de "Lendo Agora" para "Já Li"
    function moverParaJaLi(livro) {
        livros.lendoAgora = livros.lendoAgora.filter(l => l.id !== livro.id);
        livros.jaLi.push(livro);
        atualizarDesafiosLivros(livro); // atualiza os desafios
        salvar();
        renderizarTudo();
        abrirModalNota(livro); // abre o modal para avaliação
    }


    // === MODAL DE PROGRESSO ===

    // abre o modal com os dados do livro em leitura
    function abrirModalProgresso(e) {
        const id = e.target.getAttribute("data-id");
        const livro = livros.lendoAgora.find(l => l.id == id);
        totalPaginas.value = livro.totalPaginas;
        cardAtivo.value = id;
        paginasLidas.value = "";
    }

    // quando o usuário clica em "Salvar progresso"
    btnSalvar.addEventListener("click", () => {
        const lidas = parseInt(paginasLidas.value);
        const total = parseInt(totalPaginas.value);
        const id = cardAtivo.value;

        // validação do número digitado
        if (isNaN(lidas) || lidas < 0 || lidas > total) {
            alert("Insira um número de páginas válido!");
            return;
        }

        // calcula porcentagem de leitura
        const porcentagem = Math.min(Math.round((lidas / total) * 100), 100);
        const livro = livros.lendoAgora.find(l => l.id == id);
        livro.progresso = porcentagem;

        // atualiza apenas o card visualmente (sem recarregar tudo)
        const card = document.querySelector(`.continuar-lendo[data-id="${id}"]`).closest(".card");
        const barra = card.querySelector(".progress-bar");
        const numeroProgresso = card.querySelector(".d-flex span.fw-bold");

        barra.style.width = `${porcentagem}%`;
        numeroProgresso.textContent = `${porcentagem}%`;

        // se chegou a 100%, move o livro para "Já Li"
        if (porcentagem >= 100) {
            moverParaJaLi(livro);
        } else {
            salvar();
        }

        // fecha o modal de progresso
        const modal = bootstrap.Modal.getInstance(document.getElementById("progressoModal"));
        modal.hide();
    });


    // === MODAL DE NOTA ===

    // abre o modal de avaliação com os dados do livro
    function abrirModalNota(livro) {
        livroIdNota.value = livro.id;
        tituloLivroNota.textContent = `Avalie "${livro.titulo}"`;
        notaInput.value = livro.nota ?? "";
        new bootstrap.Modal(modalNota).show();
    }

    // salva a nota atribuída ao livro
    btnSalvarNota.addEventListener("click", () => {
        const id = livroIdNota.value;
        const nota = parseFloat(notaInput.value);

        // validação simples
        if (isNaN(nota) || nota < 0 || nota > 5) {
            alert("Digite uma nota entre 0 e 5!");
            return;
        }

        // encontra o livro e atualiza a nota
        const livro = livros.jaLi.find(l => l.id == id);
        livro.nota = nota.toFixed(1);

        salvar();
        renderizarTudo();

        // fecha o modal
        const modal = bootstrap.Modal.getInstance(modalNota);
        modal.hide();
    });

});
