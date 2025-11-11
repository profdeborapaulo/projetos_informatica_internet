window.addEventListener('DOMContentLoaded', carregarDetalhes);

async function carregarDetalhes() {
    try {
        const response = await fetch('livros.json');
        const livros = await response.json();

        // Pega o id do livro salvo no localStorage
        const livroId = parseInt(localStorage.getItem('livroSelecionado'));
        if (!livroId) return;

        const livro = livros.find(l => l.id === livroId);
        if (!livro) return;

        // Atualiza a seção "acima"
        const acima = document.querySelector('.acima');
        acima.querySelector('.pequeno').textContent = `Acervo → Categorias → Gênero → ${livro.genero.join(' ')}`;
        acima.querySelector('.grande').textContent = livro.titulo;

        // Atualiza a seção "detalhes"
        const detalhes = document.querySelector('.detalhes');
        detalhes.querySelector('.capa').innerHTML = `<img src="${livro.capa}" alt="capa">`;

        const detalhesConteudo = detalhes.querySelector('.detalhesConteudo');
        detalhesConteudo.querySelector('.titulo').textContent = livro.titulo;
        detalhesConteudo.querySelector('.genero').textContent = livro.genero.join(' ');

        const info = detalhesConteudo.querySelectorAll('.infoDetalhes');
        info[0].textContent = `Autor: ${livro.autor}`;
        info[1].textContent = `Editora: ${livro.editora}`;
        info[2].textContent = `ISBN: ${livro.ISBN}`;
        info[3].textContent = `Ano de Publicação: ${livro.ano}`;
        info[4].textContent = `Edição: ${livro.edicao}`;
        info[5].textContent = `Páginas: ${livro.paginas}`;

        // Atualiza a seção "detalhes2"
        const detalhes2 = document.querySelector('.detalhes2');
        detalhes2.querySelector('.bold').textContent = `Sinopse - ${livro.titulo}`;
        detalhes2.querySelector('.textoDetalhes2 p').textContent = livro.sinopse || "Sinopse não disponível.";

        // Atualiza o áudio se houver
        const audioEl = detalhesConteudo.querySelector('audio');
        if (livro.audio) {
            audioEl.src = livro.audio;
        }

    } catch (error) {
        console.error('Erro ao carregar os detalhes do livro:', error);
    }
}


// Mesma coisa que no script 1, mas repetida para o 2

window.addEventListener('DOMContentLoaded', gerarFileiras);

async function gerarFileiras() {
    try {
        const response = await fetch('livros.json');
        const livros = await response.json();

        const containerCards = document.getElementById('containerCards');
        containerCards.innerHTML = '';

        const livrosLimitados = livros.slice(0, 6);

        let fileira;
        livrosLimitados.forEach((livro, index) => {
            if (index % 3 === 0) {
                fileira = document.createElement('div');
                fileira.className = 'fileira';
                containerCards.appendChild(fileira);
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
                    <p class="ver"><a href="detalhes.html" data-id="${livro.id}"> Ver → </a></p>
                </div>
            `;

            fileira.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar os livros:', error);
    }
}