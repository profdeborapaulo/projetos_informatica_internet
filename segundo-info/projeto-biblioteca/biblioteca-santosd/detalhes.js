window.onload = function() {
    // Pega o parâmetro 'id' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const livroId = urlParams.get('id');

    // Encontra o livro no nosso objeto 'biblioteca' usando o ID
    // O 'biblioteca' está acessível porque incluímos 'biblioteca.js' antes deste script
    const livro = biblioteca.livros[livroId];

    if (livro) {
        // Atualiza o título da página
        document.title = livro.titulo;

        const detalhesContainer = document.getElementById("detalhes-livro-container");
        
        // Insere o HTML com as informações do livro
        detalhesContainer.innerHTML = `
            <div class="detalhe-capa-container">
                <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
                <div class="play-icon">&#9658;</div> <audio id="audio-sinopse" src="${livro.audio}"></audio>
            </div>
            <div class="detalhe-info">
                <h2>${livro.titulo}</h2>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Ano:</strong> ${livro.ano}</p>
                <p><strong>Páginas:</strong> ${livro.paginas}</p>
                <h3>Sinopse</h3>
                <p class="sinopse-texto">${livro.sinopse}</p>
            </div>
        `;

        // --- Lógica do Áudio Interativo ---
        const capaContainer = document.querySelector('.detalhe-capa-container');
        const audioPlayer = document.getElementById('audio-sinopse');
        const playIcon = document.querySelector('.play-icon');

        capaContainer.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playIcon.innerHTML = '&#10074;&#10074;'; // Ícone de Pause
                playIcon.style.opacity = '1';
            } else {
                audioPlayer.pause();
                playIcon.innerHTML = '&#9658;'; // Ícone de Play
            }
        });
        
        // Mostra o ícone de play quando o mouse está sobre a capa
        capaContainer.addEventListener('mouseover', () => {
            playIcon.style.opacity = '1';
        });

        // Esconde o ícone quando o mouse sai, SE o áudio não estiver tocando
        capaContainer.addEventListener('mouseout', () => {
            if (audioPlayer.paused) {
                playIcon.style.opacity = '0';
            }
        });
        
        // Mantém o ícone de pause/play visível quando o áudio termina
         audioPlayer.addEventListener('ended', () => {
            playIcon.innerHTML = '&#9658;'; // Volta para o ícone de Play
            playIcon.style.opacity = '1';
        });

    } else {
        // Se não encontrar o livro, mostra uma mensagem de erro
        document.getElementById("detalhes-livro-container").innerHTML = "<p>Livro não encontrado!</p>";
    }

};
