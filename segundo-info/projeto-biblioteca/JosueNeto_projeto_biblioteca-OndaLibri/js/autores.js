const AUTORES = [
  {
    id: 1,
    name: "Carlos Drummond",
    img: "img/Carlos_Drummond.jpg",
    bio: "Carlos Drummond de Andrade nasceu em Itabira, Minas Gerais, em 1902. Poeta, contista e cronista, foi autor, entre outros, de Alguma poesia, Brejo das almas, Sentimento do mundo, Claro enigma, Fazendeiro do ar e Fala, amendoeira, e é considerado um dos maiores nomes da poesia brasileira do século XX. Faleceu no Rio de Janeiro, em 1987, aos 84 anos."
  },
  {
    id: 2,
    name: "Clarice",
    img: "img/clarice.png",
    bio: "Uma escritora decidida a desvendar as profundezas da alma. Essa é Clarice Lispector, que escolheu a literatura como bússola em sua busca pela essência humana. Sua tentativa de transcender o cotidiano revela-se em personagens na iminência de um milagre, uma explosão ou uma singela descoberta. Todos suscetíveis aos acontecimentos do dia a dia. Vidas que se perdem e se encontram em labirintos formados por uma linguagem única, meticulosamente estruturada. E é por essa linguagem que Clarice Lispector constrói uma obra de caráter tão profundo quanto universal."
  },
  {
    id: 3,
    name: "Emily Brontë",
    img: "img/Emily_Brontë.jpg",
    bio: "Emily Brontë (1818–1848) foi uma romancista e poetisa britânica, famosa por seu único romance, O Morro dos Ventos Uivantes. Nascida e criada em Yorkshire, ela viveu uma vida reclusa e introvertida. Escreveu sob o pseudônimo masculino de Ellis Bell e, junto com suas irmãs Charlotte e Anne, publicou uma coletânea de poemas em 1846. Apesar de sua saúde debilitada, Emily Brontë continuou a escrever e faleceu de tuberculose em 1848, aos 30 anos. "
  },
  {
    id: 4,
    name: "La Fontaine",
    img: "img/La_Fontaine.jpg",
    bio: "La Fontaine foi o célebre poeta e fabulista francês do século XVII, considerado o pai da fábula moderna, conhecido pela sua coleção de mais de 240 fábulas em verso, publicadas entre 1668 e 1694, que utilizam animais para transmitir lições morais sobre a sociedade. Nascido em 8 de julho de 1621 e falecido em 13 de abril de 1695, La Fontaine dedicou sua vida à literatura, abandonando os estudos de direito e teologia para escrever as fábulas que se tornariam obras-primas da literatura francesa. "
  },
  {
    id: 5,
    name: "Machado de Assis",
    img: "img/machado.jpg",
    bio: "Machado de Assis (1839-1908) foi um renomado escritor brasileiro, considerado um dos maiores nomes da literatura nacional e mundial, conhecido como fundador da Academia Brasileira de Letras. Nascido no Rio de Janeiro, em uma família pobre, ele foi autodidata, superando suas origens e a condição de epiléptico para se tornar um prolífico autor de romances, contos, crônicas, poesias e peças teatrais, com obras-primas como Memórias Póstumas de Brás Cubas e Dom Casmurro. "
  },
  {
    id: 6,
    name: "Michael Crichton",
    img: "img/MichaelCrichton.jpg",
    bio: "Michael Crichton nasceu em 1942 em Chicago, no estado de Illinois. Graduou-se na Harvard Medical School, defendendo seu doutorado em Políticas Públicas pelo Salk Institute for Biological Studies. Escreveu mais de quinze romances, além de livros de não ficção e diversos roteiros para TV e cinema. É o criador da série ER – Plantão Médico e, por ela, ganhou um Emmy de Melhor Série Dramática em 1996. Steven Spielberg, que adaptou sua obra-prima para o cinema, considerava-o a pessoa mais imaginativa que já conhecera. Faleceu em 2008."
  }
]

// pega o parâmetro da URL (ex: autor.html?id=1)
    const url = new URL(window.location.href);
    const autorId = url.searchParams.get("id");

    const autorCard = document.getElementById("autor-card");
    const lista = document.getElementById("lista-livros");

    if (autorId) {
      // busca no array de autores
      const autor = AUTORES.find(a => String(a.id) === String(autorId));

      if (autor) {
        autorCard.innerHTML = `
          <div class="autor-detalhe-card">
            <img src="${autor.img}" alt="${autor.name}">
            <div class="autor-info">
              <h1>${autor.name}</h1>
              <p>${autor.bio || "Este autor é conhecido por sua contribuição à literatura."}</p>
            </div>
          </div>
        `;
      }
    }
    