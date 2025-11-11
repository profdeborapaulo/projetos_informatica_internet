// Marca o link ativo no menu de navegação

(function markActiveNav() {
  const navLinks = document.querySelectorAll('nav a[href]');
  if (!navLinks.length) return;

  const currentUrl = new URL(window.location.href);
  let currentPath = currentUrl.pathname;

  // Se estiver em "/" (ou sem arquivo explícito), trata como "index.html"
  if (currentPath.endsWith('/') || currentPath === '') {
    currentPath = currentPath + 'index.html';
  }

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    // Normaliza o href do link para pathname absoluto
    const linkUrl = new URL(href, window.location.origin);
    let linkPath = linkUrl.pathname;
    if (linkPath.endsWith('/') || linkPath === '') {
      linkPath = linkPath + 'index.html';
    }

    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// Alerta do formulário de contato 
const contatoForm = document.getElementById('contato-form');

if (contatoForm) {
  contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Agradecemos seu contato, sua mensagem foi enviada."); 
    contatoForm.reset();
  });
}

// Biblioteca da aba catalogo
let biblioteca = {
  livros: [
    { id: 1, titulo: "Wall Street: O Livro Proibido", autor: "Raiam Santos", ano: 2016, genero: "tecnologia", imagem: "img/raiam3.jpg" },
    { id: 2, titulo: "Imigrante Ilegal: O Lado Negro do Sonho Americano", autor: "Raiam Santos", ano: 2016, genero: "tecnologia", imagem: "img/raiam2.jpg" },
    { id: 4, titulo: "PRIMEIRO MILHÃO", autor: "Raiam Santos", ano: 2023, genero: "classicos", imagem: "img/raiam1.jpg" },
    { id: 7, titulo: "SEM FILTRO: As Melhores Crônicas Do Menino Que Transformou Textões Em Muitos Milhões", autor: "Raiam Santos", ano: 2020, genero: "fantasia", imagem: "img/raiam4.jpg" },
    { id: 5, titulo: "NEGRO NA RÚSSIA: Sexo, Racismo e Futebol... No País Mais Odiado Do Mundo", autor: "Raiam Santos", ano: 2019, genero: "ficcao", imagem: "img/raiam5.jpg" },
    { id: 6, titulo: "Por Dentro da Mente de Raiam Santos (Intelecto)", autor: "Raiam Santos", ano: 2024, genero: "romance", imagem: "img/raiam6.jpg" },
    { id: 8, titulo: "Missão Paulo Coelho: Em Genebra, Em Busca Do Mago", autor: "Raiam Santos", ano: 2016, genero: "aventura", imagem: "img/raiam7.jpg" },
    { id: 9, titulo: "Arábia: A Incrível História De Um Brasileiro no Oriente Médio", autor: "Rafael Coelho e Raiam Santos", ano: 2017, genero: "terror", imagem: "img/raiam8.jpg" },
    { id: 10, titulo: "Classe Econômica #1: Europa Comunista", autor: "Raiam Santos", ano: 2016, genero: "poesia", imagem: "img/raiam9.jpg" },
    { id: 3, titulo: "Hackeando Tudo: 90 Hábitos Para Mudar o Rumo de Uma Geração", autor: "Raiam Santos", ano: 2015, genero: "historia", imagem: "img/raiam10.jpg" },
  ]
};

function renderizarLivros(genero) {
  const div = document.getElementById("saida");
  div.innerHTML = "";

  let filtrados = genero === "todos"
    ? biblioteca.livros
    : biblioteca.livros.filter(l => l.genero === genero);

  filtrados.forEach(livro => {
    div.innerHTML += `
      <a href="book.html?id=${livro.id}">
      <div class="livro-card" data-id="${livro.id}">
        <img src="${livro.imagem}" alt="${livro.titulo}">
        <h4>${livro.titulo}</h4>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
      </div>
      </a>
    `;
  });
}

// Controle dos botões de gênero
const generoBtns = document.querySelectorAll(".genero-btn");
const catalogoInicio = document.getElementById("catalogo-inicio");
const titulo = catalogoInicio.querySelector("h2");

let generoAtivo = null;

generoBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const genero = btn.dataset.genero;

    // Pra quando clicar no botao ativo, desselecionar
    if (generoAtivo === genero) {
      generoAtivo = null;
      btn.classList.remove("active");
      titulo.classList.remove("hidden");
      catalogoInicio.classList.remove("compact");
      catalogoInicio.classList.add("center");
      document.getElementById("saida").innerHTML = "";
      document.getElementById("saida-wrapper").classList.add("hidden");
      return;
    }

    // Marca como ativo
    generoAtivo = genero;
    generoBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Renderiza livros
    renderizarLivros(genero);
    document.getElementById("saida-wrapper").classList.remove("hidden");

    // Some com o título suavemente e sobe o carrossel
    titulo.classList.add("hidden");
    catalogoInicio.classList.remove("center");
    catalogoInicio.classList.add("compact");
  });
});
