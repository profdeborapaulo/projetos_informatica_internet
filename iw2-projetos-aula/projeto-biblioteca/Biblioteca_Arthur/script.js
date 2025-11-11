const books = [
  {
    id: 1,
    titulo: 'Crime e Castigo',
    author: 'Fiodór Dostoiévski',
    ano: '2020',
    paginas: '240',
    isbn: '6555520809',
    capa: 'imagens/1.webp',
    sinopse: 'A pobreza assola Raskólnikov, que precisa pagar os estudos e o aluguel de onde mora. Orgulhoso, acredita que é inteligente o suficiente para planejar um crime perfeito, julgando que seu bom motivo e futuro promissor justificariam o ato. Os limites da moralidade comum também o atingem e ele é sentenciado. A culpa o acompanha na jornada em busca de redenção e boas perspectivas. Dostoiévski traz a psicologia criminal para este romance, abordando moralidade e a margem da dignidade nas ruas das cidades.'
  },
  {
    id: 2,
    titulo: 'Conversa entre Amigos',
    author: 'Sally Rooney',
    ano: '2022',
    paginas: '320',
    isbn: '6559212041',
    capa: 'imagens/22.jpg',
    sinopse: 'Frances, uma estudante de vinte e um anos que vive em Dublin, é escritora e apresenta em público suas peças de poesia com Bobbi, sua ex-namorada e melhor amiga. Ela é tímida, austera e distante; Bobbi é mais comunicativa e de fácil trato. Quando Melissa, uma notável fotógrafa e ensaísta, se aproxima de ambas para oferecer um perfil em uma renomada revista, elas aceitam com entusiasmo. Enquanto o encanto de Bobbi por Melissa aumenta, Frances se aproxima pouco a pouco de Nick, o marido-ator não muito bem-sucedido, e a relação de poder que se estabelece entre os quatro se torna cada vez mais complexa. Escrito com precisão e inteligência, Conversas entre amigos é um relato impressionante das paixões e perigos da juventude. Neste romance de estreia, Sally Rooney consegue conciliar vulnerabilidade e força em um mundo que não tem nada de trivial.'
  },
   {
    id: 3,
    titulo: 'Sapiens-Uma Breve História da Humanidade',
    author: ' Yuval Noah Harari ',
    ano: '2015',
    paginas: '464',
    isbn: '8525432180',
    capar: 'imagens/3.jpg',
    sinopse: 'O que possibilitou ao Homo sapiens subjugar as demais espécies? O que nos torna capazes das mais belas obras de arte, dos avanços científicos mais impensáveis e das mais horripilantes guerras? Nossa capacidade imaginativa. Somos a única espécie que acredita em coisas que não existem na natureza, como Estados, dinheiro e direitos humanos. Partindo dessa ideia, Yuval Noah Harari, doutor em história pela Universidade de Oxford, aborda em Sapiens a história da humanidade sob uma perspectiva inovadora. Explica que o capitalismo é a mais bem-sucedida religião, que o imperialismo é o sistema político mais lucrativo, que nós, humanos modernos, embora sejamos muito mais poderosos que nossos ancestrais, provavelmente não somos mais felizes. Um relato eletrizante sobre a aventura de nossa extraordinária espécie ? de primatas insignificantes a senhores do mundo.'
  },
   {
    id: 4,
    titulo: 'Pessoas Normais',
    author: 'Sally Rooney',
    ano: '2019',
    paginas: '264',
    isbn: '8535932569',
    capa: 'imagens/4.jpg',
    sinopse: 'Na escola, no interior da Irlanda, Connell e Marianne fingem não se conhecer. Ele é a estrela do time de futebol, ela é solitária e preza por sua privacidade. Mas a mãe de Connell trabalha como empregada na casa dos pais de Marianne, e quando o garoto vai buscar a mãe depois do expediente, uma conexão estranha e indelével cresce entre os dois adolescentes ― contudo, um deles está determinado a esconder a relação.Um ano depois, ambos estão na universidade, em Dublin. Marianne encontrou seu lugar em um novo mundo enquanto Connell fica à margem, tímido e inseguro. Ao longo dos anos da graduação, os dois permanecem próximos, como linhas que se encontram e separam conforme as oportunidades da vida. Porém, enquanto Marianne se embrenha em um espiral de autodestruição e Connell começa a duvidar do sentido de suas escolhas, eles precisam entender até que ponto estão dispostos a ir para salvar um ao outro. Uma história de amor entre duas pessoas que tentam ficar separadas, mas descobrem que isso pode ser mais difícil do que tinham imaginado.'
  },
   {
    id: 5,
    titulo: 'Neuromancer',
    author: 'William Gibson',
    ano: '2016',
    paginas: '320',
    isbn: '8576573008',
    capa: 'imagens/5.jpg',
    sinopse: 'O Céu sobre o porto tinha cor de televisão num canal fora do ar. Considerada a obra precursora do movimento cyberpunk e um clássico da ficção científica moderna, Neuromancer conta a história de Case, um cowboy do ciberespaço e hacker da matrix. Como punição por tentar enganar os patrões, seu sistema nervoso foi contaminado por uma toxina que o impede de entrar no mundo virtual. Agora, ele vaga pelos subúrbios de Tóquio, cometendo pequenos crimes para sobreviver, e acaba se envolvendo em uma jornada que mudará para sempre o mundo e a percepção da realidade. Evoluindo de Blade Runner e antecipando Matrix, Neuromancer é o romance de estreia de William Gibson. Esta obra distópica, publicada em 1984, antevê, de modo muito preciso, vários aspectos fundamentais da sociedade atual e de sua relação com a tecnologia. Foi o primeiro livro a ganhar a chamada “tríplice coroa da ficção científica”: os prestigiados prêmios Hugo, Nebula e Philip K. Dick.'
  },
   {
    id: 6,
    titulo: 'Fahrenheit 451',
    author: 'Cid Knipel',
    ano: '2012',
    paginas: '216',
    isbn: '8525052248',
    capa: 'imagens/6.jpg',
    sinopse: 'Guy Montag é um bombeiro. Sua profissão é atear fogo nos livros. Em um mundo onde as pessoas vivem em função das telas e a literatura está ameaçada de extinção, os livros são objetos proibidos, e seus portadores são considerados criminosos. Montag nunca questionou seu trabalho; vive uma vida comum, cumpre o expediente e retorna ao final do dia para sua esposa e para a rotina do lar. Até que conhece Clarisse, uma jovem de comportamento suspeito, cheia de imaginação e boas histórias. Quando sua esposa entra em colapso mental e Clarisse desaparece, a vida de Montag não poderá mais ser a mesma.'
  }
];

