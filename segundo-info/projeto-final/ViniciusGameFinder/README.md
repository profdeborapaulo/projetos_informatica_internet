
🎯 O Que é o Projeto?

O Game Finder SW2025 é um simulador de um agregador de preços e informações de jogos digitais, desenvolvido com foco na aplicação de pesquisas e requisições de API (Front-End e Back-End).

Missão Central do Game Finder

O objetivo principal é resolver o problema da fragmentação de informações no mercado de jogos. Em vez de o usuário precisar visitar manualmente diversas lojas (Steam, Epic, GOG, etc.) para comparar preços, descontos, avaliações e idiomas, o Game Finder centraliza todos esses dados em uma única interface, rápida e visualmente clara.

Com o Game Finder, o usuário pode:

    Pesquisar um jogo e ver instantaneamente as melhores ofertas e descontos.

    Consultar os detalhes completos do jogo, incluindo idioma, plataforma e nota Metacritic.

    Tomar uma decisão de compra informada e econômica em segundos.

⚙️ Tecnologias Utilizadas
Frontend (Cliente): "HTML, CSS, JavaScript Puro",Interface do usuário e lógica de interação.
Backend (Servidor):"Node.js, Express, Axios",Servidor de API local responsável por receber a requisição de busca do cliente e buscar dados nas APIs externas (RAWG e CheapShark).
APIs Externas: RAWG e CheapShark,"Fontes reais de dados sobre jogos, preços e lojas."

🚀 Como Executar o Projeto (Instruções de Instalação)

Para que o servidor Backend funcione corretamente e se comunique com o Frontend, siga as etapas abaixo.

1. Clonar o Repositório

Se você ainda não o fez, clone o repositório para sua máquina local.

2. Configuração do Backend (Node.js)

O servidor Node.js é responsável pela pesquisa e está na pasta backend.

    Navegue para a pasta backend:
    Bash

cd backend

Instale as dependências (pacotes):
Bash

    npm install express cors axios

    (Nota: O npm init -y não é necessário se você já possui o arquivo package.json no repositório.)

3. Iniciar o Servidor

Após a instalação, inicie o servidor Node.js:
Bash

node server.js

O servidor estará rodando localmente na porta 3000.

4. Abrir o Frontend

Com o servidor rodando, abra o arquivo index.html no seu navegador. O Frontend irá se comunicar com o servidor Node.js que você iniciou no passo anterior.
