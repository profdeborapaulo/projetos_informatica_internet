Descrição Geral: Este projeto é um Dashboard de Monitoramento de Consumo desenvolvido com HTML, CSS e JavaScript, focado em gestão inteligente de recursos. Ele permite que o usuário acompanhe o consumo de seis categorias principais (Energia, Água, Gás, Internet, Lixo e Alimentação) em relação a metas predefinidas. A aplicação é um sistema de página única simulado, que utiliza o localStorage do navegador para persistir dados de metas, simular o registro de consumo e gerenciar notificações. O foco principal é a visualização clara de dados por meio de gráficos intuitivos (Pizza e Coluna).

Objetivo: O objetivo principal do projeto é fornecer uma ferramenta visual e de fácil uso para: Conscientização: Ajudar o usuário a ter uma visão clara e consolidada de seu consumo em diversas categorias. Gestão de Metas: Permitir a definição de metas numéricas mensais para incentivar a economia e a sustentabilidade. Tomada de Decisão: Transformar dados complexos em insights acessíveis através de gráficos e alertas, facilitando a otimização de recursos e a redução de custos.

Funcionalidades: O sistema oferece as seguintes seções e funcionalidades principais: Dashboard Principal - index.html Resumo Geral: Visualização de performance de consumo em Gráfico de Pizza e Gráfico de Coluna, comparando o uso atual com as metas.

Definição de Metas - metas.html Permite ao usuário definir metas numéricas mensais para as 6 categorias de consumo.

Formulário de Registro - forms.html Formulário para o registro manual de gastos pontuais, especialmente para a categoria Alimentação.

Central de Notificações - not.html Central que exibe alertas de alta prioridade (ex: consumo acima da média) e um histórico de notificações. Configurações do Sistema - config.html Opções para Alternar Tema (Dark Mode), definir formato de data e simular Exportação de Histórico (Download CSV). Perfil do Usuário - usuario.html Cadastro e gestão de informações pessoais e credenciais de acesso do usuário.

Informações - sobre.html, contato.html Telas estáticas para informações sobre a missão do projeto e um formulário de contato.

Estrutura do Projeto: index.html Dashboard Principal (Início) metas.html Definição de Metas forms.html Registro Manual not.html Central de Notificações config.html Configurações do Sistema usuario.html Perfil de Usuário contato.html Formulário de Contato sobre.html Sobre o Projeto style.css Estilização global e variáveis CSS script.js Lógica do sistema (Metas, Gráficos, Dark Mode, LocalStorage)

Design e Paleta de Cores: O design adota um layout de Dashboard moderno e funcional.

Layout: Utiliza um Sidebar Fixo para navegação e o conteúdo principal é estruturado em Cartões (Cards) para organização e visualização de dados.

Responsividade: O layout é totalmente responsivo, adaptando-se a dispositivos móveis (o Sidebar se reorganiza para telas menores, conforme definido no CSS).

Temas: Suporte ao Tema Escuro (Dark Mode), configurável através da alternância de variáveis CSS definidas no arquivo style.css.

Cores da Interface (Padrão Claro): Cor Primária - #005f73 Cor Secundária - #0096c7 Fundo da Aplicação - #f8f9fa Fundo dos Cards - #ffffff Status OK (Sucesso) - #40916cStatus Alerta (Perigo) -#e63946

Cores de Visualização de Consumo (Gráficos): Energia - #ffb703 Água - #219ebc Gás - #fb8500 Internet - #8338ec Lixo - #3a86ff Alimentação -#6a994e
