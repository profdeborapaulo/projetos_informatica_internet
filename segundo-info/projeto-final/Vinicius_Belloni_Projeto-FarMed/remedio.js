








async function mudar(numero){
    let parametro = new URLSearchParams(window.location.search);
    let nomes = parametro.get("nome");
    const api = (await axios.get("http://localhost:3000/remedio")).data;
    let cuidado = document.querySelector("#cuidados")
    let remedios = api.find((element) => element.nome === nomes);
    
let array= [
{
    id: '1',
    codigo:`       <div class="formato-medicamento ">
                    <p class="serve">Para que serve?</p>
                    <p class="quantidade">${remedios.descricao}.</p>
                </div>

                <div class="Tomar">
                    <div class="formato-medicamento">
                        <div class="topo">
                        
                            <p>  <i class="fa-solid fa-circle-info"></i> Como Tomar</p>   
                        </div>
                        <div>
                            <p class="quantidade" >${remedios.comoTomar}</p>
                        </div>

                    </div>
                
                    <div class="formato-medicamento2">
                        <div class="topo">
                            
                            <p> <i class="fa-regular fa-clock"></i> Quando Tomar</p>
                        </div>
                        <div>
                            <p>${remedios.frequencia}</p>
                        </div>
                    </div>       
                </div>


                <div class="aviso">
                    <div class="topo">
                        
                        <p> <i class="fa-solid fa-triangle-exclamation"></i> Atenção: Dose Máxima</p>
                    </div>
                    <p>${remedios.doseMaxima}</p>
                </div>

                <div class="formato-medicamento">
                    <p class="bold">Principais cuidados</p>
                    <ul id="cuidado">
                       ${
                                remedios.avisos.map(element => {
                                    return `<li>${element}</li>`; 
                                }).join('') 
                        }
                    </ul>
                </div>`,
    
    },
    {
        id:'2',
        codigo:`          <div class="formato-medicamento">
                <div class="topo">
                    <p>  <i class="fa-solid fa-circle-info"></i> Como Tomar</p>   
                </div>
                <div>
                    <p>Dosagem</p>
                    <p class="cinza">${remedios.comoTomar}</p>
                </div>
                <div>
                     <p> <i class="fa-regular fa-clock"></i> Frequencia</p>
                </div>
                <div>
                    <p>Dose Maxima</p>
                    <p class="red">${remedios.doseMaxima}</p>
                </div>
            </div>

            <div class="formato-medicamento">
                <p>Armazenamento</p>
                <p class="cinza">${remedios.armazenamento}</p>
            </div>`,

    },
    {
        id:'3',
        codigo:`  <div class="aviso">
                <div class="topo">
                    <p> <i class="fa-solid fa-triangle-exclamation"></i> Atenção</p>
                </div>
                <p >Nem todos os efeitos ocorrem em todas as pessoas. Consulte um médico se os sintomas persistirem.</p>
                
                <div>
                    <ul>
                        ${
                            remedios.efeitos.map(element => {
                                return `<li>${element}</li>`; 
                            }).join('') 
                        }
                     
                    </ul>
                </div>
            </div>`,
    },
    {
        id:'4',
        codigo:`      <div class="aviso">
                <div class="topo">
                   <p> <i class="fa-solid fa-triangle-exclamation"></i> Avisos importantes</p>
                </div>
                <p>Leia atentamente antes de usar este medicamento.</p>

                <div>
                    <ul>
                       ${
                                remedios.avisos.map(element => {
                                    return `<li><i class="fa-solid fa-triangle-exclamation"></i>${element}</li>`; 
                                }).join('') 
                        }
                    </ul>
                </div>
            </div>`
    }
]

    let container= document.getElementById("mudar");


    let click= document.querySelectorAll(".item");
    array.forEach((item) =>{
        if(item.id == numero ){
            container.innerHTML= item.codigo;

        }
    })
    click.forEach((item) =>{
    if(item.classList.contains('ativo')){
        ;
    }else{
        item.classList.add('ativo');
        
    }
    })
    

    console.log(click.forEach((c)=>{c.id}));
    console.log(container);
    console.log(array);


    console.log(click);

    
}

function modal() {
    let adicionarRemedio =document.getElementById("adicionar");
    let modal = document.querySelector("dialog");
    let cancelar= document.getElementById("Cancelar")
    let botao = document.getElementById("botao")


    botao.addEventListener('click',() =>{
        modal.showModal();
    })
    

    cancelar.addEventListener('click', () => {
    modal.close();
    });
    console.log(cancelar);

    adicionarRemedio.addEventListener('click', () => {
    modal.close();
    });
    
}
function voltarPagina() {
    history.back();

}
modal();

