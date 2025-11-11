# Biblioteca do Locão

## Descrição
O **Biblioteca do Locão** é um site de catálogo de livros que permite ao usuário explorar informações detalhadas sobre obras literárias, incluindo capa, autor, sinopse, curiosidades e áudio narrativo. O projeto é feito com **HTML, CSS e JavaScript** e utiliza um sistema dinâmico que evita a criação de páginas separadas para cada livro.

## Funcionalidades
- Página inicial com destaque para livros populares e categorias (infantil, adulto).
- Catálogo de livros interativo, onde cada livro redireciona para uma página de detalhes.
- Página de detalhes do livro exibindo:
  - Capa do livro
  - Título e autor
  - ISBN, gênero, editora e data de publicação
  - Sinopse e curiosidades
  - Áudio narrativo (opcional)
- Sistema dinâmico em JavaScript que carrega informações diferentes de acordo com o livro clicado.
- Layout responsivo e visual moderno com cores e efeitos personalizados.

## Tecnologias Utilizadas
- **HTML5**
- **CSS3**
- **JavaScript**
- **Imagens e Áudios** (para enriquecer a experiência do usuário)

## Estrutura do Projeto
```
/biblioteca-do-locao
│
├── index.html          # Página inicial
├── livros.html         # Página de detalhes dos livros
├── style.css           # Estilos gerais do site
├── livros.js           # Script JS para carregar os livros dinamicamente
├── /img                # Pasta com imagens de capas, logotipos e ícones
└── /audio              # Pasta com áudios narrativos (opcional)
```

## Como usar
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/biblioteca-do-locao.git
```
2. Abra o arquivo `index.html` no navegador.
3. Clique em qualquer livro para ser redirecionado à página de detalhes, onde as informações são carregadas dinamicamente.
4. Para adicionar novos livros, edite o arquivo `livros.js` adicionando novos objetos com as informações necessárias.

## Observações
- Os áudios são opcionais; caso não haja arquivo associado a um livro, o player de áudio será escondido automaticamente.
- Este projeto é voltado para fins de estudo e demonstração de manipulação dinâmica de conteúdo com JavaScript.

