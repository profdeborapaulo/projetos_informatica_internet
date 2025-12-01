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

.titulo-servico {
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;
    color: white;
    position: relative;
}

.voltar-servico {
    position: absolute;
    top: 25px;
    left: 25px;
}

.voltar-servico img {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.titulo-servico h2 {
    font-family: Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    margin: 0;
    padding: 0 40px;
}

.titulo-servico p {
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: #B0B0B0;
    text-align: center;
    margin-top: 8px;
    margin-bottom: 0;
}

.descricao-servicos {
    background-color: #373737;
    border-radius: 15px;
    padding: 30px;
    color: white;
    font-family: Arial, sans-serif;
}

.tit-descr-serv p {
    font-size: 20px;
    font-weight: bold;
    color: #FFFFFF;
    margin-bottom: 20px;
}

.data-servico {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
}

.data-servico div{
    background-color: #888888;
    padding: 3px;
    border-radius: 5px;
}

.data-servico div p {
    font-size: 16px;
    color: #ffffffff;
    margin: 0;
}

.cache {
    margin-bottom: 25px;
}

.cache p {
    font-size: 16px;
    color: #B0B0B0;
    margin: 0 0 5px 0;
}

.cache h4 {
    font-size: 24px;
    font-weight: bold;
    color: #FFFFFF;
    margin: 0;
}

hr {
    border: none;
    border-top: 1px solid #5B5B5B;
    margin: 25px 0;
}

.sobre h3 {
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
    margin-bottom: 20px;
}

.sobre h5 {
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
    margin: 20px 0 8px 0;
}

.sobre p {
    font-size: 14px;
    color: #B0B0B0;
    line-height: 1.5;
    margin-bottom: 15px;
}

.sobre button {
    background: #FF4E8A;
    border: none;
    padding: 12px 30px;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    width: 100%;
    max-width: 200px;
}

.sobre button:hover {
    background: #e0437a;
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
            <div class="titulo-servico">
                <a href="propostas.php">
                    <div class="voltar-servico">
                        <img src="../img/voltar.png" alt="">
                    </div>
                </a>
                <h2>18/11/2008 - 21:00 - Aniversário</h2>
                <p>Salão de Festas, Barueri</p>
            </div>

            <div class="descricao-servicos">
                <div class="tit-descr-serv">
                    <p>Artista Solo - Samba, Sertanejo e Pagode </p>
                </div>  
                <div class="data-servico">
                    <div>
                        <p>15/11/2025</p>
                    </div>
                    <div>
                        <p>De 21:00 às 00:00</p>
                    </div>
                </div>

                <div class="cache">
                    <p>Cachê</p>
                    <h4>R$ 550,00</h4>
                </div>

                <hr>

                <div class="sobre">
                    <h3>Sobre a oportunidade</h3>
                    <h5>Descrição</h5>
                    <p>Quero contratar um músico para tocar na festa de aniversário da minha tia, ajudando a criar um clima leve, animado e especial para família e amigos. A ideia é que a música deixe o ambiente acolhedor e transforme a comemoração em uma experiência marcante para ela e para todos os convidados.</p>

                    <h5>Valor do cachê</h5>
                    <p>R$ 550,00</p>

                    <h5>Período</h5>
                    <p>05 de dezembro. Das 21:00 às 00:00</p>

                    <h5>Estilos musicais</h5>
                    <p>Samba, Sertanejo e Pagode</p>

                    <h5>Formação</h5>
                    <p>Artista Individual (1 pessoa)</p>

                    <button>Candidatar-se</button>
                </div>
                
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