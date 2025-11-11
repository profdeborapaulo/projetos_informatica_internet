//seleciona todos com a class livro
const livrosClick = document.querySelectorAll(".livro");
livrosClick.forEach(item => {
    item.addEventListener("click", () => { //captura o click
      console.log('me mata')
        const id = item.dataset.id;  //retira o data-id
        localStorage.setItem("livroSelecionado", id); // salva o ID na variavel livroselecionado
        window.location.href = "LivroClick.html"; // redireciona para a página de detalhes do livro
    });
});
//array de objetos
const livros = 
[
  {
    id: 1,
    nome: "Introdução à Programação com Python",
    autor: "Nilo Ney Coutinho Menezes",
    ano: 2022,
    categoria: "Programação",
    sinopse: "Este livro se destina ao iniciante em programação e foi escrito para ajudar o leitor autodidata a aprender a programar. Também pode ser utilizado em cursos de introdução à computação e mesmo em cursos mais avançados, nos quais o domínio das técnicas básicas de programação e da linguagem Python sejam requeridos. Aborda os conceitos básicos de programação, como expressões, variáveis, repetições, decisões, listas, dicionários, conjuntos, funções, arquivos, classes, objetos, SQL, banco de dados (SQLite 3), expressões regulares e interfaces gráficas com Tkinter, com exemplos e exercícios. Conceitos matemáticos necessários à programação são incluídos para facilitar a compreensão dos exercícios. Recursos mais avançados da computação são mencionados, permitindo ao leitor continuar a aprender conceitos mais complexos em outros textos. Embora o livro pretenda ensinar a linguagem Python (versão 3.12 ou superior), a prioridade maior é ensinar a programar, com muitos exercícios de lógica de programação, fornecendo uma preparação mais ampla ao leitor, independente de linguagem. O objetivo é mostrar os conceitos, muitas vezes sem usar todos os recursos modernos e poderosos do Python. No fim de cada capítulo são apresentados códigos que usam progressivamente cada vez mais os recursos de Python. O site que acompanha o livro traz vídeos, listagens, exercícios resolvidos e dúvidas frequentes, que podem ser utilizados como material suplementar. O software utilizado no livro pode ser baixado gratuitamente, sendo compatível com Windows, Linux e Mac OS X.",
    capa: `<img src="img/img-livro/IntroducaoPython.jpg" alt="Introdução à Programação com Python" />`,
    audio: `<audio src="audio/IntroducaoPython.mp3" controls></audio>`
  },
  {
    id: 7,
    nome: "Java: Como Programar",
    autor: "Paul Deitel, Harvey Deitel",
    ano: 2016,
    categoria: "Programação",
    sinopse: "O livro oferece uma abordagem abrangente para aprender Java, com explicações detalhadas, exemplos práticos e exercícios para fixação dos conceitos.",
    capa: `<img src="img/img-livro/JavaPogramar.jpg" alt="Java: Como Programar">`,
    audio: `<audio src="audio/JavaPogramar.mp3" controls></audio>`
  },
  {
    id: 8,
    nome: "Programming: Principles and Practice Using C++",
    autor: "Bjarne Stroustrup",
    ano: 2014,
    categoria: "Programação",
    sinopse: `"Programming: Principles and Practice Using C++, Terceira Edição" ajudará qualquer pessoa que esteja disposta a se dedicar a aprender os princípios fundamentais da programação e desenvolver as habilidades práticas necessárias para programar no mundo real. Edições anteriores foram usadas com sucesso por milhares de estudantes. Esta edição revisada e atualizada:

Assume que seu objetivo é eventualmente escrever programas que sejam bons o suficiente para que outros possam usar e manter.

Foca em conceitos e técnicas fundamentais, em vez de detalhes técnicos obscuros da linguagem.

É uma introdução à programação em geral, incluindo programação procedural, orientada a objetos e genérica, e não apenas uma introdução a uma linguagem de programação.

Cobre tanto técnicas de alto nível contemporâneas quanto técnicas de baixo nível necessárias para o uso eficiente do hardware.

Fornece uma base sólida para escrever código útil, correto, seguro quanto a tipos, fácil de manter e eficiente.

É projetado principalmente para pessoas que nunca programaram antes, mas mesmo programadores experientes acharam edições anteriores úteis como introdução a conceitos e técnicas mais eficazes.

Cobre uma ampla gama de conceitos essenciais, técnicas de design e programação, recursos da linguagem e bibliotecas.

Utiliza C++ contemporâneo (C++20 e C++23).

Cobre o design e uso de tipos embutidos e tipos definidos pelo usuário, incluindo entrada, saída, computação e gráficos simples/GUI.

Oferece uma introdução aos containers e algoritmos da biblioteca padrão do C++.

Permite registrar o livro para acesso conveniente a downloads, atualizações e/ou correções conforme estiverem disponíveis. Consulte o interior do livro para mais detalhes.`,
    capa: `<img src="img/img-livro/Programing.jpg" alt="Programming: Principles and Practice Using C++">`,
    audio: `<audio src="audio/Programing.mp3" controls></audio>`
  },
  {
    id: 6,
    nome: "JavaScript: The Definitive Guide",
    autor: "David Flanagan",
    ano: 2020,
    categoria: "Desenvolvimento Web",
    sinopse: `JavaScript é a linguagem de programação da web e é usada por mais desenvolvedores de software hoje do que qualquer outra linguagem de programação. Por quase 25 anos, este best-seller tem sido o guia de referência para programadores JavaScript. A sétima edição está totalmente atualizada para cobrir a versão 2020 do JavaScript, e novos capítulos abordam classes, módulos, iteradores, geradores, Promises, async/await e metaprogramação. Você encontrará exemplos de código esclarecedores e envolventes ao longo de todo o livro.

Este livro é para programadores que desejam aprender JavaScript e para desenvolvedores web que querem levar seu entendimento e domínio da linguagem a um nível avançado. Começa explicando a própria linguagem JavaScript em detalhes, desde o básico, e, em seguida, constrói sobre essa base para abordar a plataforma web e o Node.js.

Os tópicos incluem:

Tipos, valores, variáveis, expressões, operadores, instruções, objetos e arrays

Funções, classes, módulos, iteradores, geradores, Promises e async/await

Biblioteca padrão do JavaScript: estruturas de dados, expressões regulares, JSON, internacionalização (i18n), etc.

Plataforma web: documentos, componentes, gráficos, redes, armazenamento e threads

Node.js: buffers, arquivos, streams, threads, processos filhos, clientes web e servidores web

Ferramentas e extensões da linguagem que desenvolvedores profissionais de JavaScript utilizam`,
    capa: `<img src="img/img-livro/GuideJavaScript.jpg" alt="JavaScript: The Definitive Guide">`,
    audio: `<audio src="audio/GuideJavaScript.mp3" controls></audio>`
  },
  {
    id: 9,
    nome: "Algoritmos: Teoria e Prática",
    autor: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    ano: 2009,
    categoria: "Ciência de Dados",
    sinopse: "Este livro apresenta um texto abrangente sobre o moderno estudo de algoritmos para computadores. É uma obra clássica, cuja primeira edição tornou-se amplamente adotada nas melhores universidades em todo o mundo, bem como padrão de referência para profissionais da área. Nesta terceira edição, totalmente revista e ampliada, as mudanças são extensivas e incluem novos capítulos, exercícios e problemas; revisão de pseudocódigos e um estilo de redação mais claro.A edição brasileira conta ainda com nova tradução e revisão técnica do Prof. Arnaldo Mandel, do Departamento de Ciência da Computação do Instituto de Matemática e Estatística da Universidade de São Paulo. Elaborado para ser ao mesmo tempo versátil e completo, o livro atende alunos dos cursos de graduação e pós-graduação em algoritmos ou estruturas de dados.?",
    capa: `<img src="img/img-livro/Algoritmo.jpg" alt="Algoritmos: Teoria e Prática">`,
    audio: `<audio src="audio/Algoritmo.mp3" controls></audio>`
  },
  {
    id: 10,
    nome: "Estruturas de Dados e Algoritmos em Java",
    autor: "Michael T. Goodrich, Roberto Tamassia",
    ano: 2012,
    categoria: "Ciência de Dados",
    sinopse: "Este livro oferece uma introdução a estruturas de dados e algoritmos, incluindo projeto, análise e implementação. Em um texto simples e claro, os autores utilizam recursos visuais e cenários do mundo real, focando as funções mais populares na análise de algoritmos.",
    capa: `<img src="img/img-livro/JAVA.jpg" alt="Estruturas de Dados e Algoritmos em Java">`,
    audio: `<audio src="audio/JAVA.mp3" controls></audio>`
  },
  {
    id: 2,
    nome: "Structure and Interpretation of Computer Programs",
    autor: "Harold Abelson, Gerald Jay Sussman",
    ano: 1996,
    categoria: "Inteligência Artificial",
    sinopse: `Uma nova versão do clássico e amplamente utilizado texto, agora adaptado para a linguagem de programação JavaScript.
Desde a publicação da primeira edição em 1984 e da segunda em 1996, Structure and Interpretation of Computer Programs (SICP) influenciou currículos de ciência da computação em todo o mundo. Amplamente adotado como livro didático, tem origem em um curso introdutório popular ministrado por Harold Abelson e Gerald Jay Sussman no MIT. SICP apresenta ao leitor ideias centrais da computação ao estabelecer uma série de modelos mentais para o raciocínio computacional. As edições anteriores utilizavam a linguagem Scheme nos exemplos de programas. Esta nova versão da segunda edição foi adaptada para JavaScript.

Os três primeiros capítulos abordam conceitos de programação comuns a todas as linguagens modernas de alto nível. Os capítulos quatro e cinco, que usavam Scheme para formular processadores de linguagem, foram significativamente revisados. O capítulo quatro traz material novo, especialmente uma introdução à noção de análise de programas. O avaliador e o compilador do capítulo cinco introduzem uma disciplina de pilha sutil para suportar instruções de retorno (um recurso importante em linguagens orientadas a instruções) sem sacrificar a recursão de cauda.

Os programas em JavaScript incluídos no livro funcionam em qualquer implementação da linguagem compatível com a especificação ECMAScript 2020, utilizando o pacote JavaScript sicp fornecido pelo site da MIT Press.`,
    capa: `<img src="img/img-livro/StructureAndInterpretation.jpg" alt="Structure and Interpretation of Computer Programs">`,
    audio: `<audio src="audio/StructureAndInterpretation.mp3" controls></audio>`
  },
  {
    id: 3,
    nome: "Design Patterns: Elements of Reusable Object-Oriented Software",
    autor: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    ano: 1994,
    categoria: "Inteligência Artificial",
    sinopse: "Referência fundamental sobre padrões de projeto, apresentando soluções reutilizáveis para problemas recorrentes em desenvolvimento orientado a objetos.",
    capa: `<img src="img/img-livro/DesingPatterns.jpg" alt="Design Patterns">`,
    audio: `<audio src="audio/DesingPatterns.mp3" controls></audio>`
  },
  {
    id: 4,
    nome: "The Pragmatic Programmer",
    autor: "Andrew Hunt, David Thomas",
    ano: 1999,
    categoria: "DevOps",
    sinopse: `The Pragmatic Programmer é um daqueles raros livros técnicos que você vai ler, reler e consultar ao longo dos anos. Seja você novo na área ou um profissional experiente, sempre encontrará novos insights a cada leitura.

Dave Thomas e Andy Hunt escreveram a primeira edição deste livro influente em 1999 para ajudar seus clientes a criar softwares melhores e redescobrir a alegria de programar. Essas lições ajudaram uma geração de programadores a examinar a essência do desenvolvimento de software, independente de linguagem, framework ou metodologia, e a filosofia Pragmatic inspirou centenas de livros, screencasts, audiobooks e milhares de carreiras e histórias de sucesso.

Agora, vinte anos depois, esta nova edição revisita o que significa ser um programador moderno. Os tópicos vão desde responsabilidade pessoal e desenvolvimento de carreira até técnicas arquiteturais para manter seu código flexível e fácil de adaptar e reutilizar. Ao ler este livro, você aprenderá a:

- Combater a deterioração do software
- Aprender continuamente
- Evitar a armadilha da duplicação de conhecimento
- Escrever código flexível, dinâmico e adaptável
- Aproveitar o poder das ferramentas básicas
- Evitar programar por coincidência
- Descobrir requisitos reais
- Resolver problemas de concorrência
- Proteger contra vulnerabilidades de segurança
- Construir equipes de programadores pragmáticos
- Assumir responsabilidade pelo seu trabalho e carreira
- Testar de forma implacável e eficaz, incluindo testes baseados em propriedades
- Implementar o Pragmatic Starter Kit
- Encantar seus usuários

Escrito como uma série de seções independentes e repleto de exemplos, analogias e conselhos práticos, The Pragmatic Programmer ilustra as melhores abordagens e principais armadilhas de diversos aspectos do desenvolvimento de software. Seja você um novo programador, experiente ou gerente de projetos, use essas lições diariamente e verá melhorias rápidas em produtividade, precisão e satisfação profissional. Você aprenderá habilidades e desenvolverá hábitos e atitudes que formam a base para o sucesso de longo prazo na carreira. Você se tornará um Programador Pragmático.

"Um dos livros mais significativos da minha vida." — Obie Fernandez, Autor de The Rails Way

"Vinte anos atrás, a primeira edição de The Pragmatic Programmer mudou completamente a trajetória da minha carreira. Esta nova edição pode fazer o mesmo por você." — Mike Cohn, Autor de Succeeding with Agile, Agile Estimating and Planning, e User Stories Applied

"... repleto de conselhos práticos, técnicos e profissionais, que servirão você e seus projetos por muitos anos." — Andrea Goulet, CEO da Corgibytes, Fundadora da LegacyCode.Rocks

"... relâmpago realmente pode cair duas vezes, e este livro é a prova." — VM (Vicky) Brasseur, Diretora de Estratégia Open Source, Juniper Networks

Registre seu livro para acesso conveniente a downloads, atualizações e/ou correções conforme estiverem disponíveis. Veja detalhes no interior do livro.`,
    capa: `<img src="img/img-livro/ThePragmatic.jpg" alt="The Pragmatic Programmer">`,
    audio: `<audio src="audio/ThePragmatic.mp3" controls></audio>`
  },
  {
    id: 5,
    nome: "Código Limpo: Habilidades Práticas do Agile Software",
    autor: "Robert C. Martin",
    ano: 2009,
    categoria: "Segurança da Informação",
    sinopse: "Guia essencial para escrever código limpo, legível e sustentável, com princípios e práticas do desenvolvimento ágil.",
    capa: `<img src="img/img-livro/CodigoLimpo.jpg" alt="Código Limpo">`,
    audio: `<audio src="audio/CodigoLimpo.mp3" controls></audio>`
  }
]


