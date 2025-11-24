======================== Letras e Laços - README ========================

=== Introdução

Letras & Laços é um projeto criado para quem ama ler, escrever e compartilhar histórias.
Ele é um protótipo funcional pensado para mostrar como design, usabilidade e gamificação podem tornar a leitura mais envolvente.

O objetivo é oferecer um espaço onde o leitor possa organizar seus livros, acompanhar seu progresso, publicar resenhas e participar de desafios literários, tudo com uma interface leve, intuitiva e acolhedora.

O projeto foi desenvolvido como um protótipo educacional, sem backend, para demonstrar conceitos técnicos e visuais antes da criação de uma plataforma completa.


=== Objetivos do Projeto

- Incentivar o hábito da leitura por meio de uma experiência gamificada.

- Demonstrar boas práticas de UI/UX centradas no usuário.

- Explorar como tecnologia e literatura podem se conectar de forma criativa.

- Servir como base para futuros projetos literários com funcionalidades reais.


=== Público-Alvo

- Leitores que gostam de acompanhar e organizar suas leituras.

- Educadores e projetos escolares que promovem desafios literários.

- Designers e desenvolvedores interessados em interfaces voltadas à leitura.


=== Principais Funcionalidades

- Biblioteca pessoal: organize livros nas listas Quero Ler, Lendo Agora e Já Li.
- Resenhas: publique opiniões e leia as de outros leitores.
- Missões e desafios: ganhe XP e insígnias conforme lê e interage.
- Comunidade: explore o feed e curta postagens literárias.
- Perfil personalizado: personalize avatar, gêneros favoritos e biografia e acompanhe seus progressos.


=== Conceito de Design

- A identidade visual do projeto é suave, acolhedora e inspirada na ideia de que a leitura cria laços entre pessoas.
O design busca equilíbrio entre simplicidade, acessibilidade e beleza, com foco na imersão e conforto visual.

- Layout responsivo (Bootstrap 5).

- Ícones e tipografia com inspiração literária.

- Paleta de cores: 
 #9c3a3bff;
 #eddcbbff;
 #305167ff;
 #e4a67cff;
 #b1afa4ff;

⚠️ Aviso: este é um protótipo. Os dados são armazenados apenas no navegador (localStorage).
Não há segurança real de senhas ou autenticação de usuários.

=== Fluxo Principal do Usuário

- Cadastro → Login → Personalização do perfil (avatar e gêneros).

- Ler e avaliar livros na biblioteca.

- Atualizar progresso e notas de leitura.

- Publicar resenhas e curtir postagens.

- Cumprir desafios para ganhar XP e desbloquear insígnias.


=== Visão Técnica (Resumo)

O Letras & Laços foi desenvolvido apenas com tecnologias front-end, priorizando modularidade, responsividade e persistência local para fins de demonstração.

Tecnologias Utilizadas

- HTML5 + CSS3 — estrutura e estilo.

- Bootstrap 5.3 — layout responsivo.

- JavaScript (ES6) — interatividade e lógica.

- localStorage — armazenamento local em JSON.

- Font Awesome — ícones e símbolos visuais.


=== Estrutura Conceitual

- Cada página HTML tem um script JS próprio que controla sua lógica.

- Os dados (usuários, livros, XP, resenhas) são salvos e recuperados do localStorage.

- O código é organizado por responsabilidade, garantindo clareza e fácil manutenção.

- Estrutura de Pastas

/html
  ├── biblioteca.html       # Biblioteca pessoal do usuário
  ├── cadastro.html         # Formulário de registro
  ├── comunidade.html       # Feed e curtidas
  ├── inicio-logado.html    # Dashboard inicial
  ├── login.html            # Acesso ao sistema
  ├── missoes.html          # Tarefas e insígnias
  ├── perfil.html           # Página de perfil
  └── reviews.html          # Criação e listagem de resenhas

/css
  ├── biblioteca.css
  ├── cadastro.css
  ├── missoes.css
  ├── perfil.css
  └── (outros estilos)

/js
  ├── cadastro.js           # Cadastro e login
  ├── biblioteca.js         # Controle da biblioteca
  ├── missoes.js            # Missões e XP
  ├── inicio-logado.js      # Dashboard
  ├── resenha.js            # Criação de resenhas
  ├── perfil.js             # Edição de perfil
  ├── like.js               # Sistema de curtidas

/img
  └── Imagens, capas e avatares do sistema


=== Páginas e Responsabilidades

Página	              Função Principal
inicio.html         Chama o usuário a se logar/cadastrar
biblioteca.html 	Gerencia as listas de leitura.
missoes.html	    Mostra tarefas e desafios (XP e insígnias).
comunidade.html	    Feed literário e curtidas.
reviews.html	    Criação e exibição de resenhas.
cadastro.html	    Registro e seleção de gêneros.
login.html	        Acesso ao sistema (simulado).
perfil.html	        Edição de informações do usuário.
inicio-logado.html	Dashboard com resumo das atividades.


=== Como Testar Localmente

- Baixe o projeto e abra a pasta no computador.

- Acesse no navegador:

http://localhost:8000/html/inicio-logado.html

- Crie um usuário fictício e explore as funcionalidades.

- Veja os dados armazenados em Application → localStorage no console.



=== Propostas Futuras e Expansões

O Letras & Laços é apenas o primeiro passo.
A ideia é que o protótipo evolua para uma plataforma completa e interativa, com recursos reais.

Possíveis evoluções:

- Backend com banco de dados e autenticação segura.
- Versão mobile com design nativo e notificações.
- Sistema de recomendações com base no perfil do leitor.
- Clubes de leitura, ranking e eventos colaborativos.
- Uploads personalizados (capas e avatares).
- Chat e fóruns literários para a comunidade.
- Central de estatísticas de leitura e progresso global.


=== Considerações Finais

O Letras & Laços nasceu do desejo de unir literatura e tecnologia em uma experiência agradável e inspiradora.
Ele mostra como um protótipo simples pode se transformar em um produto digital significativo, feito de leitores para leitores.

© Letras & Laços — todos os direitos reservados.