// ============================
// CONFIGURAÇÃO DAS API's MOCKAPI
// ============================
const API_USERS = "https://6908ed872d902d0651b22b01.mockapi.io/usuarios";
const API_EVENTOS = "https://6908ed872d902d0651b22b01.mockapi.io/eventos";

// LOGIN
async function fazerLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // 🔹 Busca todos usuários da MockAPI
  const resp = await fetch("https://6908ed872d902d0651b22b01.mockapi.io/usuarios");
  const usuarios = await resp.json();

  // 🔹 Procura se existe um usuário com esse email e senha
  const user = usuarios.find(u => u.email === email && u.senha === senha);

  if (user) {
    // 🔹 Salva tudo no localStorage
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioId", user.id);
    localStorage.setItem("usuarioNome", user.nome);
    localStorage.setItem("usuarioEmail", user.email);
    localStorage.setItem("usuarioSenha", user.senha);
    localStorage.setItem("usuarioFoto", user.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png");

    window.location.href = "index.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
}

// CRIAR CONTA (real, com MockAPI)
async function criarConta(e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // 🔹 Envia o novo usuário para a MockAPI
  const resp = await fetch("https://6908ed872d902d0651b22b01.mockapi.io/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome,
      email,
      senha,
      foto: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }),
  });

  const novoUser = await resp.json();

  // 🔹 Salva no localStorage
  localStorage.setItem("logado", "true");
  localStorage.setItem("usuarioId", novoUser.id);
  localStorage.setItem("usuarioNome", novoUser.nome);
  localStorage.setItem("usuarioEmail", novoUser.email);
  localStorage.setItem("usuarioSenha", novoUser.senha);
  localStorage.setItem("usuarioFoto", novoUser.foto);

  window.location.href = "index.html";
}

// ============================
// VERIFICAR LOGIN NA HOME
// ============================
function verificarLogin() {
  const logado = localStorage.getItem("logado");
  const nome = localStorage.getItem("usuarioNome");

  if (logado === "true") {
    document.getElementById("auth-buttons").classList.add("d-none");
    document.getElementById("menu-icon").classList.remove("d-none");

    const nomeUsuario = document.getElementById("nomeUsuario");
    if (nomeUsuario) nomeUsuario.textContent = `Olá, ${nome}!`;
  }
}

// ============================
// MENU LATERAL
// ============================
function abrirMenu() {
  const offcanvas = new bootstrap.Offcanvas(document.getElementById("menuLateral"));
  offcanvas.show();
}

// ============================
// FUNÇÕES GERAIS DO MENU
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const toggleEventos = document.getElementById("toggleEventos");
  const toggleSub = document.getElementById("toggleSub");
  const subEventos = document.getElementById("subEventos");
  const sair = document.getElementById("sair");

  function alternarEventos() {
    if (!subEventos) return;
    subEventos.classList.toggle("d-none");
    toggleSub.textContent = subEventos.classList.contains("d-none") ? "↓" : "↑";
  }

  if (toggleEventos) toggleEventos.addEventListener("click", alternarEventos);
  if (toggleSub) toggleSub.addEventListener("click", alternarEventos);

 if (sair) {
  sair.addEventListener("click", (e) => {
    e.preventDefault();
    // 🔹 Apenas desloga, sem apagar os dados do perfil
    localStorage.setItem("logado", "false");
    window.location.href = "index.html";
  });
}

  // Carregar eventos da API
  carregarEventos();
});

