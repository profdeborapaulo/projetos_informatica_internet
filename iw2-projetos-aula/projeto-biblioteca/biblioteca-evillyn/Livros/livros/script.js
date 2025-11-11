const nav = document.getElementById('nav');
const logoImg = document.getElementById('logo-img');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.classList.add('hidden');
    // Se quiser esconder o nav mesmo, mantém como antes.
    // Agora troca a imagem da logo
    logoImg.src = 'logo-scroll.png'; // imagem menor ou diferente para scroll
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('hidden');
    logoImg.src = 'logo-topo.png'; // imagem original no topo
    nav.classList.remove('scrolled');
  }
});
