document.querySelectorAll('.livro').forEach(livro => { //executa uma função para cada elemento com a classe .livro
  const section2 = livro.querySelector('.section2'); //dentro de cada .livro procura section2
  const section3 = livro.querySelector('.section3');//dentro de cada .livro procura section3

  section2.addEventListener('mouseenter', () => { //adiciona um evento na section2 após o cursor entrar nele
    section3.classList.add('ativo'); //torna a section 3 visível após cursor entrar em section2
    section2.classList.add('invisivel'); //torna section 2 invisível após cursos entrar nela
  });

  section2.addEventListener('mouseleave', () => { //adiciona evento após cursor sair de section2
    section3.classList.remove('ativo'); //esconde section3 após cursor sair de section2
    section2.classList.remove('invisivel'); //torna section2 visível após cursor sair dela
  });
});
