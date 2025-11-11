Documentação do Projeto PACBOOKS
Esta documentação descreve a estrutura e as funcionalidades do site "PACBOOKS - Livraria Online", um projeto de livraria temática sobre o universo do Pac-Man.

1. Visão Geral
O PACBOOKS é um site de e-commerce fictício focado em livros relacionados ao universo do Pac-Man. O site é composto por três páginas principais: Home (index.html), Sobre (sobre.html) e Contato (contato.html). A navegação é simples e intuitiva, com um design responsivo e elementos visuais que remetem ao tema do jogo.

2. Estrutura de Arquivos
O projeto é organizado da seguinte forma:

index.html: A página inicial do site, que exibe a grade de livros. Ao clicar em um livro, um modal com detalhes e um áudio de acessibilidade é exibido.

sobre.html: A página "Sobre", que apresenta a filosofia da livraria e sua missão de ser um "refúgio para leitores apaixonados".

contato.html: A página "Contato", que oferece opções para entrar em contato via WhatsApp, E-mail ou Telegram.

formu.html: Uma página de formulário de contato, que permite aos usuários enviar uma mensagem diretamente.

script.js: O arquivo JavaScript que gerencia as funcionalidades dinâmicas do site, como a renderização dos livros na página inicial, a exibição do modal e a reprodução dos áudios.

css/: Pasta que contém os arquivos de estilização.

style.css: Estilos gerais e de componentes como os cards de livros e o modal.

index.css: Estilos específicos para a página index.html.

demais.css: Estilos para as páginas sobre.html e contato.html.

img/: Pasta para as imagens e áudios do projeto, incluindo as capas dos livros e os arquivos de áudio.

3. Funcionalidades Principais
Renderização Dinâmica de Livros: O script.js carrega a lista de livros a partir de um array e os exibe dinamicamente na página inicial, sem a necessidade de codificar cada livro manualmente no HTML.

Modal de Detalhes do Livro: Ao clicar em qualquer livro, um modal é exibido com informações detalhadas, incluindo sinopse, preços e um áudio de acessibilidade.

Áudio de Acessibilidade: O modal inclui um reprodutor de áudio que, dependendo do livro selecionado, toca um arquivo de áudio específico para fornecer uma sinopse em formato auditivo.

Design Responsivo: O site é estilizado para se adaptar a diferentes tamanhos de tela, garantindo uma boa experiência tanto em computadores quanto em dispositivos móveis.

Animações e Efeitos: Elementos como o GIF do Pac-Man na página de contato e o retângulo dourado na página "Sobre" dão um toque visual único ao site.

