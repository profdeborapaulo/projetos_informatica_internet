let imagens = [{
        imagem:"./img/imagem_livro.jpg",
        titulo:"Biblioteca Virtual",
        texto:" Nossa biblioteca virtual é um espaço digital que reúne e disponibiliza livros, artigos, revistas, documentos e outrosmateriais de forma online. Diferente das bibliotecas físicas, elapode ser acessada de qualquer lugar e a qualquer hora, bastandoter conexão com a internet. Além de oferecer praticidade, permitea pesquisa rápida por temas e amplia o acesso ao conhecimento, jáque muitas vezes reúne obras raras ou de difícil acesso físico. Éuma ferramenta importante para estudantes, pesquisadores e qualquer pessoa interessada em aprender.",


      },
      {
        imagem:"./img/livro_cintifico.jpg",
        titulo:"Ficçao científica",
        texto:" Os livros de ficção científica exploram mundos que misturamciência, tecnologia e imaginação. Nesse gênero, os autores criam histórias que muitas vezes se passam no futuro, no espaço ou emrealidades alternativas, levantando questões sobre o avanço científico e seus impactos na humanidade. Robôs, viagens no tempo, inteligência artificial e civilizações alienígenas são temas comuns, usados não apenas para entreter, mas também para refletir sobre ética, sociedade e o destino humano. Ler ficção científica éuma forma de viajar para além do possível, estimulando a criatividade e convidando o leitor a pensar sobre os limites do conhecimento e da própria realidade.",

      },
      {
        imagem:"./img/livro_fantasia.jpg",
        titulo:"Fantasia",
        texto:"Os livros de fantasia transportam o leitor para mundos cheios de magia, criaturas míticas e aventuras épicas. Nesse gênero, a imaginação é a chave: dragões, elfos, feiticeiros e reinos encantados fazem parte de narrativas que desafiam as leis da realidade. Além do entretenimento, a fantasia também traz reflexões sobre coragem, amizade, poder e a luta entre o bem e o mal. Ler esse tipo de obra é mergulhar em universos mágicos que despertam a criatividade e convidam o leitor a sonhar com possibilidades além do mundo real",
      },
      {
        imagem:"./img/livro_suspense.jpg",
        titulo:"Suspense",
        texto:"Os livros de suspense são escritos para prender a atenção do leitor do começo ao fim. Neles, a trama é cercada de mistério, tensão e surpresas, mantendo sempre a sensação de que algo importante está prestes a acontecer. Reviravoltas inesperadas, segredos escondidos e personagens enigmáticos fazem parte desse gênero, que provoca curiosidade e, muitas vezes, até medo. Ler um livro de suspense é viver a experiência de estar em alerta, tentando descobrir a verdade antes que ela seja revelada.",
      }
      ]
let index= 0
let id = 1;

let activeImage = document.getElementById(`image${id}`); 
let activeDot= document.getElementById(`dot${id}`);



function changeTheClass(){
    // activeImage.classList.remove('active');
    imagens[index].src= imagens[index++];
    activeDot.classList.remove('active');
    id++;


    if(index > 3){
      index = 0
    }
    if(id > 4){
        id = 1;
    }

    // activeImage = document.getElementById(`image${id}`);
    activeDot= document.getElementById(`dot${id}`);

    // activeImage.classList.add('active'); 
    activeDot.classList.add('active');   
}

setInterval(changeTheClass, 4000);



function mostrarLivrosDeMesmaCategoria(event) {
  event.preventDefault();
  const categoria = event.target.id;
  let container = document.querySelector(".categories");
  container.innerHTML = "";

  imagens.forEach((livro) => {
    if (livro.categorias === categoria) {
      container.innerHTML += ` 
        <div class="item" id="image2">
          <div class="imagem">
            <img src="${livro.imagem}" alt="" />
          </div>

          <div class="content">
            <p class="title1">${livro.texto}</p>
            <p class="text">
              ${livro.texto}
            </p>
            <a href="./livro.html?id=Ficção Científica"><button>Saiba mais</button></a>
          </div>
        </div>
      `;
    }
    console.log(livro.id);
    
  })

}

setInterval(mostrarLivrosDeMesmaCategoria, 4000);