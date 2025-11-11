const biblioteca = {
    nome: " Biblioteca Santos Dumont",
    endereço: "Rua João Batista Soares, 440",
    livros: [
        {
            titulo: "O Nome do Vento",
            autor: "Patrick Rothfuss",
            ano: 2009,
            paginas: 994,
            capa: "onome_do_vento.jpg",
            sinopse: "Ninguém sabe ao certo quem é o herói ou o vilão desse fascinante universo criado por Patrick Rothfuss. Na realidade, essas duas figuras se concentram em Kote, um homem enigmático que se esconde sob a identidade de proprietário da hospedaria Marco do Percurso. Da infância numa trupe de artistas itinerantes, passando pelos anos vividos numa cidade hostil e pelo esforço para ingressar na escola de magia, O nome do vento acompanha a trajetória de Kote e as duas forças que movem sua vida: o desejo de aprender o mistério por trás da arte de nomear as coisas e a necessidade de reunir informações sobre o Chandriano - os lendários demônios que assassinaram sua família no passado. Quando esses seres do mal reaparecem na cidade, um cronista suspeita de que o misterioso Kote seja o personagem principal de diversas histórias que rondam a região e decide aproximar-se dele para descobrir a verdade. Pouco a pouco, a história de Kote vai sendo revelada, assim como sua multifacetada personalidade - notório mago, esmerado ladrão, amante viril, herói salvador, músico magistral, assassino infame. Nesta provocante narrativa, o leitor é transportado para um mundo fantástico, repleto de mitos e seres fabulosos, heróis e vilões, ladrões e trovadores, amor e ódio, paixão e vingança.",
            audio: "onome_do_vento.mp3"
        },
        {
            titulo: "1984",
            autor: "George Orwell",
            ano: 1949,
            paginas: 328,
            capa: "1984.jpg",
            sinopse: "Em um futuro distópico, onde o mundo é dividido em três superestados totalitários, a história acompanha Winston Smith, um funcionário do Partido que começa a questionar a opressão e a vigilância constante do governo. Em meio a um ambiente de medo e controle, Winston se envolve em um romance proibido e busca a verdade sobre a realidade manipulada pelo regime. '1984' é uma crítica poderosa à tirania, à manipulação da informação e à perda da liberdade individual.",
            audio: "1984.mp3"
        },
        {
            titulo: "A Odisséia",
            autor: "Homero",
            ano: "Século VIII a.C.",
            paginas: 320,
            capa: "a_odisseia.jpg",
            sinopse: "A Odisséia é um épico grego atribuído a Homero, que narra as aventuras do herói Odisseu (Ulisses) em sua longa jornada de volta para casa após a Guerra de Troia. Enfrentando monstros, deuses e desafios sobrenaturais, Odisseu luta para retornar à sua esposa Penélope e ao filho Telêmaco. A obra explora temas como a astúcia, a perseverança e o desejo de lar, sendo uma das mais importantes da literatura ocidental.",
            audio: "a_odisseia.mp3"
        },
        {
            titulo: "Dom Casmurro",
            autor: "Machado de Assis",
            ano: 1899,
            paginas: 208,
            capa: "dom_casmurro.jpg",
            sinopse: "Dom Casmurro é um romance de Machado de Assis que narra a história de Bentinho, um jovem que se torna um homem ciumento e inseguro. Através de suas memórias, Bentinho revisita seu passado, incluindo seu amor por Capitu e a dúvida que o consome sobre a fidelidade dela. A obra é uma reflexão sobre a subjetividade da memória e a complexidade das relações humanas.",
            audio: "dom_casmurro.mp3"
        },
        {
            titulo: "O Pequeno Príncipe",
            autor: "Antoine de Saint-Exupéry",
            ano: 1943,
            paginas: 96,
            capa: "o_pequeno_principe.jpg",
            sinopse: "O Pequeno Príncipe é uma fábula poética que narra a história de um jovem príncipe que viaja de planeta em planeta, encontrando diversos personagens e aprendendo lições valiosas sobre a vida, o amor e a amizade. Através de sua simplicidade e profundidade, o livro aborda temas universais que ressoam tanto com crianças quanto com adultos.",
            audio: "o_pequeno_principe.mp3"
        },
        {
            titulo: "As 48 Leis do Poder",
            autor: "Robert Greene",
            ano: 1998,
            paginas: 220,
            capa: "as_48_leis_do_poder.jpg",
            sinopse: "As 48 Leis do Poder é um guia prático sobre estratégias de poder e influência, baseado em exemplos históricos e filosóficos. Robert Greene apresenta 48 leis que descrevem como adquirir, manter e exercer poder em diversas situações sociais e profissionais. O livro é uma leitura essencial para aqueles interessados em entender as dinâmicas de poder nas relações humanas.",
            audio: "as_48_leis_do_poder.mp3"
        }
    ]
};

function exibirCatalogo() {
    const catalogoDiv = document.getElementById("catalogo");
    // Limpa o botão inicial para dar lugar aos livros
    catalogoDiv.innerHTML = ""; 

    biblioteca.livros.forEach((livro, index) => {
        const livroCard = document.createElement("a"); // Usa uma tag <a> para o card ser clicável
        livroCard.href = `detalhes.html?id=${index}`; // Link para a página de detalhes com o ID do livro
        livroCard.classList.add("livro-card");
        
        livroCard.innerHTML = `
            <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
        `;
        catalogoDiv.appendChild(livroCard);
    });
}

// Chame a função assim que a página carregar, em vez de usar um botão
window.onload = function() {
    // Verifica se o elemento 'catalogo' existe na página atual antes de chamar a função
    if (document.getElementById("catalogo")) {
        exibirCatalogo();
    }
};


