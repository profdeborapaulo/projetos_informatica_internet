O HTML da página foi estruturado de forma semântica, utilizando elementos como <header>, <main>, <section> e <aside>
para organizar o conteúdo. O cabeçalho contém um link com a logo (<a> com id="inicio") que redireciona
para a página principal. A navegação usa <nav class="breadcrumb"> com separadores textuais simples,
sem listas. O conteúdo principal está dividido em duas <section>: uma descritiva e outra com a
listagem de jogos, organizada em uma grid. Cada jogo é um <a> com a classe .game-card,
contendo uma imagem (<img>) e um título (<h3>). O índice lateral foi implementado com
<aside class="side-index"> e uma <ul> de links, mantendo um estilo wiki clássico.

No CSS, o layout principal usa Grid Layout na classe .game-grid (display:
grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));), o que
garante uma distribuição responsiva dos cards. Os efeitos de interação
utilizam transições suaves em .game-card:hover com transform:
translateY(-5px) e box-shadow, dando sensação de profundidade. A paleta
segue tons neutros (#f6f7f8 e #2c3e50) e bordas leves com border-radius:
6px. O índice lateral é fixado com position: fixed, ajustado no topo e à
direita, e ocultado em telas menores via media queries (@media (max-width:
1024px)). A barra de pesquisa usa um container .search-box com display: flex
e estilização reativa com :focus-within para destacar o campo quando o
usuário digita.

O JavaScript é responsável pela lógica do filtro de busca. Ele captura os
elementos com document.getElementById e document.querySelectorAll e os
armazena em arrays (gameCards e sideLinks). A função normalizeText() aplica
normalize('NFD') e remove diacríticos com regex (/[\u0300-\u036f]/g),
garantindo que a busca ignore acentuação e diferenças de
maiúsculas/minúsculas. A função filter(term) percorre cada .game-card e link
do índice, comparando o texto normalizado com o termo digitado — se não
houver correspondência, o item é ocultado via style.display = 'none'. O
evento input.addEventListener('input', ...) chama o filtro em tempo real
conforme o usuário digita. O script também inclui um keydown para limpar a
busca com a tecla Escape, embora o botão de limpar (clearBtn) ainda não
esteja presente no HTML atual.