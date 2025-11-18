const API_URL = "https://6908ed872d902d0651b22b01.mockapi.io/eventos";

async function carregarDetalhesEvento() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const container = document.getElementById("detalhesEvento");

  if (!id) {
    container.innerHTML = `<p class="text-danger text-center">Evento não encontrado.</p>`;
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const evento = await response.json();

    container.innerHTML = `
      <div class="row align-items-center g-4">
        <!-- Imagem à esquerda -->
        <div class="col-lg-6 text-center">
          <img src="${evento.imagem}" class="img-fluid rounded shadow-sm" alt="${evento.nome}" style="max-height: 400px; object-fit: cover;">
        </div>

        <!-- Informações à direita -->
        <div class="col-lg-6 text-start">
          <h2 class="fw-bold text-primary mb-3">${evento.nome}</h2>
          <p class="text-muted mb-2"><strong>Data:</strong> ${evento.data} às ${evento.horario}</p>
          <p class="text-muted mb-2"><strong>Local:</strong> ${evento.local}</p>
          <p class="mb-3">${evento.descricao}</p>
          <p><span class="badge bg-${evento.tipo === "pago" ? "danger" : "success"} text-uppercase px-3 py-2">${evento.tipo}</span></p>
          <a href="#" class="btn btn-primary mt-3">${evento.tipo === "pago" ? "Comprar Ingresso" : "Saiba Mais"}</a>
        </div>
      </div>
    `;
  } catch (erro) {
    container.innerHTML = `<p class="text-danger text-center">Erro ao carregar informações do evento.</p>`;
    console.error("Erro ao carregar detalhes:", erro);
  }
}
