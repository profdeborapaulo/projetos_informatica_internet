// ==================== DADOS DOS LIVROS ====================
const books = [
  { id: 1, title: "Game On! Pac-Man", author: "Jessica Rusick", price: 178.43, salePrice: 61.62, cover: "https://m.media-amazon.com/images/I/71vkLMXe7kL._SY385_.jpg", synopsis: "O jogo começou, fãs de PAC-MAN! Este título explora a criação e a evolução de PAC-MAN desde o seu lançamento nas máquinas arcade até o seu lugar duradouro na cultura pop, oferecendo uma visão aprofundada da história por trás do icônico personagem. Com entrevistas exclusivas, arte conceitual e segredos de desenvolvimento, este livro é uma leitura obrigatória para qualquer fã de videogames que queira entender como o PAC-MAN se tornou um fenômeno mundial. Descubra os desafios enfrentados pela equipe de desenvolvimento e o impacto que o jogo teve na indústria e na sociedade." },
  { id: 2, title: "Pac-Man: Birth of an Icon", author: "Tim Lapetino e Arjan Terpstra", price: 60.9, salePrice: 40.39, cover: "https://m.media-amazon.com/images/I/81ZZODNlRqL._SY522_.jpg", synopsis: "Repleto de imagens históricas, designs conceituais, fotos de marketing e muito mais, este livro examina a filosofia de design e as origens do jogo através dos artistas, designers, desenvolvedores e outras equipes criativas que deram vida a Pac-Man. Este novo livro de não ficção fará uma jornada da inspiração do criador Toru Iwatani, da fatia de pizza, ao incrível sucesso do jogo dos fliperamas e além. O livro também explora o impacto sem precedentes de Pac-Man na cultura pop, com mais de 40 novas entrevistas com jogadores importantes ao redor do mundo." },
  { id: 3, title: "Mastering Pac-Man", author: "Ken Uston", price: 214.35, salePrice: 199.15, cover: "https://m.media-amazon.com/images/I/61xla24VswL._SY522_.jpg", synopsis: "Desde sua criação em 1980, o PAC-MAN™ conquistou o mundo, e com este guia, você dominará o jogo. Este livro é um manual definitivo para jogadores que querem alcançar a pontuação máxima e entender as estratégias mais avançadas. Ken Uston, um mestre dos videogames, compartilha suas técnicas para manipular os fantasmas, planejar as rotas e maximizar a pontuação. Aprenda os padrões de movimento dos fantasmas e descubra como usar as frutas e os pontos de poder a seu favor. Ideal para jogadores de todos os níveis que buscam aprimorar suas habilidades e se tornar verdadeiros mestres do PAC-MAN." },
  { id: 4, title: "Pac-Man: The Official Cookbook", author: "Lisa Kingsley e Jennifer Peterson", price: 158.6, salePrice: 100.9, cover: "https://m.media-amazon.com/images/I/718tGvsp04L._SY466_.jpg", synopsis: "Com fome de cerejas, PAC-DOTS e FANTASMAS? Com ​​este livro de receitas oficial, você pode levar a nostalgia do arcade para a sua cozinha. Repleto de receitas inspiradas no universo de PAC-MAN, este livro inclui pratos e lanches divertidos que qualquer fã vai adorar. De cookies em formato de fantasmas a drinques temáticos, cada receita é fácil de seguir e perfeita para festas, noites de jogo ou simplesmente para um lanche temático. Celebre seu amor pelo jogo clássico com sabores que capturam a essência de cada personagem e item do labirinto." },
  { id: 5, title: "Beadcraft Arcade", author: "Beadcraft Books", price: 68.9, salePrice: 59.0, cover: "https://m.media-amazon.com/images/I/61vMgrYLT9L._SY522_.jpg", synopsis: "Com fome de nostalgia? Apresente às crianças da sua vida a arte do pixel e recrie as memórias dos jogos de fliperama favoritos de todos os tempos. Este livro é um guia passo a passo para criar designs de miçangas de fusão (perler beads) inspirados nos jogos clássicos, incluindo PAC-MAN, Space Invaders e muitos outros. As instruções são fáceis de seguir e o livro é perfeito para iniciantes e entusiastas de artesanato de todas as idades. É uma excelente maneira de passar tempo em família e criar decorações e presentes temáticos de videogames." },
  { id: 6, title: "Livro Game ARTS - Volume 6: Mascotes em Ação", author: "Editora Europa", price: 41.9, salePrice: 26.9, cover: "https://http2.mlstatic.com/D_NQ_NP_2X_853869-MLU77442197917_072024-F.webp", synopsis: "O livro é parte da coleção GameARTS da Editora Europa e mergulha no mundo dos mascotes dos videogames que fizeram história. Com uma análise detalhada dos personagens mais icônicos, incluindo PAC-MAN, Sonic, Mario e outros, o volume explora o processo criativo, o design e a evolução desses heróis digitais. É uma obra essencial para quem se interessa pela arte por trás dos jogos, oferecendo curiosidades, ilustrações e insights sobre como esses personagens se tornaram símbolos da cultura pop. Perfeito para colecionadores e entusiastas que querem conhecer mais sobre a história dos mascotes em ação." }
]

