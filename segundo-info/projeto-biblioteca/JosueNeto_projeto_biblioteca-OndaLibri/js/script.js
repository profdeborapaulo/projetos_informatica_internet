// js/livro.js
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
  const id = Number(getQueryParam('id')) || 1;
  const book = BOOKS.find(b => b.id === id);
  
  if (!book) {
    document.body.innerHTML = '<p>Livro não encontrado.</p>';
    return;
  }

  // Capa do livro
  const capa = document.getElementById('capa-livro');
  capa.src = book.coverLarge || book.cover;
  capa.alt = book.title;

  // Título
  document.getElementById('titulo-livro').textContent = book.title;

  // Autor com link
  const linkAutor = document.getElementById('link-autor');
  linkAutor.textContent = book.author;
  linkAutor.href = `autor.html?name=${encodeURIComponent(book.author)}`;

  // Sinopse
  document.getElementById('sinopse-text').textContent = book.synopsis;

  // Áudio da sinopse
  const src = document.getElementById('sinopse-src');
  src.src = book.audio || '';
  const audio = document.getElementById('sinopse-audio');
  audio.load();

  // Detalhes do livro
  const detalhes = document.getElementById('detalhes-list');
  detalhes.innerHTML = `
    <li><b>Ano de publicação:</b> ${book.year}</li>
    <li><b>Gênero:</b> <a href="genero.html?id=${book.genre.id}">${book.genre.name}</a></li>
    <li><b>ISBN:</b> ${book.ISBN}</li>
    <li><b>Páginas:</b> ${book.paginas}</li>
  `;

  // Avaliações
  const aval = document.getElementById('avaliacoes');
  aval.textContent = `${'★'.repeat(Math.round(book.rating))} (${book.rating.toFixed(1)}) - ${book.reviews} avaliações`;
});
