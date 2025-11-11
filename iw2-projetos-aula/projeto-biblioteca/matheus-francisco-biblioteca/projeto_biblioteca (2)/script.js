let biblioteca = {
    nome: "Biblioteca Novo Mundo",
    endereco: "Rua Piraporão, 1000",
    livro:[
        {
            titulo: "Dom Casmurro",
            autor: "Machado de Assis",
            ano: 1899
        },
        {
            titulo: "Quincas Borba",
            autor: "Machado de Assis",
            ano: 1891
        },
        {
            titulo: "Laços de Família",
            autor: "Clarice Lispector",
            ano: 1988
        },
        {
           
            titulo: "Descoberta do Mundo",
            autor: "Clarice Lispector",
            ano: 1988 
        },
        {
        titulo: "Sentimento do Mundo",
        autor: "Carlos Drummond de Andrade",
        ano: 1940
        },
        {
        titulo: "Alguma Poesia",
        autor: "Carlos Drummond de Andrade",
        ano: 1935
        }
    ]
}

    function mostrarLivros() {
        const div= document.getElementById("saida");
        div.innerHTML= `<h2> ${biblioteca.nome} </h2>
        <p><strong>Endereço:</strong> ${biblioteca.endereco}</p>
        <h3> Livros Disponíveis: </h3>`;
        
        biblioteca.livros.forEach(function(livro){
            div.innerHTML +=
            `<div class="livro">` + 
            `<strong> Título: </strong>` + livros.titulo + `<br> ` + 
            `<strong> Autor: </strong>` + livros.autor + `<br> ` +
            `<strong> Ano de Publicação: </strong>` + livro.ano + `<br> ` +
            `</div>` + `<br>`;
            });
        }

        slide.innerHTML = `
            <h3>${tituloHtml}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
        `;
        track.appendChild(slide);
    ;

    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

