const livros = [
    {
        titulo: "O Senhor dos Anéis",
        autor: "J.R.R. Tolkien",
        ano: "1954",
        genero: "Fantasia Épica",
        paginas: 1202,
        capa: "img/LOTR_Part1.png",
        sinopse: "Ambientado na vasta e antiga Terra-média, O Senhor dos Anéis acompanha a jornada de um grupo improvável em uma missão que pode decidir o destino de todo o mundo. Entre reinos, florestas élficas, montanhas sombrias e cidades lendárias, a história explora amizade, coragem e sacrifício em meio a uma batalha eterna entre luz e trevas. É uma aventura épica de heroísmo e esperança que conquista leitores há gerações.",
        audio: "audios/LOTR_Sinopse.mp3"
    },
    {
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        ano: "1937",
        genero: "Fantasia Épica",
        paginas: 336,
        capa: "img/TheHobbit.png",
        sinopse: "Antes da grande guerra pelo destino da Terra-média, um hobbit pacato é arrastado para uma jornada inesperada em busca de um tesouro guardado por um dragão. Entre perigos, encontros mágicos e novos amigos, ele descobre coragem e habilidades que jamais imaginou possuir.",
        audio: "audios/TheHobbit.mp3"
    },
    {
        titulo: "O Silmarillion",
        autor: "J.R.R. Tolkien",
        ano: "1977",
        genero: "Mitologia/Fantasia",
        paginas: 480,
        capa: "img/OSilmarillion.png",
        sinopse: "Uma coletânea de mitos e lendas que narra a criação da Terra-média e as antigas guerras entre luz e escuridão. É a base para todos os acontecimentos posteriores, revelando deuses, heróis e tragédias que moldaram o mundo de Tolkien.",
        audio: "audios/OSilmarillion.mp3"
    },
    {
        titulo: "Beren e Lúthien",
        autor: "J.R.R. Tolkien",
        ano: "2017",
        genero: "Fantasia/Romance",
        paginas: 288,
        capa: "img/Beren_Luthien.png",
        sinopse: "Uma das histórias de amor mais lendárias da Terra-média, onde coragem e sacrifício se entrelaçam em uma missão quase impossível. Beren, um mortal, e Lúthien, uma elfa imortal, desafiam poderes sombrios em nome de um amor que transcende mundos.",
        audio: "audios/Beren_Luthien.mp3"
    },
    {
        titulo: "Os Filhos de Húrin",
        autor: "J.R.R. Tolkien",
        ano: "2007",
        genero: "Fantasia/Tragédia",
        paginas: 320,
        capa: "img/OsFilhosDeHurin.png",
        sinopse: "Um conto de bravura e tragédia que acompanha a família de Húrin em meio à guerra contra forças ancestrais. Destino, honra e escolhas difíceis marcam a vida de Túrin Turambar, um dos heróis mais complexos das lendas élficas.",
        audio: "audios/FilhosDeHurin.mp3"
    },
    {
        titulo: "A Queda de Númenor",
        autor: "J.R.R. Tolkien",
        ano: "2022",
        genero: "Fantasia/História",
        paginas: 400,
        capa: "img/AQuedaDeNumenor.png",
        sinopse: "Relata a ascensão e a ruína da grande ilha de Númenor, a mais poderosa civilização dos homens. Um épico sobre ambição, orgulho e a luta contra limites impostos pelos próprios deuses, que ecoa nas eras seguintes da Terra-média.",
        audio: "audios/AQuedaDeNumenor.mp3"
    }
];

//Seletores
const livrosContainer = document.getElementById("livros");
const paginaInicial = document.getElementById("pagina-inicial");
const paginaDetalhes = document.getElementById("pagina-detalhes");
const detalhesContainer = document.getElementById("detalhes");
const voltarBtn = document.getElementById("voltar");


livros.forEach((livro, index) => {
    const div = document.createElement("div");
    div.classList.add("livro");
    div.innerHTML = `
        <img src="${livro.capa}" alt="Capa do livro">
        <h3>${livro.titulo}</h3>
        <p>${livro.autor}</p>
    `;
    div.addEventListener("click", () => mostrarDetalhes(index));
    livrosContainer.appendChild(div);
});


function mostrarDetalhes(index) {
    const livro = livros[index];
    detalhesContainer.innerHTML = `
        <h2>${livro.titulo}</h2>
        <img src="${livro.capa}" alt="Capa do livro">
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
        <p><strong>Gênero:</strong> ${livro.genero}</p>
        <p><strong>Páginas:</strong> ${livro.paginas}</p>
        <p><strong>Sinopse:</strong> ${livro.sinopse}</p>
        <audio controls>
            <source src="${livro.audio}" type="audio/mpeg">
            Seu navegador não suporta áudio.
        </audio>
    `;
    paginaInicial.classList.add("hidden");
    paginaDetalhes.classList.remove("hidden");
}


voltarBtn.addEventListener("click", () => {
    paginaInicial.classList.remove("hidden");
    paginaDetalhes.classList.add("hidden");
});
