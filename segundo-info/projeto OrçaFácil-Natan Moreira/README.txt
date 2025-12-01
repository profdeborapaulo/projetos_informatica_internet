# 💰 OrçaFácil - Gestor Financeiro Pessoal

> Um gerenciador de despesas simples, privado e visualmente agradável, rodando 100% no seu navegador.

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)
![Badge HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Badge CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Badge JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📖 Sobre o Projeto

O **OrçaFácil** é uma aplicação web desenvolvida para ajudar no controle financeiro pessoal de forma rápida e sem burocracia.

Diferente de aplicativos complexos que exigem cadastro e conexão bancária, o OrçaFácil foca na **privacidade** e **simplicidade**. Todos os dados são armazenados localmente no navegador do usuário (via `localStorage`), garantindo que suas informações financeiras nunca saiam do seu dispositivo.

---

## 🚀 Funcionalidades Principais

* **🔒 Privacidade Total:** Dados salvos apenas no seu dispositivo (LocalStorage).
* **👤 Login Simulado:** Personalização com nome do usuário e "Modo Convidado".
* **📊 Dashboard Visual:**
    * Gráfico de Pizza (Doughnut) para categorias.
    * Gráfico de Linha (Timeline) para evolução de gastos.
* **🎯 Metas de Gastos:** Defina um limite mensal e acompanhe o progresso com uma barra visual que muda de cor (Verde/Amarelo/Vermelho).
* **📝 Gestão de Despesas:** Adicione, edite e exclua transações facilmente.
* **🎨 Personalização:**
    * **Modo Escuro (Dark Mode)** integrado.
    * Suporte a **Multimoedas** (Real, Dólar e Euro).
* **📱 Responsividade:** Funciona perfeitamente em computadores, tablets e celulares.
* **🎓 Tutorial Interativo:** Guia passo-a-passo integrado para novos usuários.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web padrão, sem frameworks pesados:

* **HTML5:** Estrutura semântica e acessibilidade.
* **CSS3:** Estilização moderna com Variáveis CSS, Flexbox, Grid e Animações (`keyframes`).
* **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM e LocalStorage.
* **[Chart.js](https://www.chartjs.org/):** Biblioteca para renderização dos gráficos interativos.
* **[Font Awesome](https://fontawesome.com/):** Ícones para interface.
* **Google Fonts:** Tipografia (Fonte *Inter*).

---

## 📂 Estrutura de Arquivos

```text
/
├── index.html      # Estrutura principal da página (Login, Dashboard, Modais)
├── style.css       # Estilos, temas (Dark/Light) e animações
├── script.js       # Lógica do sistema, gráficos e persistência de dados
└── README.md       # Documentação do projeto