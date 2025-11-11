// Objeto que armazena os dados da biblioteca, incluindo o nome e uma lista de livros.
const biblioteca = {
    nome: "Livros de Destaque:",
    livros: [
        // Dados do livro "Batman: Ano Um". Cada livro é um objeto.
        {
            id: "ano_um",
            titulo: "Batman: Ano Um",
            autor: "Frank Miller",
            ano: 1987,
            capa: "Imagens/imagem_ano_um.jpg",
            editora: "DC Comics",
            paginas: 96,
            isbn: "978-8539301935",
            genero: "HQ, Ação, Super-heróis",
            avaliacao: "⭐⭐⭐⭐ (4/5)",
            sinopse: "Acompanha o início da jornada de Bruce Wayne como o Cavaleiro das Trevas e também a chegada do detetive James Gordon a Gotham. A obra mostra como dois homens comuns enfrentam um sistema corrupto em busca de justiça, dando origem a uma das maiores lendas dos quadrinhos.",
            curiosidades: [
                "Serviu de inspiração para o filme Batman Begins (2005).",
                "É uma das HQs mais influentes do Cavaleiro das Trevas."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.02.12.ogg"
        },
        // Dados do livro "Batman: A Piada Mortal".
        {
            id: "piada_mortal",
            titulo: "Batman: A Piada Mortal",
            autor: "Alan Moore",
            ano: 1988,
            capa: "Imagens/imagem_piada_mortal.webp",
            editora: "DC Comics",
            paginas: 64,
            isbn: "978-1401216670",
            genero: "HQ, Suspense, Super-heróis",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Uma das histórias mais icônicas do Coringa. A Piada Mortal apresenta uma versão perturbadora de sua origem e coloca em cheque a tênue linha que separa sanidade e loucura. A HQ ficou marcada pela brutalidade e impacto no universo do Batman.",
            curiosidades: [
                "Obra polêmica por sua violência psicológica e física.",
                "Influenciou várias adaptações, incluindo o filme Coringa (2019)."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.06.11.ogg"
        },
        // Dados do livro "O Cavaleiro das Trevas".
        {
            id: "cavaleiro_das_trevas",
            titulo: "O Cavaleiro das Trevas",
            autor: "Frank Miller",
            ano: 1986,
            capa: "Imagens/imagem_cavaleiro_das_trevas.webp",
            editora: "DC Comics",
            paginas: 224,
            isbn: "978-8539302925",
            genero: "HQ, Super-heróis",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Em um futuro sombrio, Bruce Wayne abandona a aposentadoria e retorna como Batman para enfrentar o crime em Gotham. A HQ mostra um Batman mais velho, mais sombrio e implacável, em uma narrativa que revolucionou os quadrinhos de super-heróis.",
            curiosidades: [
                "Revolucionou a visão do Batman como um herói sombrio e violento.",
                "Influenciou o filme Batman v Superman (2016)."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.16.52.ogg"
        },
        // Dados do livro "Batman: Silêncio".
        {
            id: "silencio",
            titulo: "Batman: Silêncio",
            autor: "Jeph Loeb",
            ano: 2002,
            capa: "Imagens/imagem_Batman_Silencio.jpg",
            editora: "DC Comics",
            paginas: 320,
            isbn: "978-1401223173",
            genero: "HQ, Mistério, Super-heróis",
            avaliacao: "⭐⭐⭐⭐ (4/5)",
            sinopse: "Uma conspiração orquestrada por um novo vilão chamado Silêncio coloca o Batman contra seus maiores inimigos e até aliados. A trama é cheia de mistérios e reviravoltas que exploram profundamente a mente do herói.",
            curiosidades: [
                "Inclui quase todos os vilões clássicos do Batman.",
                "Muito elogiada pela arte de Jim Lee."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.19.37.ogg"
        },
        // Dados do livro "Batman: Asilo Arkham".
        {
            id: "asilo_arkham",
            titulo: "Batman: Asilo Arkham",
            autor: "Grant Morrison",
            ano: 1989,
            capa: "Imagens/imagem_arkham_asylum.jpg",
            editora: "DC Comics",
            paginas: 216,
            isbn: "978-1563890096",
            genero: "HQ, Terror Psicológico",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Batman entra no Asilo Arkham em uma noite de rebelião dos vilões mais perigosos de Gotham. A HQ é sombria, psicológica e mergulha nos traumas do herói e de seus inimigos, com uma arte perturbadora e única.",
            curiosidades: [
                "Conhecida por sua arte surreal de Dave McKean.",
                "Tornou-se uma das HQs mais cultuadas do herói."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.21.27.ogg"
        },
        // Dados do livro "1984".
        {
            id: "1984",
            titulo: "1984",
            autor: "George Orwell",
            ano: 1949,
            capa: "Imagens/1984.jpg",
            editora: "Companhia das Letras",
            paginas: 416,
            isbn: "978-8535914849",
            genero: "Distopia, Ficção política, Ficção científica",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Em uma sociedade totalitária, onde o 'Grande Irmão' vigia cada movimento, Winston Smith tenta preservar sua individualidade e liberdade de pensamento.",
            curiosidades: [
                "O termo 'Big Brother' surgiu deste livro.",
                "É considerado um dos maiores clássicos do século XX."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.22.40.ogg"
        },
        // Dados do livro "Duna".
        {
            id: "duna",
            titulo: "Duna",
            autor: "Frank Herbert",
            ano: 1965,
            capa: "Imagens/Duna.jpg",
            editora: "Aleph",
            paginas: 680,
            isbn: "978-8576572008",
            genero: "Ficção científica, Fantasia, Aventura",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Em Arrakis, o planeta desértico que produz a valiosa especiaria melange, Paul Atreides entra em uma batalha política e espiritual pelo controle do império.",
            curiosidades: [
                "É o livro de ficção científica mais vendido da história.",
                "Inspirou filmes, séries e até músicas."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.23.28.ogg"
        },
        // Dados do livro "As Crônicas de Nárnia".
        {
            id: "narnia",
            titulo: "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa",
            autor: "C. S. Lewis",
            ano: 1950,
            capa: "Imagens/As_Crônicas_de_Nárnia.jpg",
            editora: "Martins Fontes",
            paginas: 240,
            isbn: "978-8578270698",
            genero: "Fantasia, Infantojuvenil, Aventura",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Quatro irmãos encontram um guarda-roupa mágico que leva ao mundo de Nárnia, onde precisam ajudar Aslam a derrotar a Feiticeira Branca.",
            curiosidades: [
                "A obra tem forte inspiração cristã e mitológica.",
                "Existe debate entre fãs sobre a ordem correta de leitura."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.25.02.ogg"
        },
        // Dados do livro "O Hobbit".
        {
            id: "hobbit",
            titulo: "O Hobbit",
            autor: "J. R. R. Tolkien",
            ano: 1937,
            capa: "Imagens/Hobbit.jpg",
            editora: "HarperCollins Brasil",
            paginas: 320,
            isbn: "978-8595084742",
            genero: "Fantasia, Aventura, Clássico",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Bilbo Bolseiro é levado por Gandalf e um grupo de anões para recuperar o tesouro guardado pelo dragão Smaug.",
            curiosidades: [
                "Originalmente escrito como história infantil.",
                "Serve como prelúdio para O Senhor dos Anéis."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.25.48.ogg"
        },
        // Dados do livro "O Senhor dos Anéis".
        {
            id: "senhor_aneis",
            titulo: "O Senhor dos Anéis: A Sociedade do Anel",
            autor: "J. R. R. Tolkien",
            ano: 1954,
            capa: "Imagens/O_Senhor_dos_Anéis.jpg",
            editora: "HarperCollins Brasil",
            paginas: 576,
            isbn: "978-8595084742",
            genero: "Fantasia épica, Aventura, Clássico",
            avaliacao: "⭐⭐⭐⭐⭐ (5/5)",
            sinopse: "Frodo Bolseiro herda o Um Anel e parte em uma jornada para destruí-lo no fogo da Montanha da Perdição.",
            curiosidades: [
                "Tolkien levou mais de 12 anos para escrever a saga.",
                "É considerado o marco da fantasia moderna."
            ],
            audio_url: "Audios/WhatsApp Ptt 2025-09-13 at 17.26.35.ogg"
        },
    ]
};

// Funções para manipulação do DOM e eventos
/**
   @function mostrarLivros
   @description Injeta o catálogo de livros na página principal, separando por categoria.
 */
function mostrarLivros() {
    // Pega o elemento HTML onde o catálogo será exibido.
    const div = document.getElementById("saida");
    // Adiciona o título principal.
    div.innerHTML = `<h2>${biblioteca.nome}</h2>`;

    /**
       @function criarCatalogo
       @description Cria e retorna um elemento HTML com a lista de livros.
       @param {Array<Object>} livros - Uma lista de objetos de livro.
       @returns {HTMLElement} O elemento div do catálogo.
     */
    function criarCatalogo(livros) {
        const catalogo = document.createElement("div");
        catalogo.classList.add("catalogo");

        // Itera sobre cada livro e cria um card para ele.
        livros.forEach(livro => {
            const livroDiv = document.createElement("div");
            livroDiv.classList.add("livro");
            livroDiv.innerHTML = `
                <img src="${livro.capa}" alt="Capa de ${livro.titulo}" class="capa-livro">
                <h3>${livro.titulo}</h3>
                <p><em>${livro.autor}</em></p>
                <p><small>${livro.ano}</small></p>
                <button class="btn-detalhes">Ver detalhes</button>
            `;

            // Adiciona event listeners para abrir os detalhes do livro ao clicar.
            livroDiv.querySelector(".capa-livro").addEventListener("click", () => abrirLivro(livro.id));
            livroDiv.querySelector(".btn-detalhes").addEventListener("click", () => abrirLivro(livro.id));

            catalogo.appendChild(livroDiv);
        });

        return catalogo;
    }

    // Cria o catálogo de HQs (os primeiros 5 livros).
    div.appendChild(criarCatalogo(biblioteca.livros.slice(0, 5)));

    // Adiciona um separador visual entre as categorias.
    const separador = document.createElement("hr");
    separador.classList.add("separador-catalogo");
    div.appendChild(separador);

    // Cria o título para a seção de ficção e o catálogo correspondente.
    const tituloFiccao = document.createElement("h2");
    tituloFiccao.textContent = "Livros de Ficção:";
    div.appendChild(tituloFiccao);
    div.appendChild(criarCatalogo(biblioteca.livros.slice(5)));
}

/**
  @function abrirLivro
  @description Exibe a seção de detalhes de um livro específico.
  @param {string} id - O ID do livro a ser exibido.
 */
function abrirLivro(id) {
    // Encontra o objeto do livro na lista com base no ID.
    const livro = biblioteca.livros.find(l => l.id === id);
    if (!livro) return;

    // Esconde o catálogo e mostra a seção de detalhes.
    document.getElementById("saida").style.display = "none";
    document.getElementById("detalhes").style.display = "block";

    // Injeta o HTML com as informações detalhadas do livro.
    document.getElementById("conteudo-livro").innerHTML = `
        <h1>${livro.titulo}</h1>
        <img src="${livro.capa}" alt="Capa do livro" class="capa-grande">
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Editora:</strong> ${livro.editora}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
        <p><strong>Páginas:</strong> ${livro.paginas}</p>
        <p><strong>ISBN:</strong> ${livro.isbn}</p>
        <p><strong>Gênero:</strong> ${livro.genero}</p>
        <p><strong>Avaliação:</strong> ${livro.avaliacao}</p>

        <h2>Resumo em áudio</h2>
        <audio id="audio-livro" controls>
            <source src="${livro.audio_url}" type="audio/mpeg">
            Seu navegador não suporta o elemento de áudio.
        </audio>

        <h2>Sinopse</h2>
        <p>${livro.sinopse}</p>
        <h2>Curiosidades</h2>
        <ul>${livro.curiosidades.map(item => `<li>${item}</li>`).join("")}</ul>
        <button onclick="voltarCatalogo()" class="btn-voltar">⬅ Voltar</button>
    `;

    // Adiciona um listener para o áudio, limitando a duração.
    const audio = document.getElementById("audio-livro");
    audio.addEventListener("timeupdate", () => {
        // Se o áudio passar de 3 minutos (180 segundos), ele é pausado.
        if (audio.currentTime > 180) {
            audio.pause();
            audio.currentTime = 0; // Reinicia o áudio.
            alert("Este resumo em áudio é limitado a 3 minutos.");
        }
    });
}

/**
   @function voltarCatalogo
   @description
 */
function voltarCatalogo() {
    // Esconde a seção de detalhes e mostra o catálogo.
    document.getElementById("detalhes").style.display = "none";
    document.getElementById("saida").style.display = "block";
}

// Evento que inicia a função mostrarLivros quando a página é completamente carregada.
document.addEventListener("DOMContentLoaded", mostrarLivros);