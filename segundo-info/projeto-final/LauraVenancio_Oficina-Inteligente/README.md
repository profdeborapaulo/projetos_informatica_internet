# Projeto: Oficina Proativa - Sistema de Gestão e Relacionamento

Este repositório contém o código-fonte de um aplicativo web completo (WebApp) focado na gestão de oficinas mecânicas. O projeto foi desenvolvido com React, Firebase e Bootstrap.

O diferencial estratégico deste software é a transição de um modelo de serviço **reativo** (onde o cliente procura a oficina apenas quando ocorre um problema) para um modelo **proativo** (onde a oficina antecipa as necessidades de manutenção e agenda ativamente as próximas revisões).

---

## 🔗 Link para o Aplicativo (Deploy)

O projeto está hospedado no Firebase Hosting e pode ser acessado e testado em tempo real no seguinte endereço:

**[https://oficina-proativa.web.app/](https://oficina-proativa.web.app/)**

---

## 💡 Funcionalidades Implementadas

O sistema é estruturado em duas áreas distintas que se comunicam diretamente através do banco de dados em tempo real:

### 1. Painel Administrativo (Mecânico)
Uma interface de gerenciamento completa que permite ao proprietário da oficina:

* **Gestão de Clientes e Veículos:** Cadastro e consulta de clientes e seus respectivos veículos.
* **Fluxo de Serviço Proativo:** Ao registrar um serviço concluído (com seu respectivo **valor R$**), o mecânico é instruído a agendar a **próxima revisão recomendada**.
* **Geração de PDF:** Emissão de um histórico de serviços detalhado (com datas, serviços e valores) em formato PDF para qualquer veículo cadastrado.
* **Agenda Kanban:** Um painel visual que organiza todos os agendamentos futuros em colunas de status: **Pendentes**, **Confirmados** e **Concluídos**.
* **Sistema de Notificação (1-Clique):** Na agenda, o mecânico pode enviar lembretes para agendamentos "Pendentes" via **E-mail** ou **WhatsApp**. O sistema gera automaticamente um texto-modelo com os detalhes do serviço e o link do portal do cliente.
* **Dashboard com Gráficos:** O painel principal exibe dois gráficos para análise de negócios:
    1.  **Faturamento Mensal:** (Gráfico de Linha) Baseado no valor dos serviços marcados como "Concluídos".
    2.  **Status de Agendamentos:** (Gráfico de Rosca) Um resumo visual da proporção de agendamentos pendentes, confirmados e concluídos.

### 2. Portal do Cliente
Uma área dedicada ao cliente, focada em transparência e conveniência:

* **Confirmação de Agendamentos:** O cliente visualiza os agendamentos "Pendentes" sugeridos pelo mecânico e pode **confirmá-los** com um único clique.
* **Atualização em Tempo Real:** A confirmação do cliente atualiza instantaneamente o status do agendamento de "Pendente" para "Confirmado" no Painel Kanban do mecânico.
* **Consulta de Histórico:** O cliente pode consultar seu histórico de veículos e todos os serviços já realizados, incluindo os valores.
* **Dicas de Manutenção:** Uma seção informativa com dicas de cuidados básicos com o veículo.

---

## 🛠️ Arquitetura e Tecnologias

Para construir esta aplicação, foram utilizadas as seguintes tecnologias:

* **Front-End:** **React.js** (para a construção de toda a interface de usuário dinâmica).
* **Estilização:** **Bootstrap 5** (para a estrutura de layout responsiva) e **CSS puro** (`index.css`) para a camada de personalização de marca (paleta de cores, tipografia e refinamento visual).
* **Back-End e Banco de Dados:** **Google Firebase**.
    * **Firestore:** Utilizado como banco de dados NoSQL em tempo real, permitindo a sincronização instantânea de dados entre o mecânico e o cliente.
    * **Authentication:** Utilizado para gerenciar o sistema de login e senhas, com diferenciação de "cargos" (roles) entre `mecanico` e `cliente`.
    * **Hosting:** Utilizado para a publicação (deploy) do aplicativo.
* **Rotas:** `react-router-dom` (para a navegação entre as páginas, como `/login` e `/dashboard`).
* **Visualização de Dados:** `Chart.js` (para os gráficos do dashboard).
* **Geração de Relatórios:** `jsPDF` e `jspdf-autotable` (para a criação dos históricos em PDF).

---

## ⚙️ Como Executar o Projeto Localmente

Para executar este projeto em um ambiente de desenvolvimento:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/lauramartinsvenancio/oficina-inteligente-1-.git](https://github.com/lauramartinsvenancio/oficina-inteligente-1-.git)
    ```

2.  **Entre na pasta do projeto:**
    *O código-fonte do React está dentro da subpasta `gestao-oficina`.*
    ```bash
    cd oficina-inteligente-1-/gestao-oficina
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure o Firebase:**
    * Crie um novo projeto no [Console do Firebase](https://firebase.google.com/).
    * Ative os serviços **Authentication** (com o provedor "E-mail/senha") e **Firestore Database** (em modo de produção).
    * Obtenha o objeto `firebaseConfig` nas "Configurações do Projeto" (ao adicionar um App da Web).
    * Cole o `firebaseConfig` no arquivo `src/firebase.js`.
    * **Índices:** Configure os 5 índices necessários no Firestore (conforme documentação do projeto) para que as consultas complexas (filtrar e ordenar) funcionem.
    * **Regras:** Atualize as "Regras" do Firestore para permitir a leitura e escrita por usuários autenticados (conforme documentação do projeto).

5.  **Execute o aplicativo:**
    ```bash
    npm start
    ```

6.  Abra `http://localhost:3000` no seu navegador.

**Slides** `https://docs.google.com/presentation/d/17Ahna2680SaEhhVOEiTU_C0UuDK9ufGFecYsSgPzaX0/edit?usp=sharing`
