import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // colocar usuário MySQL
  password: "",       // colocar senha MySQL
  database: "KidLingo"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL com sucesso!");
});
