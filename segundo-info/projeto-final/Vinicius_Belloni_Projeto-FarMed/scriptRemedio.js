// import axios from "axios";

async function remedios() {
    let parametro = new URLSearchParams(window.location.search);
    let usuarios= parametro.get("usuarios");
    let nomes = parametro.get("nome");
    let flex = document.querySelector(".flex");
    let formato= document.querySelector("#paraQueServe");
    let tomar= document.querySelector("#comoTomar")
    let Quando= document.querySelector("#quandoTomar")
    let aviso= document.querySelector("#aviso")
    let cuidado = document.querySelector("#cuidados")
    let sintomas= document.querySelector("#sintomas")
    let inicio = document.querySelector(".Inicio")
    const api = (await axios.get("http://localhost:3000/remedio")).data;
   console.log(nomes);
    console.log(api);
    
    let remedios = api.find((element) => element.nome === nomes);
    console.log(remedios);
        
    
    inicio.innerHTML= `
            <div class="remedio">
                    <p id="Nome" class="title">${remedios.nome}</p>
                    <p>${remedios.descricao}</p>
                </div>
                <div class="tipo">
                    <p>${remedios.categoria}</p>
                </div>
            `
    flex.innerHTML= `
            <div class="formato-medicamento3">
                    <div class="topo">
                        
                        <p > <i class="fa-solid fa-pills"></i>  Formato do Medicamento</p>
                    </div>
                    <div>
                        <p class="tipo2">Comprido/Capsula</p>
                        <p class="quantidade">${remedios.composicao}</p>
                    </div>
                </div>
    `
    formato.innerHTML=`
         <p class="serve">Para que serve?</p>
        <p class="quantidade">${remedios.descricao}.</p>
    `

    tomar.innerHTML= `
        <div class="topo">            
            <p>  <i class="fa-solid fa-circle-info"></i> Como Tomar</p>   
        </div>
        <div>
            <p class="quantidade" >${remedios.comoTomar}</p>
        </div>
    `
    Quando.innerHTML=`
         <div class="topo">                
            <p> <i class="fa-regular fa-clock"></i> Quando Tomar</p>
        </div>
        <div>
            <p>${remedios.frequencia}</p>
        </div>
    `
    aviso.innerHTML=  `
         <div class="topo">                      
            <p> <i class="fa-solid fa-triangle-exclamation"></i> Atenção: Dose Máxima</p>
        </div>
        <p>${remedios.doseMaxima}</p>
    `

     remedios.efeitos.forEach(element => {
            sintomas.innerHTML+=`   
                 <p>
                        <input type="checkbox" name="sintomas" id="${element}" value="${element}">
                        <label for="${element}">${element}</label>
                    </p> 
            `
        })
                  
        remedios.avisos.forEach(element => {
            cuidado.innerHTML+=`   
                <li>${element}</li>    
            `
        })
           
    
    
   

    
//     const hoje = new Date();
// const formatter = new Intl.DateTimeFormat('pt-BR', {
//   day: '2-digit',
//   month: '2-digit',
//   year: 'numeric'
// });

// const dataFormatada = formatter.format(hoje);
// console.log(dataFormatada);

}
remedios();