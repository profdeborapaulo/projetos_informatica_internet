const modalAlterarSenha = document.getElementById('modalAlterarSenha');
const btnAlterarSenha = document.getElementById('btnAlterarSenha');
const btnCancelarSenha = document.getElementById('btnCancelarSenha');
const formAlterarSenha = document.getElementById('formAlterarSenha');

document.addEventListener('DOMContentLoaded', async function() {
    //Valida o token
    const usuario_id = await validaToken();

    carregarDadosPerfil(usuario_id);

    btnAlterarSenha.addEventListener('click', () => modalAlterarSenha.showModal());
    btnCancelarSenha.addEventListener('click', () => {
        formAlterarSenha.reset();
        modalAlterarSenha.close();
    });

    formAlterarSenha.addEventListener('submit', async (e) => {
        e.preventDefault();
        alterarSenha(usuario_id);
});

async function validaToken(){
    const res = await fetch('/api/auth/validate',  {
        method: 'GET'
    })

    if(res.status != 200){
        liProfile.style.display = "none"
        liHome.style.display = "none"
        liLogin.style.display = "block"

        window.location.href = "/"
        return;
    }
    else{
        liProfile.style.display = "block";
        liLogin.style.display = "none";
    }

    const data = await res.json()

    if(data.user.id != null){
        return data.user.id
    }
}

async function carregarDadosPerfil(usuario_id){
        const resposta = await fetch(`/api/usuario/${usuario_id}`, {
            method: 'GET'
        })

        const data = await resposta.json()

        if(resposta.status != 200){
            alert("Erro!");

            window.location.href('/')
        }
        else{
            const avatarLetra = document.querySelector("#avatarLetra");
            const nomeUsuario = document.querySelector("#nomeUsuario");
            const infoNome = document.querySelector("#infoNome");
            const emailUsuario = document.querySelector("#emailUsuario");
            const infoEmail = document.querySelector("#infoEmail");
            const infoCadastro = document.querySelector("#infoCadastro");

            avatarLetra.textContent = data.resultado.nome[0];
            nomeUsuario.textContent = data.resultado.nome;
            infoNome.textContent = data.resultado.nome;
            emailUsuario.textContent = data.resultado.email;
            infoEmail.textContent = data.resultado.email;

            const dataFormatada = new Date(data.resultado.data_cadastro).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            infoCadastro.textContent = dataFormatada;
        }
}});

async function alterarSenha(usuario_id) {
    const modalAlterarSenha = document.getElementById('modalAlterarSenha');
    const senhaAntiga = document.getElementById('senhaAtual').value;
    const senhaNova = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    
    if (senhaNova !== confirmarSenha) {
        alert('As senhas não conferem!');
        return;
    }
    
    try {
        const response = await fetch('/api/usuario/alterarSenha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id,
                senhaAntiga,
                senhaNova
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Senha alterada com sucesso!');
            formAlterarSenha.reset();
            modalAlterarSenha.close();
        } else {
            alert(data.message || 'Erro ao alterar senha');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao Alterar');
    }
} 