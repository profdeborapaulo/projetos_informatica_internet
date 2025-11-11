// Elementos alteráveis do HTML
const tituloLivro = document.getElementById('titulo-livro');
const paragrafoSinopse = document.getElementById('paragrafo-sinopse');
const capaLivro = document.getElementById('capa-livro');
const listaLivros = document.querySelector('.listaLivros');
const filtroGeneros = document.getElementById('filtroGeneros');
const autorElemento = document.getElementById('autor');
const anoElemento = document.getElementById('ano');

// Novos elementos para o player de áudio
const playerAudioBtn = document.getElementById('player-audio-btn');
const audioPlayer = document.getElementById('audio-player');
let isPlaying = false; // Variável para controlar o estado do áudio

// Lista dos livros e suas características
const dadosDosLivros = {
    'dom-casmurro': {
        titulo: 'Dom Casmurro',
        autor: 'Machado de Assis',
        ano: '1899',
        sinopse: 'Um romance sobre o ciúme de Bentinho e a suposta traição de Capitu. Machado de Assis nos faz questionar se ela realmente traiu ou se tudo não passou de uma construção da mente dele.',
        capa: '../imgs/DCasmurro.png',
        genero: 'classicos-brasileiros',
        audio: '../audio/casmurro.m4a'
    },
    'bras-cubas': {
        titulo: 'Memórias Póstumas de Brás Cubas',
        autor: 'Machado de Assis',
        ano: '1881',
        sinopse: ' "Ao verme que primeiro roer as frias carnes do meu cadáver, dedico como saudosa lembrança, essas memórias póstumas". A história de um defunto que resolve contar sua vida depois de morto. Uma crítica bem humorada à sociedade do século XIX.',
        capa: '../imgs/memóriasP.png',
        genero: 'classicos-brasileiros',
        audio: '../audio/brasCubas.m4a'
    },
    'iracema': {
        titulo: 'Iracema',
        autor: 'José de Alencar',
        ano: '1865',
        sinopse: 'A lenda da "virgem dos lábios de mel" e do guerreiro português Martim. Uma história de amor e tragédia que mistura a cultura indígena e a colonização portuguesa.',
        capa: '../imgs/Iracema.png',
        genero: 'classicos-brasileiros',
        audio: '../audio/iracema.m4a'
    },
    'dracula': {
        titulo: 'Drácula',
        autor: 'Bram Stoker',
        ano: '1897',
        sinopse: 'O Conde Drácula é um vampiro milenar que se muda para a Inglaterra com planos malignos. O livro é narrado através de cartas e diários, criando uma atmosfera de terror e suspense.',
        capa: '../imgs/dracula.png',
        genero: 'terror',
        audio: '../audio/dracula.m4a'
    },
    'frankenstein': {
        titulo: 'Frankenstein',
        autor: 'Mary Shelley',
        ano: '1818',
        sinopse: 'O cientista Victor Frankenstein cria uma criatura a partir de partes humanas, mas a rejeita, desencadeando uma história de horror, vingança e solidão.',
        capa: '../imgs/frankenstein.png',
        genero: 'terror',
        audio: '../audio/frankenstein.m4a'
    },
    'o-exorcista': {
        titulo: 'O Exorcista',
        autor: 'William Peter Blatty',
        ano: '1971',
        sinopse: 'Uma mãe busca ajuda da Igreja e de um padre para salvar sua filha de uma possessão demoníaca. Uma história que explora a fé e o horror de forma perturbadora.',
        capa: '../imgs/oExorcista.png',
        genero: 'terror',
        audio: '../audio/exorcista.m4a'
    },
    'morro-dos-ventos-uivantes': {
        titulo: 'Morro dos Ventos Uivantes',
        autor: 'Emily Brontë',
        ano: '1847',
        sinopse: 'Uma história de amor trágica e destrutiva entre Catherine e Heathcliff. O romance se mistura com vingança, obsessão e elementos góticos.',
        capa: '../imgs/morrodosventos.png',
        genero: 'romance',
        audio: '../audio/morro.m4a'
    },
    'o-grande-gatsby': {
        titulo: 'O Grande Gatsby',
        autor: 'F. Scott Fitzgerald',
        ano: '1925',
        sinopse: 'A história do misterioso milionário Jay Gatsby e sua busca obsessiva em reconquistar o amor de sua vida, Daisy Buchanan. Um retrato melancólico da sociedade e do sonho americano.',
        capa: '../imgs/gatsby.png',
        genero: 'romance',
        audio: '../audio/gatsby.m4a'
    },
    'orgulho-e-preconceito': {
        titulo: 'Orgulho e Preconceito',
        autor: 'Jane Austen',
        ano: '1813',
        sinopse: 'Elizabeth Bennet e Mr. Darcy precisam superar seus próprios preconceitos e orgulho para encontrar o amor verdadeiro. Um dos romances clássicos mais famosos de todos os tempos.',
        capa: '../imgs/orgulhoepreconceito.png',
        genero: 'romance',
        audio: '../audio/orgulho.m4a'
    },
    'metamorfose': {
        titulo: 'Metamorfose',
        autor: 'Franz Kafka',
        ano: '1915',
        sinopse: 'Gregor Samsa acorda transformado em um inseto gigantesco. A trama de Franz Kafka explora o absurdo da vida e a alienação humana de uma forma única.',
        capa: '../imgs/metamorfose.png',
        genero: 'ficcao',
        audio: '../audio/metamorfose.m4a'
    },
    'O Guia do Mochileiro das Galáxias': {
        titulo: 'O Guia do Mochileiro das Galáxias',
        autor: 'Douglas Adams',
        ano: '1979',
        sinopse: 'Arthur Dent, um inglês comum, tem seu dia arruinado quando a Terra é demolida para dar lugar a uma via expressa intergaláctica. Ele é salvo por seu amigo Ford Prefect, um alienígena disfarçado de humano, e juntos, os dois embarcam em uma jornada hilária e absurda pelo espaço.',
        capa: '../imgs/mochileiroGalaxias.png',
        genero: 'ficcao',
        audio: '../audio/mochileiro.m4a'
    },
    'alice-no-pais-das-maravilhas': {
        titulo: 'Alice no País das Maravilhas',
        autor: 'Lewis Carroll',
        ano: '1865',
        sinopse: 'A jovem Alice cai em uma toca de coelho e se encontra em um mundo fantástico, cheio de personagens bizarros. Uma aventura que brinca com a lógica e a imaginação.',
        capa: '../imgs/alicenopaisdasmaravilhas.png',
        genero: 'ficcao',
        audio: '../audio/alice.m4a'
    },
};

