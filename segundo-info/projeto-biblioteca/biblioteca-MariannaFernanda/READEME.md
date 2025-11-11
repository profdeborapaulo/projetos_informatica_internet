1. Visão Geral do Projeto
O projeto Dark Book's consiste em uma biblioteca virtual, concebida com o propósito de unificar o acesso a obras literárias do gênero de terror. A plataforma visa oferecer uma experiência de navegação imersiva e personalizada, centralizando um acervo cuidadosamente selecionado. A construção do projeto emprega as tecnologias HTML, CSS e JavaScript, complementadas por um design temático que evoca o universo do terror.

2. Funcionamento e Funcionalidades
A experiência do usuário inicia-se na página de entrada (index.html), onde é solicitado ao visitante a inserção de um apelido. Esta informação é subsequentemente armazenada localmente no navegador do usuário, sendo utilizada para a personalização da mensagem de boas-vindas nas demais páginas do sítio.

O núcleo da aplicação é a página da biblioteca (biblioteca.html), que apresenta as capas dos livros em um layout responsivo. Ao interagir com a capa de um livro, um modal interativo é acionado. Este modal exibe informações detalhadas sobre a obra, incluindo título, autor, sinopse e, quando aplicável, um trecho de áudio para reprodução. Para otimizar a imersão, o cabeçalho principal da interface é temporariamente ocultado durante a exibição do modal.

Adicionalmente, o projeto inclui páginas dedicadas a autores específicos, como a de Stephen King (stephen-king.html) e Raphael Montes (raphael-montes.html), que exibem exclusivamente as obras desses autores. Uma funcionalidade de utilidade é o botão "Voltar", que permite ao usuário encerrar a sessão na biblioteca, limpar o apelido armazenado localmente e retornar à página inicial.

3. Estrutura de Arquivos
O projeto está organizado de maneira hierárquica e lógica, conforme apresentado abaixo:

index.html: Página de entrada, responsável pela coleta do apelido do usuário.

biblioteca.html: Página principal que consolida a coleção geral de obras.

stephen-king.html: Página dedicada à bibliografia de Stephen King.

raphael-montes.html: Página dedicada à bibliografia de Raphael Montes.

style.css: Arquivo contendo toda a estilização visual, incluindo tipografia, paleta de cores, layout e animações.

script.js: Arquivo de script principal, gerenciando a interatividade, a manipulação do DOM, o armazenamento local e o controle dos modais.

fotos/: Diretório que armazena todos os recursos visuais, como capas de livros.

audio/: Diretório que armazena os arquivos de áudio associados a obras selecionadas.

4. Instruções para Execução Local
Para a visualização e teste do projeto em um ambiente de desenvolvimento local, siga os procedimentos abaixo:

Download dos Arquivos: Certifique-se de que todos os arquivos do projeto (HTML, CSS, JavaScript, além dos diretórios fotos/ e audio/) estejam reunidos em uma única pasta em seu sistema de arquivos local.

Abertura no Navegador: Navegue até o diretório onde os arquivos foram salvos e abra o arquivo index.html utilizando um navegador web moderno. A interação com o sítio poderá ser iniciada a partir deste ponto.