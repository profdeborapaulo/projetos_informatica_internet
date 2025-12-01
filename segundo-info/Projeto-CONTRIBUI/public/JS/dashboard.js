const token = localStorage.getItem('token');
const usuario_id = localStorage.getItem('usuario_id');
const nomeUsuario = localStorage.getItem('nomeUsuario');
const liLogin = document.querySelector("#liLogin")
const liProfile = document.querySelector("#liProfile")
const loader = document.querySelector('.loader-overlay');

document.addEventListener('DOMContentLoaded', function() {
    // Valida o token
    validaToken()

    // Carrega os dados da pagina 
    carregarDados();
})

const validaToken = async () => {
    const res = await fetch('/api/auth/validate',  {
        method: 'GET'
    })

    if(res.status != 200){
        liProfile.style.display = "none"
        liHome.style.display = "none"
        liLogin.style.display = "block"

        window.location.href = "/"
    }
    else{
        liProfile.style.display = "block";
        liLogin.style.display = "none";
    }
}

async function carregarDados(){
    loader.style.display = 'flex';
    // Carregando Nome
    const nomeWelcome = document.getElementById('nomeUsuario');
    nomeWelcome.textContent = nomeUsuario;


    // Carregando Grupos
    const resposta = await fetch(`/api/grupo/listar/${usuario_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    })

    const data = await resposta.json()
    const listaGrupos = data.grupos;
    const groupList = document.getElementById('gruposList');

    if(listaGrupos.length > 0){ 
        let htmlContent = '';
        listaGrupos.forEach(grupo => {
            htmlContent += `<a href="/api/grupo/${grupo.grupo_id}" class="sub-card">${grupo.nome_grupo || 'Grupo Sem Nome'}</a>`;
        });
        groupList.innerHTML = htmlContent;

    }
    
    groupList.innerHTML += `<a id="btnAddGrupoModal" class="sub-card">Adicionar Grupos</a>`

    const btnAdd = document.getElementById("btnAddGrupoModal")
    const btnClose = document.getElementById("btnCloseModal")
    const modalEntrar = document.querySelector("#dialogShareCode")

    if(btnAdd){

        btnAdd.onclick = () => {
            modalEntrar.showModal();
        }
    }

    if(btnClose){
        btnClose.onclick = () => {
            modalEntrar.close();
        }
    }


    const contas = ["Trabalho", "Familia"];
    const usuarios = [50, 100];

    // Seleciona o canvas
    const ctx = document.getElementById("graficoUsuarios");

    // Cria o gráfico
    new Chart(ctx, {
    type: "bar",
    data: {
        labels: contas,
        datasets: [{
        label: "Contas",
        data: usuarios,
        borderWidth: 1,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)"
        }]
    },
    options: {
        responsive: true,
        scales: {
        y: { beginAtZero: true }
        }
    }
    });

    loader.style.display = 'none';
}

// Pegando todos os inputs OTP
const otpInputs = document.querySelectorAll(".otp-input")
let otpValue = ""

function getOTPValue() {
    let value = ""
    otpInputs.forEach((input) => {
        value += input.value
    })
    return value
}

// Adicionando eventos para cada input
otpInputs.forEach((input, index) => {
// Evento de t (quando digita
    input.addEventListener("input", (e) => {
        const value = e.target.value

        // Permite apenas números
        if (!/^\d*$/.test(value)) {
            e.target.value = ""
            return
        }
        
        // Atualiza o valor global
        otpValue = getOTPValue()

        // Move para o próximo input se digitou um número
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus()
        }

    })

    input.addEventListener("keydown", (e) => {
        // Volta para o input anterior
        if (e.key === "Backspace" && !input.value && index > 0) {
            if (input.value) {
                // Se tem valor apaga
                input.value = ""
                getOTPValue()
            } else if (index > 0) {
                // Se não tem valor volta para o anterior e apaga ele
                otpInputs[index - 1].focus()
                otpInputs[index - 1].value = ""
                getOTPValue()
            }
            e.preventDefault()
        }

        //Move para o input anterior
        if (e.key === "ArrowLeft" && index > 0) {
            otpInputs[index - 1].focus()
        }

        // Seta direita: move para o próximo input
        if (e.key === "ArrowRight" && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus()
        }
    })
    
    
})




const btnEntrarGrupoModal = document.querySelector("#btnEntarGrupoModal");
btnEntrarGrupoModal.onclick = entrarGrupo;

const btnCriarGrupo = document.querySelector("#btnCriarGrupo");
btnCriarGrupo.onclick = cadastrarGrupo;

const entrarGrupoLinkModal = document.querySelector("#entrarGrupoLinkModal")
entrarGrupoLinkModal.onclick = () => {
    const modalEntrar = document.querySelector("#dialogShareCode")
    const modalCadastro = document.querySelector("#dialogCadastrarGrupo")
    
    tipoGrupo.value = "";
    nomeGrupo.value = "";

    modalCadastro.close();
    modalEntrar.showModal();
}

const criarGrupoLinkModal = document.querySelector("#criarGrupoLinkModal")
criarGrupoLinkModal.onclick = () => {
    const modalEntrar = document.querySelector("#dialogShareCode")
    const modalCadastro = document.querySelector("#dialogCadastrarGrupo")
    
    otpInputs.forEach((input) => {
        input.value = "";
    })

    modalEntrar.close();
    modalCadastro.showModal();
}





async function entrarGrupo(){
    loader.style.display = 'flex';
    if(otpValue.trim() != null && otpValue.length == 6 ){
        const grupoCodigo = otpValue;

        const resposta = await fetch('/api/grupo/entrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id,
                grupoCodigo
            })
        })

        if(resposta.status == 200){
            otpInputs.forEach((input) => {
                input.value = "";
            })

            const modalEntrar = document.querySelector("#dialogShareCode")
            modalEntrar.close();
            
            carregarDados();
        }
        else if(resposta.status == 406){
            otpInputs.forEach((input) => {
                input.value = "";
            })

            alert("Você já está neste grupo!")
        }
        else if(resposta.status == 404){
            otpInputs.forEach((input) => {
                input.value = "";
            })

            alert("Codigo Invalido!")
        }
    }
    loader.style.display = 'none';
}


async function cadastrarGrupo(){
    loader.style.display = 'flex';
    const nomeGrupo = document.querySelector("#nomeGrupo").value;
    const tipoGrupo = document.querySelector("#tipoGrupo").value;

    const resposta = await fetch('/api/grupo/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeGrupo,
            tipoGrupo,
            usuario_id
        })
    })

    if(resposta.status == 200){
        const modalCadastro = document.querySelector("#dialogCadastrarGrupo")
        modalCadastro.close();
        
        carregarDados();
    }
    else if(resposta.status = 401){
            alert("Você deve estar logado para fazer isto!")
            
            window.location.href = '/login';
        }
    loader.style.display = 'none';
}