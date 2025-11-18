// URL da API MockAPI
const API_URL = "https://6908ed872d902d0651b22b01.mockapi.io/eventos";

// Função para carregar os eventos da API e inserir no HTML
async function carregarEventos() {
  try {
    const response = await fetch(API_URL);
    const eventos = await response.json();

    console.log("Eventos carregados:", eventos);

    if (!eventos || eventos.length === 0) {
      console.warn("Nenhum evento encontrado na API");
      return;
    }

    // ===============================
    // 1️⃣ FILTRAR E ORDENAR POR DATA (SEGURA)
    // ===============================
    const hoje = new Date();

    const eventosOrdenados = eventos
      .map(evento => {
        const dataObj = converterDataSegura(evento.data);
        return { ...evento, dataObj };
      })
      .filter(evento => evento.dataObj && evento.dataObj >= hoje) // só futuros
      .sort((a, b) => a.dataObj - b.dataObj) // ordem crescente
      .slice(0, 6); // limita a 6 eventos

    console.log("Eventos futuros:", eventosOrdenados);

    // ===============================
    // 2️⃣ PREENCHER OS CARDS NA HOME
    // ===============================
    const container = document.querySelector(".eventos-proximos .row");
    if (container) {
      container.innerHTML = ""; // limpa o que tem no HTML

      if (eventosOrdenados.length === 0) {
        container.innerHTML = `
          <div class="text-center text-muted">
            <p>Nenhum evento futuro encontrado 😕</p>
          </div>
        `;
        return;
      }

      eventosOrdenados.forEach(evento => {
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

    // ===============================
    // 3️⃣ PREENCHER O CARROSSEL DE DESTAQUE
    // ===============================
    const carouselInner = document.querySelector(".carousel-inner");
    if (carouselInner) {
      carouselInner.innerHTML = ""; // limpa o carrossel atual

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

// 🔧 Converte datas no formato dd/mm/yyyy de forma confiável
function converterDataSegura(dataStr) {
  if (!dataStr) return null;

  // Suporta formatos: "18/10/2025" ou "2025-10-18"
  if (dataStr.includes("/")) {
    const [dia, mes, ano] = dataStr.split("/");
    return new Date(`${ano}-${mes}-${dia}T00:00:00`);
  } else if (dataStr.includes("-")) {
    return new Date(dataStr);
  } else {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", carregarEventos);
