#  Projeto Renda+

Uma aplicação web para gestão financeira pessoal que permite controlar despesas, definir metas e acompanhar sua economia.

##  Funcionalidades

- **Gestão de Despesas**
  - Adicionar/editar/remover despesas
  - Categorizar despesas
  - Marcar despesas como pagas
  - Visualizar total de despesas pagas/pendentes

- **Metas Financeiras**
  - Criar metas com valor e prazo
  - Acompanhar progresso
  - Guardar dinheiro para metas específicas
  - Visualizar metas concluídas/pendentes

- **Dinheiro Guardado**
  - Separar dinheiro do saldo principal
  - Acompanhar valor total guardado
  - Histórico de valores guardados

##  Tecnologias

- Frontend:
  - HTML5, CSS3, JavaScript
  - Bootstrap 5
  - LocalStorage para persistência offline

- Backend:
  - Node.js + Express.js
  - MySQL (via mysql2/promise)
  - Express Session para autenticação

##  Instalação

1. Clone o repositório:
```bash
git clone https://github.com/italo-ux/Projeto-Renda-Mais1.git
cd Projeto-Renda-Mais1
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (.env):
```env
PORT=3000
MYSQLHOST=localhost
MYSQLUSER=seu_usuario
MYSQLPASSWORD=sua_senha
MYSQLDATABASE=railway
MYSQLPORT=3306
```

4. Inicie o servidor:
```bash
node app.js
# ou com nodemon
npx nodemon app.js
```

##  Deployment

O projeto está hospedado na plataforma Railway, oferecendo:
- Deploy automático a partir do repositório GitHub
- SSL/HTTPS gratuito
- Banco de dados MySQL gerenciado
- Escalabilidade automática

Acesse a aplicação em produção: [Renda+ (https://projeto-renda-mais.up.railway.app)]

##  Banco de Dados

O projeto usa MySQL e as tabelas são criadas automaticamente na primeira execução. Schema principal:

```sql
-- Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    metaMensal DECIMAL(10,2) DEFAULT NULL,
    rendaMensal DECIMAL(10,2) DEFAULT NULL,
    dinheiroGuardado DECIMAL(10,2) DEFAULT 0.00,
    primeira_visita BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Despesas
CREATE TABLE despesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    data DATE,
    pago BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Metas
CREATE TABLE metas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    valor DECIMAL(10,2) NOT NULL,
    guardado DECIMAL(10,2) DEFAULT 0,
    dataPrevista DATE,
    concluida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
```

##  Uso

1. Crie uma conta em `/registro.html`
2. Faça login em `/login.html`
3. Na primeira visita, defina sua renda mensal
4. Adicione despesas e metas
5. Use o botão "Guardar Dinheiro" para separar valores

##  Segurança

- Sessões seguras em produção (cookie secure)
- CORS configurado para ambiente de desenvolvimento
- Autenticação requerida para todas as rotas da API
- Validação de dados em todas as requisições

## 🛠️ API Endpoints

### Autenticação
- `POST /api/registro` - Criar conta
- `POST /api/login` - Iniciar sessão
- `POST /api/logout` - Encerrar sessão

### Usuário
- `GET /api/usuario` - Dados do usuário
- `POST /api/primeira-visita` - Configuração inicial
- `POST /api/atualizar-config` - Atualizar configurações

### Despesas
- `GET /api/despesas` - Listar despesas
- `POST /api/despesas` - Adicionar despesa
- `PUT /api/despesas/:id` - Editar despesa
- `DELETE /api/despesas/:id` - Remover despesa
- `POST /api/despesas/:id/pagar` - Marcar como paga

### Metas
- `GET /api/metas` - Listar metas
- `POST /api/metas` - Criar meta
- `PUT /api/metas/:id` - Atualizar meta
- `DELETE /api/metas/:id` - Remover meta
- `POST /api/metas/:id/concluir` - Concluir meta

### Dinheiro Guardado
- `GET /api/guardado` - Consultar valor guardado
- `POST /api/guardado` - Atualizar valor guardado

##  Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