// ============================
// CARREGAR EVENTOS DA MOCKAPI
// ============================
async function carregarEventos() {
  try {
    const response = await fetch(API_EVENTOS);
    const eventos = await response.json();

    const container = document.querySelector(".eventos-proximos .row");
    const carouselInner = document.querySelector(".carousel-inner");

    if (container) {
      container.innerHTML = "";
      eventos.forEach(evento => {
        const card = `
          <div class="col-md-4">
            <a href="evento.html?id=${evento.id}" class="card-link text-decoration-none">
              <div class="card h-100 shadow-sm border-primary">
                <img src="${evento.imagem}" class="card-img-top" alt="${evento.nome}">
                <div class="card-body text-start">
                  <p class="card-text mb-1"><strong>${evento.nome}</strong></p>
                  <p class="text-muted small mb-1">${evento.data} • ${evento.horario}</p>
                  <p class="text-muted small">${evento.local}</p>
                </div>
              </div>
            </a>
          </div>
        `;
        container.innerHTML += card;
      });
    }

    if (carouselInner) {
      carouselInner.innerHTML = "";
      eventos.slice(0, 3).forEach((evento, index) => {
        const item = `
          <div class="carousel-item ${index === 0 ? "active" : ""} position-relative">
            <a href="evento.html?id=${evento.id}" class="stretched-link"></a>
            <img src="${evento.imagem}" class="d-block w-100 rounded-3 shadow-sm" alt="${evento.nome}">
          </div>
        `;
        carouselInner.innerHTML += item;
      });
    }
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
  }
}

// ============================
// CADASTRAR EVENTO NA MOCKAPI
// ============================
async function cadastrarEvento(e) {
  e.preventDefault();

  const evento = {
    categoria: document.getElementById("categoria").value,
    nome: document.getElementById("nome").value.trim(),
    local: document.getElementById("local").value.trim(),
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value,
    tipo: document.getElementById("tipo").value,
    imagem: document.getElementById("imagem").value.trim(),
    descricao: document.getElementById("descricao").value.trim()
  };

  try {
    const res = await fetch(API_EVENTOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento)
    });

    if (res.ok) {
      alert("Evento cadastrado com sucesso!");
      document.getElementById("formEvento").reset();
    } else {
      alert("Erro ao cadastrar evento. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao cadastrar evento:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

// ===============================
// PERFIL - Exibir dados e foto
// ===============================
function carregarPerfil() {
  const nome = localStorage.getItem("usuarioNome");
  const email = localStorage.getItem("usuarioEmail");
  const senha = localStorage.getItem("usuarioSenha");
  const foto = localStorage.getItem("usuarioFoto");

  if (document.getElementById("perfilNome")) {
    document.getElementById("perfilNome").textContent = nome || "Usuário";
    document.getElementById("perfilEmail").textContent = email || "Não informado";
  }

  if (foto && document.getElementById("fotoPerfil")) {
    document.getElementById("fotoPerfil").src = foto;
  }

  // Input para alterar a foto
  const inputFoto = document.getElementById("inputFoto");
  if (inputFoto) {
    inputFoto.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const novaFoto = e.target.result;
          document.getElementById("fotoPerfil").src = novaFoto;
          localStorage.setItem("usuarioFoto", novaFoto);

          // Atualiza também no menu lateral
          const fotoMenu = document.getElementById("fotoMenu");
          if (fotoMenu) fotoMenu.src = novaFoto;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Atualiza o nome e foto no menu lateral
document.addEventListener("DOMContentLoaded", () => {
  const nomeUsuario = document.getElementById("nomeUsuario");
  const fotoMenu = document.getElementById("fotoMenu");
  const nome = localStorage.getItem("usuarioNome");
  const foto = localStorage.getItem("usuarioFoto");

  if (nomeUsuario) nomeUsuario.textContent = `Olá, ${nome || "Usuário"}.`;
  if (foto && fotoMenu) fotoMenu.src = foto;
});

// =========================
// FOTO DE PERFIL GLOBAL
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const fotoUsuarioMenu = document.getElementById("fotoUsuarioMenu");
  const fotoSalva = localStorage.getItem("fotoUsuario");

  if (fotoUsuarioMenu && fotoSalva) {
    fotoUsuarioMenu.src = fotoSalva;
  }
});

// =========================
// PESQUISA FUNCIONAL
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  function fazerPesquisa() {
    const termo = searchInput.value.trim();
    if (termo) {
      window.location.href = `pesquisa.html?q=${encodeURIComponent(termo)}`;
    }
  }

  if (searchBtn) searchBtn.addEventListener("click", fazerPesquisa);
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        fazerPesquisa();
      }
    });
  }
});
