// import axios from "axios";


async function categorias() {
    let parametro = new URLSearchParams(window.location.search);
    let nomes = parametro.get("usuario");
    let usuario = localStorage.getItem("usuario")
    let botao = document.getElementById("mudar")
    let container = document.querySelector(".categorias");
    const api = (await axios.get("http://localhost:3000/categorias")).data;
    console.log(api);
    

    api.forEach(element => {
           container.innerHTML+=`
            <a href="./categorias.html?nome=${element.nome}&usuario=${nomes}">
                <div class="cadaCategoria">
                    <div class="icon" id="id-cardiovascular" onclick="trocarInfos(cardiovascular)">
                        <p icon class="Titulo"><i class="${element.icon}"></i> ${element.nome}</p>
                    </div>
                    <p class="cinza">${element.descricao}</p>
                </div>
            </a>
           `;

    });
    console.log(nomes);
    


    if(usuario){
        botao.innerHTML=`
            <a  href="./perfil.html?usuario=${nomes}"><button class="botaoEntrar"><i class="fa-solid fa-arrow-right-to-bracket"></i>  Perfil</button></a>
        `
    }
}


async function buscar() {
    let input = document.getElementById("Buscar");
    let botao = document.getElementById("button");
    let popUp= document.querySelector(".pop-up");
    const api = (await axios.get("http://localhost:3000/categorias")).data;
    const apiRemedios= (await axios.get("http://localhost:3000/remedio")).data;

    apiRemedios.forEach((element)=>{
        if(input.value == element.nome || input.value == element.categoria){
            popUp.innerHTML+=`
                    <a style="display: flex;" class="a"  id="" href="./remedio.html?nome=${element.nome}">${element.nome}</a>
            `
        }else{
            console.log("meu deus");
            
        }
    })


    console.log(api);
    
}
buscar();
categorias();