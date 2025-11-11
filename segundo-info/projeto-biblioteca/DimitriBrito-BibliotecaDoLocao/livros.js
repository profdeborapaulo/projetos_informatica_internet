document.addEventListener("DOMContentLoaded", () => {
    // Aqui você cadastra os livros manualmente
    const dadosLivros = [
        {
            titulo: "Sherlock Holmes",
            autor: "Autor: Arthur Conan Doyle",
            ISBN: "ISBN: 123-456-789",
            data: "Escrito em: 1892",
            genero: "Gênero: Mistério",
            editora: "Editora: HarperCollins",
            capa: "./img/sherlock-holmes.jpg",
            sinopse: "Sherlock Holmes é um detetive londrino brilhante, famoso por sua inteligência fora do comum, raciocínio lógico e habilidade de dedução. Ao lado de seu fiel amigo e narrador das histórias, o Dr. John Watson, Holmes desvenda crimes complexos e aparentemente insolúveis, sempre observando detalhes que passam despercebidos para os outros. Criado por Arthur Conan Doyle no final do século XIX, o personagem se tornou um dos maiores ícones da literatura de mistério, enfrentando desde criminosos comuns até rivais igualmente astutos, como o inesquecível Professor Moriarty.",
            curiosidades: "1. A frase 'Elementar, meu caro Watson' nunca foi dita nos livros, só em adaptações. 2. Conan Doyle escreveu 4 romances e 56 contos com Sherlock Holmes. 3. O personagem tinha grande interesse por química e fazia experimentos em casa.",
            audio: "./audio/sherlock.mp3"
        },
        {
            titulo: "Drácula",
            autor: "Autor: Bram Stoker",
            ISBN: "ISBN: 987-654-321",
            data: "Escrito em: 1897",
            genero: "Gênero: Terror",
            editora: "Editora: Grupo Editorial Record",
            capa: "./img/dracula.jpg",
            sinopse: "Publicado em 1897, Drácula é o romance gótico que apresentou ao mundo o icônico conde vampiro. A história acompanha o jovem advogado Jonathan Harker em sua viagem à Transilvânia para tratar de negócios com o misterioso conde Drácula. Logo, Harker descobre que seu anfitrião é uma criatura sobrenatural sedenta por sangue humano. Quando Drácula se muda para a Inglaterra, espalhando terror e doenças, um grupo de personagens liderados pelo professor Van Helsing se une para enfrentá-lo. Misturando cartas, diários e registros, a narrativa cria uma atmosfera sombria e inovadora para a época, consolidando Drácula como um dos maiores clássicos do terror.",
            curiosidades: "1. O personagem foi inspirado em Vlad, o Empalador. 2. Drácula é um dos primeiros romances a popularizar o mito moderno dos vampiros na literatura ocidental. 3. Bram Stoker nunca conheceu a Transilvânia pessoalmente; ele baseou a ambientação em pesquisas e mapas da região.",
            audio: "./audio/dracula.mp3"
        },
        {
            titulo: "Admirável Mundo Novo",
            autor: "Autor: Aldous Huxley",
            ISBN: "ISBN: 987-654-321",
            data: "Escrito em: 1897",
            genero: "Gênero: Terror",
            editora: "Editora: Antígona",
            capa: "./img/mundo.jpg",
            sinopse: "Publicado em 1932, Admirável Mundo Novo apresenta uma sociedade futurista altamente controlada, onde as pessoas são condicionadas desde o nascimento para cumprir papéis específicos e a individualidade é praticamente inexistente. Tecnologia, manipulação genética e consumo desenfreado garantem estabilidade social, mas eliminam sentimentos profundos e liberdade pessoal. A história acompanha Bernard Marx e outros personagens que começam a questionar esse mundo aparentemente perfeito, revelando os custos humanos de uma ordem construída sobre controle absoluto e conformismo.",
            curiosidades: "Huxley escreveu o livro em 1931–1932, antecipando tecnologias e formas de controle social; o romance apresenta conceitos como condicionamento psicológico, engenharia genética e consumo extremo; e o título original, Brave New World, foi inspirado em uma fala da peça A Tempestade, de Shakespeare.",
            audio: "./audio/mundo.mp3"
        },
        {
            titulo: "Como Fazer Amigos e Influenciar Pessoas",
            autor: "Autor: Dale Carnegie",
            ISBN: "ISBN: 987-654-321",
            data: "Escrito em: 1936",
            genero: "Gênero: Self-help",
            editora: "Editora: Companhia",
            capa: "./img/amigos.jpg",
            sinopse: "Publicado em 1936, Como Fazer Amigos e Influenciar Pessoas é um clássico de autoajuda que ensina técnicas práticas de comunicação, persuasão e relacionamento interpessoal. O livro mostra como conquistar a confiança dos outros, resolver conflitos de maneira eficaz e inspirar pessoas ao seu redor, tanto na vida pessoal quanto profissional. Com exemplos claros e dicas aplicáveis, Dale Carnegie oferece estratégias para melhorar a empatia, a escuta ativa e a influência positiva sobre os demais.",
            curiosidades: "o livro foi publicado em 1936 e se tornou um dos maiores clássicos de autoajuda do mundo; Dale Carnegie desenvolveu suas técnicas a partir de cursos de oratória e relacionamento interpessoal que ele mesmo ministrava; e as estratégias apresentadas continuam influentes hoje, sendo aplicadas em negócios, liderança e desenvolvimento pessoal.",
            audio: "./audio/amigos.mp3"
        },
        {
            titulo: "Trono de Vidro",
            autor: "Autor: Sarah J. Maas",
            ISBN: "ISBN: 987-654-321",
            data: "Escrito em: 2012",
            genero: "Gênero: Fantasia, Aventura",
            editora: "Editora: Galera Record",
            capa: "./img/trono.webp",
            sinopse: "Trono de Vidro acompanha Celaena Sardothien, uma jovem assassina famosa, que é libertada da prisão para competir em um torneio que determinará o campeão do rei. Entre intrigas, desafios mortais e segredos sombrios do reino, Celaena precisa usar toda sua astúcia e habilidade para sobreviver e conquistar seu destino. A história mistura ação, aventura e fantasia em um mundo repleto de magia e conspirações.",
            curiosidades: "a autora Sarah J. Maas começou a escrever o livro quando tinha apenas 16 anos; a obra é o primeiro livro de uma série de fantasia que já conta com vários volumes publicados; e o enredo mistura elementos de contos clássicos, como assassinatos e reinos mágicos, com uma protagonista forte e complexa.",
            audio: "./audio/trono.mp3"
        }
        
    ];

    // Pega o id da URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    // Pega o livro pelo id
    const livro = dadosLivros[id];

    if (livro) {
        document.querySelector(".capa-livro img").src = livro.capa;
        document.querySelector(".sobre-livro h2").textContent = livro.titulo;
        document.getElementById("autor").textContent = livro.autor;
        document.getElementById("ISBN").textContent = livro.ISBN;
        document.getElementById("data").textContent = livro.data;
        document.getElementById("Genero").textContent = livro.genero;
        document.getElementById("editora").textContent = livro.editora;
        document.getElementById("sinopse").textContent = livro.sinopse;
        document.getElementById("curiosidades").textContent = livro.curiosidades;

        // adiciona o áudio
        const audioEl = document.getElementById("audio");
        if (livro.audio) {
            audioEl.src = livro.audio;
            audioEl.style.display = "block";
        } else {
            audioEl.style.display = "none";
        }
    } else {
        document.querySelector(".card").innerHTML = "<h2 style='color:white;text-align:center'>Livro não encontrado</h2>";
    }
});
