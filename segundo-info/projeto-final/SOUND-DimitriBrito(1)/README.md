# 🎧 SOUND - Plataforma Musical

Este projeto é uma plataforma web desenvolvida em **PHP** e **MySQL** com o objetivo de conectar a comunidade musical (artistas, bandas e entusiastas). Ele oferece um sistema completo de gerenciamento de usuários e acesso a funcionalidades exclusivas.

## 🌟 Principais Recursos

* **Autenticação:** Sistema de **Cadastro** (`cadastro.php`) e **Login** (`login.php`) para acesso à plataforma.
* **Área Restrita:** Páginas acessíveis apenas a usuários autenticados (`home.php`, `propostas.php`).
* **CRUD de Usuários:** Funcionalidades de **Edição** (`edit.php`, `saveEdit.php`) e **Exclusão** (`delete.php`) para gerenciamento de dados de usuário.
* **Controle de Sessão:** Gerenciamento de estado do usuário (`sair.php`).

***

## 🚀 Deploy e Acesso Online

O projeto está atualmente em **deploy** e pode ser acessado no seguinte endereço:

🔗 **[SOUND - Plataforma Musical](https://projetosound.free.nf/php/index.php)**

***

## ⚙️ Configuração Local

Para executar o projeto em seu ambiente local, você precisará de um servidor web que suporte **PHP** e um banco de dados **MySQL/MariaDB** (como XAMPP, WAMP ou MAMP).

### 1. Requisitos

* PHP (versão recomendada: 7.x ou superior)
* MySQL/MariaDB

### 2. Configuração do Banco de Dados

1.  Crie um novo banco de dados (ex: `formulario`).
2.  Crie a tabela `usuarios` com os campos necessários: `id`, `nome`, `email`, `senha`, `data_nasc`.
3.  **Configure a Conexão:** Revise o arquivo `config.php` e altere as credenciais (`$dbHost`, `$dbUsername`, `$dbPassword`, `$dbName`) para corresponder às configurações do seu ambiente local.

### 3. Execução Local

Após configurar o ambiente e o banco de dados, acesse o projeto pelo seu navegador local:
* **Página Inicial:** `http://localhost/seu_diretorio_do_projeto/index.php`
* **Login:** `http://localhost/seu_diretorio_do_projeto/login.php`

***

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias no código, relatar bugs ou sugerir novas funcionalidades.
