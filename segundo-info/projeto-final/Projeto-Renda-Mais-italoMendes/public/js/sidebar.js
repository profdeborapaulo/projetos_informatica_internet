// sidebar.js - controla toggle, ativo e logout
document.addEventListener('DOMContentLoaded', function () {
  const body = document.documentElement;
  const toggle = document.getElementById('sidebarToggle');
  const logoutBtn = document.getElementById('sidebar-logout');
  const nav = document.getElementById('sidebar-nav');
  const usernameEl = document.getElementById('sidebar-username');
  const emailEl = document.getElementById('sidebar-email');
  const STORAGE_KEY = 'renda_sidebar_collapsed';

  // Inicializa estado salvo
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    body.classList.add('sidebar-collapsed');
  }

  // Toggle sidebar
  if (toggle) {
    toggle.addEventListener('click', function () {
      // em mobile, abrimos/fechamos deslizando a sidebar
      if (window.innerWidth < 768) {
        const sidebar = document.getElementById('app-sidebar');
        sidebar.classList.toggle('show');
        return;
      }
      const collapsed = body.classList.toggle('sidebar-collapsed');
      localStorage.setItem(STORAGE_KEY, collapsed);
    });
  }

  // Marca link ativo com base em URL/hash
  function setActiveFromLocation() {
    const links = nav.querySelectorAll('.nav-link');
    const path = location.pathname.split('/').pop() || 'index.html';
    const hash = location.hash || '';
    links.forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href') || '';
      if (href === path || (href.startsWith('#') && href === hash)) {
        a.classList.add('active');
      }
    });
  }
  setActiveFromLocation();
  window.addEventListener('popstate', setActiveFromLocation);
  window.addEventListener('hashchange', setActiveFromLocation);

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      // limpar dados de sessão se necessário
      localStorage.removeItem('user'); // exemplo
      alert('Você saiu da conta.');
      window.location.href = 'index.html';
    });
  }

  // Popular dados de usuário (substituir por dados reais)
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  if (storedUser) {
    usernameEl.textContent = storedUser.name || 'Usuário';
    emailEl.textContent = storedUser.email || '';
  } else {
    // fallback
    usernameEl.textContent = document.getElementById('usuario-name')?.textContent || 'Usuário';
  }
});