// ==================== INICIALIZAÇÃO ====================
document.addEventListener("DOMContentLoaded", () => {
  renderBooks()
  setupModal()
})

// ==================== RENDERIZAÇÃO DOS LIVROS ====================
function renderBooks() {
  const booksGrid = document.getElementById("booksGrid")
  books.forEach(book => {
    const discount = Math.round(((book.price - book.salePrice) / book.price) * 100)
    const bookCard = document.createElement("div")
    bookCard.className = "book-card"
    bookCard.onclick = () => openBookModal(book)
    bookCard.innerHTML = `
      <div class="book-card-content">
        <div class="book-cover-container">
          <img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.src='/placeholder.svg?height=400&width=300&text=${encodeURIComponent(book.title)}'">
        </div>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">por ${book.author}</p>
        <div class="book-price-container">
          <span class="sale-price">R$ ${book.salePrice.toFixed(2)}</span>
          <span class="original-price">R$ ${book.price.toFixed(2)}</span>
          <span class="discount-badge">${discount}% OFF</span>
        </div>
      </div>
    `
    booksGrid.appendChild(bookCard)
  })
}

// ==================== MODAL ====================
function setupModal() {
  const modal = document.getElementById("bookModal")
  const closeBtn = document.querySelector(".close")
  closeBtn.onclick = () => modal.style.display = "none"
  window.onclick = (event) => { if(event.target === modal) modal.style.display = "none" }
}

// ==================== ABRIR MODAL ====================
function openBookModal(book) {
  const modal = document.getElementById("bookModal")
  const discount = Math.round(((book.price - book.salePrice) / book.price) * 100)

  document.getElementById("modalBookCover").src = book.cover
  document.getElementById("modalBookCover").alt = book.title
  document.getElementById("modalBookTitle").textContent = book.title
  document.getElementById("modalBookAuthor").textContent = `por ${book.author}`
  document.getElementById("modalBookSalePrice").textContent = `R$ ${book.salePrice.toFixed(2)}`
  document.getElementById("modalBookPrice").textContent = `R$ ${book.price.toFixed(2)}`
  document.getElementById("modalBookDiscount").textContent = `${discount}% OFF`
  document.getElementById("modalBookSynopsis").textContent = book.synopsis

  // ==================== ÁUDIO ====================
  const audioElement = document.getElementById("audio")
  if(book.id === 1) {
    audioElement.src = "img/audiogameon.ogg" 
  } else if (book.id === 2) {
    audioElement.src = "img/audiobirth.ogg" 
  } else if (book.id === 3) {
    audioElement.src = "img/audiomastering.ogg"
  } else if (book.id === 4) {
    audioElement.src = "img/audiocook.ogg"
  } else if (book.id === 5) {
    audioElement.src = "img/audioarcade.ogg"
  } else if (book.id === 6) {
    audioElement.src = "img/audiomascote.ogg"
  } else {
    audioElement.src = "" 
  }
  audioElement.load()

  modal.style.display = "block"
}

// ==================== TRATAMENTO DE ERROS DE IMAGEM ====================
document.addEventListener("error", (e) => {
  if(e.target.tagName === "IMG") e.target.src = `/placeholder.svg?height=120&width=120&text=Imagem`
}, true)

console.log("PACBOOKS - Sistema inicializado com sucesso!")