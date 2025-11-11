// js/books.js
// Lista de livros: edite as entradas para corresponder aos arquivos de imagem e áudio.
const BOOKS = [
  {
    id: 1,
    title: "Jurassic Park",
    author: "Michael Crichton",
    autor: "MichaelCrichton",
    cover: "img/Jurassic_Park.jpg",
    coverLarge: "img/Jurassic_Park.jpg",
    synopsis: "Após descobrir uma impressionante técnica de recuperação e clonagem de DNA pré-histórico, o bilionário John Hammond consegue algo que parecia impossível: criar uma espécie de parque de diversões com criaturas extintas há eras. Para atestar a viabilidade e a segurança de seu empreendimento, convida alguns cientistas renomados para um final de semana no lugar. Mas algo sai do controle. O que parecia ser uma aventura fascinante torna-se uma luta pela sobrevivência.",
    audio: "audios/Jurassic_Park.mp3",
    year:  "20 de novembro de 1990",
    ISBN:  "85-332-0148-6",
    genre: { id: "romance", name: "Romance" },
    paginas: 528,
    rating: 4.3,
    reviews: 102
  },
  {
    id: 2,
    title: "Fábulas",
    author: "La Fontaine",
    cover: "img/Fabulas.jpg",
    coverLarge: "img/Fabulas.jpg",
    synopsis: "Considerado o pai da fábula moderna, La Fontaine tornou-se conhecido internacionalmente com suas criações inspiradas nas tradições clássica e oriental. Fábulas é sua obra mais famosa. Escrita em versos, com uma linguagem simples e atraente que conquista imediatamente seus leitores, inclui histórias mundialmente conhecidas, como A cigarra e a formiga, O corvo e a raposa e A lebre e a tartaruga. La Fontaine trata de temas universais, como a vaidade, a estupidez e o vício humanos, retratados por meio dos animais. Segundo ele, sua obra “é uma pintura em que podemos encontrar nosso próprio retrato”. Esta edição é uma antologia de suas mais importantes composições, traduzidas por célebres escritores brasileiros e portugueses, com ilustrações de Grandville.",
    audio: "audios/Fabulas.mp3",
    year:  "23 julho 2012",
    ISBN:  "8572328637",
    genre: { id: "infantil", name: "Infatil" },
    paginas: 262,
    rating: 4.6,
    reviews: 58
  },
  // Adicione pelo menos 6 objetos (mínimo exigido)
  {
    id: 3,
    title: "O Livro Do Bill",
    author: "Alex Hirsch",
    cover: "img/Bill.jpeg",
    coverLarge: "img/Bill.jpeg",
    synopsis: "Você sentiu falta dele? Admita, você sentiu falta dele. Alex Hirsch, autor best-seller do The New York Times, ressuscita este infame vilão e convida os fãs a conhecerem a perspectiva de Bill Cipher sobre o universo de Gravity Falls. O demônio que aterrorizou Gravity Falls VOLTOU do além para finalmente contar seu lado da história em um novo livro escrito por ninguém menos do que o próprio Bill Cipher.",
    audio: "audios/Bill.mp3",
    year: "22 março 2024",
    genre: { id: "terror", name: "Terror" },
    ISBN:  "978-6556096681",
    paginas: 209,
    rating: 4.8,
    reviews: 23
  },
  {
    id: 4,
    title: "O Gato Viajante",
    author: "Hiro Ariwaka",
    cover: "img/Gato_Viajante.jpg",
    coverLarge: "img/Gato_Viajante.jpg",
    synopsis: "O gato Nana está viajando pelo Japão. Ele não sabe muito bem para onde está indo ou por que, mas ele está sentado no banco da van prata de Satoru, seu dono. Lado a lado, eles cruzam o país para visitar velhos amigos. O fazendeiro durão que acredita que gatos só servem para caçar ratos, o simpático casal dono de uma pousada que aceita animais, e o marido abandonado pela esposa que ama animais. Mas qual é o motivo dessa viagem? E por que todos estão tão interessados em Nana e Satoru? Ninguém sabe muito bem o que está acontecendo e Satoru não diz nada, mas quando Nana descobrir o motivo da viagem, seu pequeno coração passará por uma das mais difíceis provas de suas sete vidas.",
    audio: "audios/Gato.mp3",
    year: "25 agosto 2017",
    genre: { id: "romance", name: "Romance" },   
    ISBN:  "8556520480",
    paginas: 256,
    rating: 4.8,
    reviews: 80
  },
  {
    id: 5,
    title: "Morro Dos Ventos Uivantes",
    author: "Emily Brontë",
    cover: "img/Uivantes.webp",
    coverLarge: "img/Uivantes.webp",
    synopsis: "Único romance da escritora inglesa Emily Brontë, O morro dos ventos uivantes retrata uma trágica história de amor e obsessão em que os personagens principais são a obstinada e geniosa Catherine Earnshaw e seu irmão adotivo, Heathcliff. Grosseiro, humilhado e rejeitado, ele guarda apenas rancor no coração, mas tem com Catherine um relacionamento marcado por amor e ódio.",
    audio: "audios/Morro.mp3",
    year: "17 junho 2019",
    genre: { id: "romance", name: "Romance" },
    ISBN:  "8594318235",
    paginas: 368,
    rating: 4.7,
    reviews: 44
  },
  {
    id: 6,
    title: "Amor Ou Algo Assim",
    author: "Mariana Chazanas",
    cover: "img/Algo_Assim.jpg",
    coverLarge: "img/Algo_Assim.jpg",
    synopsis: "Raffa passou a vida inteira tentando esquecer Caê. Esquecer o bullying diário, aqueles olhos verdes e o último dia em que se viram, quando Caê disse “você é meu” e tudo explodiu. Mais de dez anos se passaram, e Raffa agora está no auge ― é estrela da novela mais popular do país, rico, atraente e no controle da própria vida; não está mais à mercê de ninguém. Então, por que ainda sonha com um acerto de contas?",
    audio: "audios/Amor.mp3",
    year: "31 agosto 2023",
    genre: { id: "romance", name: "Romance" },
    ISBN:  "655532368X",
    paginas: 304,
    rating: 4.7,
    reviews: 12
  },
    {
    id: 7,
    title: "Cosmos",
    author: "Carl Sagan",
    cover: "img/cosmos.jpg",
    coverLarge: "img/cosmos.jpg",
    synopsis: "Escrito por um dos maiores divulgadores da ciência do século XX, Cosmos retraça 14 bilhões de anos de evolução cósmica, abordando a origem da vida, o cérebro humano, missões espaciais, a morte do Sol, a evolução das galáxias e os pensadores que moldaram a ciência moderna. Com prosa clara e envolvente, Carl Sagan conecta ciência a história, arte e filosofia, revelando os segredos do planeta azul e nossa busca por identidade no vasto espaço. Publicado em 1980, continua sendo uma das mais importantes obras de divulgação científica, refletindo o fascínio humano pelo conhecimento.",
    audio: "audios/cosmos.mp3",
    year: "6 novembro 2017",
    genre: { id: "astronomia", name: "Astronomia" },
    ISBN:  "8535929886",
    paginas: 488,
    rating: 4.9,
    reviews: 12
  },
  {
    id: 8,
    title: "Eu, Robõ",
    author: "Isaac Asimov",
    cover: "img/eurobo.jpg",
    coverLarge: "img/eurobo.jpg",
    synopsis: "Um dos maiores clássicos da literatura de ficção científica, Eu, Robô, escrito por Isaac Asimov, é um conjunto de nove contos interconectados pela Dra. Susan Calvin, que apresenta seus relatos sobre a evolução dos autômatos através do tempo. É nessa obra que Asimov apresenta as célebres Três Leis da Robótica, princípios que regem o comportamento dos autômatos em toda a sua trajetória.",
    audio: "audios/eurobo.mp3",
    year: "24 novembro 2014",
    genre: { id: "astronomia", name: "Astronomia" },
    ISBN:  "8576572001",
    paginas: 320,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 9,
    title: "Universo",
    author: "Will Gater",
    cover: "img/Universo.jpg",
    coverLarge: "img/Universo.jpg",
    synopsis: "Uma jornada visual repleta de fotografias, ilustrações e histórias que revelam segredos de mais de 100 objetos celestes, com fatos surpreendentes e descobertas empolgantes sobre o Universo. Nesse livro, o leitor explora o Sistema Solar e o espaço além, aprendendo sobre eclipses, nascimento de planetas, explosões estelares, colisões de galáxias e muitos outros fenômenos fascinantes.",
    audio: "audios/universo.mp3",
    year: "5 novembro 2024",
    genre: { id: "astronomia", name: "Astronomia" },
    ISBN:  "6555648791",
    paginas: 224,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 10,
    title: "2001",
    author: "Arthur C. Clarke",
    cover: "img/2001.jpg",
    coverLarge: "img/2001.jpg",
    synopsis: "Nos primórdios da humanidade, quando a fome e os predadores ameaçavam a raça humana, chega à Terra um objeto inusitado, inacessível à limitada compreensão da mente pré-histórica, mas que influencia os homens a descobrir coisas que permitem a sua própria evolução. Milhões de anos depois, a descoberta de um monólito soterrado na Lua deixa os cientistas perplexos. Para investigar esse mistério, a Terra envia ao espaço uma equipe altamente treinada. Porém, o surgimento de pequenas falhas levanta a suspeita de que há algo errado com a missão.",
    audio: "audios/2001.mp3",
    year: "16 setembro 2015",
    genre: { id: "astronomia", name: "Astronomia" },
    ISBN:  "9788576571711",
    paginas: 326,
    rating: 4.7,
    reviews: 12
  },
  {
    id: 11,
    title: "A Ilha Do Tesouro",
    author: "Robert Louis Stevenson",
    cover: "img/ilha.jpg",
    coverLarge: "img/ilha.jpg",
    synopsis: "A vida de Jim Hawkins nunca mais será a mesma depois de conhecer Billy Jones. O velho lobo do mar possui um mapa que mostra o local onde está escondido um tesouro de pirata. Agora o mapa está com Jim e ele parte em uma expedição sem imaginar o que o aguarda – seja navegando pelo mar ou em terra firme.",
    audio: "audios/.mp3",
    year: "7 junho 2019",
    genre: { id: "aventura", name: "Aventura" },
    ISBN:  "8594318138",
    paginas: 240,
    rating: 4.6,
    reviews: 2.611
  },
{
    id: 12,
    title: "A volta ao mundo em 80 dias",
    author: "Júlio Verve",
    cover: "img/volta.jpg",
    coverLarge: "img/volta.jpg",
    synopsis: "Phileas Fogg, um inglês rico, metódico e um tanto quanto solitário aposta com seus colegas do clube de jogos que conseguirá dar uma volta ao mundo em apenas 80 dias. Para tal feito, o excêntrico Fogg convida seu fiel empregado Jean Passepartout e juntos viverão muitas aventuras.",
    audio: "audios/.mp3",
    year: "25 março 2019",
    genre: { id: "aventura", name: "Aventura" },
    ISBN:  "8594318146",
    paginas: 304,
    rating: 4.8,
    reviews: 4.178
  },
{
    id: 13,
    title: "Viagem Ao Centro Da Terra",
    author: "Júlio Verne",
    cover: "img/viiagem.jpg",
    coverLarge: "img/viiagem.jpg",
    synopsis: "O professor Lidenbrock consegue decifrar um enigma do pergaminho de um cientista do século XII e se junta ao seu sobrinho, o jovem Áxel, para checar a possibilidade de chegar ao centro da Terra seguindo o relato decifrado.",
    audio: "audios/.mp3",
    year: "1 janeiro 2019",
    genre: { id: "aventura", name: "Aventura" },
    ISBN:  "8594318154",
    paginas: 304,
    rating: 4.7,
    reviews: 3.809
  },
{
    id: 14,
    title: "As aventuras de Robin Hood",
    author: "Howard Pyle",
    cover: "img/robin.jpg",
    coverLarge: "img/robin.jpg",
    synopsis: "O livro As aventuras de Robin Hood, de Howard Pyle, é a mais conhecida e consagrada versão dessa balada medieval. A história de Robin Hood, um dos heróis mais famosos da cultura da Grã-Bretanha, já foi adaptada inúmeras vezes no teatro e no cinema, provando ser um sucesso absoluto com o público. Nas suas aventuras, Robin Hood roubava dos ricos para dar aos pobres, ajudado por outros aventureiros como John Pequeno, Frei Tuck e Will Escarlate. Esse livro é um romance de aventura para todos os públicos.",
    audio: "audios/2001.mp3",
    year: "1 maio 2013",
    genre: { id: "aventura", name: "Aventura" },
    ISBN:  "8572329609",
    paginas: 309,
    rating: 4.6,
    reviews: 522
  },
{
    id: 15,
    title: "Com Sangue",
    author: "Sthepen King",
    cover: "img/sangue.jpg",
    coverLarge: "img/sangue.jpg",
    synopsis: "Brilhante em narrativas curtas, King já escreveu alguns contos que viraram sucesso em todo o mundo, como as histórias que inspiraram os filmes Conta comigo e Um sonho de liberdade . Neste livro, assim como em Quatro estações e Escuridão total sem estrelas , ele cria uma coleção única e emocionante, demonstrando mais uma vez por que é considerado um dos maiores contadores de histórias de todos os tempos. Este é um livro sobre amor, amizade, talento e justiça… em suas formas mais deturpadas. Em Com sangue , Stephen King reúne quatro contos com protagonistas inteligentes e complexos, que têm sua vida comum transformada por algum elemento inexplicável.",
    audio: "audios/2001.mp3",
    year: "4 setembro 2020",
    genre: { id: "terror", name: "Terror" },
    ISBN:  "8556510973",
    paginas: 400,
    rating: 4.8,
    reviews: 1.498
  },
  {
    id: 16,
    title: "Terror A Bordo",
    author: "Sthepen King",
    cover: "img/abordo.jpg",
    coverLarge: "img/abordo.jpg",
    synopsis: "Bem-vindos a Terror a bordo , uma antologia sobre tudo que pode dar terrivelmente errado quando se está a 20 mil pés de altura, cortando os céus a 800 km/h, preso em uma caixa de metal com centenas de desconhecidos. Aqui você vai encontrar todas as maneiras como sua agradável viagem pelos ares pode se transformar em um pesadelo, incluindo algumas formas que você nunca imaginou… mas que vai imaginar da próxima vez em que estiver atravessando a ponte de embarque e entregando sua vida nas mãos de um estranho.",
    audio: "audios/2001.mp3",
    year: "17 fevereiro 2020",
    genre: { id: "terror", name: "Terror" },
    ISBN:  "8556510825",
    paginas: 240,
    rating: 4.4,
    reviews: 267
  },
{
    id: 17,
    title: "A paciente silenciosa",
    author: "Alex Michaelides",
    cover: "img/silenciosa.jpg",
    coverLarge: "img/silenciosa.jpg",
    synopsis: "Alicia Berenson tinha uma vida perfeita. Ela era uma pintora famosa casada com um fotógrafo bem-sucedido e morava numa área nobre de Londres que dá para o parque de Hampstead Heath. Certa noite, Gabriel, seu marido, voltou tarde para casa depois de um ensaio para a Vogue, e de repente a vida de Alicia mudou completamente...",
    audio: "audios/2001.mp3",
    year: "20 maio 2019",
    genre: { id: "terror", name: "Terror" },
    ISBN:  "8501116432",
    paginas: 364,
    rating: 4.7,
    reviews: 41.766
  },
{
    id: 18,
    title: "Meditações",
    author: "Marco Aurélio",
    cover: "img/meditacoes.jpg",
    coverLarge: "img/meditacoes.jpg",
    synopsis: "Um compilado de pensamentos e aforismos do imperador romano Marco Aurélio, que reflete sobre a filosofia estoica como um guia para uma vida virtuosa, resiliente e em paz consigo mesmo, mesmo diante das adversidades.",
    audio: "audios/2001.mp3",
    year: "31 de outobro de 2019",
    genre: { id: "historia", name: "História" },
    ISBN:  "8552100916",
    paginas: 160,
    rating: 4.8,
    reviews: 9.814
  },
{
    id: 19,
    title: "A Odisseia",
    author: "Homero",
    cover: "img/odisseia.jpg",
    coverLarge: "img/odisseia.jpg",
    synopsis: "A Odisseia narra a longa e árdua viagem de volta para casa de Odisseu (Ulisses), rei de Ítaca, após a queda de Troia. Repleta de monstros, deuses e tentações, a jornada de dez anos testa a astúcia e a resistência do herói.",
    audio: "audios/sinopse_odisseia.mp3",
    year: "20 maio 2019",
    genre: { id: "historia", name: "História" },
    ISBN:  "8501116432",
    paginas: 364,
    rating: 4.7,
    reviews: 41.766
  },
{
    id: 20,
    title: "Eneida",
    author: "Virgílio",
    cover: "img/eneida.jpg",
    coverLarge: "img/eneida.jpg",
    synopsis: "A Eneida é um poema épico latino que narra a saga de Eneias, um troiano que viaja para a Itália e se torna o ancestral dos romanos. É uma obra fundamental para a mitologia romana e a fundação de Roma.",
    audio: "audios/sinopse_eneida.mp3",
    year: "20 de Março de 2023",
    genre: { id: "historia", name: "História" },
    ISBN:  "6588732600",
    paginas: 380,
    rating: 4.8,
    reviews: 97
  },
{
    id: 21,
    title: "A República",
    author: "Platão",
    cover: "img/republica.jpg",
    coverLarge: "img/republica.jpg",
    synopsis: "Uma das obras mais influentes da filosofia, Platão explora a natureza da justiça e a ordem de uma cidade-estado ideal. Apresenta a famosa 'Alegoria da Caverna' e discute a teoria das formas e o papel do filósofo-rei.",
    audio: "audios/2001.mp3",
    year: "1 de Janeiro de 2017",
    genre: { id: "historia", name: "História" },
    ISBN:  "8581862535",
    paginas: 368,
    rating: 4.8,
    reviews: 2.485
  }
];

