//para verificar o redirecionamento ao clicar no botão de perfil (canto direto da nav)
document.addEventListener('DOMContentLoaded', () => {
    // Tenta encontrar o link/botão de login/perfil
    const loginButton = document.querySelector('.login-button');
    
    if (!loginButton) {
        // Se o elemento não existir, o script para.
        return;
    }

    // Verifica o status do login no sessionStorage
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
        // Em caso de usuário logado 
        // Altera o atributo 'href' para ir para o perfil
        loginButton.href = '../HTML/perfil.html'; 

    } else {
        // Em caso de usuário não logado 
        // Garante que o atributo 'href' aponte para o login
        loginButton.href = '../HTML/login.html'; 

        console.log('Botão de Perfil: Redirecionando para Login.');
    }
});