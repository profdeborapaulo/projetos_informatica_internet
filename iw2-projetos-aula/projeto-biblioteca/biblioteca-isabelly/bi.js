const audio = document.getElementById("meuAudio");
const playBtn = document.querySelector(".play-btn");
const progress = document.getElementById("progress");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

document.addEventListener("DOMContentLoaded", () => {
  const livros = {
    "1984": {
      info: {
        nota: "4,8",
        autor: "George Orwell",
        data: "8 de junho de 1949",
        pag: 280,
        genero: "Ficção Distópica"
      }
    },
    "cosoa": {
      info: {
        nota: "4,8",
        autor: "Elayne Baeta",
        data: "25 de Dezembro de 2024",
        pag: 644,
        genero: "Romance lésbico",
        isbn: 978-6559814916
      }
    },
    "oaneo": {
      info: {
        nota: "4,8",
        autor: "Elayne Baeta",
        data: "5 de Novembro de 2024",
        pag: 378,
        genero: "Romance lésbico",
        isbn: "8501118265"
      }
    },
    "cruel": {
      info: {
        nota: "4,8",
        autor: "Holly Black",
        data: "2 de janeiro de 2018",
        pag: 384,
        genero: "fantasia"
      }
    },
    "paci": {
      info: {
        nota: "4,2",
        autor: "Jasper DeWitt",
        data: "19 de Abril de 2021",
        pag: 192,
        genero: "Terror"
      }
    }
  };

  // Função para mostrar/esconder informações de um livro específico
  function mostrarLivro(idLivro) {
    const livro = livros[idLivro];
    const div = document.getElementById(`saida-${idLivro}`);

    if (!livro) {
      div.innerHTML = "<p>Livro não encontrado.</p>";
      return;
    }

    if (div.style.display === "none" || div.style.display === "") {
      div.innerHTML = `
        <h3>Mais Informações:</h3>
        <div class="info">
          <strong>Nota:</strong> ${livro.info.nota} <br>
          <strong>Autor:</strong> ${livro.info.autor} <br>
          <strong>Data de Publicação:</strong> ${livro.info.data} <br>
          <strong>Quantidade de páginas:</strong> ${livro.info.pag} páginas <br>
          <strong>Categoria:</strong> ${livro.info.genero} <br>
          <strong>Isbn:</strong> ${livro.info.isbn} <br>
        </div>`;
      div.style.display = "block";
    } else {
      div.style.display = "none";
      div.innerHTML = "";
    }
  }

  // Adiciona os event listeners para todos os botões
  document.querySelectorAll("[id^='verMais-']").forEach(btn => {
    const idLivro = btn.id.split("-")[1]; // extrai a chave do livro
    btn.addEventListener("click", () => mostrarLivro(idLivro));
  });
});
