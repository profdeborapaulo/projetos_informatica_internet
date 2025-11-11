// Primeiro, vamos guardar todas as informações dos nossos livros em um só lugar.
// Isso facilita na hora de mostrar os dados na tela.
const livros = [
    {
        id: 1,
        titulo: "Bíblia do Corinthiano",
        autor: "Ale Viana",
        capa: "img/bibliaDoCorinthiano.png",
        sinopse: "Essa aqui é a nossa arma secreta. Quer calar a boca daquele seu amigo rival com dados e fatos? É esse livro. Tem tudo: ficha de jogo, história dos ídolos, estatísticas... É pra ler, decorar e usar pra defender o Coringão em qualquer discussão.",
        audio: "audios/bibliaDoCorinthiano.m4a",
        editora: "Panda Books",
        ano: 2009,
        paginas: 368
    },
    {
        id: 2,
        titulo: "Doutor Sócrates: A Biografia",
        autor: "Andrew Downie",
        capa: "img/socrates.png",
        sinopse: "Falar do Doutor é chover no molhado. O Magrão não foi só um gênio com a bola, ele foi a alma de uma era. Este livro não é só sobre futebol, é sobre inteligência, política e o que significa ser Corinthians de verdade. Leitura obrigatória!",
        audio: "audios/Socrates.m4a",
        editora: "Companhia das Letras",
        ano: 2017,
        paginas: 520
    },
    {
        id: 3,
        titulo: "Tite",
        autor: "Camila Mattoso",
        capa: "img/tite.png",
        sinopse: "Adenor. O cara que chegou, arrumou a casa e nos fez acreditar de novo. Este livro mostra o Tite por trás das câmeras, a tática, a gestão de grupo, mas principalmente, como ele entendeu o espírito da Fiel e nos levou ao topo do mundo. Para relembrar e se emocionar.",
        audio: "audios/Tite.m4a",
        editora: "Panda Books",
        ano: 2016,
        paginas: 256
    },
    {
        id: 4,
        titulo: "Coração Corinthiano",
        autor: "Mário de Andrade",
        capa: "img/coracaoCorinthiano.png",
        sinopse: "Uma verdadeira ode à paixão alvinegra. Neste livro, Mário de Andrade, um dos maiores intelectuais brasileiros e um corinthiano roxo, discorre sobre o significado do Corinthians em sua vida e na cultura de São Paulo. Poesia, futebol e a alma do time do povo, expressa por um de seus mais ilustres torcedores. Uma obra que captura a essência da Fiel.",
        audio: "audios/coracaoCorinthianos.m4a",
        editora: "Imprensa Oficial do Estado de São Paulo",
        ano: 1980,
        paginas: 96
    },
    {
        id: 5,
        titulo: "A Invasão Corinthiana",
        autor: "Igor Ojeda e Tatiana Merlino",
        capa: "img/invasaoCorinthiana.png",
        sinopse: "A Invasão de 76. Se você não se arrepia só de ouvir isso, precisa ler este livro. A Fiel parou o Brasil e transformou o Maracanã na nossa casa. Este livro conta a história do dia em que a Fiel tomou o Rio de Janeiro para ver o seu time no maior estádio do mundo. A prova de que nossa torcida não é normal. É FENOMENAL.",
        audio: "audios/invasorCorinthiano.m4a",
        editora: "LF Editorial",
        ano: 2016,
        paginas: 144
    },
    {
        id: 6,
        titulo: "Corinthians - É Preto no Branco",
        autor: "Washington Olivetto e Nirlando Beirão",
        capa: "img/pretoNoBranco.png",
        sinopse: "O manual definitivo. Se você quer conhecer a fundo a nossa história, desde a fundação no Bom Retiro até as glórias recentes, os autores compilaram tudo aqui. É o tipo de livro para ter na estante e consultar sempre. Uma verdadeira enciclopédia do nosso amor.",
        audio: "audios/pretoNoBranco.m4a",
        editora: "Ediouro",
        ano: 2010,
        paginas: 448
    }
];

// Agora, vamos "conectar" o nosso JavaScript com os elementos do HTML.
// É como dar um apelido para cada parte importante da nossa página.
const paginaInicial = document.getElementById('pagina-inicial');
const paginaDetalhes = document.getElementById('pagina-detalhes');
const catalogoContainer = document.getElementById('catalogo-container');
const detalhesLivroContainer = document.getElementById('detalhes-livro-container');
const btnVoltar = document.getElementById('btn-voltar');

// Esta função cuida de mostrar a página inicial e esconder a de detalhes.
function mostrarPaginaInicial() {
    paginaInicial.classList.remove('hidden');
    paginaDetalhes.classList.add('hidden');
}

// Esta função faz o contrário: mostra os detalhes de um livro específico.
function mostrarPaginaDetalhes(livroId) {
    // Primeiro, encontramos o livro certo na nossa lista usando o ID dele.
    const livro = livros.find(l => l.id === livroId);
    if (!livro) return; // Se não achar o livro, não faz nada.

    // Aqui, montamos o HTML com as informações do livro que encontramos.
    // É como preencher um formulário, mas com código.
    detalhesLivroContainer.innerHTML = `
        <div class="detalhes-layout">
            <div class="detalhes-capa">
                <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
            </div>
            <div class="detalhes-conteudo">
                <h2>${livro.titulo}</h2>
                <p class="autor">por ${livro.autor}</p>
                
                <h3>Sinopse</h3>
                <p class="sinopse-texto">${livro.sinopse}</p>
                
                <h3>Podcast da Sinopse</h3>
                <div class="podcast-player">
                    <audio controls src="${livro.audio}">Seu navegador não suporta áudio.</audio>
                </div>

                <h3>Informações Adicionais</h3>
                <div class="info-adicional">
                    <ul>
                        <li><strong>Editora:</strong> ${livro.editora}</li>
                        <li><strong>Ano:</strong> ${livro.ano}</li>
                        <li><strong>Páginas:</strong> ${livro.paginas}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Por fim, escondemos a lista de livros e mostramos a página de detalhes.
    paginaInicial.classList.add('hidden');
    paginaDetalhes.classList.remove('hidden');
    window.scrollTo(0, 0); // Leva o usuário para o topo da página.
}


// Quando a página terminar de carregar, vamos criar os cards dos livros.
document.addEventListener('DOMContentLoaded', () => {
    // Para cada livro na nossa lista...
    livros.forEach(livro => {
        // ...criamos um elemento `<article>` para ser o nosso card.
        const card = document.createElement('article');
        card.className = 'livro-card';

        // Preenchemos o card com a imagem, título e autor.
        card.innerHTML = `
            <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
            <div class="livro-info">
                <h3>${livro.titulo}</h3>
                <p>${livro.autor}</p>
            </div>
        `;

        // Aqui está a mágica: quando alguém clicar no card...
        card.addEventListener('click', () => {
            // ...a gente chama a função para mostrar os detalhes daquele livro.
            mostrarPaginaDetalhes(livro.id);
        });

        // Adicionamos o card pronto na nossa vitrine de livros.
        catalogoContainer.appendChild(card);
    });
});

// E, claro, o botão de voltar precisa funcionar.
btnVoltar.addEventListener('click', (event) => {
    event.preventDefault(); // Impede que o link recarregue a página.
    mostrarPaginaInicial(); // Chama a função que leva para a tela inicial.
});