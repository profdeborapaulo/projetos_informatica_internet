// Array com os livros
const livros = [
    {
        id: 0,
        titulo: "Noites Brancas",
        autor: "Fyodor Dostoevsky",
        detalhes: "Romance | 128 páginas",
        sinopse: `Em “Noites Brancas”, Dostoevsky nos transporta para as ruas silenciosas e iluminadas pela lua de São Petersburgo, onde um jovem sonhador vive uma existência solitária, imerso em suas próprias fantasias e esperanças. Durante quatro noites mágicas, ele encontra Nastenka, uma jovem cheia de vida e sonhos, e, juntos, compartilham momentos de afeto, confidências e delicadas expectativas.

        O romance nos leva a sentir o contraste entre a doce ilusão do amor e a dura realidade da solidão, mostrando como os encontros inesperados podem transformar o coração e despertar emoções profundas. Cada passo pelas ruas desertas, cada conversa cheia de sinceridade e cada silêncio carregado de expectativa, revelam a sensibilidade e a vulnerabilidade do jovem, e a intensidade dos sentimentos que nascem entre dois corações que se reconhecem.

        “Noites Brancas” é uma obra poética, delicada e profundamente humana, que fala de sonhos, amor, esperança e desilusão, convidando o leitor a refletir sobre os encontros que iluminam nossas vidas, mesmo que apenas por uma noite, e sobre a necessidade de se conectar com os outros em um mundo muitas vezes frio e indiferente.`,
        capa: "assets/capas/noitesbrancas.jpg",
        avaliacao: 4,
        numeroAvaliacoes: 4200,
        audio: "assets/audios/noitesbrancas.mp3"
    },
    {
        id: 1,
        titulo: "A Metamorfose",
        autor: "Franz Kafka",
        detalhes: "Ficção | 96 páginas",
        sinopse: `Gregor Samsa, um caixeiro-viajante dedicado à sua família, acorda certa manhã transformado em um enorme inseto.  
        De repente, sua vida cotidiana e suas relações familiares são completamente alteradas. Confinado em seu quarto e enfrentando a rejeição de quem ama, Gregor começa a refletir sobre sua existência, seus deveres e o sentido de sua própria identidade.  

        A obra revela a angústia do isolamento, a fragilidade das relações humanas e o confronto entre a realidade e a percepção interior.  
        Kafka constrói um ambiente opressivo e ao mesmo tempo íntimo, mostrando como a transformação física de Gregor simboliza a alienação, a incomunicabilidade e o peso das expectativas sociais.  

        “A Metamorfose” é um mergulho perturbador na condição humana, onde o absurdo se mistura à empatia, convidando o leitor a questionar a própria vida, a liberdade e o valor das conexões afetivas.`,
        capa: "assets/capas/ametamorfose.jpg",
        avaliacao: 5,
        numeroAvaliacoes: 3100,
        audio: "assets/audios/ametamorfose.mp3"
    },
    {
        id: 2,
        titulo: "O Anticristo",
        autor: "Friedrich Nietzsche",
        detalhes: "Filosofia | 125 páginas",
        sinopse: `Em "O Anticristo", Nietzsche realiza uma crítica profunda e contundente ao cristianismo, analisando suas origens, valores e efeitos sobre a sociedade e o indivíduo.  
        O autor questiona a moral religiosa tradicional, apontando como ela teria enfraquecido os fortes, exaltado os fracos e promovido uma visão de mundo voltada para o além, em detrimento da vida presente.  

        Com linguagem provocativa e reflexiva, Nietzsche examina a dicotomia entre força e fraqueza, saúde e doença, liberdade e submissão, desafiando o leitor a repensar conceitos de bem, mal e virtude.  

        A obra é um convite à reflexão filosófica sobre a moralidade, a religião e o papel do indivíduo no mundo, oferecendo uma análise crítica que permanece relevante para qualquer discussão sobre ética, poder e existência.`,
        capa: "assets/capas/oanticristo.jpg",
        avaliacao: 4,
        numeroAvaliacoes: 2850,
        audio: "assets/audios/oanticristo.mp3"
    },
    {
        id: 3,
        titulo: "O Príncipe",
        autor: "Nicolau Maquiavel",
        detalhes: "Política | 96 páginas",
        sinopse: `Em "O Príncipe", Maquiavel apresenta um manual direto e pragmático sobre o exercício do poder e a manutenção do Estado.  
        A obra analisa diferentes tipos de governo, estratégias para conquistar e manter territórios e a relação entre virtude e fortuna na política.  

        Maquiavel explora as qualidades que um governante deve cultivar e os vícios que deve evitar, mostrando que a moralidade tradicional muitas vezes é subordinada às exigências do poder.  
        O autor oferece uma visão realista e estratégica da política, destacando a importância da astúcia, da adaptação e da decisão firme para assegurar estabilidade e sucesso do governante.  

        Com estilo conciso e contundente, "O Príncipe" continua sendo referência essencial para compreender a natureza do poder, da liderança e das dinâmicas políticas ao longo da história.`,
        capa: "assets/capas/oprincipe.jpg",
        avaliacao: 5,
        numeroAvaliacoes: 5000,
        audio: "assets/audios/oprincipe.mp3"
    },
    {
        id: 4,
        titulo: "Cosmos",
        autor: "Carl Sagan",
        detalhes: "Astronomia | 488 páginas",
        sinopse: `Em "Cosmos", Carl Sagan nos conduz por uma jornada fascinante pelo universo, explorando desde a origem das galáxias até a evolução da vida na Terra.  
        O livro combina ciência, história e filosofia, mostrando como o conhecimento humano se desenvolveu ao longo dos séculos e como cada descoberta nos aproxima da compreensão do cosmos.  

        Sagan apresenta temas como astronomia, biologia, física e química, entrelaçando-os com histórias de cientistas que mudaram nossa visão do mundo.  
        Ele nos convida a refletir sobre o lugar da humanidade no universo e a maravilhar-nos com a complexidade, a beleza e a vastidão do espaço.  

        "Cosmos" é mais do que um livro de divulgação científica: é um convite à curiosidade, à imaginação e ao pensamento crítico, mostrando que o entendimento do universo é também uma jornada sobre nós mesmos.`,
        capa: "assets/capas/cosmos.jpg",
        avaliacao: 5,
        numeroAvaliacoes: 6800,
        audio: "assets/audios/cosmos.mp3"
    },
    {
        id: 5,
        titulo: "Café com Deus pai",
        autor: "Júnior Rostirola",
        detalhes: "Religião | 421 páginas",
        sinopse: `Em "Café com Deus Pai", Júnior Rostirola convida o leitor a um encontro diário e íntimo com Deus, proporcionando momentos de reflexão, fé e inspiração.  
        Cada devocional presente no livro é um convite para pausar a rotina e se conectar com o divino, buscando respostas para inquietações, forças para os desafios diários e orientação para o coração e a mente.  

        O autor compartilha experiências, ensinamentos e meditações que estimulam o crescimento espiritual, fortalecendo a fé e promovendo um diálogo profundo com Deus.  
        Ao longo das páginas, o leitor é incentivado a abrir o coração, cultivar a gratidão e descobrir como a presença divina pode transformar a vida cotidiana.  

        "Café com Deus Pai" é uma obra que inspira confiança, serenidade e esperança, lembrando que momentos simples de conexão com o Criador podem renovar a alma e iluminar cada dia.`,
        capa: "assets/capas/cafecomdeuspai.jpg",
        avaliacao: 4,
        numeroAvaliacoes: 2400,
        audio: "assets/audios/cafecomdeuspai.mp3"
    }
];

