let biblioteca= {
    nome: " Biblioteca Etec Antônio Furlan",
    endereço: "Rua João Batista Soares, 440",
    livros:[
        {titulo: "Javascript: O guia Definitivo",
        autor: "David Flanagan, João Eduardo da Nobrega, Luciana Nedel De Assis",
        ano: 2012},
        {titulo: "Algoritmos. Lógica para desenvolvimento de programação",
        autor: "Jose Augusto Navarro Garcia Manzano, Jayr Figueiredo de Oliveira",
        ano: 2009},
        {titulo: "Capitães de Areia",
        autor: "Jorge Amado",
        ano: 1937},
    ]
}
 
//console.log(biblioteca);
 
  //console.log(biblioteca)
  function mostrarLivros() {
    const div= document.getElementById("saida");
    div.innerHTML = `<h2> ${biblioteca.nome} </h2>
    <p> <strong> Endereço: </strong> ${biblioteca.endereço}</p>
    <h3> Livros Disponíveis: </h3>`;
 
    biblioteca.livros.forEach(function(livro){
        div.innerHTML +=
        `<div class="livro">`+
        `<strong> Título: </strong> ` + livro.titulo + `<br>` +
        `<strong> Autor: </strong> ` + livro.autor + `<br>` +
        `<strong> Ano de Publicação: </strong> ` + livro.ano + `<br>`
 
    })
    }