const idLivro = localStorage.getItem("livroSelecionado");   //busca da memoria local a variavel livroselecionados e atribui ela a constante idlivro
const livro = livros.find(l => l.id == idLivro);   //confere na array livros o id de numero igual ao idlivro e atribui o objeto a constante livro

//se livro existir adiciona no html
if (livro) {
    document.getElementById("livro-imagem").innerHTML = `${livro.capa}`;
    document.getElementById("autor").innerHTML = `${livro.autor}`;
    document.getElementById("livro-nome").innerHTML = `${livro.nome}`;
    document.getElementById("temaLivro").innerHTML = `${livro.categoria}`;
    document.getElementsByClassName("audio")[0].innerHTML = `${livro.audio}`;

    // Sinopse resumida e completa
    const sinopseCompleta = livro.sinopse;
    const limite = 350; // número de caracteres para mostrar inicialmente
    const sinopseCurta = sinopseCompleta.length > limite ? sinopseCompleta.substring(0, limite) + "..." : sinopseCompleta;

    // Monta HTML da sinopse com botão "Ver mais"
    let sinopseHTML = `<span id="sinopse-curta">${sinopseCurta}</span>`;
    if (sinopseCompleta.length > limite) {
        sinopseHTML += `
            <span id="sinopse-completa" style="display:none;">${sinopseCompleta}</span>
            <button id="ver-mais-btn" style="margin-top:8px; border:none; color:#324A5F";background-color: transparent;>Ver mais</button>
        `;
    }
    document.getElementById("Sinopse").innerHTML = sinopseHTML;

    // Adiciona evento ao botão "Ver mais"
    const verMaisBtn = document.getElementById("ver-mais-btn");
    if (verMaisBtn) {
        verMaisBtn.onclick = function() {
            document.getElementById("sinopse-curta").style.display = "none";
            document.getElementById("sinopse-completa").style.display = "inline";
            this.style.display = "none";
        };
    }
}


//resetar o formulario
function enviar(){

const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;
const mensagem = document.getElementById("mensagem").value;

if(nome && email && mensagem){
  alert("Sua mensagem foi enviada");
}else{
  alert("Preencha todos os campos");
}

}










function mostrarLivros(){
    const div = document.getElementById("saida");
    div.innerHTML = `<h1>${biblioteca.nome}</h1>
    <p id="endereco" ><strong>Endereço:</p>
    <h2>Livros disponíveis:</h2>`;
    biblioteca.livros.forEach(function(livro){
        div.innerHTML += 
        `<div class="livro">
        <p><strong>Título:</strong> ${livro.nome}</p>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
        </div>`;
    });
}



