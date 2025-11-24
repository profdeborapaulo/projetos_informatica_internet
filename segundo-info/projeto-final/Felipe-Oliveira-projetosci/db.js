// Importa o pacote dotenv para carregar as variáveis de ambiente
require('dotenv').config();

// Importa o pacote mysql2 na sua versão com 'promises'
const mysql = require('mysql2/promise');

// Cria o 'pool' de conexões com a base de dados
// Um 'pool' gere múltiplas conexões para melhor performance
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Busca o host do .env
    user: process.env.DB_USER,       // Busca o utilizador do .env
    password: process.env.DB_PASSWORD, // Busca a senha do .env
    database: process.env.DB_NAME,   // Busca o nome do banco de dados do .env
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos o 'pool' para que outros ficheiros possam usá-lo para fazer queries
module.exports = pool;
DB_PORT = 3307