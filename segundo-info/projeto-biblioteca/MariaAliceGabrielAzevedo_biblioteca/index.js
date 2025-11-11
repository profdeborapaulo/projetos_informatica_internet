document.querySelectorAll('.livro').forEach(livro => {
  const section2 = livro.querySelector('.section2');
  const section3 = livro.querySelector('.section3');

  section2.addEventListener('mouseenter', () => {
    section3.classList.add('ativo');
    section2.classList.add('invisivel');
  });

  section2.addEventListener('mouseleave', () => {
    section3.classList.remove('ativo');
    section2.classList.remove('invisivel');
  });
});
