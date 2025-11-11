// função para rolar a linha do tempo para os lados
// o parâmetro "direction" indica para onde: 
// -1 = esquerda ; 1 = direita
function scrollLinhaDoTempo(direction) {

  // pega a div da linha do tempo pelo ID
  const linhadotempo = document.getElementById("linhadotempo");

  // define a distância que a linha do tempo vai rolar a cada clique (em pixels)
  const scrollAmount = 300; 
  
  // faz a rolagem horizontal
  linhadotempo.scrollBy({
    left: direction * scrollAmount, // multiplica pela direção (-1 ou 1)
    behavior: "smooth"              // faz a rolagem ser suave 
  });
}



// seleciona todos os elementos com a classe 'card-livro'
const livrosClick = document.querySelectorAll(".card-livro"); 

// para cada elemento selecionado, adiciona um evento de clique
livrosClick.forEach(item => {
    // quando o elemento é clicado
    item.addEventListener("click", () => { 
        // obtém o valor do atributo data-id do elemento clicado
        const id = item.dataset.id;  
        // salva o id do livro selecionado no armazenamento local
        localStorage.setItem("livroSelecionado", id); 
        // direciona o usuário para a página de detalhes do livro
        window.location.href = "infos.html"; 
    });
});

// objeto biblioteca com um array de livros
const biblioteca ={
    livros:[
        {
            id: 1,
            titulo: "Jantar Secreto",
            autor: "Raphael Montes",
            img: "img/jantar_secreto.jpg",
            genero: "Suspense",
            editora: "Companhia das Letras",
            ano: 2016,
            sinopse: "Quatro amigos organizam jantares clandestinos no Rio de Janeiro para sobreviver, mas a ambição os leva a caminhos sombrios e perturbadores. Um thriller envolvente sobre amizade, ganância e os limites da moralidade.",
            paginas: 320,
            audio: ' <source src="audio/jantar_secreto.mp3" type="audio/mp3">',
            comprar: 'https://a.co/d/5EYA8RO'

        }, 
        {
            id: 2,
            titulo: "Bom dia Verônica",
            autor: "Raphael Montes",
            img: "img/bomdia_veronica.webp",
            genero: "Suspense Policial",
            editora: "DarkSide Books",
            ano: 2016,
            sinopse: "Verônica Torres, escrivã da polícia, testemunha um suicídio e, em segredo, decide investigar por conta própria. Entre abusos, violência e mistérios, ela mergulha em uma trama perigosa que pode custar sua vida. Um thriller intenso sobre coragem, trauma e busca por justiça.",
            paginas: 256,
            audio: '   <source type="audio/mp3" src="audio/bom_dia_veronica.mp3">',
            comprar: 'https://a.co/d/b1JE4hq/'
        },
        {
            id: 3,
            titulo: "Uma Mulher no Escuro",
            autor: "Raphael Montes",
            img: "img/mulher_noescuro.png",
            genero: "Thriller Psicológico",
            editora: "DarkSide Books",
            ano: 2021,
            sinopse: "Quando tinha apenas quatro anos, Victoria Bravo viu sua família ser brutalmente assassinada. Agora adulta, ela vive isolada e traumatizada, tentando apagar o passado. Mas sua rotina solitária é interrompida quando conhece uma nova paixão e, em seguida, quando o criminoso responsável por seu trauma é solto da prisão. Forçada a enfrentar seus medos mais profundos, Victoria descobre que a escuridão que a cerca pode ser ainda mais perigosa do que imaginava.",
            paginas: 288,
            audio: ' <source type="audio/mp3" src="audio/mulher_no_escuro.mp3"> ',
            comprar: 'https://a.co/d/2o3WLDP'
        },
          {
            id: 4,
            titulo: "Suicidas",
            autor: "Raphael Montes",
            img: "img/suicidas.png",
            genero: "Suspense, Thriller, Policial",
            editora: "Benvirá",
            ano: 2012,
            sinopse: "Nove jovens de classe média alta decidem participar de uma roleta-russa em um porão isolado. O jogo macabro termina em tragédia: apenas um sobrevive. Anos depois, o caso volta a ser investigado e os detalhes obscuros da noite fatídica vêm à tona. Alternando entre a investigação policial e o relato dos jovens, o romance expõe segredos, rivalidades e o fascínio pela morte, em uma trama sufocante e perturbadora.",
            paginas: 392,
            audio: ' <source type="audio/mp3" src="audio/suicidas.mp3"> ',
            comprar: 'https://a.co/d/dJEKQGt'
        },

        {
            id: 5,
            titulo: "Dias Perfeitos",
            autor: "Raphael Montes",
            img: "img/dias_perfeitos.jpg",
            genero: "Suspense, Thriller Psicológico",
            editora: "Companhia das Letras",
            ano: 2014,
            sinopse: "Téo, um estudante de medicina, conhece Clarice, uma jovem de espírito livre e cheia de planos. Obcecado por ela, Téo decide sequestrá-la para que vivam juntos uma vida 'perfeita'. O livro mergulha na mente doentia do protagonista, explorando obsessão, manipulação e os limites da loucura.",
            paginas: 280,
            audio: '<source type="audio/mp3" src="audio/dias_perfeitos.mp3"> ',
            comprar: 'https://a.co/d/atA38NN' 
        },

        {
            id: 6,
            titulo: "Uma Família Feliz",
            autor: "Raphael Montes e Ilana Casoy",
            img: "img/familia_feliz.webp",
            genero: "Suspense Policial, True Crime",
            editora: "Companhia das Letras",
            ano: 2022,
            sinopse: "Baseado em fatos reais, o livro reconstrói a investigação do caso von Richthofen, um dos crimes mais famosos do Brasil. A narrativa mistura ficção e realidade, mostrando os bastidores da investigação policial e os segredos obscuros de uma família que parecia perfeita.",
            paginas: 384,
            audio: '  <source  src="audio/uma_familia_feliz.mp3" type="audio/mp3"> ',
            comprar: 'https://a.co/d/7zCE7cl'
        }
    ]
};

