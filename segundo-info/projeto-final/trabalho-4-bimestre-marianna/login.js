// * Banco de dados falso 
const users = [
    { username: 'Marianna', email: 'mari@gmai.com', password: 'mari1234' }
    
];

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

// *Funções de Alternância de UI 
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// *Validação de Login Falsa 
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // * Impede o envio do formulário padrão

    const usernameInput = loginForm.querySelector('input[type="text"]').value;
    const passwordInput = loginForm.querySelector('input[type="password"]').value;

    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        alert(`Login bem-sucedido! Bem-vindo, ${user.username}. `);
    } else {
        alert('Falha no Login! Nome de usuário ou senha incorretos.');
    }
});

// * Registro Falso 
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // * Impede o envio do formulário padrão

    // * Pegando os valores dos inputs
    const usernameInput = registerForm.querySelector('input[type="text"]').value;
    const emailInput = registerForm.querySelector('input[type="email"]').value;
    const passwordInput = registerForm.querySelector('input[type="password"]').value;

    // * Verificação de usuário existente
    const existingUser = users.find(u => u.username === usernameInput || u.email === emailInput);

    if (existingUser) {
        alert('Falha no Registro! Nome de usuário ou e-mail já em uso.');
    } else {
        // * Adiciona o novo usuário ao 'banco de dados' falso
        users.push({username : usernameInput, email: emailInput, password: passwordInput });
        alert(`Registro bem-sucedido! Bem-vindo, ${usernameInput}. Agora você pode fazer login. `);
        
        // * Alterna para a tela de login após o registro
        container.classList.remove('active');
    }
});