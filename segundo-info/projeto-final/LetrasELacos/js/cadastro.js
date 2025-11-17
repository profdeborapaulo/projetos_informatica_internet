// === CADASTRO E LOGIN ===

// pega o formulário de cadastro
const formCadastro = document.getElementById("formCadastro");

// verifica se o formulário existe na página antes de adicionar eventos
if (formCadastro) {
  formCadastro.addEventListener("submit", (e) => {
    e.preventDefault(); // impede o envio padrão do formulário

    // captura os valores dos campos e remove espaços extras
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // coleta todos os gêneros marcados (com classe "active")
    const generos = Array.from(document.querySelectorAll(".generos span.active"))
      .map(span => span.textContent.trim());

    // verifica se todos os campos obrigatórios foram preenchidos
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    // cria o objeto do usuário com os dados digitados
    const usuario = { nome, email, senha, generos };

    // salva o usuário no localStorage (banco de dados local do navegador)
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // informa o sucesso do cadastro
    alert("Cadastro realizado com sucesso!");

    // limpa o formulário
    formCadastro.reset();

    // redireciona o usuário para a página de login
    window.location.href = "login.html";
  });
}

// pega todos os spans de gêneros e o contador na página
const generos = document.querySelectorAll(".generos span");
const contador = document.getElementById("contadorGeneros");

// adiciona o evento de clique em cada gênero
generos.forEach((span) => {
  span.addEventListener("click", () => {
    // adiciona ou remove a classe "active" ao clicar
    span.classList.toggle("active");

    // atualiza o contador de gêneros selecionados
    atualizarContador();
  });
});

// função que conta quantos gêneros estão ativos e atualiza o texto na tela
function atualizarContador() {
  const selecionados = document.querySelectorAll(".generos span.active").length;
  contador.textContent = `Selecionados: ${selecionados} gênero(s)`;
}

// === LOGIN ===

// pega o formulário de login
const formLogin = document.getElementById("formLogin");

// verifica se o formulário de login existe antes de adicionar eventos
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // impede o envio padrão do formulário

    // captura os dados digitados
    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value.trim();

    // tenta recuperar o usuário cadastrado no localStorage
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    // se não existir usuário salvo, avisa e encerra
    if (!usuarioSalvo) {
      alert("Nenhum usuário cadastrado! Cadastre-se primeiro.");
      return;
    }

    // verifica se o email digitado existe
    if (email === usuarioSalvo.email) {
      // verifica se a senha está correta
      if (senha === usuarioSalvo.senha) {
        alert("Login bem-sucedido!");

        // salva o usuário logado e redireciona para o perfil
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioSalvo));
        window.location.href = "perfil.html";
      } else {
        // senha incorreta
        alert("Senha incorreta!");
      }
    } else {
      // email não encontrado
      alert("Email não cadastrado! Cadastre-se primeiro.");
    }
  });
}
