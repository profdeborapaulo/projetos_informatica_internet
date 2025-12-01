//logica de cadastro

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário de Cadastro
    const form = document.querySelector('.container-cadastro .formulario-principal'); 
    
    if (!form || form.tagName !== 'FORM') {
        console.error('Erro: Formulário de cadastro não encontrado. Verifique se a página é a correta.');
        return;
    }
        
    // Função auxiliar para coletar o valor do campo de forma segura
    const getSafeValue = (id) => {
        const element = document.getElementById(id);
        // Retorna o valor limpo 
        return element ? element.value.trim() : ''; 
    };

    form.addEventListener('submit', function(event) {
        
        event.preventDefault(); // Impede o envio para o servidor

        // Coleta os valores usando a função segura
        const senha = getSafeValue('senha');
        const confirmaSenha = getSafeValue('confirma_senha');
        const email = getSafeValue('email_contato');
        const telefone = getSafeValue('telefone_contato');
        const rg = getSafeValue('rg_doc');
        const cpf = getSafeValue('cpf_doc');
        
        // VALIDAÇÃO DE SENHAS 
        if (senha !== confirmaSenha) {
            alert(' Erro de Cadastro: As senhas digitadas não são idênticas. Por favor, verifique os campos Senha e Confirme a Senha.');
            document.getElementById('senha').focus();
            return; 
        }
        
        // validação de cadastro unico
        let cadastros = JSON.parse(localStorage.getItem('cadastros_simulados')) || [];
        
        const duplicado = cadastros.find(user => 
            user.email === email ||
            user.telefone === telefone ||
            user.rg === rg ||
            user.cpf === cpf
        );
        
        if (duplicado) {
            let mensagemErro = 'Dados já Cadastrados!';

            alert(mensagemErro);
            return; 
        }
        
        // salva os dados
        const dadosCadastro = {
            nome: getSafeValue('nome_completo'),
            idade: getSafeValue('idade'),
            genero: getSafeValue('genero'),
            residencia: getSafeValue('residencia_cidade'),
            email: email, 
            telefone: telefone,
            usuario: getSafeValue('usuario_login'),
            senha: senha,
            rg: rg,
            cpf: cpf,
            dataCadastro: new Date().toLocaleString('pt-BR')
        };
        
        cadastros.push(dadosCadastro);
        localStorage.setItem('cadastros_simulados', JSON.stringify(cadastros));
        
        alert('✅ Cadastro realizado com sucesso! Você será redirecionado para a tela de login.');
        
        form.reset();
        
        window.location.href = 'login.html'; 

    });
});