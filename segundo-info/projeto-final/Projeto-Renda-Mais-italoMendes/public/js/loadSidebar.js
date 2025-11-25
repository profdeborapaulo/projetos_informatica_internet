// carrega o HTML do componente e injeta no #sidebar-root, depois anexa sidebar.js
(async function loadSidebar() {
  try {
    const res = await fetch('components/sidebar.html');
    if (!res.ok) throw new Error('Falha ao carregar sidebar.html');
    const html = await res.text();
    document.getElementById('sidebar-root').innerHTML = html;

    const s = document.createElement('script');
    s.src = 'js/sidebar.js';
    document.body.appendChild(s);
  } catch (err) {
    console.error('Erro ao carregar sidebar:', err);
  }
})();