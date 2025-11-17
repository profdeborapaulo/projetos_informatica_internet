// === RESENHAS DE LIVROS ===

// espera até que o conteúdo da página (html) seja completamente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

    // seleciona os principais elementos da página que serão usados
    const listaResenhas = document.getElementById('listaResenhas'); // onde as resenhas serão exibidas
    const formResenha = document.getElementById('formResenha'); // formulário de envio de nova resenha
    const estrelas = document.querySelectorAll('#estrelas .star'); // ícones de estrelas da avaliação
    let avaliacao = 0; // armazena o número de estrelas selecionadas pelo usuário

    // ======== estrelas (sistema de avaliação) ========
    // adiciona eventos para interação com as estrelas
    estrelas.forEach((estrela, i) => {

        // quando o usuário clica em uma estrela, define a quantidade de estrelas da avaliação
        estrela.addEventListener('click', () => {
            avaliacao = i + 1; // define o número de estrelas (índice começa em 0)
            atualizarEstrelas(); // atualiza a aparência das estrelas
        });

        // quando o usuário passa o mouse sobre as estrelas, mostra visualmente até qual está selecionada
        estrela.addEventListener('mouseover', () => preencherEstrelas(i + 1));

        // quando o mouse sai da área das estrelas, restaura o estado atual da seleção
        estrela.addEventListener('mouseleave', atualizarEstrelas);
    });

    // função para preencher temporariamente as estrelas quando o mouse passa sobre elas
    function preencherEstrelas(n) {
        estrelas.forEach((estrela, i) => {
            estrela.classList.toggle('fa-solid', i < n); // ativa o preenchimento até a estrela selecionada
            estrela.classList.toggle('fa-regular', i >= n); // mantém as demais vazias
            estrela.classList.toggle('text-warning', i < n); // adiciona cor amarela às selecionadas
        });
    }

    // função que mostra as estrelas de acordo com a avaliação confirmada (clicada)
    function atualizarEstrelas() {
        estrelas.forEach((estrela, i) => {
            estrela.classList.toggle('fa-solid', i < avaliacao);
            estrela.classList.toggle('fa-regular', i >= avaliacao);
            estrela.classList.toggle('text-warning', i < avaliacao);
        });
    }
    
    // === função de desafio ===
    // essa função atualiza o progresso de um desafio quando o usuário cria uma nova resenha
    function atualizarDesafioResenhas() {
        // carrega o objeto de desafios do localStorage (ou cria um novo se não existir)
        let desafios = JSON.parse(localStorage.getItem("desafios")) || {};

        // garante que o desafio "crítico literário médio" exista dentro do objeto
        desafios.criticoLiterarioMedio = desafios.criticoLiterarioMedio || { progresso: 0, concluido: false };

        // só atualiza o progresso se o desafio ainda não tiver sido concluído
        if (!desafios.criticoLiterarioMedio.concluido) {
            desafios.criticoLiterarioMedio.progresso = (desafios.criticoLiterarioMedio.progresso || 0) + 1;
        }

        // salva novamente o estado atualizado no localStorage
        localStorage.setItem("desafios", JSON.stringify(desafios));
    }

    // ======== criar card de resenha ========
    // essa função gera dinamicamente o html de uma resenha (como um card visual)
    function criarCardResenha(resenha) {
        const divRow = document.createElement("div");
        divRow.className = "col-md-12 g-4"; // define classes de layout do bootstrap

        // estrutura do card de resenha com título, autor, texto, usuário e botão de like
     divRow.innerHTML = `
  <div class="card h-100 shadow-sm p-4">
    <div class="card-body">

      <!-- Cabeçalho: título + estrelas -->
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 flex-wrap">
        <h5 class="card-title mb-2 mb-sm-0 text-center text-sm-start flex-grow-1" 
            style="word-break: break-word; overflow-wrap: break-word; white-space: normal;">
          ${resenha.nomeLivro}
        </h5>
        <div class="d-flex justify-content-center justify-content-sm-end flex-wrap mt-1 mt-sm-0">
          ${'<i class="fas fa-star estrela text-warning"></i>'.repeat(resenha.avaliacao)}
          ${'<i class="far fa-star estrela"></i>'.repeat(5 - resenha.avaliacao)}
        </div>
      </div>

      <!-- Autor -->
      <h6 class="card-subtitle mb-2 text-muted text-center text-sm-start">${resenha.autorLivro}</h6>

      <!-- Texto da resenha -->
      <p class="card-text text-center text-sm-start">${resenha.textoResenha}</p>

      <div class="linha my-3"></div>

      <!-- Rodapé: usuário + like -->
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
        <div class="d-flex align-items-center mb-3 mb-sm-0 w-100 w-sm-auto">
          <img src="/img/M.png" alt="Foto do Usuário" class="foto-usuario me-3"
               style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" />
          <div>
            <span class="nome-usuario d-block">${resenha.usuario}</span>
            <span class="data-resenha text-muted d-block">${resenha.data}</span>
          </div>
        </div>
        <div class="text-center text-sm-end w-100 w-sm-auto">
          <button type="button" class="btn-like border-0 bg-transparent">
            <i class="fas fa-thumbs-up me-1"></i>
            <span class="like-count">0</span>
          </button>
        </div>
      </div>

    </div>
  </div>
`;
return divRow;
    }   

    // ======== carregar resenhas existentes ========
    // busca todas as resenhas salvas anteriormente no localStorage e exibe na tela
    function carregarResenhas() {
        const resenhas = JSON.parse(localStorage.getItem('resenhas')) || [];
        // exibe da mais recente para a mais antiga
        resenhas.slice().reverse().forEach(resenha => {
            const card = criarCardResenha(resenha);
            listaResenhas.appendChild(card);
        });
    }

    // carrega as resenhas assim que a página abre
    carregarResenhas();

    // ======== publicar nova resenha ========
    // trata o envio do formulário para criar uma nova resenha
    formResenha.addEventListener('submit', (e) => {
        e.preventDefault(); // evita o recarregamento da página

        // pega os dados do formulário e remove espaços extras
        const nomeLivro = document.getElementById('nomeLivro').value.trim();
        const autorLivro = document.getElementById('autorLivro') 
            ? document.getElementById('autorLivro').value.trim() 
            : "Autor Desconhecido";
        const textoResenha = document.getElementById('textoResenha').value.trim();

        // verifica se o usuário preencheu todos os campos e escolheu uma avaliação
        if (!nomeLivro || !textoResenha || avaliacao === 0) {
            alert('Por favor, preencha todos os campos e selecione uma avaliação.');
            return;
        }

        // recupera o nome do usuário logado (ou usa um nome padrão)
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))?.nome || "Usuário Anônimo";

        // gera a data atual no formato local (ex: 08/11/2025)
        const dataAtual = new Date().toLocaleDateString();

        // cria o objeto da nova resenha com todas as informações
        const novaResenha = {
            nomeLivro,
            autorLivro,
            textoResenha,
            avaliacao,
            usuario,
            data: dataAtual
        };

        // salva a nova resenha no localStorage
        const resenhas = JSON.parse(localStorage.getItem('resenhas')) || [];
        resenhas.push(novaResenha);
        localStorage.setItem('resenhas', JSON.stringify(resenhas));

        // chama a função que atualiza o progresso dos desafios
        atualizarDesafioResenhas();

        // adiciona o novo card no topo da lista de resenhas (sem recarregar a página)
        const card = criarCardResenha(novaResenha);
        listaResenhas.prepend(card);

        // fecha o modal de criação de resenha e reseta o formulário
        const modalEl = document.getElementById('modalResenha');
        bootstrap.Modal.getOrCreateInstance(modalEl).hide();
        formResenha.reset();

        // reseta a avaliação visual (estrelas)
        avaliacao = 0;
        atualizarEstrelas();
    });

    // ======== abrir modal com o botão ========
    // adiciona o evento para abrir o modal de nova resenha ao clicar no botão de "adicionar review"
    const btnAbrirModal = document.querySelector('.adicionar-review');
    if(btnAbrirModal){
        btnAbrirModal.addEventListener('click', () => {
            const modalEl = document.getElementById('modalResenha');
            bootstrap.Modal.getOrCreateInstance(modalEl).show(); // exibe o modal
        });
    }
});
