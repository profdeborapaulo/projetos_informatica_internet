                                            -------- DOCUMENTAÇÃO --------
                                            
--- OBJETIVO DO PROJETO ---

Este site foi desenvolvido com o propósito de aplicar conceitos fundamentais de programação web e, ao mesmo tempo, criar uma biblioteca virtual dedicada ao autor Raphael Montes. O projeto apresenta informações sobre o escritor, sua trajetória, suas principais obras e inclui uma linha do tempo que destaca momentos importantes de sua carreira. Há também uma seção dedicada ao catálogo de livros, que reúne detalhes como título, capa, autor, gênero, editora, número de páginas, ano de publicação, sinopses disponíveis tanto em formato escrito quanto gravado, garantindo acessibilidade para pessoas com deficiência visual e botão com link de compra. Além disso, o site conta com uma página de contato que simula o envio de mensagens, tornando a navegação mais interativa. Durante o desenvolvimento, foi possível praticar a organização de código em HTML, a estilização com CSS, a criação de páginas responsivas e a implementação de interatividade em JavaScript, tornando o site mais dinâmico, aproximando a experiência de situações reais do desenvolvimento front-end e reforçando a importância da acessibilidade digital.

--------------------------------------------------------------------------------------------------------------------------


--- FUNCIONAMENTO E ESTRUTURA DO PROJETO ---

A estrutura do projeto funciona da seguinte forma;
Os arquivos principais são index.html, que funciona como a página inicial, autor.html, com as informações sobre o escritor e sua linha do tempo, livros.html, que contém os cards com capas e títulos dos livros, e contato.html, com o formulário de contato. O arquivo style.css faz toda a estilização e garante a identidade visual do site, e um script em JavaScript adiciona dinamismo às interações. Além disso, há uma pasta de imagens que armazena as capas dos livros, fotos e ícones utilizados e uma pasta de áudios com as sinopses gravadas.


    - A navegação é feita por meio de uma barra com links para as páginas principais (Início, Sobre o Autor, Livros e Contato). 
 
    - Na página inicial, o usuário encontra uma breve descrição do site e o intuito dele, além de explicar sobre a acessibilidade que nosso site proporciona. 
 
    - Na página do autor, o visitante encontra uma biografia resumida de Raphael Montes e uma linha do tempo interativa que destaca eventos importantes de sua carreira, na qual a navegação é feita por meio de setas que, ao serem clicadas, acionam uma função em JavaScript responsável por rolar o conteúdo horizontalmente. Essa função identifica a área da linha do tempo e desloca os elementos em 300 pixels para a esquerda ou para a direita, de acordo com a seta selecionada, garantindo uma rolagem suave e agradável, e um parágrafo descrevendo seu estilo de narrativa.
 
    - A página de livros apresenta os principais títulos em cards, cada um com capa e nome, com estilo hover, que ao clicar redireciona para uma página única em que o navegador guarda o id do livro clicado e relaciona na array de objetos, com os objetos puxando suas devidas informações (título, capa, autor, gênero, editora, páginas, ano, sinopse escrita e sinopse gravada e botão com link de compra), usando Javascript.
 
    - Já a página de contato contém um formulário simples com validação em JavaScript, permitindo simular o envio de mensagens, onde quando clicado em "enviar" exibirá um alert confirmando o "envio", e quando clicado em "limpar" o formulário é resetado.

    - O estilo visual é definido em style.css, onde estão configuradas as cores, as fontes, os espaçamentos e também as regras de responsividade, garantindo boa adaptação em tablets e celulares através de media queries. Por fim, o arquivo de JavaScript é responsável por controlar as interações, como o funcionamento da linha do tempo, os cards com as informções de cada livro e a validação dos formulários.

--------------------------------------------------------------------------------------------------------------------------


--- TECNOLOGIAS UTILIZADAS ---

    - HTML5 para a estruturação das páginas.

    - CSS para estilização, identidade visual e design responsivo.

    - JavaScript  para as interações dinâmicas.

    - Google Fonts para personalização da tipografia.



--------------------------------------------------------------------------------------------------------------------------


--- ACESSIBILIDADE ---

Um dos diferenciais do projeto é a preocupação com acessibilidade. Além do design responsivo, as sinopses dos livros estão disponíveis também em formato de áudio, permitindo que deficientes visuais tenham acesso ao conteúdo de maneira mais inclusiva.


--------------------------------------------------------------------------------------------------------------------------



--- EXECUÇÃO LOCAL ---

Para executar o projeto localmente, basta baixar os arquivos e abrir qualquer um dos HTML no navegador. Não é necessário instalar nada além de um navegador atualizado. Pode-se também utilizar um servidor local como a extensão Live Server ou Preview on Web Server do Visual Studio Code para facilitar a navegação entre as páginas.


--------------------------------------------------------------------------------------------------------------------------
