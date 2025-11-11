// Objetos
const biblioteca = {
    nome: "Biblioteca Clio",
    livros: [
    {
    id: 1,
    titulo: "Uma Breve História do Mundo",
    autor: "H. G. Wells",
    ano: 1920,
    imagens: ["img/book1.jpg", "img/book1-verso.jpg"],
    sinopse: "Explora a história da humanidade desde os primórdios até o início do século XX, abordando grandes civilizações, guerras, avanços científicos, descobertas, revoluções culturais e transformações sociais que moldaram o mundo moderno e a forma como vivemos atualmente.",
    audio: "audio/book1.m4a"
},
{
    id: 2,
    titulo: "O Cortiço",
    autor: "Aluísio Azevedo",
    ano: 1890,
    imagens: ["img/book2.jpg", "img/book2-verso.jpg"],
    sinopse: "Retrata a vida intensa e sofrida dos moradores de um cortiço no Rio de Janeiro, mostrando as tensões sociais, ambições, paixões e conflitos que definem o ambiente urbano, além das desigualdades, preconceitos e comportamentos humanos da época.",
    audio: "audio/book2.m4a"
},
{
    id: 3,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    ano: 1899,
    imagens: ["img/book3.jpg", "img/book3-verso.jpg"],
    sinopse: "Acompanhamos a vida de Bentinho e sua relação com Capitu, marcada por ciúmes, suspeitas de adultério e questionamentos sobre memória e verdade. Uma narrativa introspectiva, irônica e psicológica, que explora sentimentos complexos, caráter humano e ambiguidades da percepção pessoal.",
    audio: "audio/book3.m4a"
},
{
    id: 4,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    ano: 1943,
    imagens: ["img/book4.jpg", "img/book4-verso.jpg"],
    sinopse: "Um piloto perdido encontra um pequeno príncipe vindo de outro planeta. Através de suas conversas e aventuras, o livro explora lições profundas sobre amizade, amor, perda, inocência, humanidade, responsabilidade, esperança e o verdadeiro significado das coisas importantes na vida.",
    audio: "audio/book4.m4a"
},
{
    id: 5,
    titulo: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    ano: 1881,
    imagens: ["img/book5.jpg", "img/book5-verso.jpg"],
    sinopse: "Narrado por Brás Cubas após a morte, o livro oferece uma reflexão irônica sobre a vida, a morte, a sociedade brasileira do século XIX, ambições humanas, vaidades, amor, fracassos pessoais e a hipocrisia social, tudo apresentado com humor sutil e crítica refinada.",
    audio: "audio/book5.m4a"
},
{
    id: 6,
    titulo: "Iracema",
    autor: "José de Alencar",
    ano: 1865,
    imagens: ["img/book6.jpg", "img/book6-verso.jpg"],
    sinopse: "Romance indianista que narra a paixão entre Iracema, jovem indígena, e Martim, colonizador português, explorando o choque cultural, os valores da natureza, tradições nativas, os costumes da época, o processo de colonização do Brasil e a idealização do amor e da pureza.",
    audio: "audio/book6.m4a"
},
{
    id: 7,
    titulo: "Senhora",
    autor: "José de Alencar",
    ano: 1875,
    imagens: ["img/book7.jpg", "img/book7-verso.jpg"],
    sinopse: "Conta a história de Aurélia, uma jovem que herda uma grande fortuna, enfrentando decisões sobre casamento, poder, interesse financeiro e amor verdadeiro. O livro explora a sociedade carioca do século XIX, as relações sociais, dilemas morais e a busca pela autonomia feminina.",
    audio: "audio/book7.m4a"
},
{
    id: 8,
    titulo: "A Moreninha",
    autor: "Joaquim Manuel de Macedo",
    ano: 1844,
    imagens: ["img/book8.jpg", "img/book8-verso.jpg"],
    sinopse: "Romance romântico que narra o encontro e o amor entre Augusto e a misteriosa Moreninha durante uma viagem à ilha de Paquetá. A história aborda amizade, promessas, rivalidades, descobertas, primeiros dilemas amorosos da juventude e a inocência do primeiro amor, com leveza e humor característicos.",
    audio: "audio/book8.m4a"
}
]
};

// Mostrar livros na home
let mostrandoMais = false;

function abrirDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

