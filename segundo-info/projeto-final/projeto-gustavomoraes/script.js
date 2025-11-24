// api
const API_URL = "https://68ecdd76eff9ad3b14039a17.mockapi.io/tutoriais";

// youtube
function converterLinkYoutube(url) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  } else if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  } else {
    return url;
  }
}

// acentos
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// busca
async function buscar(categoriaURL = null) {
  const termoInput = document.getElementById("campoBusca");
  const termo = termoInput ? normalizarTexto(termoInput.value) : "";
  const container = document.getElementById("resultado");

  container.innerHTML = `<p class="text-center text-secondary">🔍 Buscando tutoriais...</p>`;

  try {
    const resposta = await fetch(API_URL);
    const tutoriais = await resposta.json();

    let filtrados = tutoriais.filter(t => {
      const titulo = normalizarTexto(t.titulo || "");
      const categoria = normalizarTexto(t.categoria || "");
      const marca = normalizarTexto(t.marca || "");
      return titulo.includes(termo) || categoria.includes(termo) || marca.includes(termo);
    });

    if (categoriaURL) {
      const categoriaNormalizada = normalizarTexto(categoriaURL);
      filtrados = filtrados.filter(t => normalizarTexto(t.categoria) === categoriaNormalizada);
      container.innerHTML = `<h3 class="text-center mb-4 text-primary">Tutoriais de ${categoriaURL.charAt(0).toUpperCase() + categoriaURL.slice(1)}</h3>`;
    }

    if (filtrados.length === 0) {
      container.innerHTML += `<p class="text-center text-danger">Nenhum tutorial encontrado 😕</p>`;
      return;
    }

    filtrados.forEach(t => {
      const div = document.createElement("div");
      div.classList.add("border", "rounded", "p-3", "mb-4", "shadow-sm", "bg-light");

      const passosHTML = t.passos?.length
        ? `<ol>${t.passos.map(p => `<li>${p}</li>`).join("")}</ol>`
        : "<p class='text-muted'>Sem passos cadastrados.</p>";

      const videoHTML = t.video
        ? `
          <div class="mt-3">
            <h6 class="fw-bold text-primary">🎥 Prévia do vídeo:</h6>
            <div class="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
              <iframe
                src="${converterLinkYoutube(t.video)}"
                title="Vídeo do tutorial"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
          </div>`
        : "";

      div.innerHTML = `
        <h4 class="text-primary">${t.titulo}</h4>
        <p><strong>Categoria:</strong> ${t.categoria || "Não informada"}</p>
        ${t.marca ? `<p><strong>Marca:</strong> ${t.marca}</p>` : ""}
        ${t.autor ? `<p><strong>Autor:</strong> ${t.autor}</p>` : ""}
        <p class="mt-3"><strong>Passos:</strong></p>
        ${passosHTML}
        ${videoHTML}
      `;

      container.appendChild(div);
    });

  } catch (erro) {
    console.error("Erro ao buscar:", erro);
    container.innerHTML = `<p class="text-center text-danger">Erro ao carregar tutoriais 😢</p>`;
  }
}

// envio
document.getElementById("formTutorial")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const novoTutorial = {
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    titulo: document.getElementById("titulo").value.trim(),
    passos: document.getElementById("passos").value.split("\n").filter(p => p.trim() !== ""),
    video: document.getElementById("video").value.trim(),
    categoria: "geral"
  };

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoTutorial)
    });

    if (resposta.ok) {
      alert("✅ Tutorial enviado com sucesso! Aguarde aprovação.");
      document.getElementById("formTutorial").reset();
    } else {
      alert("❌ Ocorreu um erro ao enviar o tutorial.");
    }
  } catch (erro) {
    console.error("Erro ao enviar:", erro);
    alert("❌ Erro ao conectar com o servidor.");
  }
});

// comentarios
const formComentario = document.getElementById("formComentario");
const listaComentarios = document.getElementById("listaComentarios");

formComentario?.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeComentario").value.trim();
  const texto = document.getElementById("textoComentario").value.trim();

  if (nome && texto) {
    const comentarioDiv = document.createElement("div");
    comentarioDiv.classList.add("card", "mb-3", "shadow-sm");

    comentarioDiv.innerHTML = `
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-primary">${nome}</h6>
        <p class="card-text">${texto}</p>
      </div>
    `;

    listaComentarios?.prepend(comentarioDiv);
    formComentario.reset();
  }
});

// categoria
const urlParams = new URLSearchParams(window.location.search);
const categoriaSelecionada = urlParams.get("tipo");
const container = document.getElementById("resultado");

window.addEventListener("DOMContentLoaded", () => {
  if (categoriaSelecionada) {
    buscar(categoriaSelecionada);
  } else {
    container.innerHTML = `<p class="text-center text-secondary">Busque tutoriais usando o campo acima.</p>`;
  }
});

// botão
document.getElementById("campoBusca")?.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    buscar();
  }
});

document.querySelector("#campoBusca + button")?.addEventListener("click", () => buscar());
