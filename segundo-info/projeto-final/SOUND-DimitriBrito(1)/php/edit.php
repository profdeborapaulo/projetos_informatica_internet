<?php
if(!empty($_GET['id'])) {

    include_once('config.php');

    $id = $_GET['id'];

    $sqlSelect = "SELECT * FROM usuarios WHERE id=$id";

    $result = $conexao->query($sqlSelect);

    if($result->num_rows > 0)
    {
        while($user_data = mysqli_fetch_assoc($result))
        {
            $nome = $user_data['nome'];  
            $senha = $user_data['senha'];
            $email = $user_data['email'];
            $data_nasc = $user_data['data_nasc'];
        }
    }
    else
    {
        header('Location: sistema.php');
    }
}
else
{
    header('Location: sistema.php');
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOUND | Editar Cadastro</title>
    <link rel="stylesheet" href="../css/sistema.css">
</head>
<body>
    <div class="tela-de-login">
        <div class="experimento">
            <div class="logo">
                <img src="../img/logo-splash.png" alt="Logo SOUND">
            </div>

            <div class="login" id="cadastro">
                <div class="algo">
                    <form action="saveEdit.php" method="POST">
                        <h1>Editar Cadastro</h1>
                        <div class="separacao">
                            <div class="inputBox">
                                <input type="text" name="nome" id="nome" class="inputUser" required placeholder="Nome completo" autocomplete="off" value="<?php echo $nome ?>">
                            </div>
                            <br>
                            <div class="inputBox">
                                <input type="password" name="senha" id="senha" class="inputUser" required placeholder="Senha" autocomplete="off" value="<?php echo $senha ?>">
                            </div>
                            <br>
                            <div class="inputBox">
                                <input type="email" name="email" id="email" class="inputUser" required placeholder="Email" autocomplete="off" value="<?php echo $email ?>">
                            </div>
                            <br>
                            <div class="inputBox">
                                <input type="date" name="data_nascimento" id="data_nascimento" required value="<?php echo $data_nasc ?>">
                            </div>
                            <br><br>
                            <input type="hidden" name="id" value="<?php echo $id ?>">
                            <input type="submit" name="update" id="submit" value="Atualizar">
                        </div>
                    </form>

                    <div class="botao-cadastro">
                        <p><a href="sistema.php">Voltar ao sistema</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
