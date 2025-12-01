<?php
if(isset($_POST['submit'])) {
    include_once('config.php');
    
    $nome = $_POST['nome'];  
    $senha = $_POST['senha'];
    $email = $_POST['email'];
    $data_nasc = $_POST['data_nascimento'];
    
    $result = mysqli_query($conexao, "INSERT INTO usuarios(nome, senha, email, data_nasc) VALUES('$nome', '$senha', '$email', '$data_nasc')");
    
    if($result) {
        echo "<script>alert('Cadastro realizado com sucesso!');</script>";
    } else {
        echo "Erro no cadastro: " . mysqli_error($conexao);
    }

    header('Location: login.php');
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOUND | Cadastro</title>
    <link rel="stylesheet" href="../css/sistema.css">
</head>
<body>
    <div class="tela-de-login">
        <div class="experimento">
            <div class="logo">
                <img src="../img/logo-splash.png" alt="">
            </div>

            <div class="login" id="cadastro">
                <div class="algo">
                    <form action="cadastro.php" method="POST">
                        <h1>Cadastro</h1>
                        <div class="separacao">
                            <div class="inputBox">
                                <input type="text" name="nome" id="nome" class="inputUser" required placeholder="Nome completo" autocomplete="off">
                            </div>
                            <br>
                            <div class="inputBox">
                                <input type="email" name="email" id="email" class="inputUser" required placeholder="Email" autocomplete="off">
                            </div>
                            <br>
                            <div class="inputBox">
                                <input type="password" name="senha" id="senha" class="inputUser" required placeholder="Senha" autocomplete="off">
                            </div>
                            <br>
                            <div class="inputBox">
                                <input type="date" name="data_nascimento" id="data_nascimento" required>
                            </div>
                            <br><br>
                            <input type="submit" name="submit" id="submit" value="Cadastrar">
                        </div>
