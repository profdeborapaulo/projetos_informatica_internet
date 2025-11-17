// === CURTIDAS (LIKE) ===

// espera até que todo o conteúdo da página seja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // carrega do localStorage os dados de curtidas salvos anteriormente (ou cria um objeto vazio)
  let likesData = JSON.parse(localStorage.getItem("likesData")) || {};

  // seleciona todos os botões com a classe "btn-like"
  document.querySelectorAll(".btn-like").forEach(btn => {
    // pega o id único do botão (identificador do item curtido)
    const id = btn.getAttribute("data-id");
    // seleciona o elemento dentro do botão que mostra o número de curtidas
    const countSpan = btn.querySelector(".like-count");

    // restaura o estado salvo anteriormente (se o usuário já tinha curtido)
    if (likesData[id]?.liked) btn.classList.add("liked");
    // restaura o número de curtidas salvo, se existir
    if (likesData[id]?.count !== undefined) countSpan.textContent = likesData[id].count;

    // adiciona o evento de clique para alternar curtidas
    btn.addEventListener("click", () => {
      // alterna a classe "liked" (adiciona se não tiver, remove se já tiver)
      const liked = btn.classList.toggle("liked");

      // converte o texto do contador em número
      let count = parseInt(countSpan.textContent);

      // aumenta ou diminui o contador dependendo se curtiu ou descurtiu
      count = liked ? count + 1 : count - 1;

      // atualiza o texto do contador com o novo número
      countSpan.textContent = count;

      // salva o novo estado (curtido e quantidade de curtidas) no objeto local
      likesData[id] = { liked, count };

      // atualiza o localStorage com o novo estado de curtidas
      localStorage.setItem("likesData", JSON.stringify(likesData));
    });
  });
});
