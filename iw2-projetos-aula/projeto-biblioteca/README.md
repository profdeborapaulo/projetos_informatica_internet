#  BookClub --- Guia e Documentação

O **BookClub** é uma plataforma virtual para amantes da leitura. O site
reúne livros, autores e coleções, permitindo que leitores descubram
obras, conheçam escritores e participem da comunidade literária.

Este documento serve como **guia de referência** para uso, manutenção e
evolução do projeto, garantindo organização e boas práticas no
desenvolvimento.


## Funcionalidades
Exibição de informações detalhadas dos livros:
    Nome do livro
    Autor
    Sinopse
    Áudio da sinopse para fins de acessibilidade
    Layout responsivo e amigável
    Navegação intuitiva para fácil acesso às obras
------------------------------------------------------------------------

##  Executando o Projeto Localmente

### Pré-requisitos

-   [VS Code](https://code.visualstudio.com/) ou editor de sua
    preferência\
-   Extensão [**Live
    Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
    instalada no VS Code


## 📂 Estrutura de Pastas

``` bash
📁 bookclub/
 ├── biblioteca.html      # Página inicial
    ├── livros.html       #Pagína com catologo de livros
├── autores.html          # Pagína com os autores presente no site
 ├── autor-Ali.html       # Página dedicada à autora Ali Hazelwood
 ├── index.html           # Página de contato / cadastro
    ├── autor.css            # Estilização da página de autores
        ├── style.css            # Estilização geral
            ├── mai.js               # Lógica da navegação e animações
 ├── script.js            # Lógica de formulários
 ├── /imagens             # Logos, capas e ícones
 ├── /fontes              # Fontes personalizadas
 └── README.md            # Este guia
```

------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas

-   **HTML5** → Estrutura e marcação\
-   **CSS3** → Estilização e responsividade\
-   **JavaScript (ES6+)** → Interatividade e animações\
-   **GSAP + ScrollReveal** → Animações de rolagem\
-   **Animate.css** → Animações pré-definidas\
-   **Locomotive Scroll** → Efeitos de rolagem suave

------------------------------------------------------------------------

##  Responsividade

O projeto foi desenvolvido para adaptação em diferentes dispositivos: -
Uso de **Flexbox** e **media queries**\
- Layout fluido com porcentagens e `rem` ao invés de valores fixos\
- Testes realizados em mobile, tablet e desktop

------------------------------------------------------------------------

## Manutenção

### 1. **Autores**

As páginas de autores seguem um padrão (`autor-Nome.html` +
`autor.css`).\
\> Para adicionar um novo autor, copie o template e ajuste os dados
(nome, bio, imagem e redes sociais).

### 2. **Livros**

Os livros são exibidos em carrosséis na página `livros.html`.\
\> Para incluir novos títulos, adicione as imagens no diretório
correspondente e atualize o HTML.

### 3. **Formulários**

O `index.html` contém formulário de contato e inscrição.\
\> Validações adicionais podem ser incluídas em `script.js`.

------------------------------------------------------------------------

##  Hospedagem

Você pode publicar o projeto em: - **GitHub Pages** (gratuito e rápido)\
- **Netlify / Vercel** (deploy automático via Git)\
- Hospedagem própria, se precisar de back-end futuramente

------------------------------------------------------------------------

##  Contribuição

Caso outras pessoas colaborem: 1. Mantenha o padrão de nomenclatura dos
arquivos\
2. Documente novas funções no `mai.js` ou `script.js`\
3. Use commits claros e descritivos\
4. Atualize o README sempre que houver mudanças significativas

------------------------------------------------------------------------

##  Changelog

  Data      Alteração
  --------- ----------------------------------
  2025-09   Criação do guia de documentação
  2025-08   Inclusão de carrosséis de livros
  2025-07   Página dedicada a autores

------------------------------------------------------------------------

##  Acessibilidade

-   Todas as imagens possuem `alt` descritivo\
-   Navegação otimizada para teclado e leitores de tela
