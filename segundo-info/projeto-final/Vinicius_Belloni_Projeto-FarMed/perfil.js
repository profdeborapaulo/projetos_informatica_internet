function sair(){
    let botao = document.getElementById("sair");
    botao.addEventListener('click',() =>{
        localStorage.clear();    
    })   
}

function voltarPagina() {
    window.history.back();
}