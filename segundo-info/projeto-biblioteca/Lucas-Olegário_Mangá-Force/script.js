const animes = [
  {
    id: 1,
    titulo: "Ataque dos Titãs",
    autor: "Hajime Isayama",
    ano: 2009,
    genero: "Ação / Fantasia Sombria",
    sinopse: "A humanidade vive cercada por muralhas gigantes para se proteger de criaturas devoradoras de homens chamadas Titãs. Quando uma dessas muralhas é destruída, Eren Yeager, sua irmã adotiva Mikasa e o amigo Armin juram lutar contra os monstros e descobrir a verdade por trás de sua existência.",
    capa: "img/attack.jpeg",
    fundo: "img/attack-fundo.jpg",
    audio: "audio/Ataque.mp4"
  },
  {
    id: 2,
    titulo: "Demon Slayer",
    autor: "Koyoharu Gotouge",
    ano: 2016,
    genero: "Ação / Sobrenatural",
    sinopse: "Tanjiro Kamado, um jovem bondoso, tem sua vida destruída quando sua família é massacrada por demônios, restando apenas sua irmã Nezuko, que foi transformada em uma dessas criaturas. Determinado a curá-la e vingar sua família, ele se junta aos Caçadores de Demônios, guerreiros treinados para exterminar essas feras. Em sua jornada, Tanjiro enfrenta batalhas brutais, desenvolve laços de amizade e busca a esperança em meio à escuridão.",
    capa: "img/demon-slayer.jpg",
    fundo: "img/demon-slayer-fundo.jpg",
    audio: "audio/Demon-slayer.mp4"
  },
  {
    id: 3,
    titulo: "Jujutsu Kaisen",
    autor: "Gege Akutami",
    ano: 2018,
    genero: "Ação / Sobrenatural",
    sinopse: "Yuji Itadori, um estudante comum com força física fora do normal, acaba entrando no mundo dos feiticeiros jujutsu após ingerir o dedo de Ryomen Sukuna, o Rei das Maldições. Agora, dividindo seu corpo com a entidade mais temida da história, Yuji luta para proteger os inocentes enquanto enfrenta maldições poderosas, mistérios sombrios e o inevitável destino de ser sacrificado para destruir Sukuna de uma vez por todas.",
    capa: "img/jujutsu-kaisen.jpeg",
    fundo: "img/jujutsu-kaisen-fundo.jpeg",
    audio: "audio/jujutsu.mp4"
  },
  {
    id: 4,
    titulo: "Blue Lock",
    autor: "Muneyuki Kaneshiro",
    ano: 2018,
    genero: "Esporte / Drama",
    sinopse: "Após a derrota do Japão na Copa do Mundo, a federação de futebol decide criar o Blue Lock, um projeto radical para formar o melhor atacante do mundo. Reunindo 300 jovens talentosos em um centro de treinamento fechado, apenas um sairá vencedor. Yoichi Isagi, determinado a provar seu valor, enfrenta partidas intensas onde egoísmo, estratégia e ambição definem quem continuará sonhando e quem será eliminado para sempre.",
    capa: "img/blue-lock.jpeg",
    fundo: "img/blue-lock-fundo.jpeg",
    audio: "audio/blue-lock.mp4"
  },
  {
    id: 5,
    titulo: "JoJo’s Bizarre Adventure",
    autor: "Hirohiko Araki",
    ano: 1987,
    genero: "Aventura / Sobrenatural",
    sinopse: "A saga acompanha diferentes gerações da família Joestar ao longo dos séculos, cada uma envolvida em batalhas contra forças sobrenaturais e inimigos extravagantes. Desde as lutas contra vampiros até o domínio das habilidades conhecidas como Stands, a obra mistura ação, mistério e estilo único, explorando coragem, destino e herança familiar em aventuras sempre bizarras e imprevisíveis.",
    capa: "img/jojo.jpeg",
    fundo: "img/jojo-fundo.jpg",
    audio: "audio/JoJo.mp4"
  },
  {
    id: 6,
    titulo: "Dandadan",
    autor: "Yukinobu Tatsu",
    ano: 2021,
    genero: "Ação / Comédia / Sobrenatural",
    sinopse: "Momo Ayase, uma garota que acredita em espíritos, e Okarun, um garoto obcecado por alienígenas, descobrem que ambos estavam certos: fantasmas e extraterrestres existem. Após um encontro bizarro que lhes concede poderes sobrenaturais, eles se veem obrigados a enfrentar ameaças cada vez mais absurdas e perigosas.",
    capa: "img/dandadan.jpeg",
    fundo: "img/dandadan-fundo.jpeg",
    audio: "audio/Daniel.mp4"
  },
  {
    id: 7,
    titulo: "One Punch Man",
    autor: "ONE, Yusuke Murata",
    ano: 2012,
    genero: "Ação, Comédia, Super-herói",
    sinopse: "Saitama é um herói tão poderoso que derrota qualquer inimigo com apenas um soco. Apesar de sua força incomparável, ele sofre com o tédio e a frustração de não encontrar desafios reais. Em meio a batalhas épicas e vilões excêntricos, a série equilibra humor, ação e crítica ao conceito de heroísmo, mostrando que até o homem mais forte do mundo pode se sentir vazio.",
    capa: "img/one-punch.jpeg",
    fundo: "img/one-punch-fundo.jpeg",
    audio: "audio/One-punch.mp4"
  },
  {
    id: 8,
    titulo: "Black Clover",
    autor: "Yūki Tabata",
    ano: 2015,
    genero: "Ação, Aventura, Fantasia, Comédia",
    sinopse: "Em um mundo onde a magia é tudo, Asta nasceu sem nenhum poder mágico. Apesar disso, ele sonha em se tornar o Rei Mago, o maior feiticeiro do reino. Armado apenas com uma rara espada capaz de anular feitiços, ele enfrenta inimigos poderosos ao lado de seu rival e irmão de criação, Yuno, um prodígio da magia do vento. Juntos, eles trilham caminhos diferentes, mas com o mesmo objetivo: alcançar o topo.",
    capa: "img/black.webp",
    fundo: "img/black-fundo.jpg",
    audio: "audio/Black-Clover.mp4"
  }
];


