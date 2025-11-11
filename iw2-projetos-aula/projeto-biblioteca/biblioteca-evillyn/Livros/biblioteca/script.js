// Array com os livros adicionais (a partir do 9º em diante)
const books = [
    { title: 'livro 01', author: 'Ali Hazelwood', img: "livros/imgs/avulsos/10.jpg" },
    { title: 'livro 02', author: 'Holly Black', img: "livros/avulsos/11.jpg" },
    { title: 'livro 03', author: 'Colleen Hoover', img: "livros/avulsos/12.jpg" },
    { title: 'livro 04', author: 'Stephanie Garber', img: "livros/avulsos/13.jpg" },
    { title: 'livro 05', author: 'Leigh Bardugo', img: "livros/avulsos/14.jpg" },
    { title: 'livro 06-', author: 'Elena Armas', img: "livros/avulsos/15.jpg" }
];

const acervoGrid = document.querySelector('.books-grid');
const loadMoreBtn = document.querySelector('.load-more-btn');

let booksLoaded = 0;
const booksPerPage = 4; // quantos livros carregar por clique

// Função para criar o HTML de um card de livro
const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
        <img src="${book.img}" alt="Capa do livro ${book.title}">
        <div class="overlay">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <a href="#" class="btn">Ver Mais</a>
        </div>
    `;
    return bookCard;
};

// Função para carregar mais livros na grade
const loadMoreBooks = () => {
    for (let i = 0; i < booksPerPage; i++) {
        if (booksLoaded < books.length) {
            const book = books[booksLoaded];
            acervoGrid.appendChild(createBookCard(book));
            booksLoaded++;
        } else {
            // Se não houver mais livros, esconde o botão
            loadMoreBtn.style.display = 'none';
            break;
        }
    }
};

// Evento do botão "Ver Mais"
loadMoreBtn.addEventListener('click', loadMoreBooks);
