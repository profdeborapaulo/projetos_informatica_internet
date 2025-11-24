// import categoria from "./back-end/models/categorias";

async function mudarCategoria() {
    let parametro = new URLSearchParams(window.location.search)
    let usuario= parametro.get("usuario")
    let nomes = parametro.get("nome")
    let inicio = document.querySelector(".Inicio")
    let categorias = document.querySelector(".medicamentos")

    let novaApi = (await axios.get(`http://localhost:3000/categorias/${nomes}`)).data;

    inicio.innerHTML= `
        <div class="remedio">
            <div class="i"><i class="${novaApi.categoria.icon}"></i></div>
            <div>
                <p class="title">${novaApi.categoria.nome}</p>
                <p>${novaApi.categoria.descricao}</p>
            </div>
        </div>
    `

    novaApi.medicamentos.forEach(element => {
        console.log(element)
        categorias.innerHTML+= `
            <div class="cadaCategoria">
                <div class="topo">
                    <p>${element.nome}</p>
                </div>
                
                <p class="cinza">${element.categoria}</p>
                <p>${element.descricao}</p>
                <div class="button">
                    <a href="./remedio.html?nome=${element.nome}&usuario=${usuario}"><button>Detalhes</button></a>
                </div>
            </div>
        `

    });
    console.log(nomes);
    console.log(novaApi);
    
    

}
mudarCategoria()