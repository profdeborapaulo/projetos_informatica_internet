// Cria dinamicamente slides para livros, autores e generos

document.addEventListener('DOMContentLoaded', () => {
  // --- Livros em destaque (pega os 6 primeiros) ---
  const livrosWrapper = document.querySelector('.destaques .swiper .swiper-wrapper');
  if (livrosWrapper) {
    livrosWrapper.innerHTML = '';
    const picks = BOOKS.slice(0, 6);
    picks.forEach(book => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <a href="livro.html?id=${book.id}">
        <div class="livros-card">
          <img src="${book.cover}" alt="${book.title}">
          </div>
          <h3>${book.title}</h3>
        </a>
      `;
      livrosWrapper.appendChild(slide);
    });
  }

  // --- Autores ---
const autoresWrapper = document.querySelector('.autores .swiper-wrapper');
if (autoresWrapper && Array.isArray(AUTORES)) {
  autoresWrapper.innerHTML = '';
  AUTORES.forEach((autor) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a href="autores.html?id=${autor.id}">
        <div class="autor-card">
          <img src="${autor.img}" alt="${autor.name}">
          <h3>${autor.name}</h3>
        </div>
      </a>
    `;
    autoresWrapper.appendChild(slide);
  });
}

// --- Carrossel de GÊNEROS ---
const generoWrapper = document.querySelector('.generos .swiper-wrapper');

if (generoWrapper) {
  generoWrapper.innerHTML = '';

  GENERO.forEach((g) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const imgSrc = `img/genero_${g.genero.id}.png`;

    slide.innerHTML = `
      <a href="genero.html?id=${g.genero.id}">
        <div class="genero-card">
          <img src="${imgSrc}" alt="${g.genero.name}">
          <h3>${g.genero.name}</h3>
        </div>
      </a>
    `;
    generoWrapper.appendChild(slide);
  });
}

  // Inicializa os Swipers (um para cada container)
  const booksSwiper = new Swiper('.destaques .swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '.destaques .swiper-button-next',
      prevEl: '.destaques .swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });


  new Swiper('.autores .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.autores .swiper-button-next',
      prevEl: '.autores .swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 }
    }
  });


  const GENEROSwiper = new Swiper('.generos .swiper', {
    slidesPerView: 4,
    spaceBetween: 5,
    navigation: {
      nextEl: '.generos .swiper-button-next',
      prevEl: '.generos .swiper-button-prev',
    },
    breakpoints: {320:{slidesPerView:1},640:{slidesPerView:2},1024:{slidesPerView:4}}
  });
});
