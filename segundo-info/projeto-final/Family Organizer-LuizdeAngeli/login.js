// Simulação de "Banco de Dados"
const users = [
    { username: 'pai', password: '123', profile: 'pai' },
    { username: 'filho', password: '456', profile: 'filho' } // Use esta credencial para testar o painel do filho
];

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    messageElement.textContent = ''; 

    const userFound = users.find(user => 
        user.username === usernameInput && user.password === passwordInput
    );

    if (userFound) {
        sessionStorage.setItem('userProfile', userFound.profile);
        
        messageElement.style.color = 'green';
        messageElement.textContent = `Bem-vindo(a), ${userFound.profile.toUpperCase()}! Redirecionando...`;
        
        if (userFound.profile === 'pai') {
             window.location.href = 'painel_pai.html';
        } else {
             window.location.href = 'painel_filho.html';
        }

    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Usuário ou senha inválidos. Tente novamente.';
    }
});