// objeto biblioteca com um array de livros;

// recupera o id do livro selecionado do armazenamento local
const idLivro = localStorage.getItem("livroSelecionado");   

// procura no array de livros o livro com o id correspondente
const livroSelecionado = biblioteca.livros.find(l => l.id == idLivro);   

// se o livro foi encontrado, exibe as informações na página
if (livroSelecionado) { 
    // imagem do livro
    document.getElementById('foto-livro').innerHTML = `
    <img src="${livroSelecionado.img}" alt="${livroSelecionado.titulo}">
`;
    // autor do livro
    document.getElementById("autor").innerHTML = `${livroSelecionado.autor}`;
    // título do livro
    document.getElementById("titulo-livro").innerHTML = `${livroSelecionado.titulo}`;
    // sinopse do livro
    document.getElementById("sinopse").innerHTML = `${livroSelecionado.sinopse}`;
    // gênero do livro
    document.getElementById("genero").innerHTML = `${livroSelecionado.genero}`;
    // editora do livro
    document.getElementById("editora").innerHTML = `${livroSelecionado.editora}`;
    // ano de publicação do livro
    document.getElementById("ano").innerHTML = `${livroSelecionado.ano}`;
    // número de páginas do livro
    document.getElementById("tamanho").innerHTML = `${livroSelecionado.paginas}`;
    // áudio do livro
    document.getElementById("audio").innerHTML = `${livroSelecionado.audio}`
    // link para comprar o livro
    document.getElementById("comprar").innerHTML = `<a href="${livroSelecionado.comprar}" target="_blank"><button class="comprar">Comprar Aqui</button></a>`;

} else {
    // caso o livro não seja encontrado, exibe uma mensagem no console
    console.log("Livro não encontrado");
}

// função que roda quando o formulário é enviado
function enviarContato() {
// impede que a página recarregue ao enviar
    event.preventDefault();

// pega os valores dos campos pelo ID
    const nome = document.getElementById("nome")?.value;
    const email = document.getElementById("email")?.value;
    const mensagem = document.getElementById("mensagem")?.value;

    // checa se todos os campos foram preenchidos
    if (nome && email && mensagem) {
        // se sim, mostra mensagem de sucesso
        alert("Mensagem enviada com sucesso");
    } else {
        // se algum estiver vazio, pede para preencher tudo
        alert("Por favor, preencha todos os campos");
    }
}