const GENERO = [
  { genero: { id: "astronomia", name: "Astronomia" } },
  { genero: { id: "aventura", name: "Aventura" } },
  { genero: { id: "drama", name: "Drama" } },
  { genero: { id: "historia", name: "Histórico" } },
  { genero: { id: "romance", name: "Romance" } },
  { genero: { id: "terror", name: "Terror" } }
];

const AUTORES = [
  {
    id: 1,
    name: "Carlos Drummond",
    img: "img/Carlos_Drummond.jpg",
    bio: "Ana Costa é um(a) autor(a) renomado(a) com diversas obras publicadas."
  },
  {
    id: 2,
    name: "Clarice",
    img: "img/clarice.png",
    bio: "João Silva é um(a) autor(a) renomado(a) com diversas obras publicadas."
  },
  {
    id: 3,
    name: "Emily Brontë",
    img: "img/Emily_Brontë.jpg",
    bio: "Maria Souza é um(a) autor(a) renomado(a) com diversas obras publicadas."
  },
  {
    id: 4,
    name: "La Fontaine",
    img: "img/La_Fontaine.jpg",
    bio: "Carlos Lima é um(a) autor(a) renomado(a) com diversas obras publicadas."
  },
  {
    id: 5,
    name: "Machado de Assis",
    img: "img/machado.jpg",
    bio: "Maria Souza é um(a) autor(a) renomado(a) com diversas obras publicadas."
  },
  {
    id: 6,
    name: "Michael Crichton",
    img: "img/MichaelCrichton.jpg",
    bio: "Michael Crichton nasceu em 1942 em Chicago, no estado de Illinois. Graduou-se na Harvard Medical School, defendendo seu doutorado em Políticas Públicas pelo Salk Institute for Biological Studies. Escreveu mais de quinze romances, além de livros de não ficção e diversos roteiros para TV e cinema. É o criador da série ER – Plantão Médico e, por ela, ganhou um Emmy de Melhor Série Dramática em 1996. Steven Spielberg, que adaptou sua obra-prima para o cinema, considerava-o a pessoa mais imaginativa que já conhecera. Faleceu em 2008."
  }
]

   // pega o parâmetro da URL (ex: genero.html?id=aventura)
    const url = new URL(window.location.href);
    const generoId = url.searchParams.get("id");

    const titulo = document.getElementById("titulo-genero");
    const lista = document.getElementById("lista-livros");

    if (generoId) {
      // acha o gênero
      const g = GENERO.find(x => x.genero.id === generoId);
      if (g) {
        titulo.textContent = `Livros do gênero: ${g.genero.name}`;
      }

      // filtra os livros daquele gênero
      const livrosGenero = BOOKS.filter(b =>
        b.genre.id.toLowerCase() === generoId.toLowerCase()
      );

      if (livrosGenero.length === 0) {
        lista.innerHTML = "<p>Nenhum livro encontrado neste gênero.</p>";
      } else {
        livrosGenero.forEach(b => {
          const card = document.createElement("div");
          card.className = "livro-card";
          card.innerHTML = `
            <a href="livro.html?id=${b.id}">
              <img src="${b.cover}" alt="${b.title}">
              <h3>${b.title}</h3>
              <p>${b.author}</p>
            </a>
          `;
          lista.appendChild(card);
        });
      }
    }



