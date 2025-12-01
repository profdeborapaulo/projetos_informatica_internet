<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOUND | Login</title>
    <link rel="stylesheet" href="../css/sistema.css" class="css">
</head>
<body>
    <div class="tela-de-login">
        <div class="experimento">
            <div class="logo">
                <img src="../img/logo-splash.png" alt="">
            </div>

            <div class="login">
                <div class="algo">
                <form action="testLogin.php" method="POST">
                    <h1>Login</h1>
                        <div class="separacao">
                            <div class="input-box">
                                <input type="text" name="email" id="email" class="inputUser" required placeholder="Email" autocomplete="off">
                                <label for="email" >
                            </div>
                                    <br>
                            <div class="inputBox">
                                <input type="password" name="senha" id="senha" class="inputUser" required placeholder="Senha" autocomplete="off">
                            </div>
                                    <br>
                                    <br>
                                <input type="submit" name="submit" id="submit">
                        </div>
                </form>
                
                <div class="botao-cadastro">
                    <p>Não tem uma conta? <a href="cadastro.php">Registre-se</a></p>
                </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>