// Função que muda o conteúdo da página central
function mudarConteudoDoLivro(livro) {
    if (livro) {
        // Para o áudio, pause o que estiver tocando e mude o ícone para "play"
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Volta para o início
        playerAudioBtn.src = '../imgs/playIcon.png';
        isPlaying = false;

        // Atualiza a fonte do áudio
        audioPlayer.src = livro.audio;
        
        // Atualiza as outras informações
        tituloLivro.textContent = livro.titulo;
        paragrafoSinopse.textContent = livro.sinopse;
        capaLivro.src = livro.capa;
        
        autorElemento.textContent = `Autor: ${livro.autor}`;
        anoElemento.textContent = `Ano: ${livro.ano}`;
    }
}

// Função para filtrar os livros na lista lateral
function filtrarLivros(generoSelecionado) {
    const botoesExistentes = document.querySelectorAll('.livrosListados, .linha1');
    botoesExistentes.forEach(botao => botao.remove());

    const livros = Object.keys(dadosDosLivros);

    livros.forEach(livroKey => {
        const informacoesDoLivro = dadosDosLivros[livroKey];
        
        if (informacoesDoLivro.genero === generoSelecionado) {
            const novoBotao = document.createElement('button');
            novoBotao.className = 'livrosListados';
            novoBotao.setAttribute('data-livro', livroKey);
            novoBotao.textContent = informacoesDoLivro.titulo;
            
            novoBotao.addEventListener('click', () => {
                mudarConteudoDoLivro(informacoesDoLivro);
            });
            
            listaLivros.appendChild(novoBotao);
            const linha = document.createElement('hr');
            linha.className = 'linha1';
            listaLivros.appendChild(linha);
        }
    });
}

// Evento de clique no botão de áudio
playerAudioBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playerAudioBtn.src = '../imgs/playIcon.png';
    } else {
        audioPlayer.play();
        playerAudioBtn.src = '../imgs/pauseIcon.png';
    }
    isPlaying = !isPlaying; // Inverte o estado
});

// A gente "ouve" se a pessoa muda a seleção no menu de gêneros
filtroGeneros.addEventListener('change', (evento) => {
    filtrarLivros(evento.target.value);
});

// A gente cria um objeto para pegar os parâmetros da URL
const params = new URLSearchParams(window.location.search);

// A gente pega o valor do parâmetro chamado 'livro'
const livroSelecionado = params.get('livro');

// Se o parâmetro existir, a gente carrega o livro correspondente
if (livroSelecionado) {
    const informacoesDoLivro = dadosDosLivros[livroSelecionado];
    if (informacoesDoLivro) {
        mudarConteudoDoLivro(informacoesDoLivro);
    }
}

// Adicionamos esta linha para que a lista lateral seja sempre carregada
// quando a página for aberta.
filtrarLivros('classicos-brasileiros');