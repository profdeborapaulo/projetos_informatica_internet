
//Carrousel

var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

  

  
const wavePlayers = {}; // Guarda os players

function criarPlayer(id, url) {
  const container = document.getElementById(id);
  if(!container) return;

  const player = WaveSurfer.create({
    container: container,
    waveColor: '#4CAF50',
    progressColor: '#8BC34A',
    barWidth: 5,      
    barHeight: 30,   
    barRadius: 3,
    barGap: 2,
    height: 60,       
    url: url,
  });

  wavePlayers[id] = player;
}


        //Função Mostrar Conteudo
function mostrarConteudo(num) {
  const div = document.getElementById('conteudo');
  let texto = '';

  switch(num) {
    case 1:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/SapoBocarrao.jpg" alt="">
              <div class="waveform" id="audio1"></div>
              <button class="btn-audio" data-audio="audio1">▶️ Tocar</button>
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
              O Sapo Bocarrão faz parte da mesma coleção que tem O porco Narigudo e A girafa que cocoricava. É um divertido livro que encanta as crianças pelas dobraduras que saltam aos olhos e nos fazem reagir de diferentes formas. O sapo come moscas com sua boca imensa e sai perguntando aos outros animais o que eles comem, até encontrar um crocodilo enorme dizendo que come sapos de boca bem grande. No mesmo instante, Bocarrão fecha sua boca e pula no lago. O leitor infantil poderá interagir com o livro e desfrutar de ilustrações coloridas e cheias de vida.
            </div>
          </div>
        </div>
      `;
      setTimeout(() => criarPlayer('audio1', 'audio/sapobocarrao.wav'), 100);
      break;

    case 2:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/RitaNaoGrita.jpg" alt="">
              <div class="waveform" id="audio2"></div>
              <button class="btn-audio" data-audio="audio2">▶️ Tocar</button>
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
                Rita não grita é um livro infantil que aborda a importância de expressar emoções de maneira saudável. A história segue Rita, uma menina que enfrenta desafios diários e aprende a lidar com suas frustrações sem recorrer ao grito. Com ilustrações vibrantes e uma narrativa envolvente, o livro ensina às crianças que é possível comunicar seus sentimentos de forma calma e respeitosa, promovendo a empatia e o entendimento entre amigos e familiares.
            </div>
          </div>
        </div>
      `;
      setTimeout(() => criarPlayer('audio2', 'audio/RitaNaoGrita.m4a'), 100);
      break;

    case 3:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/RatinhoMorango.jpg" alt="">
              <div class="waveform" id="audio3"></div>
              <button class="btn-audio" data-audio="audio3">▶️ Tocar</button>
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
              Esta é uma divertida fábula sobre a esperteza dos pequenos contra a força dos gigantes. O ratinho que protagoniza as cenas tenta esconder um morango maduro de um grande urso que, aliás, não aparece na história. Um interlocutor oculto, mais esperto ainda que o rato (e com o qual a criança se identifica), é quem vai narrando a história, ao mesmo tempo que convence o ratinho a dividir o morango com ele.
            </div>
          </div>
        </div>
      `;
      setTimeout(() => criarPlayer('audio3', 'audio/ORatinhoMorango.m4a'), 100);
      break;

    case 4:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/Perigoso.jpg" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
              A história gira em torno de um pequeno coelho chamado Ratinho que adora aventuras emocionantes. Ele acredita ser o mais corajoso de todos os animais da floresta e está determinado a provar isso. No entanto, quando ele se depara com um animal desconhecido, Ratinho percebe que talvez nem tudo seja o que parece.

              Com uma mistura de humor e emoção, Perigoso! ensina às crianças a importância da amizade e da coragem. Através das páginas deste livro, elas aprenderão que nem sempre é necessário ser o mais corajoso para enfrentar desafios, mas sim ter amigos ao seu lado.
            </div>
          </div>
        </div>
      `;
      break;

    case 5:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/PequenoPrincipe.jpg" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
            O Pequeno Príncipe conta a história mágica, sensível, comovente,  do encontro de um uma frágil criança loura, que diz ter vindo de um pequeno planeta distante, e um piloto que caiu  com seu avião em um deserto.  Neste encontro único, em meio a convivência  no deserto, os dois repensam os seus valores e encontram o sentido da vida.
            </div>
          </div>
        </div>
      `;
      break;

    case 6:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/MeninaBonita.jpg" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
              Era uma menina linda. A pele era escura e lustrosa, que nem pêlo da pantera quando pula na chuva. Do lado da casa dela morava um coelho que achava a menina a pessoa mais linda que ele já vira na vida. Queria ter uma filha linda e pretinha como ela. Um dos maiores sucesso da autora.
            </div>
          </div>
        </div>
      `;
      break;

    case 7:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/Malala.jpg" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
           "Malala: A Menina que Queria Ir para a Escola" é uma biografia inspiradora que narra a luta de Malala Yousafzai pelo direito à educação em meio à opressão do Talibã no Paquistão.
            </div>
          </div>
        </div>
      `;
      break;

    case 8:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/ChapeuzinhoAmarelo.jpg" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
             Chapeuzinho Amarelo" é uma obra escrita por Chico Buarque, que narra a vida de uma menina chamada Chapeuzinho, que vive paralisada pelo medo. Desde festas até atividades simples, como subir escadas, tudo a assusta. Seu maior temor é encontrar o Lobo, uma figura que representa o desconhecido e o medo que ela sente. A história se desenrola mostrando como esse medo a impede de aproveitar a vida e se divertir como uma criança deveria. 
            </div>
          </div>
        </div>
      `;
      break;

    case 9:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/AfestaNoCeu.png" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
                Numa certa noite ia ter uma festa no céu, a onde, todos os bichos com asas iriam e os sem asas não iriam, então logo a tartaruga decidiu ir e todos os bichos com asas começaram a caçoar da pobre tartaruga, mas ela ignorou e continuou andando e se escondeu no violão do urubu e ele nem percebeu que a tartaruga estava lá.
            </div>
          </div>
        </div>
      `;
      break;

    case 10:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/AcigarraEaFormiga.jpeg" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
              Conta a história de uma cigarra que canta durante o verão, enquanto as formigas trabalharam para acumular provisões em seu formigueiro. No inverno, desamparada, a cigarra faminta pede-lhes um pouco dos grãos que punham a secar; perguntada sobre o que a fizera durante todo o verão, responde que não tivera tempo para juntar comida pois "cantara melodiosamente", ao que as formigas retrucam que se cantara no verão, que dançasse no inverno.
            </div>
          </div>
        </div>
      `;
      break;

    case 11:
      texto = `
        <div class="background">
          <div class="conteudo1">
            <div class="imagem">
              <img src="booksImg/OhomemAmavaCaixas.jpg" alt="">
              <button>Veja Mais</button>
            </div>
            <div class="texto1">
             A história de “O homem que amava caixas” nos fala sobre o relacionamento entre um pai e seu filho. Muito calado, pai e filho pareciam não ter assuntos, cada uma no seu mundo, vivendo seus próprios interesses. O filho sentia um enorme amor pelo pai, mas parecia que este só se interessava pelas caixas que encontrava, descobria ou construía. Mas, na verdade, aquele homem também amava muito seu filho, mas... como dizer que o amava? Como demonstrar o amor?
            </div>
          </div>
        </div>
      `;
      break;

    default:
      texto = `<p>Nenhum conteúdo encontrado.</p>`;
  }

  div.innerHTML = texto;
}
//FIM Função Mostrar Conteudo


//CODIGO AUDIOplayers

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('btn-audio')) {
    const id = e.target.dataset.audio;
    const player = wavePlayers[id];
    if(!player) return;

    if(player.isPlaying()) {
      player.pause();
      e.target.textContent = '▶️ Tocar';
    } else {
      player.play();
      e.target.textContent = '⏸️ Pausar';
    }
  }
});
//


    