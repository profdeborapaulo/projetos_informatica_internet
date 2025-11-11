var livros = {
    "livros": [
        {
            "id": 1,
            "titulo": "Harry Potter e a Pedra Filosofal",
            "autor": "J.K. Rowling",
            "ano": 1997,
            "genero": "Fantasia",
            "descricao": "O primeiro livro da famosa série Harry Potter, onde conhecemos o jovem bruxo e seu ingresso em Hogwarts.",
            "disponibilidade": "Disponível para empréstimo",
            "caminho-img": "img/HP_pedrafilosofal.jpg",
            "caminho_audio": "img/audios/H1.mp3"
        },
        {
            "id": 2,
            "titulo": "Harry Potter e a Câmara Secreta",
            "autor": "J.K. Rowling",
            "ano": 1998,
            "genero": "Fantasia",
            "descricao": "No segundo ano em Hogwarts, Harry enfrenta novos desafios e descobre os mistérios da Câmara Secreta.",
            "disponibilidade": "Indisponível (emprestado)",
            "caminho-img": "img/HP_camarasecreta.jpg",
            "caminho_audio": "img/audios/H2.mp3"
        },
        {
            "id": 3,
            "titulo": "Harry Potter e o Prisioneiro de Azkaban",
            "autor": "J.K. Rowling",
            "ano": 1999,
            "genero": "Fantasia",
            "descricao": "Harry descobre segredos sobre o passado de seus pais e conhece o enigmático Sirius Black.",
            "disponibilidade": "Disponível para empréstimo",
            "caminho-img": "img/HP_prisioneirodeaskaban.jpg",
            "caminho_audio": "img/audios/H3.mp3"
        },
        {
            "id": 4,
            "titulo": "Harry Potter e o Cálice de Fogo",
            "autor": "J.K. Rowling",
            "ano": 2000,
            "genero": "Fantasia",
            "descricao": "No torneio Tribruxo, Harry enfrenta provas perigosas enquanto Voldemort retorna à força.",
            "disponibilidade": "Disponível para consulta local",
            "caminho-img": "img/HP_calicedefogo.jpg",
            "caminho_audio": "img/audios/H4.mp3"
        },
        {
            "id": 5,
            "titulo": "Harry Potter e a Ordem da Fênix",
            "autor": "J.K. Rowling",
            "ano": 2003,
            "genero": "Fantasia",
            "descricao": "Harry enfrenta a incredulidade do Ministério da Magia e organiza a Armada de Dumbledore.",
            "disponibilidade": "Indisponível (reservado)",
            "caminho-img": "img/HP_ordemdafenix.jpg",
            "caminho_audio": "img/audios/H5.mp3"
        },
        {
            "id": 6,
            "titulo": "1984",
            "autor": "George Orwell",
            "ano": 1949,
            "genero": "Ficção Distópica",
            "descricao": "Um romance que retrata um futuro totalitário e opressivo, onde o Big Brother vigia todos.",
            "disponibilidade": "Disponível para empréstimo",
            "caminho-img": "img/1984.png",
            "caminho_audio": "img/audios/1984.mp3"
        },
        {
            "id": 7,
            "titulo": "Dom Casmurro",
            "autor": "Machado de Assis",
            "ano": 1899,
            "genero": "Romance",
            "descricao": "Um romance que explora a vida de Bentinho e sua obsessão por Capitu.",
            "disponibilidade": "Indisponível (emprestado)",
            "caminho-img": "img/Dom_Casmurro.png",
            "caminho_audio": "img/audios/Dom_Casmurro.mp3"
        },
        {
            "id": 8,
            "titulo": "O Pequeno Príncipe",
            "autor": "Antoine de Saint-Exupéry",
            "ano": 1943,
            "genero": "Ficção",
            "descricao": "Um jovem príncipe viaja por planetas e aprende lições sobre a vida e a amizade.",
            "disponibilidade": "Disponível para empréstimo",
            "caminho-img": "img/O_pequeno_principe.jpg",
            "caminho_audio": "img/audios/O_pequeno_principe.mp3"
        },
        {
            "id": 9,
            "titulo": "As 48 Leis do Poder",
            "autor": "Robert Greene",
            "ano": 1998,
            "genero": "Não-ficção",
            "descricao": "Um guia sobre o poder e a manipulação, baseado em exemplos históricos.",
            "disponibilidade": "Disponível para consulta local",
            "caminho-img": "img/as_48_leis_do_poder.png",
            "caminho_audio": "img/audios/as_48_leis_do_poder.mp3"
        },
        {
            "id": 10,
            "titulo": "O Grande Gatsby",
            "autor": "F. Scott Fitzgerald",
            "ano": 1925,
            "genero": "Romance",
            "descricao": "A história de Jay Gatsby e sua busca por Daisy Buchanan na América dos anos 20.",
            "disponibilidade": "Indisponível (reservado)",
            "caminho-img": "img/GrandeGatsby.png",
            "caminho_audio": "img/audios/GrandeGatsby.mp3"
        },
        {
            "id": 11,
            "titulo": "Extraordinário",
            "autor": "R.J. Palacio",
            "ano": 2012,
            "genero": "Ficção",
            "descricao": "A história de Auggie, um garoto com uma deformidade facial, e sua jornada para ser aceito.",
            "disponibilidade": "Disponível para empréstimo",
            "caminho-img": "img/Extraordinario.png",
            "caminho_audio": "img/audios/Extraordinario.mp3"
        }
    ]
};

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function carregarLivro() {
    const idLivro = getIdFromUrl();
    const livro = livros.livros.find(l => l.id === idLivro);

    if (livro) {
        // Atualizar capa
        let divCapa = document.getElementById("img");
        divCapa.innerHTML = `<img id="capaLivro" src="${livro["caminho-img"]}" alt="Capa do livro ${livro.titulo}">`;

        // Atualizar informações
        document.getElementById("titulo").textContent = livro.titulo;
        document.getElementById("autor").textContent = `por ${livro.autor}`;
        document.getElementById("descricao").textContent = livro.descricao;
        document.getElementById("ano").textContent = livro.ano;
        document.getElementById("genero").textContent = livro.genero;
        document.getElementById("disponibilidade").textContent = livro.disponibilidade;
        var audio_area = document.getElementById("audio_area");

        audio_area.innerHTML = `<source id="player" src="${livro.caminho_audio}" type="audio/mpeg">
                                Seu navegador não suporta o elemento de áudio.`

        // Atualizar título da aba
        document.title = `${livro.titulo} - Biblioteca Souza`;
    } else {
        document.getElementById("content").innerHTML = `
            <div class="not-found">
                <h2>Livro não encontrado</h2>
                <p>Este livro não existe em nosso catálogo.</p>
            </div>
        `;
    }
}

// Carregar ao abrir a página
window.addEventListener('load', carregarLivro);

// Clique no logo volta à página inicial
var logo = document.getElementById('img_logo');
logo.addEventListener('click', () => {
    window.location.href = 'index.html'
});



document.querySelectorAll('.livro, .grid-item').forEach(div => {
    div.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        window.location.href = `checkout.html?id=${id}`;
    });
});