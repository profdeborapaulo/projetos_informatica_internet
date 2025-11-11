document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos com ID 'categoria'
    const filtros = document.getElementById('categoria');
    
    // Seleciona o container que contém todos os livros
    const containerLivros = document.querySelector('.livrosIndex');

    // Estrutura de dados: Array de objetos
    const livros = [
        {
            titulo: 'Dom Casmurro',
            capa: '../imgs/DCasmurro.png',
            genero: 'classicosBrasileiros',
            link: '../html/livros.html?livro=dom-casmurro'
        },
        {
            titulo: 'Memórias Póstumas de Brás Cubas',
            capa: '../imgs/memóriasP.png',
            genero: 'classicosBrasileiros',
            link: '../html/livros.html?livro=bras-cubas'
        },
        {
            titulo: 'Iracema',
            capa: '../imgs/Iracema.png',
            genero: 'classicosBrasileiros',
            link: '../html/livros.html?livro=iracema'
        },
        {
            titulo: 'Drácula',
            capa: '../imgs/dracula.png',
            genero: 'terror',
            link: '../html/livros.html?livro=dracula'
        },
        {
            titulo: 'Frankenstein',
            capa: '../imgs/frankenstein.png',
            genero: 'terror',
            link: '../html/livros.html?livro=frankenstein'
        },
        {
            titulo: 'O Exorcista',
            capa: '../imgs/oExorcista.png',
            genero: 'terror',
            link: '../html/livros.html?livro=o-exorcista'
        },
        {
            titulo: 'O Guia do Mochileiro das Galáxias',
            capa: '../imgs/mochileiroGalaxias.png',
            genero: 'ficcao',
            link: '../html/livros.html?livro=O Guia do Mochileiro das Galáxias'
        },
        {
            titulo: 'Metaformose',
            capa: '../imgs/metamorfose.png',
            genero: 'ficcao',
            link: '../html/livros.html?livro=metamorfose'
        },      
        {
            titulo: 'Alice no País das Maravilhas',
            capa: '../imgs/alicenopaisdasmaravilhas.png',
            genero: 'ficcao',
            link: '../html/livros.html?livro=alice-no-pais-das-maravilhas'
        },
        {
            titulo: 'Morro dos Ventos Uivantes',
            capa: '../imgs/morrodosventos.png',
            genero: 'romance',
            link: '../html/livros.html?livro=morro-dos-ventos-uivantes'
        },
        {
            titulo: 'Orgulho e Preconceito',
            capa: '../imgs/orgulhoepreconceito.png',
            genero: 'romance',
            link: '../html/livros.html?livro=orgulho-e-preconceito'
        },
        {
            titulo: 'O Grande Gatsby',
            capa: '../imgs/gatsby.png',
            genero: 'romance',
            link: '../html/livros.html?livro=o-grande-gatsby'
        },
    ];

    // Função para renderizar os livros na página
    function renderizarLivros(livrosParaExibir) {
        // Limpa o container para não duplicar os livros
        containerLivros.innerHTML = '';
        
        livrosParaExibir.forEach(livro => {
            const livroHTML = `
                <div class="livroBackground" data-genero="${livro.genero}">
                    <a href="${livro.link}">
                        <img src="${livro.capa}" alt="${livro.titulo}" class="capaLivro">
                        <h1 class="livroTitulo">${livro.titulo}</h1>
                    </a>
                </div>
            `;
            containerLivros.innerHTML += livroHTML;
        });
    }

    // Função para filtrar e exibir os livros
    function filtrarLivros() {
        const generoSelecionado = filtros.value;
        // Salva o gênero selecionado no localStorage
        localStorage.setItem('ultimoGenero', generoSelecionado);
        
        const livrosFiltrados = livros.filter(livro => livro.genero === generoSelecionado);
        renderizarLivros(livrosFiltrados);
    }

    // Adiciona o ouvinte de evento para quando a seleção mudar
    filtros.addEventListener('change', filtrarLivros);

    //Logica de carregamento
    
    // Pega o último gênero salvo no localStorage
    const ultimoGenero = localStorage.getItem('ultimoGenero');

    // Verifica se existe um gênero salvo
    if (ultimoGenero) {
        // Se houver, define o valor do dropdown para o último gênero
        filtros.value = ultimoGenero;
        // E renderiza a lista de livros para esse gênero
        renderizarLivros(livros.filter(livro => livro.genero === ultimoGenero));
    } else {
        // Se não houver, exibe a lista inicial de livros (gênero padrão)
        const generoPadrao = 'classicosBrasileiros';
        filtros.value = generoPadrao;
        renderizarLivros(livros.filter(livro => livro.genero === generoPadrao));
    }
});

