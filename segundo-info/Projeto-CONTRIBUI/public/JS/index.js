const token = localStorage.getItem('token');
const liLogin = document.querySelector("#liLogin")
const liProfile = document.querySelector("#liProfile")
const liHome = document.querySelector("#liHome")

document.addEventListener('DOMContentLoaded', function() {
    // Valida o token
    validaToken()
})

const validaToken = async () => {
    const res = await fetch('/api/auth/validate',  {
        method: 'GET'
    })

    if(res.status != 200){
        liProfile.style.display = "none";
        liHome.style.display = "none";
        liLogin.style.display = "block";
    }
    else{
        liProfile.style.display = "block";
        liHome.style.display = "block";
        liLogin.style.display = "none";
    }
}

var textoHome = [
    "Familiar",
    "Pessoal",
    "Empresarial",
    "Universitário",
    "de Forma Fácil"
]


var txt = document.getElementById("spanText");
var i = 0;
function trocarTexto(){
    setTimeout(() => {
        txt.innerHTML = textoHome[i];
        i = (i+1) % textoHome.length;
    }, 500)
}

trocarTexto();
setInterval(trocarTexto, 3000);