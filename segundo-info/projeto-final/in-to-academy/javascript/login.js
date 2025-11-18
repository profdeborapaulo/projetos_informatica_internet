const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn')
const loginBtn = document.querySelector('.login-btn')

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
}) //Quando o botão for clicado, o código colocará o container em uma espécie de lista, tornando esse código uma certe espécie de boolean, por exemplo, se o container estiver na lista, vai ser true, então o código adiciona a classe active

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
}) //E quando você clicar de novo no botão, ele vai ser removido da lista se tornando false.