function renderizarLivros(qtd) {
    const div = document.getElementById("saida");
    if (!div) return; 

    div.innerHTML = "";

    biblioteca.livros.slice(0, qtd).forEach(function (livro) {
        const imagem = livro.imagens ? livro.imagens[0] : livro.imagem;
        div.innerHTML += `
            <div class="livro-card" onclick="abrirDetalhes(${livro.id})" style="cursor:pointer;">
                <img src="${imagem}" alt="${livro.titulo}" />
                <div class="livro-info">
                    <h4>${livro.titulo}</h4>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Ano:</strong> ${livro.ano}</p>
                </div>
            </div>
        `;
    });
}

// Mostrar Livros
function mostrarLivros() {
    const btn = document.querySelector(".banner button");
    if (!btn) return;

    if (mostrandoMais) {
        renderizarLivros(4);
        btn.textContent = "Mostrar Mais";
        mostrandoMais = false;
    } else {
        renderizarLivros(biblioteca.livros.length);
        btn.textContent = "Mostrar Menos";
        mostrandoMais = true;
    }
}

// Carregar pagina detalhes do livro 
let imagemAtual = 0;
let imagensLivro = [];

function getLivroPorId(id) {
    return biblioteca.livros.find(livro => livro.id == id);
}

function carregarDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const livro = getLivroPorId(id);

    if (!livro) {
        document.querySelector("main").innerHTML = "<h2>Livro não encontrado.</h2>";
        return;
    }

    document.getElementById("titulo").textContent = livro.titulo;
    document.getElementById("autor").textContent = "Autor: " + livro.autor;
    document.getElementById("ano").textContent = "Ano: " + livro.ano;
    document.getElementById("sinopse").textContent = livro.sinopse;


// Troca de imagem dos livros
    if (livro.imagens && Array.isArray(livro.imagens)) {
        imagensLivro = livro.imagens;
    } else if (livro.imagem) {
        imagensLivro = [livro.imagem];
    } else {
        imagensLivro = ["img/default.jpg"];
    }

    imagemAtual = 0;
    atualizarImagem();

    imagemAtual = 0;
atualizarImagem();

// Adiciona o áudio da sinopse
const audio = document.getElementById("audio");
if (livro.audio) {
    audio.src = livro.audio;
    audio.load();
} else {
    audio.style.display = "none";
}


// Eventos das setas
    const voltaBtn = document.getElementById("voltaBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (voltaBtn && nextBtn) {
        voltaBtn.addEventListener("click", () => {
            imagemAtual = (imagemAtual - 1 + imagensLivro.length) % imagensLivro.length;
            atualizarImagem();
        });

        nextBtn.addEventListener("click", () => {
            imagemAtual = (imagemAtual + 1) % imagensLivro.length;
            atualizarImagem();
        });
    }
}

function atualizarImagem() {
    const imgElement = document.getElementById("imagem");
    if (imgElement && imagensLivro.length > 0) {
        imgElement.src = imagensLivro[imagemAtual];
        imgElement.alt = "Imagem " + (imagemAtual + 1);
    }
}

// Carrossel de imagens
function iniciarCarrossel() {
    const imagens = document.querySelectorAll(".carrossel img");

    let index = 0;

    imagens.forEach((img, i) => img.style.opacity = i === 0 ? 1 : 0);

    setInterval(() => {
        imagens[index].style.opacity = 0;
        index = (index + 1) % imagens.length;
        imagens[index].style.opacity = 1;
    }, 3000);
}

// Envio de formulário de contato
function enviarContato(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    if (nome && email && mensagem) {
        alert("Contato enviado com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Inicialização 
document.addEventListener("DOMContentLoaded", () => {
    renderizarLivros(4);       
    carregarDetalhes();         
    iniciarCarrossel();         
});


// Busca de livros
const livros = [
  { id: 1, titulo: "Uma Breve História do Mundo" },
  { id: 2, titulo: "O Cortiço" },
  { id: 3, titulo: "Dom Casmurro" },
  { id: 4, titulo: "O Pequeno Príncipe" },
  { id: 5, titulo: "Memórias Póstumas de Brás Cubas" },
  { id: 6, titulo: "Iracema" },
  { id: 7, titulo: "Senhora" },
  { id: 8, titulo: "A Moreninha" }
];

function buscarLivro() {
  const termo = document.getElementById("busca").value.trim().toLowerCase();

  if(termo === ""){
    alert("Preencha todos os campos, Por favor!")
    return
  }

  const livro = livros.find(livro => livro.titulo.toLowerCase().includes(termo));

  if (livro) {
    window.location.href = `detalhes.html?id=${livro.id}`;
  }  else {
    alert("Livro não encontrado!");
  }
}

