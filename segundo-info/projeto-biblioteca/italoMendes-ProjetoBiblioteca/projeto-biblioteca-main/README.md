# DEVLIBRARY -- Guia e Documentação

O **DEVLIBRARY** é uma biblioteca virtual dedicada a desenvolvedores de
todos os níveis. Nosso objetivo é reunir e disponibilizar livros,
artigos e materiais de estudo sobre programação, tecnologia e
desenvolvimento de software, ajudando você a aprender, evoluir e criar.
Este documento serve como **guia de referência** para uso, manutenção e
aplicação de novas práticas no projeto, garantindo sua evolução
contínua.



# Executando o Projeto Localmente

# Pré-requisitos

-   [VS Code](https://code.visualstudio.com/) ou editor de sua
    preferência.\
-   Extensão [**Live
    Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
    instalada no VS Code.

# Passo a passo

1.  Faça o download ou clone do repositório no GitHub:

    ``` bash
    git clone https://github.com/italo-ux/devlibrary.git
    ```

2.  Abra a pasta do projeto no VS Code.\

3.  Clique com o botão direito em `index.html` → **Open with Live
    Server**.\

4.  O site abrirá no navegador em `http://127.0.0.1:5500`.



# Estrutura de Pastas

``` bash
📁 devlibrary/
 ├── index.html          # Página inicial
 ├── catalogo.html       # Catalog de livros
 ├── contato.html        # Informacoes para contato
 ├── novidade.html       # Novidades no site e em seu catalogo
 ├── sobre.html          # Sobre o site e sua equipe
 ├── LivroClick.html     # Pagina ao clicar no livro para ver suas informacoes e o adquirir 
 ├── style.css           # Estilização geral
 ├── script.js           # Lógica e objetos dos livros
 ├── /img                # Imagens do projeto
     ├── img-equipe  # Imagens da Equipe q fez o site
     ├── img-icon    # Icones
     ├── img-livro   # Capa dos livros
     ├── img-logo    # Logo da biblioteca          
 ├── /audio              # Áudios para acessibilidade
 └── README.md           # Este guia
```



# Tecnologias Utilizadas

-   **HTML5** → Marcação visual\
-   **CSS3** → Estilização e responsividade\
-   **JavaScript** → Comportamento e interação do site\
-   **Áudios IA** → Acessibilidade e experiência do usuário



# Responsividade

O projeto utiliza **Flexbox** e **media queries** para adaptação em
diferentes tamanhos de tela.\
Boas práticas aplicadas:\
- Evitar valores fixos em `px`, preferir `%`, `em` ou `rem`.\
- Uso de `display: flex` para manter alinhamentos fluidos.\
- Testes realizados em telas mobile, tablet e desktop via DevTools.



# Manutenção

# 1. **Livros**

Os livros estão definidos uma array de objetos dentro de `script.js`.\
Exemplo de objeto:

``` js
const livros = 
[
  
  {
    id: 8,
    nome: "Programming: Principles and Practice Using C++",
    autor: "Bjarne Stroustrup",
    ano: 2014,
    categoria: "Programação",
    sinopse: `"Programming: Principles and Practice Using C++...`,
    capa: `<img src="img/img-livro/Programing.jpg" alt="Programming: Principles and Practice Using C++">`,
    audio: `<audio src="audio/Programing.mp3" controls></audio>`
  },
  {
    id: 6,
    nome: "JavaScript: The Definitive Guide",
    autor: "David Flanagan",
    ano: 2020,
    categoria: "Desenvolvimento Web",
    sinopse: `JavaScript é a linguagem d...`,
    capa: `<img src="img/img-livro/GuideJavaScript.jpg" alt="JavaScript: The Definitive Guide">`,
    audio: `<audio src="audio/GuideJavaScript.mp3" controls></audio>`
  }
]
```

> **Para adicionar um novo livro:**\
> - Acrescente um novo objeto ao array `livros` seguindo o mesmo
> padrão.\
> - Garanta que `nome`, `autor` e `capa` estejam preenchidos
> corretamente.



# 2. **Estilização**

-   Todas as regras de estilo estão em `style.css`.\
-   Responsividade deve ser feita com media queries no mesmo arquivo.



# 3. **HTML**

-   Páginas separadas por função (`index.html`, `catalogo.html`).\
-   Utilizar tags semânticas (`header`, `main`, `footer`) para melhor
    acessibilidade.



# Hospedagem

Para disponibilizar o projeto online, você pode:\
- **GitHub Pages** (recomendado) → Hospedagem gratuita para sites
estáticos.\
- **Netlify / Vercel** → CI/CD integrado, deploy automático a cada
push.\
- Hospedagem própria, caso precise de banco de dados ou API.



#  Contribuição

Se outras pessoas forem colaborar com o projeto:\
1. Mantenha o padrão de código ( nomes
descritivos de classes).\
2. Documente novas funções adicionadas ao `script.js`.\
3. Crie *commits* claros com mensagens descritivas.\
4. Atualize este README caso haja mudanças importantes.



#  Changelog

  Data      Alteração
  --------- ---------------------------------
  2025-09   Criação do guia de documentação
  2025-08   Aplicacão de responsividade 




#  Acessibilidade

-   Todas as imagens devem ter `alt` descritivo.\
-   Testar contraste de cores com [Contrast
    Checker](https://contrastchecker.com/).
