#  naCidade

O *naCidade é uma plataforma web voltada para a divulgação e descoberta de eventos de pequeno e médio porte na cidade de Barueri e região.  
A proposta é facilitar a vida de quem quer ficar por dentro de shows, apresentações de humor, esportes, teatros e eventos infantis — tudo em um só lugar.

>  A ideia surgiu quando percebi que perdi um show de um humorista que eu gosto porque fiquei sabendo só depois que já tinha acontecido*.  
> Isso me motivou a criar o naCidade!

---

## Funcionalidades

### Usuário
- Criação de conta real (salva na **MockAPI**)
- Login e autenticação
- Edição de perfil (com **foto de perfil personalizada**)
- Logout funcional
- Exibição dinâmica do nome e foto no menu lateral

### Eventos
- Cadastro de novos eventos via formulário completo  
  (categoria, nome, local, data, horário, tipo, descrição e imagem)
- Listagem automática dos eventos na home e nas categorias
- Filtro por:
  - Gratuitos / Pagos  
  - Música  
  - Humor  
  - Esportes  
  - Teatro e Espetáculos  
  - Infantil
- Página individual para cada evento com informações detalhadas
- Exibição dos **6 próximos eventos** com base na data

### Pesquisa
- Barra de busca funcional (filtra eventos por nome)
- Indicador de carregamento ao pesquisar
- Resultados exibidos dinamicamente

### Contato
- Página de contato simples e funcional

### Interface
- Layout **totalmente responsivo**
- Design moderno com **Bootstrap 5**
- Rodapé fixo com links e redes sociais
- Paleta de cores padronizada (azul principal `#001d57`)

---

## Tecnologias Utilizadas

| Categoria | Ferramenta |
|------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Framework** | [Bootstrap 5.3](https://getbootstrap.com/) |
| **Banco de Dados / API** | [MockAPI](https://mockapi.io/) |
| **Ícones** | [Bootstrap Icons](https://icons.getbootstrap.com/) |

---

## Estrutura do Projeto

naCidade/
│
├── pages/
| ├── index.html
│ ├── login.html
│ ├── criar-conta.html
│ ├── perfil.html
│ ├── contato.html
│ ├── cadastre-evento.html
│ ├── todos-eventos.html
│ ├── eventos-gratuitos.html
│ ├── eventos-pagos.html
│ ├── musica.html
│ ├── humor.html
│ ├── esportes.html
│ ├── teatro.html
│ ├── infantil.html
│ ├── evento.html
│ └── pesquisa.html
│
├── assets/
│ ├── css/
│ │ └── style.css
│ ├── js/
│ │ ├── script.js
│ │ ├── eventos.js
│ │ ├── listar-eventos.js
│ │ └── evento-detalhe.js
│ └── img/
│ ├── logo.png
│ ├── logobranca.png
│ └── ...
│
└── README.md

## API Utilizada (MockAPI)
As rotas estão hospedadas em:

## Usuários:
https://6908ed872d902d0651b22b01.mockapi.io/usuarios

## Eventos:
https://6908ed872d902d0651b22b01.mockapi.io/eventos

## Desenvolvido por
Breno,
Projeto criado com o intuito de facilitar o acesso à cultura e eventos locais.