// Função para pegar o id da URL
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

// Preencher os dados do livro
function carregarLivro() {
    const id = getIdFromUrl();
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        alert("Livro não encontrado!");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("titulo-livro").textContent = livro.titulo;
    document.getElementById("autor-livro").textContent = livro.autor;
    document.getElementById("detalhes-livro").textContent = livro.detalhes;
    document.getElementById("sinopse-livro").textContent = livro.sinopse;
    document.getElementById("capa-livro").src = livro.capa;

    // Avaliações
    const avaliacaoContainer = document.getElementById("avaliacao-livro");
    avaliacaoContainer.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const estrela = document.createElement("span");
        estrela.textContent = i <= livro.avaliacao ? "★" : "☆";
        estrela.style.fontSize = "28px";
        estrela.style.color = "#f5c518";
        estrela.style.marginRight = "2px";
        avaliacaoContainer.appendChild(estrela);
    }

    const numeroAvaliacoes = document.createElement("p");
    numeroAvaliacoes.textContent = livro.numeroAvaliacoes.toLocaleString() + " avaliações";
    numeroAvaliacoes.classList.add("numero-avaliacoes");
    numeroAvaliacoes.style.marginTop = "5px";
    avaliacaoContainer.appendChild(numeroAvaliacoes);

    // Áudio
    if (livro.audio) {
        const audioContainer = document.getElementById("audio-livro");
        if (audioContainer) {
            const audioPlayer = document.createElement("audio");
            audioPlayer.controls = true;
            audioPlayer.src = livro.audio;
            audioContainer.innerHTML = ""; // limpa se já tiver algo
            audioContainer.appendChild(audioPlayer);
        }
    }
}

window.onload = carregarLivro;

