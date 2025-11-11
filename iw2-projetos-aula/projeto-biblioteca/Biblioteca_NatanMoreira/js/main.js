document.addEventListener('DOMContentLoaded', () => {

    // --- Observer para a Animação de Scroll ---
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação dispara quando 10% do card está visível
    });


    // --- FUNÇÃO ÚNICA PARA RENDERIZAR UM CARD DE LIVRO ---
    function renderizarLivroCard(livro) {
        const card = document.createElement('div');
        card.classList.add('livro-card');
        card.innerHTML = `
            <a href="detalhes.html?id=${livro.id}">
                <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
                <h3>${livro.titulo}</h3>
                <p>${livro.autor}</p>
            </a>
        `;
        return card;
    }


    // --- LÓGICA DO CARROSSEL ---
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    
    if (carouselTrack && prevBtn && nextBtn) {
        
        function popularCarrossel(livrosParaCarrossel) {
            carouselTrack.innerHTML = '';
            livrosParaCarrossel.forEach(livro => {
                const card = renderizarLivroCard(livro);
                card.classList.add('fade-in'); // Adiciona a classe para que fiquem visíveis de imediato no carrossel
                carouselTrack.appendChild(card);
            });
        }

        function updateCarousel() {
            // Recalcula o itemWidth baseado no CSS para garantir compatibilidade
            const style = getComputedStyle(document.querySelector('.livro-card') || document.body);
            const cardWidth = parseFloat(style.width) || 300; // Largura do card
            const cardMargin = parseFloat(style.marginLeft) + parseFloat(style.marginRight) || 30; // Margem total
            const itemWidth = cardWidth + cardMargin;
            
            carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            updateCarouselButtons();
        }

        function updateCarouselButtons() {
            const totalItems = carouselTrack.children.length;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalItems - 1; 
        }

        nextBtn.addEventListener('click', () => {
            const totalItems = carouselTrack.children.length;
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        popularCarrossel(livros.slice(0, 6)); // Exibe os 6 primeiros livros
        updateCarousel(); // Chama para posicionar corretamente e atualizar botões
    }


    // --- LÓGICA DO CATÁLOGO (GRID) ---
    const livrosGridContainer = document.getElementById('livros-grid-container');

    if (livrosGridContainer) {
        function popularCatalogo(livrosParaCatalogo) {
            livrosGridContainer.innerHTML = '';
            livrosParaCatalogo.forEach(livro => {
                const card = renderizarLivroCard(livro);
                livrosGridContainer.appendChild(card);
                scrollObserver.observe(card); // Aplica a animação
            });
        }
        
        popularCatalogo(livros); // Popula o catálogo inicialmente com todos os livros
    }


    // --- LÓGICA DE BUSCA E FILTRO ---
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterAutor = document.getElementById('filterAutor');
    const filterGenero = document.getElementById('filterGenero');
    const filterEditora = document.getElementById('filterEditora'); // NOVO
    const filterAno = document.getElementById('filterAno');       // NOVO

    function aplicarFiltrosESearch() {
        const termoBusca = searchInput ? searchInput.value.toLowerCase() : '';
        const autorSelecionado = filterAutor ? filterAutor.value : '';
        const generoSelecionado = filterGenero ? filterGenero.value : '';
        const editoraSelecionada = filterEditora ? filterEditora.value : ''; // NOVO
        const anoSelecionado = filterAno ? parseInt(filterAno.value) : ''; // NOVO - Converte para número

        const livrosFiltrados = livros.filter(livro => {
            const matchSearch = livro.titulo.toLowerCase().includes(termoBusca) ||
                                livro.autor.toLowerCase().includes(termoBusca) ||
                                (livro.descricao && livro.descricao.toLowerCase().includes(termoBusca));
            const matchAutor = autorSelecionado === '' || livro.autor === autorSelecionado;
            const matchGenero = generoSelecionado === '' || (livro.genero && livro.genero.includes(generoSelecionado));
            const matchEditora = editoraSelecionada === '' || livro.editora === editoraSelecionada; // NOVO
            const matchAno = anoSelecionado === '' || livro.anoPublicacao === anoSelecionado;       // NOVO

            return matchSearch && matchAutor && matchGenero && matchEditora && matchAno; // Inclui os novos filtros
        });
        
        if (livrosGridContainer && typeof popularCatalogo === 'function') {
            popularCatalogo(livrosFiltrados);
        }
    }

    if (searchInput) searchInput.addEventListener('keyup', aplicarFiltrosESearch);
    if (searchButton) searchButton.addEventListener('click', aplicarFiltrosESearch);
    if (filterAutor) filterAutor.addEventListener('change', aplicarFiltrosESearch);
    if (filterGenero) filterGenero.addEventListener('change', aplicarFiltrosESearch);
    if (filterEditora) filterEditora.addEventListener('change', aplicarFiltrosESearch); // NOVO
    if (filterAno) filterAno.addEventListener('change', aplicarFiltrosESearch);       // NOVO
    
    function popularFiltros() {
        // Popula Autores
        if (filterAutor) {
            const autores = [...new Set(livros.map(livro => livro.autor))].sort();
            autores.forEach(autor => {
                const option = document.createElement('option');
                option.value = autor;
                option.textContent = autor;
                filterAutor.appendChild(option);
            });
        }

        // Popula Gêneros
        if (filterGenero) {
            const generos = [...new Set(livros.flatMap(livro => livro.genero || []))].sort();
            generos.forEach(genero => {
                if (genero) {
                    const option = document.createElement('option');
                    option.value = genero;
                    option.textContent = genero;
                    filterGenero.appendChild(option);
                }
            });
        }

        // Popula Editoras (NOVO)
        if (filterEditora) {
            const editoras = [...new Set(livros.map(livro => livro.editora))].sort();
            editoras.forEach(editora => {
                const option = document.createElement('option');
                option.value = editora;
                option.textContent = editora;
                filterEditora.appendChild(option);
            });
        }

        // Popula Anos de Publicação (NOVO)
        if (filterAno) {
            const anos = [...new Set(livros.map(livro => livro.anoPublicacao))].sort((a, b) => a - b); // Ordena numericamente
            anos.forEach(ano => {
                const option = document.createElement('option');
                option.value = ano;
                option.textContent = ano;
                filterAno.appendChild(option);
            });
        }
    }

    popularFiltros();


    // --- LÓGICA DO SELETOR DE TEMA ---
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