if (document.getElementById("animesContainer")) {
  const container = document.getElementById("animesContainer");
  animes.slice(0, 4).forEach(anime => { 
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${anime.capa}" alt="${anime.titulo}">
      <h3>${anime.titulo}</h3>
    `;
    card.onclick = () => {
      localStorage.setItem("animeSelecionado", JSON.stringify(anime));
      window.location.href = "detalhes.html";
    };
    container.appendChild(card);
  });
}


if (document.getElementById("catalogoContainer")) {
  const container = document.getElementById("catalogoContainer");
  animes.forEach(anime => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${anime.capa}" alt="${anime.titulo}">
      <h3>${anime.titulo}</h3>
    `;
    card.onclick = () => {
      localStorage.setItem("animeSelecionado", JSON.stringify(anime));
      window.location.href = "detalhes.html";
    };
    container.appendChild(card);
  });
}


if (document.getElementById("tituloAnime")) {
  const anime = JSON.parse(localStorage.getItem("animeSelecionado"));
  if (anime) {
    document.getElementById("tituloAnime").textContent = anime.titulo;
    document.getElementById("capaAnime").src = anime.capa;
    document.getElementById("autorAnime").textContent = anime.autor;
    document.getElementById("anoAnime").textContent = anime.ano;
    document.getElementById("generoAnime").textContent = anime.genero;
    document.getElementById("sinopseAnime").textContent = anime.sinopse;
    document.getElementById("audioSinopse").src = anime.audio;

  
    if (anime.fundo) {
      document.querySelector("header").style.background = 
        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
         url('${anime.fundo}') center/cover no-repeat`;
    } else {
      document.querySelector("header").style.background = 
        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
         url('${anime.capa}') center/cover no-repeat`;
    }
  }
}

