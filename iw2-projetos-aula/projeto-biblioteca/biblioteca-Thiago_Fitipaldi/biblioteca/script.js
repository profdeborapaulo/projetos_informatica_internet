// Dados de todos os livros
const livros = [
    {
        titulo: "Latna Saga",
        autor: "Kyungbae Lim",
        descricao: "Latna Saga é uma história épica de fantasia que segue a jornada de um jovem herói em um mundo repleto de magia e aventura. Com elementos de mitologia e batalhas épicas, a trama explora temas de coragem, amizade e autodescoberta.",
        isbn: "978-85-0000-000-1",
        ano: 2021,
        editora: "Editora Fantasia",
        paginas: 320,
        imagem: "img/img-latna.png",
        audio: "audio/latna-saga.m4a"
    },
    {
        titulo: "Ponto de Vista do Leitor Onisciente",
        autor: "RainbowTurtle e A_Passing_Wanderer",
        descricao: "Ponto de Vista do Leitor Onisciente é uma narrativa envolvente que oferece uma perspectiva única sobre a história, permitindo que os leitores vejam eventos e personagens de maneira abrangente. A trama é rica em detalhes e explora as complexidades das relações humanas.",
        isbn: "978-85-0000-000-2",
        ano: 2020,
        editora: "Editora Imaginária",
        paginas: 410,
        imagem: "img/img-leitor.jpg",
        audio: "audio/orv.m4a"
    },
    {
        titulo: "Solo Levelling",
        autor: "Chugong",
        descricao: "Solo Levelling é uma emocionante série de ação e aventura que segue a jornada de um caçador fraco que, após um evento misterioso, ganha a habilidade de se tornar mais forte através de um sistema de níveis. A história é repleta de batalhas intensas e desenvolvimento de personagens.",
        isbn: "978-85-0000-000-3",
        ano: 2018,
        editora: "Editora Aventura",
        paginas: 350,
        imagem: "img/img-solo.jpg",
        audio: ""
    },
    {
        titulo: "Filho Mais Novo do Mestre Espadachim",
        autor: "Kim Jae-Han",
        descricao: "Swords Master é uma história de artes marciais que segue a jornada de um jovem espadachim em busca de se tornar o melhor mestre de espada. Com lutas emocionantes e treinamento intenso, a trama explora temas de disciplina, honra e superação.",
        isbn: "978-85-0000-000-4",
        ano: 2022,
        editora: "Editora Lâmina",
        paginas: 295,
        imagem: "img/img-sword.webp",
        audio: ""
    },
    {
        titulo: "O Mundo Após a Queda",
        autor: "TurtleMe",
        descricao: "O Mundo Após a Queda é uma narrativa pós-apocalíptica que segue a luta pela sobrevivência em um mundo devastado. Com elementos de ficção científica e fantasia, a história explora as consequências de eventos catastróficos e a resiliência humana.",
        isbn: "978-85-0000-000-5",
        ano: 2023,
        editora: "Editora Pós-Apocalipse",
        paginas: 380,
        imagem: "img/img-mundo.jpeg",
        audio: ""
    },
    {
        titulo: "Essência da Reencarnação",
        autor: "Yun Cheong",
        descricao: "Essência da Reencarnação é uma história de fantasia que explora o conceito de reencarnação e suas implicações. A trama segue um protagonista que revive em um mundo mágico, enfrentando desafios e descobrindo segredos sobre seu passado.",
        isbn: "978-85-0000-000-6",
        ano: 2019,
        editora: "Editora Renascimento",
        paginas: 270,
        imagem: "img/img-rencarnacao.webp",
        audio: ""
    }    
];

// Seleciona todos os botões "Saiba Mais"
const botoes = document.querySelectorAll('.carousel-item button');
const modal = document.getElementById('modal-livro');
const modalTitulo = document.getElementById('modal-titulo');
const modalAutor = document.getElementById('modal-autor');
const modalDescricao = document.getElementById('modal-descricao');
const modalisbn = document.getElementById('modal-isbn');
const modalAno = document.getElementById('modal-ano'); 
const modalEditora = document.getElementById('modal-editora');
const modalPaginas = document.getElementById('modal-paginas');
const modalImagem = document.getElementById('modal-imagem');
const closeModal = document.querySelector('.close-modal');

// Áudio para descrição
let modalSom = null;

// Adiciona evento para cada botão "Saiba Mais"
botoes.forEach(botao => {
    botao.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        const livro = livros[index]; // aqui o model apenas aparece o livro selecionado, pois o getAttribute pega o index do botão clicado  
        modalTitulo.textContent = livro.titulo;
        modalAutor.textContent = `Autor: ${livro.autor}`;
        modalDescricao.textContent = livro.descricao;
        modalisbn.textContent = `ISBN: ${livro.isbn}`;
        modalAno.textContent = `Ano: ${livro.ano}`;
        modalEditora.textContent = `Editora: ${livro.editora}`;
        modalPaginas.textContent = `Páginas: ${livro.paginas}`;
        modalImagem.src = livro.imagem;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Botão de áudio da descrição
        const btnAudio = document.getElementById('btn-audio-descricao');
        if (btnAudio) {
            btnAudio.onclick = () => {
                if (modalSom) {
                    modalSom.pause();
                    modalSom.currentTime = 0;
                }
                modalSom = new Audio(livro.audio);
                modalSom.play();
            };
        }
    });
});

// Fecha o modal ao clicar no X
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalSom.pause();
    modalSom.currentTime = 0
    const index = parseInt(this.getAttribute('data-index'));
    const livro = livros[index];
});

// Fecha o modal ao clicar fora do conteúdo
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modalSom.pause();
        modalSom.currentTime = 0;
    }
});

// Função para abrir modal de um livro aleatório
function abrirModalAleatorio() {
    const indexAleatorio = Math.floor(Math.random() * livros.length);
    const livro = livros[indexAleatorio]; // aqui o model seleciona um livro aleatório devido o math.random
    modalTitulo.textContent = livro.titulo;
    modalAutor.textContent = `Autor: ${livro.autor}`;
    modalDescricao.textContent = livro.descricao;
    modalisbn.textContent = `ISBN: ${livro.isbn}`;
    modalAno.textContent = `Ano: ${livro.ano}`;
    modalEditora.textContent = `Editora: ${livro.editora}`;
    modalPaginas.textContent = `Páginas: ${livro.paginas}`;
    modalImagem.src = livro.imagem;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Botão de áudio da descrição
    const btnAudio = document.getElementById('btn-audio-descricao');
    if (btnAudio) {
        btnAudio.onclick = () => {
            if (modalSom) {
                modalSom.pause();
                modalSom.currentTime = 0;
            }
            modalSom = new Audio(livro.audio);
            modalSom.play();
        };
    }
}

// Conecta o botão "Surpreenda me!"
const btnSurpreenda = document.querySelector('.header button');
if (btnSurpreenda) {
    btnSurpreenda.addEventListener('click', abrirModalAleatorio);
}