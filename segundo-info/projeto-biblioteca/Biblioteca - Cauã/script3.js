let mostrarMais = false 

function demonstrarMais () {
    mostrarMais = true;
    gerarFileiras();
}

window.addEventListener('DOMContentLoaded', gerarFileiras);

async function gerarFileiras() {
    try {
        const response = await fetch('livros.json');
        const livros = await response.json();

        const containerCards = document.getElementById('containerCards');
        containerCards.innerHTML = '';

        const demonstrarMais = false; // nova variável: se true, mostra todos os livros
        const livrosExibir = mostrarMais ? livros : livros.slice(0, 3); // nova linha: decide quais livros exibir

        let fileira;
        livrosExibir.forEach((livro, index) => {
            if (index % 3 === 0) {
                fileira = document.createElement('div');
                fileira.className = 'fileira';
                containerCards.appendChild(fileira);
            }

            const card = document.createElement('div');
            card.className = 'cardestante';

            card.innerHTML = `
                <div class="conteudo">
                    <div class="capa">
                        <img src="${livro.capa}" alt="capa">
                    </div>
                    <p class="titulo">${livro.titulo}</p>
                    <p class="autor">${livro.autor} - ${livro.editora}</p>
                </div>
                <div class="estrelas">
                    <img src="img/estrelas2.png" alt="avaliação">
                </div>
                <div class="embaixo">
                    <p class="anoGenero">${livro.ano} - ${livro.genero.join(' ')}</p>
                    <p class="ver"><a href="detalhes.html" data-id="${livro.id}"> Ver → </a></p>
                </div>
            `;

            fileira.appendChild(card);
        });

        buscar ()
    } catch (error) {
        console.error('Erro ao carregar os livros:', error);
    }
}

function buscar() {
    const termo = document.getElementById('searchbar').value.toLowerCase();
    const filtrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.genero.join(' ').toLowerCase().includes(termo)
    );
    gerarCards(filtrados);
}

window.addEventListener('DOMContentLoaded', carregarLivros);