// Seletores principais
const bookList = document.getElementById('book-list');
const bookDetail = document.getElementById('book-detail');

// Sanitização para segurança
function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Renderiza os livros na página inicial
function renderBooks() {
  bookList.innerHTML = '';
  books.forEach(b => {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.setAttribute('aria-label',`Ver detalhes do livro ${b.title}`);
    card.innerHTML = `
      <img src="${b.capa}" alt="Capa de ${escapeHtml(b.title)}" loading="lazy">
      <h3>${escapeHtml(b.title)}</h3>
      <p>${escapeHtml(b.author)}</p>
    `;
    card.addEventListener('click', () => openDetail(b.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openDetail(b.id); });
    bookList.appendChild(card);
  });
}

// Abre o detalhe de um livro
function openDetail(id, updateHash = true) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById('home').classList.add('hidden');
  bookDetail.classList.remove('hidden');

  bookDetail.innerHTML = `
    <div class="detail-wrap">
      <div class="cover-large">
        <img src="${book.capa}" alt="Capa de ${escapeHtml(book.titulo)}">
      </div>
      <div class="detail-body">
        <button class="back" id="back">← Voltar</button>
        <h2>${escapeHtml(book.titulo)}</h2>
        <div class="sub">
          <strong>Autor:</strong> ${escapeHtml(book.autor)}<br>
          <strong>Ano:</strong> ${escapeHtml(book.ano)}<br>
          <strong>Páginas:</strong> ${escapeHtml(book.paginas)}<br>
          <strong>ISBN:</strong> ${escapeHtml(book.isbn)}
        </div>
        <div class="card-box">
          <p class="synopsis">${escapeHtml(book.sinopse)}</p>
          <div class="player">
            <button id="play-tts">▶ Ouvir sinopse</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('back').addEventListener('click', () => navigate('#home'));
  document.getElementById('play-tts').addEventListener('click', () => playTTS(book.id));

  if (updateHash) navigate(`#book-${book.id}`);
}

// Navegação via hash para SPA
function navigate(hash) {
  try {
    history.pushState(null, '', hash);
  } catch (e) {
    location.hash = hash.replace('#','');
  }
  handleRoute();
}

// Lida com rotas e alterna entre home e detalhes
function handleRoute() {
  const h = location.hash || '#home';
  if (h.startsWith('#book-')) {
    const id = Number(h.replace('#book-',''));
    if (id) openDetail(id, false);
  } else {
    document.getElementById('home').classList.remove('hidden');
    bookDetail.classList.add('hidden');
  }
}

// Função para reproduzir o TTS
function playTTS(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(book.sinopse);
    utter.lang = 'pt-BR';
    const voices = speechSynthesis.getVoices();
    if (voices.length) utter.voice = voices.find(v => v.lang.includes('pt')) || voices[0];
    utter.rate = 1.0;
    speechSynthesis.speak(utter);
  } else {
    alert('TTS não suportado neste navegador.');
  }
}

// Eventos de navegação
window.addEventListener('hashchange', handleRoute);
window.addEventListener('popstate', handleRoute);

// Inicializa a página
renderBooks();
handleRoute();
