const liLogin = document.querySelector("#liLogin")
const liProfile = document.querySelector("#liProfile")
const liHome = document.querySelector("#liHome")
liLogin.style.display = "block";
liProfile.style.display = "none";
liHome.style.display = "none"

// ...existing code...
async function logar(event) {
    if (event) event.preventDefault(); // previne submit padrão

    const emailEl = document.getElementById('email');
    const senhaEl = document.getElementById('senha');

    const email = emailEl ? emailEl.value.trim() : '';
    const senha = senhaEl ? senhaEl.value : '';

    if (!email || !senha) {
        alert('Preencha e-mail e senha');
        return;
    }

    try {
        const loader = document.querySelector('.loader-overlay');
		loader.style.display = 'flex';
        const resposta = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await resposta.json();

        if (resposta.ok && data.success) {
            // Armazenando o Token
            localStorage.setItem('usuario_id', data.usuario_id)
            localStorage.setItem('nomeUsuario', data.nome)

			window.location.href = '/dashboard';
        } else {
			alert(data.message || 'Erro ao autenticar');
        }
		
		loader.style.display = 'none';
    } catch (err) {
        console.error('Erro ao enviar login:', err);
        alert('Erro ao conectar com o servidor');
    }
}

const form = document.querySelector('.login-form');
if (form) {
    form.addEventListener('submit', logar);
}

// mantém botão funcionando caso ainda queira clique
const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
    btnLogin.addEventListener('click', (e) => form ? form.requestSubmit() : logar(e));
}