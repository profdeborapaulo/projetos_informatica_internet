// Seletores principais
const grid = document.getElementById('grid');
const detailContainer = document.getElementById('detalhe-perfil');

//Listagem Principal
function renderizar(filtro = 'todos') {
  if (!grid) return;

  grid.innerHTML = '<p id="loading">Carregando profissionais...</p>';

  const filtrados = filtro === 'todos'
    ? profissionais
    : profissionais.filter(p => p.job === filtro);

  grid.innerHTML = ''; 

  if (filtrados.length === 0) {
    grid.innerHTML = '<p>Nenhum profissional encontrado.</p>';
    return;
  }

  filtrados.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.tabIndex = 0; 

    const img = document.createElement('img');
    img.src = p.image;
    img.alt = `Foto de ${p.name}`;

    const nome = document.createElement('div');
    nome.className = 'nome';
    nome.textContent = p.name;

    const servico = document.createElement('div');
    servico.className = 'servico';
    servico.textContent = p.job;

    const descricao = document.createElement('div');
    descricao.className = 'descricao';
    descricao.textContent = p.description.slice(0, 80) + '...';

    card.append(img, nome, servico, descricao);
    card.addEventListener('click', () => {
      window.location.href = `detalhe.html?id=${p.id}`;
    });

    grid.appendChild(card);
  });
}

// Inicializa listagem
if (grid) {
  renderizar();
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderizar(btn.dataset.filtro);
    });
  });
}

//Detalhes
if (detailContainer) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const prof = profissionais.find(p => p.id == id);

  detailContainer.innerHTML = '';

  if (prof) {
    const banner = document.createElement('div');
    banner.className = 'banner';

    const img = document.createElement('img');
    img.src = prof.image;
    img.className = 'photo';
    img.alt = `Foto de ${prof.name}`;

    const nome = document.createElement('h2');
    nome.textContent = prof.name;

    const job = document.createElement('h4');
    job.textContent = prof.job;

    const preco = document.createElement('p');
    preco.innerHTML = `<strong>${prof.price}</strong>`;

    banner.append(img, nome, job, preco);

    const desc = document.createElement('div');
    desc.className = 'description';
    desc.textContent = prof.description;

    const titulo = document.createElement('h3');
    titulo.className = 'titulo-secao';
    titulo.textContent = 'Trabalhos Realizados';

    const trabalhos = document.createElement('div');
    trabalhos.className = 'trabalhos';

    if (prof.trabalhos.length > 0) {
      prof.trabalhos.forEach(w => {
        const card = document.createElement('div');
        card.className = 'trabalhos-card';
        card.innerHTML = `
          <p><strong>${w.client}</strong> contratou</p>
          <h4>${w.title}</h4>
          <p>${w.details}</p>
        `;
        trabalhos.appendChild(card);
      });
    } else {
      trabalhos.innerHTML = '<p>Nenhum trabalho cadastrado ainda.</p>';
    }

    const botoes = document.createElement('div');
    botoes.style.textAlign = 'center';
    botoes.innerHTML = `
      <button class="cta" onclick="history.back()">Voltar</button>
      <button class="cta" onclick="alert('Serviço solicitado, o profissional entrará em contato!')">Contratar Serviço</button>
    `;

    detailContainer.append(banner, desc, titulo, trabalhos, botoes);
  } else {
    detailContainer.innerHTML = '<p>Profissional não encontrado.</p>';
  }
}
