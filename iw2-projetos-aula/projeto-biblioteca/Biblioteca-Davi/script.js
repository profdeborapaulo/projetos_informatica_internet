// Dados dos livros
const books = [
    {
        title: "The Legend of Zelda: Ocarina of Time",
        author: "Akira Himekawa",
        genre: "Fantasia/Drama",
        pages: 384,
        year: 1999,
        publisher: "Editora Panini",
        isbn: "978-8542608809",
        cover: "imgs/Ocarina.jpg",
        synopsis: "Link é um jovem da floresta que vê seu lar em perigo e parte em uma jornada para deter um rei maligno e salvar o reino de Hyrule! Para completar sua missão, ele terá que encontrar a princesa Zelda e ajudar outros povos para reunir a Triforce e restabelecer o equilíbrio do mundo!"
    },
    {
        title: "The Legend of Zelda: Majora's Mask/A Link to the Past",
        author: "Akira Himekawa",
        genre: "Fantasia/Drama",
        pages: 408,
        year: 2008,
        publisher: "Editora Panini",
        isbn: "978-8542610932",
        cover: "imgs/Majora's.webp",
        synopsis: "Em The Legend of Zelda: Majora's Mask / A Link to the Past, o mangá apresenta duas histórias épicas: em A Link to the Past, Link deve salvar a Princesa Zelda e Hyrule do maligno Agahnim, que busca a Triforce, enfrentando desafios em masmorras; já em Majoras Mask, Link é transformado em Deku Scrub e deve impedir a queda da lua sobre Termina em um ciclo de três dias, desvendando os mistérios da máscara sinistra."
    },
    {
        title: "The Legend of Zelda: Twilight Princess",
        author: "Akira Himekawa",
        genre: "Fantasia/Drama",
        pages: 170,
        year: 2023,
        publisher: "Editora Panini",
        isbn: "978-1974749669",
        cover: "imgs/Twilight.jpg",
        synopsis: "Em The Legend of Zelda: Twilight Princess, Link, um fazendeiro, vê sua vida pacífica abalada quando criaturas sombrias invadem sua vila, transformando-o em lobo e o levando ao Twilight Realm. Lá, ele se une à misteriosa Midna para reunir os Fragmentos da Luz, restaurar Hyrule e derrotar Zant, um usurpador controlado por uma força maior, em uma jornada repleta de desafios e revelações."
    },
    {
        title: "The Legend of Zelda: Four Swords",
        author: "Akira Himekawa",
        genre: "Fantasia/Drama",
        pages: 378,
        year: 2018,
        publisher: "Editora Panini",
        isbn: "978-8542613070",
        cover: "imgs/Swords.jpg",
        synopsis: "A princesa Zelda e as seis sacerdotisas pressentem o enfraquecimento do selo que aprisiona o mago Vaati e convocam Link para que as protejam, enquanto abrem o portal para o Reino Sagrado da Four Sword. Mas, ao abrirem o portal, uma sombra maligna aparece e sequestra a princesa. Link recupera a Four Sword, mas acaba sendo dividido em quatro corpos e desfaz o selo que prende o mago. Agora, os quatro Links devem impedir que o mago domine Hyrule, enquanto resgatam a princesa Zelda e as sacerdotisas."
    },
    {
        title: "The Legend of Zelda: Oracle of Seasons/Ages",
        author: "Akira Himekawa",
        genre: "Fantasia/Drama",
        pages: 408,
        year: 2018,
        publisher: "Editora Panini",
        isbn: " 978-8542609714",
        cover: "imgs/Ages.jpg",
        synopsis: "No mangá The Legend of Zelda: Oracle of Seasons/Ages, Link é enviado para as terras de Holodrum e Labrynna, onde deve intervir em eventos cruciais para salvar os reinos. Em Oracle of Seasons, Link recebe o Orbe das Estações e a Harpa das Eras, e deve usar o poder das estações para restaurar a ordem, enfrentando o General Onox que sequestrou a Din, a Deusa das Estações. Em Oracle of Ages, Link deve resgatar Nayru, a Deusa do Tempo, das garras do feiticeiro Veran, viajando entre o passado e o presente para coletar os Oráculos e impedir que o mal domine o tempo e o espaço."
    },
    {
        title: "The Legend of Zelda: Minish Cap/Phantom Hourglass",
        author: "Akira Himekawa",
        genre: "Fantasia/Drama",
        pages: 186,
        year: 2018,
        publisher: "Editora Panini",
        isbn: "	978-8542611625",
        cover: "imgs/Minish.jpg",
        synopsis: "No mangá The Legend of Zelda: Minish Cap/Phantom Hourglass, Link embarca em duas aventuras distintas: em Minish Cap ele usa o Goron Cap para encolher e explorar o mundo minúsculo dos Minish, buscando a espada Picori e a Princesa Zelda, que foi transformada em pedra pelo vilão Vaati. Em Phantom Hourglass, Link navega pelos mares em seu barco, com a ajuda de Tetra e um artefato misterioso chamado Phantom Hourglass, para resgatar a Princesa Zelda de um navio fantasma e desvendar os segredos de uma ilha amaldiçoada."
    }
];

