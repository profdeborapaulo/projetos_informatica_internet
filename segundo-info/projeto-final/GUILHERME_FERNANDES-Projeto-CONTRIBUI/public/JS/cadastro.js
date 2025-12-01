const liLogin = document.querySelector("#liLogin")
const liProfile = document.querySelector("#liProfile")
liLogin.style.display = "block";
liProfile.style.display = "none";
liHome.style.display = "none"

async function cadastrar(event) {
    if (event) event.preventDefault();

    //Elementos FRONT
    const nomeEl = document.getElementById('nome');
    const emailEl = document.getElementById('email');
    const senhaEl = document.getElementById('senha');

    const nome = nomeEl.value.trim();
    const email = emailEl.value.trim();
    const senha = senhaEl.value.trim();

    const confirmSenhaEl = document.getElementById('confirmSenha');
    const confirmMessage = document.getElementById('confirmMessage');

    if (!nomeEl || !emailEl || !senhaEl || !confirmSenhaEl) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Valida se as senhas são iguais
    if (senhaEl.value !== confirmSenhaEl.value) {
        confirmMessage.style.display = 'flex';
        confirmSenhaEl.style.borderColor = 'crimson';
        alert('As senhas não conferem.');
        confirmSenhaEl.focus();
        return;
    } else {
        if (confirmMessage) confirmMessage.style.display = 'none';
        if (confirmSenhaEl) confirmSenhaEl.style.borderColor = '';
    }

    try {
        const loader = document.querySelector('.loader-overlay');
        if (loader) loader.style.display = 'flex';

        const resposta = await fetch('/api/auth/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await resposta.json();

        if (resposta.ok && data.success) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/login';

        } else {
            alert('Erro ao realizar o cadastro. Tente novamente.');
        }

        loader.style.display = 'none';
    } catch (err) {
        console.error('Erro ao enviar cadastro:', err);
        alert('Erro ao conectar com o servidor. Verifique sua conexão.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    const btnRegister = document.getElementById('btnRegister');

    const senhaEl = document.getElementById('senha');
    const confirmSenhaEl = document.getElementById('confirmSenha');
    const confirmMessage = document.getElementById('confirmMessage');


    // Valida se as senhas são iguais
    function validaSenhas() {
        if (!senhaEl || !confirmSenhaEl || !confirmMessage) return;

        const senha = senhaEl.value;
        const confSenha = confirmSenhaEl.value;

        if (senha && confSenha && senha !== confSenha) {
            confirmMessage.style.display = 'flex';
            confirmSenhaEl.style.borderColor = 'crimson';
        } else {
            confirmMessage.style.display = 'none';
            confirmSenhaEl.style.borderColor = '';
        }
    }

    // Define metodos dos elementos
    senhaEl.addEventListener('input', validaSenhas);
    confirmSenhaEl.addEventListener('input', validaSenhas);

    if (form) {
        form.addEventListener('submit', cadastrar);
    }

    if (btnRegister) {
        btnRegister.addEventListener('click', cadastrar);
    }
});