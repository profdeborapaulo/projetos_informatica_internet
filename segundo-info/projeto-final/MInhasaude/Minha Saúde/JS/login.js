document.addEventListener('DOMContentLoaded', () => {
    //logica de login no site
    
    // Seleciona o formulário de login de forma segura
    const formLogin = document.querySelector('.formulario-principal'); 

    if (!formLogin || formLogin.tagName !== 'FORM') {
        console.error('Erro: Formulário de login não encontrado. Verifique a classe CSS no HTML.');
        return;
    }

    formLogin.addEventListener('submit', function(event) {
        
        event.preventDefault(); 
        // Coleta os valores digitados 
        const inputCredencial = document.getElementById('email_login').value.trim();
        const inputSenha = document.getElementById('senha_login').value.trim();
        
        // Recupera os cadastros salvos
        const cadastrosJSON = localStorage.getItem('cadastros_simulados');
        const cadastros = cadastrosJSON ? JSON.parse(cadastrosJSON) : [];

        if (cadastros.length === 0) {
            alert(' Falha no Login: Nenhum usuário cadastrado encontrado. Cadastre-se primeiro.');
            return;
        }

        // Procura por um usuário que corresponda à credencial e senha
        const usuarioEncontrado = cadastros.find(user => {
            // Verifica se a credencial corresponde ao E-mail OU ao Nome de Usuário (se preenchido)
            const credencialCorreta = user.email === inputCredencial || (user.usuario && user.usuario === inputCredencial);
            
            // Verifica se a senha corresponde
            const senhaCorreta = user.senha === inputSenha;
            
            return credencialCorreta && senhaCorreta;
        });

        // Resultado do Login
        if (usuarioEncontrado) {

            const usuarioLogado = {
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                idade: usuarioEncontrado.idade,
                residencia: usuarioEncontrado.residencia,
                // Campos que estavam faltando:
                cpf: usuarioEncontrado.cpf, 
                rg: usuarioEncontrado.rg,
                telefone: usuarioEncontrado.telefone,
            };

            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            
            alert(`✅ Login realizado com sucesso! Bem-vindo(a), ${usuarioEncontrado.nome.split(' ')[0]}! Redirecionando...`);

            window.location.href = '../HTML/perfil.html'; 

            formLogin.reset();

        } else {
            // Login falhou
            alert(' Falha no Login: Credenciais inválidas (E-mail/Usuário ou Senha incorretos).');
        }
    });
});