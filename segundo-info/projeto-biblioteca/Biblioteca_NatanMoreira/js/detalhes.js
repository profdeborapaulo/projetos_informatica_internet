document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.getElementById('detalhes-livro-container');
    const params = new URLSearchParams(window.location.search);
    const livroId = params.get('id');

    const livro = livros.find(l => l.id === livroId);

    if (livro && container) {
        document.title = livro.titulo + " - Glória Veterum";

        const generosHTML = livro.genero && Array.isArray(livro.genero) 
                            ? livro.genero.join(', ') 
                            : 'Não especificado';

        const audioHTML = livro.audio 
            ? `
            <h3>Ouça a Sinopse</h3>
            <audio controls>
                <source src="${livro.audio}" type="audio/mpeg">
                Seu navegador não suporta o elemento de áudio.
            </audio>
            `
            : '<p>Áudio da sinopse não disponível.</p>';

        container.innerHTML = `
            <div class="detalhe-flex">
                <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
                <div class="info">
                    <h1>${livro.titulo}</h1>
                    <h2>por ${livro.autor}</h2>
                    <p><strong>Gênero:</strong> ${generosHTML}</p>
                    <p><strong>Editora:</strong> ${livro.editora || 'Não especificada'}</p> <p><strong>Ano de Publicação:</strong> ${livro.anoPublicacao || 'Não especificado'}</p> <h3>Sinopse</h3>
                    <p>${livro.descricao || 'Sinopse não disponível.'}</p>
                    ${audioHTML}
                </div>
            </div>
        `;
    } else if (container) {
        container.innerHTML = "<p class='aviso-nenhum-livro'>Livro não encontrado. <a href='index.html'>Voltar ao catálogo</a>.</p>";
    }

    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    if (themeSwitcher) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
        }

        themeSwitcher.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            let theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
});