const API_URL = "https://6908ed872d902d0651b22b01.mockapi.io/eventos";

async function listarEventos() {
  try {
    const response = await fetch(API_URL);
    const eventos = await response.json();

    const container = document.getElementById("eventosContainer");
    const titulo = document.getElementById("tituloPagina");
    let eventosFiltrados = eventos;

    const pagina = window.location.pathname.split("/").pop();

    switch (pagina) {
      case "eventos-gratuitos.html":
        titulo.textContent = "Eventos Gratuitos";
        eventosFiltrados = eventos.filter(e => e.tipo?.toLowerCase() === "gratuito");
        break;
      case "eventos-pagos.html":
        titulo.textContent = "Eventos Pagos";
        eventosFiltrados = eventos.filter(e => e.tipo?.toLowerCase() === "pago");
        break;
      case "musica.html":
        titulo.textContent = "Eventos de Música";
        eventosFiltrados = eventos.filter(e => e.categoria?.toLowerCase() === "música");
        break;
      case "humor.html":
        titulo.textContent = "Eventos de Humor";
        eventosFiltrados = eventos.filter(e => e.categoria?.toLowerCase() === "humor");
        break;
      case "esportes.html":
        titulo.textContent = "Eventos Esportivos";
        eventosFiltrados = eventos.filter(e => e.categoria?.toLowerCase() === "esportes");
        break;
      case "teatro.html":
        titulo.textContent = "Teatros e Espetáculos";
        eventosFiltrados = eventos.filter(e => e.categoria?.toLowerCase().includes("teatro"));
        break;
      case "infantil.html":
        titulo.textContent = "Eventos Infantis";
        eventosFiltrados = eventos.filter(e => e.categoria?.toLowerCase() === "infantil");
        break;
      default:
        titulo.textContent = "Todos os Eventos";
        break;
    }

    container.innerHTML = "";

    if (eventosFiltrados.length === 0) {
      container.innerHTML = `<p class="text-muted">Nenhum evento encontrado.</p>`;
      return;
    }

    eventosFiltrados.forEach(evento => {
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

  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  verificarLogin();
  listarEventos();
});
