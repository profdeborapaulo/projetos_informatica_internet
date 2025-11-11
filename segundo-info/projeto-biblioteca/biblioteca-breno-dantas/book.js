// Objeto principal que guarda todos os livros da biblioteca

const biblioteca = {
  livros: [
    {
      id: 1,
      titulo: "Wall Street: O Livro Proibido",
      autor: "Raiam Santos",
      ano: 2016,
      genero: "tecnologia",
      imagem: "img/raiam3.jpg",
      sinopse: "Como você se sentiria se terminasse a faculdade com 21 anos ganhando quase 40 mil reais por mês? <br><br> Com um estilo agressivo e despojado que já virou sua marca registrada, o jovem escritor Raiam Santos (best-seller com Hackeando Tudo e vencedor do Prêmio Amazon 2016) conta suas aventuras como analista junior em um dos maiores bancos de investimento do mercado financeiro americano na época em que o Brasil era o queridinho dos investidores bilionários mundo afora. <br><br> Sua missão era uma só: vender o Brasil para os gringos! <br><br> Além de mostrar os bastidores de uma das principais universidades dos Estados Unidos, Wall Street desmascara bancos, fundos de investimento, corretoras de valores, redes de prostituição e basicamente tudo que gira em volta do mercado financeiro no Brasil e nos Estados Unidos. <br><br> Será que realmente vale a pena abrir mão de seus valores pessoais e correr atrás do dinheiro? <br><br> Será que os bancos realmente ligam para os interesses do cliente? <br><br> Será que morar em Times Square é realmente tudo aquilo que a gente vê na TV? <br>",
      audio: "audio/wallstreet.mp3" 
    },
    {
      id: 2,
      titulo: "Imigrante Ilegal: O Lado Negro do Sonho Americano",
      autor: "Raiam Santos",
      ano: 2016,
      genero: "tecnologia",
      imagem: "img/raiam2.jpg",
      sinopse: "Você deixaria seu filho de 14 anos se mudar para os Estados Unidos e morar com uma família desconhecida? <br><br> E se essa família o matriculasse na escola mais perigosa da cidade? <br><br> E se você descobrisse que os novos pais de seu filho estão envolvidos com o tráfico de drogas? <br><br> Numa narrativa envolvente, acelerada e politicamente incorreta, o jovem escritor Raiam Santos (Vencedor do Prêmio Amazon de Autor do Ano em 2016 & best-seller com Hackeando Tudo e Wall Street ) conta suas experiências vivendo no fogo cruzado de uma guerra racial entre latinos e afro americanos numa das escolas mais perigosas de todo Estados Unidos, dominada pelas facções criminosas dos Bloods e dos Crips. <br><br> Com o pano de fundo digno do jogo GTA San Andreas e repleto de referências ao hip-hop, aos cartéis de drogas do norte do México, e ao mundo dos esportes americanos, Imigrante Ilegal: O Lado Negro Do Sonho Americano mostra uma Califórnia bem diferente daquela retratada nos filmes adolescentes de Hollywood. <br><br> Por que será que os negros dos Estados Unidos conquistaram tantas coisas e os negros brasileiros continuam vivendo à margem da sociedade? Raiam Santos tem a resposta na ponta da língua.",
      audio: "audio/imigranteilegal.mp3" 
    },
    {
      id: 3,
      titulo: "Hackeando Tudo: 90 Hábitos Para Mudar o Rumo de Uma Geração",
      autor: "Raiam Santos",
      ano: 2015,
      genero: "tecnologia",
      imagem: "img/raiam10.jpg",
      sinopse: "Com exemplos concretos, aplicações reais e linguagem bem informal e autêntica, o jovem escritor Raiam Santos ensina a lidar com alguns dos grandes problemas enfrentados diariamente pela geração Y. <br><br> Raiam passou meses lendo biografias e estudando os hábitos diários dos maiores nomes da literatura de auto-ajuda da atualidade como Tim Ferriss, Anthony Robbins e SJ Scott e das pessoas mais bem sucedidas da historia da humanidade como John D. Rockefeller, Michael Jordan e Steve Jobs. <br><br> Raiam conseguiu adaptar certas rotinas diárias dessas personalidades para seu dia a dia e agora compartilha suas experiências depois de ter aplicado tais hábitos em sua vida pessoal. <br><br> Ao longo do livro, o autor combate sua dependência de aparelhos eletrônicos e de redes sociais como Facebook e Whatsapp, domina os fantasmas da procrastinação, multiplica sua produtividade no trabalho, remedia sua falta de perspectiva para o futuro, supera a depressão, e mergulha fundo em assuntos obscuros para a juventude brasil <br><br> beira como meditação , investimentos e livros. Para pessoas ambiciosas que querem mudar radicalmente sua visão do mundo e maneira de viver, o Hackeando Tudo é um bom ponto de partida.",
      audio: "audio/hackeandotudo.mp3" 
    },
    {
      id: 4,
      titulo: "PRIMEIRO MILHÃO",
      autor: "Raiam Santos",
      ano: 2023,
      genero: "tecnologia",
      imagem: "img/raiam1.jpg",
      sinopse: "Depois do sucesso estrondoso de Hackeando Tudo: 90 Hábitos Para Mudar o Rumo de Uma Geração (2015), Raiam Santos retorna às suas origens de levantar a ambição, a auto-estima e o conhecimento da juventude brasileira. <br><br> Oito anos depois do lançamento de seu primeiro best-seller, Raiam Santos volta mais rico, mais sagaz, mais calejado, mais experiente e mais ácido nas palavras. <br><br> Depois de vender sua participação na Kiwify por mais de 100 milhões de reais e de se tornar uma das maiores referências no mercado digital brasileiro, o jovem autor compartilha todos seus acertos (e também erros) de uma maneira informal, leve e descontraída.  <br><br> PRIMEIRO MILHÃO é um manual politicamente incorreto para se destacar no meio da multidão dentro da realidade atual.  <br><br> Sem mimimi, sem lacração e sem esquerdismo, PRIMEIRO MILHÃO não é para qualquer um. Se você se considera fraco, é melhor nem comprar esse livro. Você está avisado.",
      audio: "audio/primeiromilhao.mp3" 
    },
    {
      id: 5,
      titulo: "NEGRO NA RÚSSIA: Sexo, Racismo e Futebol... No País Mais Odiado Do Mundo",
      autor: "Raiam Santos",
      ano: 2019,
      genero: "tecnologia",
      imagem: "img/raiam5.jpg",
      sinopse: "Depois de um hiato de quase 3 anos sem publicar livros, o jovem escritor Raiam Santos (@raiamf) volta à ativa com todos os ingredientes que o fizeram se tornar, em tempo recorde, um dos escritores mais vendidos da história internet brasileira. <br><br> Com seu tom irreverente, agressivo, acelerado e politicamente incorreto, Raiam desmascara alguns segredos de um dos países mais instigantes do mundo: a Rússia. <br><br> Com a Copa do Mundo Rússia 2018 como pano de fundo, Raiam mistura política, geografia, sociologia, futebol, história, negócios, macroeconomia, psicologia humana, sexo, drogas, religião e antropologia e alterna lapsos de intelectualidade e zueira para mergulhar num universo paralelo e trazer aos olhos do mundo a Rússia que a Globo não mostra. Enquanto a TV foca nos jogadores, nos estádios e na parte turística e bonitinha da Copa, Raiam mostra todos os perrengues da vida de torcedor de classe média: comida ruim, albergue ferrado, alfabeto cirílico, cachorros de rua, prostíbulos baratos, palavrões em russo, transporte público, máfia, preços de supermercado, contrabando, noitadas locais e gente bêbada caindo na porrada. Será que a Rússia é realmente o país mais racista do mundo? Descubra!",
      audio: "audio/negronarussia.mp3" 
    },
    {
      id: 6,
      titulo: "Por Dentro da Mente de Raiam Santos",
      autor: "Raiam Santos",
      ano: 2024,
      genero: "tecnologia",
      imagem: "img/raiam6.jpg",
      sinopse: "Você está cansado de seguir as mesmas regras que mantêm tantas pessoas presas à mediocridade? Raiam Santos revela como romper com o status quo, criar suas próprias regras e viver uma vida sem amarras, baseada em liberdade financeira, propósito e ousadia. <br><br> Neste livro provocador e direto, você vai descobrir: <br><br> Como hackear o sistema tradicional e construir uma realidade sob suas próprias condições <br><br> Estratégias práticas para atingir independência financeira e transformar sua mentalidade <br><br> Lições de superação, adaptabilidade e como falhar rápido para aprender ainda mais rápido <br><br> Um guia para quem quer quebrar as regras invisíveis e viver sem limitações <br><br> Se você está pronto para sair do piloto automático, assumir o controle do seu destino e construir uma vida com propósito, este livro é para você. Aprenda com Raiam Santos como viver uma jornada fora do comum, superando obstáculos e transformando cada desafio em uma oportunidade.",
      audio: "audio/pordentrodamente.mp3" 
    },
    {
      id: 7,
      titulo: "SEM FILTRO: As Melhores Crônicas Do Menino Que Transformou Textões Em Muitos Milhões",
      autor: "Raiam Santos",
      ano: 2020,
      genero: "tecnologia",
      imagem: "img/raiam4.jpg",
      sinopse: "(SEM FILTRO: As Melhores Crônicas Do Menino Que Transformou Textões Em Muitos Milhões) é uma coletânea de crônicas e artigos escritos por Raiam Santos entre 2014 e 2017. <br><br> O livro é uma leitura leve e divertida, recheada de boas práticas e insights sobre empreendedorismo, produtividade, motivação, hipnose, networking e viagens. <br><br> Raiam Santos, que se tornou um dos maiores nomes da internet brasileira, compartilha revelações sobre sua vida pessoal e profissional, ajudando os leitores a entenderem a evolução intelectual e pessoal de um dos autores mais vendidos da história da internet brasileira. <br><br> O livro é um convite à leitura e à reflexão sobre como mudar de vida e adquirir liberdade financeira, geográfica e de tempo.",
      audio: "audio/semfiltro.mp3" 
    },
    {
      id: 8,
      titulo: "Missão Paulo Coelho: Em Genebra, Em Busca Do Mago",
      autor: "Raiam Santos",
      ano: 2016,
      genero: "tecnologia",
      imagem: "img/raiam7.jpg",
      sinopse: "O que você faria para realizar o sonho de conhecer seu maior ídolo pessoalmente? <br><br> Numa narrativa cheia de aventuras, tretas e lições existenciais, o jovem escritor Raiam dos Santos (#1 best-seller com Hackeando Tudo e Wall Street) descreve sua luta para superar seus fantasmas internos e encontrar seu verdadeiro propósito no mundo: ser escritor. <br><br> No início de 2016, Raiam tinha um objetivo bem louco e incomum: conhecer pessoalmente seu ídolo Paulo Coelho, um dos escritores que mais venderam livros em todo Planeta Terra. <br><br> MISSÃO PAULO COELHO te leva numa viagem pela França, Holanda, Estados Unidos e pela favela de Paraisópolis até o curioso e polêmico encontro entre Raiam e Paulo, aos pés dos Alpes Suíços em pleno inverno europeu. <br><br> O livro reúne elementos de auto-ajuda, humor, travel book, macroeconomia, autobiografia, manual motivacional e até de escrituras religiosas num mega-liquidificador regado aos palavrões, aos parágrafos curtos e aos capítulos acelerados que já viraram marca registrada do jovem escritor carioca. <br><br> Como será que Raiam conseguiu seguir a linguagem dos sinais e (invadir) a casa do Mago em Genebra?",
      audio: "audio/paulocoelho.mp3" 
    },
    {
      id: 9,
      titulo: "Arábia: A Incrível História De Um Brasileiro no Oriente Médio",
      autor: "Rafael Coelho e Raiam Santos",
      ano: 2017,
      genero: "tecnologia",
      imagem: "img/raiam8.jpg",
      sinopse: "Você largaria seu emprego em uma multinacional para estudar em uma universidade que ainda nem existia? <br><br> E se esta universidade fosse na Arábia Saudita? <br><br> Pois é... Rafael Coelho largou tudo, se mudou para o Oriente Médio e agora descreve, sob a perspectiva de um jovem de vinte e poucos anos, este curioso relato de forma divertida e minuciosa. <br><br> Na Arábia Saudita há muito mais do que petróleo e sheiks. Trata-se do berço do Islamismo e um dos países mais conservadores e fechados do mundo, onde mulheres não podem dirigir, bebidas alcoólicas são proibidas e a pena de morte é sentenciada por decapitação em praça pública. <br><br> ARÁBIA: A Incrível História de Um Brasileiro no Oriente Médio é uma aula de diversidade cultural e respeito às diferenças, usando de histórias reais nas terras sauditas e, também, em países vizinhos, incluindo a Síria, um pouco antes da ascensão do Estado Islâmico. <br><br> ARÁBIA é muito mais do que um livro de viagens. É uma leitura inspiradora que mostra como decisões fora da caixa podem ser acertadas e proveitosas. <br><br> Depois de conhecer essa história, será impossível você olhar para (oportunidades bizarras) com os mesmos olhos de sempre.",
      audio: "audio/arabia.mp3" 
    },
    {
      id: 10,
      titulo: "Classe Econômica #1: Europa Comunista",
      autor: "Raiam Santos",
      ano: 2016,
      genero: "tecnologia",
      imagem: "img/raiam9.jpg",
      sinopse: "Com aquele papo reto e direto que já virou sua marca registrada, o jovem escritor best-seller Raiam dos Santos (Vencedor do Prêmio Amazon 2016 e best-seller com Hackeando Tudo e Wall Street) dá uma aula de cultura, macroeconomia, história e sagacidade numa das regiões mais instáveis e perigosas do mundo. <br><br> Sua missão? Viajar por 10 países do leste europeu em apenas 10 dias e escrever um livro com as primeiras impressões de cada lugar. <br><br> A principal questão? O que acontece com uma nação depois do comunismo? <br><br> Para responder essa pergunta, Raiam se infiltrou nos mais variados lugares da Península Balcânica e trocou ideia com extremistas muçulmanos, membros da máfia local, oligarcas multimilionários, funcionários públicos, microempresários, universitários recém-formados e traficantes de drogas em países que passaram meio século sob dominação comunista como Eslováquia, Hungria, Sérvia, Croácia, Bósnia e Herzegovina, Kosovo, Macedônia e Bulgária.",
      audio: "audio/europacomunista.mp3" 
    },
  ]
};

function getBookIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}


// Função que renderiza os detalhes do livro escolhido
function renderBookDetails(book) {
  const container = document.getElementById("book-details");

// Se não encontrar o livro, mostra mensagem de erro
  if (!book) {
    container.innerHTML = "<p>Livro não encontrado.</p>";
    return;
  }

  // Monta o HTML com os dados do livro
  container.innerHTML = `
  <article class="book-detail">
    <!-- Coluna esquerda -->
    <div class="book-info">
      <h1>${book.titulo}</h1>
      <p class="autor">por ${book.autor}</p>
      <img src="${book.imagem}" alt="Capa do livro ${book.titulo}" class="book-cover" />

      ${book.audio ? `
        <section class="audio-player">
          <button class="btn-audio" onclick="document.getElementById('audio-${book.id}').play()">
             Escutar sinopse
          </button>
          <audio id="audio-${book.id}">
            <source src="${book.audio}" type="audio/mpeg" />
          </audio>
        </section>` : ""}
    </div>

    <!-- Coluna direita -->
    <section class="sinopse">
      <h2>Sinopse</h2>
      <p>${book.sinopse || "Sinopse não disponível."}</p>
      <a href="javascript:history.back()" class="btn-voltar">Voltar</a>
    </section>
  </article>
`;

}

document.addEventListener("DOMContentLoaded", () => {
  const bookId = getBookIdFromUrl();
  const book = biblioteca.livros.find((b) => b.id === bookId);
  renderBookDetails(book);
});
