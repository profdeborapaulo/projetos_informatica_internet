window.addEventListener('DOMContentLoaded', gerarCards);

async function gerarCards() {
    try {
        const response = await fetch('livros.json');
        const livros = await response.json();

        const container = document.getElementById('containerCards');
        container.innerHTML = ''; // limpa conteúdo anterior

        // Limita o número de livros gerados em "mais vendidos" a 6
        const livrosLimitados = livros.slice(0, 6);

        // Para as fileiras dos "mais vendidos"
        let fileira;
        livrosLimitados.forEach((livro, index) => {
            if (index % 3 === 0) {
                fileira = document.createElement('div');
                fileira.className = 'fileira';
                container.appendChild(fileira);
            }

            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div class="conteudo">
                    <div class="capa">
                        <img src="${livro.capa}" alt="capa">
                    </div>
                    <p class="titulo">${livro.titulo}</p>
                    <p class="autor">${livro.autor} - ${livro.editora}</p>
                </div>
                <div class="estrelas">
                    <img src="img/estrelas.png" alt="avaliação">
                </div>
                <div class="embaixo">
                    <p class="anoGenero">${livro.ano} - ${livro.genero.join(' ')}</p>
                    <p class="ver"><a href="detalhes.html" data-id="${livro.id}"> Ver → </a></p> <!-- adicionado data-id -->
                </div>
            `;

            fileira.appendChild(card);
        });

        // Para o carrossel
        const carrossel = document.getElementById('carrosselCards');
        carrossel.innerHTML = '';

        livros.forEach(livro => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="conteudo">
                    <div class="capa">
                        <img src="${livro.capa}" alt="capa">
                    </div>
                    <p class="titulo">${livro.titulo}</p>
                    <p class="autor">${livro.autor} - ${livro.editora}</p>
                </div>
                <div class="estrelas">
                    <img src="img/estrelas.png" alt="avaliação">
                </div>
                <div class="embaixo">
                    <p class="anoGenero">${livro.ano} - ${livro.genero.join(' ')}</p>
                    <p class="ver"><a href="detalhes.html" data-id="${livro.id}"> Ver → </a></p> <!-- adicionado data-id -->
                </div>
            `;
            carrossel.appendChild(card);
        });

        //  Scroll no carrossel
        carrossel.addEventListener('wheel', function(evt) {
            evt.preventDefault(); // faz a pagina nao scrollar junto do carrossel
            carrossel.scrollLeft += evt.deltaY; // converte scroll vertical para a horizontal
        }, { passive: false });

        // captura click nos botões "Ver →" e salva o id do livro no localStorage
        const botoesVer = document.querySelectorAll('.ver a'); // novo
        botoesVer.forEach(botao => { // novo
            botao.addEventListener('click', function(e) { // novo
                const idLivro = this.getAttribute('data-id'); // novo
                localStorage.setItem('livroSelecionado', idLivro); // novo
            }); // novo
        }); // novo

    } catch (error) {
        console.error('Erro ao carregar os livros:', error);
    }
}