//áudios das sinopses
const audioFiles = [
    "./audios/Ocarina.mp3",
    "./audios/Majora.mp3",
    "./audios/Twilight.mp3",
    "./audios/Swords.mp3",
    "./audios/Seasons.mp3",
    "./audios/Minish.mp3"
];

// Variáveis globais
let currentAudio = null;
let audioElement = null;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Função de inicialização
function initializeApp() {
    audioElement = document.getElementById('synopsisAudio');

    // Evento para quando o áudio terminar
    audioElement.addEventListener('ended', function () {
        const button = document.querySelector('.read-button.playing');
        if (button) {
            button.classList.remove('playing');
            button.innerHTML = '🔊 Ouvir Sinopse';
        }
    });

    // Evento para erros de áudio
    audioElement.addEventListener('error', function () {
        const button = document.querySelector('.read-button.playing');
        if (button) {
            button.classList.remove('playing');
            button.innerHTML = '🔊 Ouvir Sinopse';
            alert('Erro ao carregar o áudio. Verifique se o arquivo existe.');
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('bookModal');
            if (!modal.classList.contains('hidden')) {
                closeModal(event);
            }
        }
    });
}

// Handler para erro de imagem nos cards
function handleImageError(imgElement, title, author, color1, color2) {
    imgElement.style.display = 'none';

    const gradientMap = {
        'blue-900': '#1a365d',
        'purple-800': '#553c9a',
        'pink-500': '#ec4899',
        'yellow-400': '#f59e0b',
        'blue-400': '#3b82f6',
        'indigo-600': '#6366f1',
        'purple-900': '#7e22ce',
        'blue-800': '#1e40af',
        'amber-600': '#d97706',
        'brown-700': '#7c2d12',
        'gray-700': '#374151',
        'orange-500': '#ea580c'
    };

    const color1Hex = gradientMap[color1] || '#2C5530';
    const color2Hex = gradientMap[color2] || '#6B8E23';

    imgElement.parentElement.innerHTML = `
        <div style="width: 192px; height: 256px; 
                   background: linear-gradient(135deg, ${color1Hex} 0%, ${color2Hex} 100%);
                   border-radius: 8px; margin: 0 auto 16px; 
                   display: flex; align-items: center; justify-content: center; 
                   color: white; font-weight: bold; text-align: center; padding: 16px;">
            ${title}<br>por ${author}
        </div>
    `;
}

// Handler para erro de imagem no modal
function handleModalImageError(imgElement, title, author) {
    imgElement.style.display = 'none';
    imgElement.parentElement.innerHTML = `
        <div style="width: 240px; height: 320px; 
                   background: linear-gradient(135deg, #2C5530 0%, #6B8E23 100%);
                   border-radius: 12px; display: flex; align-items: center; justify-content: center; 
                   color: white; font-weight: bold; text-align: center; padding: 20px; 
                   box-shadow: 0 12px 30px rgba(0,0,0,0.2);">
            ${title}<br>por ${author}
        </div>
    `;
}

// Abrir modal com informações do livro
function openModal(bookIndex) {
    const book = books[bookIndex];
    const modal = document.getElementById('bookModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <div>
            <img src="${book.cover}" alt="Capa do livro ${book.title}" class="modal-cover" onerror="handleModalImageError(this, '${book.title}', '${book.author}')">
        </div>
        <div class="modal-details">
            <h2 class="book-font">${book.title}</h2>
            <p class="modal-author">por ${book.author}</p>
            
            <div class="modal-meta">
                <div class="meta-item">
                    <div class="meta-label">Gênero</div>
                    <div class="meta-value">${book.genre}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Páginas</div>
                    <div class="meta-value">${book.pages}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Ano</div>
                    <div class="meta-value">${book.year}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Editora</div>
                    <div class="meta-value">${book.publisher}</div>
                </div>
            </div>
            
            <div class="modal-synopsis">
                <h3>Sinopse</h3>
                <p class="synopsis-text">${book.synopsis}</p>
            </div>
            
            <button class="read-button" onclick="tmp3leAudio(${bookIndex})">
                <span>🔊</span>
                <span>Ouvir Sinopse</span>
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    currentAudio = bookIndex;
}

// Tocar/pausar áudio
function tmp3leAudio(bookIndex) {
    const button = document.querySelector('.read-button');

    if (audioElement.paused || audioElement.src !== audioFiles[bookIndex]) {
        // Se não está tocando ou é um áudio diferente
        stopAudio();
        audioElement.src = audioFiles[bookIndex];
        audioElement.play().catch(error => {
            console.error('Erro ao reproduzir áudio:', error);
            alert('Erro ao reproduzir o áudio. Verifique se o arquivo existe e é suportado.');
        });

        button.classList.add('playing');
        button.innerHTML = '⏸️ Pausar Sinopse';
    } else {
        // Se está tocando, pausar
        audioElement.pause();
        button.classList.remove('playing');
        button.innerHTML = '🔊 Ouvir Sinopse';
    }
}

// Parar áudio
function stopAudio() {
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    const button = document.querySelector('.read-button.playing');
    if (button) {
        button.classList.remove('playing');
        button.innerHTML = '🔊 Ouvir Sinopse';
    }
}

// Fechar modal
function closeModal(event) {
    event.stopPropagation();
    const modal = document.getElementById('bookModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    stopAudio();
}