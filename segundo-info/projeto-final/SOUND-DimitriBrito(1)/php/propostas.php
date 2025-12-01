<?php 
    session_start();
    include_once('config.php');

    if((!isset($_SESSION['email']) == true) and (!isset($_SESSION['senha']) == true))
    {
        unset($_SESSION['email']);
        unset($_SESSION['senha']);
        header('Location: login.php');
        exit();
    }

    $email = $_SESSION['email'];
    $senha = $_SESSION['senha'];
    
    $sql = "SELECT * FROM usuarios WHERE email = '$email' and senha = '$senha'";
    $result = $conexao->query($sql);

    if(mysqli_num_rows($result) < 1)
    {
        unset($_SESSION['email']);
        unset($_SESSION['senha']);
        header('Location: login.php');
        exit();
    }

    $logado = $_SESSION['email'];
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SOUND | Home</title>
    <link rel="stylesheet" href="../css/home.css">
    <style>
           .publicar {
            display: flex;
            justify-content: center;
        }
        
        .publicar img {
            width: 160px;
            cursor: pointer;
        }
        
        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.65);
            display: none;
            z-index: 999;
        }
        
        dialog {
            border: none;
            border-radius: 15px;
            padding: 0;
            width: 650px;
            max-width: 90%;
            background: transparent;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
        }
        
        dialog::backdrop {
            background: rgba(0,0,0,0.5);
        }
        
        .proposta:hover{
            background-color: rgba(90, 90, 90, 0.5);
        }

        .proposta a {
            text-decoration: none !important;
            color: inherit !important;
            display: block;
            width: 100%;
            height: 100%;
        }

        .proposta a:hover,
        .proposta a:focus {
            text-decoration: none !important;
            color: inherit !important;
            outline: none !important;
        }

        .propostas-disponiveis {
             margin-top: 30px;
        }

        .servico:hover{
            background-color: rgba(90, 90, 90, 0.5);
        }

.servico {
    background-color: #373737;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 20px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
}

.basico-servico h3 {
    font-family: Arial, sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #FFFFFF;
}

.basico-servico p {
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #B0B0B0;
    margin-bottom: 8px;
    line-height: 1.4;
}

.dist-custo {
    text-align: right;
    flex-shrink: 0;
}

.dist-custo p:first-child {
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #B0B0B0;
    margin-bottom: 10px;
}

.dist-custo p:last-child {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
}

    </style>
</head>
<body>
    <div class="nav">
        <nav>
            <img src="../img/logo-splash.png" alt="">
            <div class="sair">
                <a href="sair.php" class="botao-sair">Sair</a>
            </div>
        </nav>
    </div>

    <div class="telaInteira">
        <div class="barra-lateral">
            <div class="conteudo-lateral">
                <div class="atalhos">
                    <a href="home.php">
                        <div class="atalho">
                            <img src="../img/inicio.png" alt=""> 
                            <p>Início</p>
                        </div>
                    </a>
                    <a href="propostas.php">
                        <div class="atalho">
                            <img src="../img/postagens.png" alt=""> 
                            <p>Propostas</p>
                        </div>
                    </a>
                    <div class="atalho">
                        <img src="../img/mensagens.png" alt=""> 
                        <p>Conversas</p>
                    </div>
                    <div class="atalho">
                        <img src="../img/curtidas.png" alt=""> 
                        <p>Curtidas</p>
                    </div>
                    <div class="atalho">
                        <img src="../img/Vector.png" alt=""> 
                        <p>Conta</p>
                    </div>
                </div>
                <div class="amigos-section">
                    <div class="amigos-header">
                        <p>Amigos</p>
                        <span>﹀</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="central">
            <div class="boasvindas">
                <h1>Propostas de Serviço</h1>
            </div>
            <div class="pesquisa">
                <input type="text" placeholder="Pesquisar...">
            </div>

<div class="propostas-disponiveis">
    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>14/03/2027 - 20:00 - Festival</h3>
                <p>Banda Completa - Rock e Pop</p>
                <p style="color:#3BC4FF;">Arena Music - Sorocaba</p>
                <p>Sorocaba, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">87.4Km</p>
                <p>R$1.350,00</p>
            </div>
        </div>
    </a>

    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>02/09/2026 - 18:45 - Casamento</h3>
                <p>Dupla Sertaneja - Sertanejo Universitário</p>
                <p style="color:#3BC4FF;">Chácara Bela Vista - Mogi</p>
                <p>Mogi das Cruzes, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">112Km</p>
                <p>R$2.000,00</p>
            </div>
        </div>
    </a>

    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>29/07/2025 - 15:00 - Evento Corporativo</h3>
                <p>DJ - Música Eletrônica</p>
                <p style="color:#3BC4FF;">Centro Empresarial Norte</p>
                <p>São Paulo, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">5.8Km</p>
                <p>R$1.800,00</p>
            </div>
        </div>
    </a>

    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>10/12/2026 - 22:30 - Formatura</h3>
                <p>Banda de Pagode - Pagode Anos 90</p>
                <p style="color:#3BC4FF;">Espaço Celebration - Osasco</p>
                <p>Osasco, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">14.2Km</p>
                <p>R$1.100,00</p>
            </div>
        </div>
    </a>

    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>05/05/2027 - 19:15 - Festa de Empresa</h3>
                <p>Trio de Forró - Pé de Serra</p>
                <p style="color:#3BC4FF;">Villa Alto do Vale</p>
                <p>Jundiaí, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">42Km</p>
                <p>R$900,00</p>
            </div>
        </div>
    </a>

    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>18/01/2026 - 12:00 - Almoço de Domingo</h3>
                <p>Artista Solo - MPB e Samba</p>
                <p style="color:#3BC4FF;">Restaurante Lago Azul</p>
                <p>Embu das Artes, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">26.9Km</p>
                <p>R$650,00</p>
            </div>
        </div>
    </a>

    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>21/08/2025 - 16:40 - Feira Cultural</h3>
                <p>Banda Indie - Alternativo</p>
                <p style="color:#3BC4FF;">Praça Central - Cotia</p>
                <p>Cotia, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">31.1Km</p>
                <p>R$780,00</p>
            </div>
        </div>
    </a>

    <a href="servico.php">
        <div class="servico">
            <div class="basico-servico">
                <h3>12/11/2026 - 09:00 - Café Empresarial</h3>
                <p>Instrumental - Jazz e Blues</p>
                <p style="color:#3BC4FF;">Hotel Premium Center</p>
                <p>Alphaville, SP</p>
            </div>
            <div class="dist-custo">
                <p style="color:#3BC4FF;">9.4Km</p>
                <p>R$1.400,00</p>
            </div>
        </div>
    </a>
    </div>


            
        </div>

            <div class="esquerda">
                

            <div class="maisprocurados">
                <h3>Serviços mais Procurados</h3>
                <img src="../img/servicos.png" alt="">
                <p>Contratos de Artistas Individuais para Aniversários...</p>
                <p>Casamentos com shows de Bandas, ‘Urgente por favor é sério...</p>
                <p>Casamentos com shows de Bandas, Urgente por favor é sério...</p>
            </div>
    </div>

    </div>

   <div class="publicar">
        <img src="../img/postar.png" alt="Publicar" id="openModal">
    </div>

    <div id="overlay"></div>

    <dialog id="modal" style="display: none; background: #373737; border-radius: 15px; padding: 30px; flex-direction: column; gap: 20px; width: 650px; max-width: 90%; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; border: none;">
        <button id="closeModal" style="align-self: flex-end; background: none; border: none; color: white; font-size: 22px; cursor: pointer; margin: 0; padding: 0;">X</button>
        
        <div class="upload-box" style="width: 100%; height: 220px; background: #2b2b2b; border-radius: 15px; border: 2px dashed #555; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ccc; font-size: 18px; gap: 10px; cursor: pointer;">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUiIGhlaWdodD0iNTUiIHZpZXdCb3g9IjAgMCA1NSA1NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI3LjUgMTcuMDgzM1YzNy45MTY3TTE3LjA4MzMgMjcuNUgzNy45MTY3TTUxLjE2NjcgMjcuNUM1MS4xNjY3IDQwLjQ1MjcgNDAuNDUyNyA1MS4xNjY3IDI3LjUgNTEuMTY2N0MxNC41NDczIDUxLjE2NjcgMy44MzMzMyA0MC40NTI3IDMuODMzMzMgMjcuNUMzLjgzMzMzIDE0LjU0NzMgMTQuNTQ3MyAzLjgzMzMzIDI3LjUgMy44MzMzM0M0MC40NTI3IDMuODMzMzMgNTEuMTY2NyAxNC41NDczIDUxLjE2NjcgMjcuNVoiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==" alt="Upload" class="upload-icon" style="width: 55px; opacity: 0.6;">
            <p>Carregar vídeo</p>
        </div>

        <label style="color: white; font-size: 16px; font-family: Arial;">Título</label>
        <input type="text" style="width: 100%; padding: 10px 15px; border-radius: 10px; border: none; background: #d4d4d4;">

        <label style="color: white; font-size: 16px; font-family: Arial;">Descrição</label>
        <input type="text" style="width: 100%; padding: 10px 15px; border-radius: 10px; border: none; background: #d4d4d4;">

        <button class="postar" style="background: #FF4E8A; border: none; padding: 12px; border-radius: 10px; color: white; font-size: 16px; cursor: pointer; width: 130px; align-self: flex-end;">Postar</button>
    </dialog>

    <script src="../js/popup.js"></script>
</body>
</html>