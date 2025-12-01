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
                    <div class="atalho">
                        <img src="../img/inicio.png" alt=""> 
                        <p>Início</p>
                    </div>
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
                <h1>Bem vindo,<span class="gradiente-patrocinio">Artista</span></h1>
            </div>
            <div class="pesquisa">
                <input type="text" placeholder="Pesquisar...">
            </div>

            <div class="post">
                <div class="top">
                    <img src="../img/perfil.jpg" alt="">
                    <p>os_gonzaguensse</p>
                    <img src="../img/options.png" alt="">
                </div>
                <div class="video">
                    <video width="600" controls autoplay loop muted>
                    <source src="../video/showforro.mp4" type="video/mp4">
                    Seu navegador não suporta vídeos.
                    </video>
                </div>

                <div class="acoes">
                    <div class="coracao">
                        <img src="../img/coracao.png" alt="">
                        <p>12.333</p>
                    </div>
                    <div class="confirmado">
                        <img src="../img/verificado.png" alt="">
                        <p>322</p>
                    </div>
                    <div class="salvar">
                        <img src="../img/salvar.png" alt="">
                    </div>
                </div>

                <div class="texto-post">
                    <h2>Show de forró em Curitiba</h2>
                    <p>Tivemos a honra de animar a festa de aniversário com aquele forrozinho arretado, do jeitinho que o povo gosta: zabumba marcando forte, sanfona chorando bonito e nós tocando até o chão levantar poeira.</p>
                    <p>#ForróEmCuritiba #ForrozinhoArretado #AniversárioAnimado</p>
                </div>
            </div>

            <div class="post">
                <div class="top">
                    <img src="../img/perfil2.jpg" alt="">
                    <p>wesley_medley</p>
                    <img src="../img/options.png" alt="">
                </div>
                <div class="video">
                    <video width="600" controls autoplay loop muted>
                    <source src="../video/showfunk.mp4" type="video/mp4">
                    Seu navegador não suporta vídeos.
                    </video>
                </div>

                <div class="acoes">
                    <div class="coracao">
                        <img src="../img/coracao.png" alt="">
                        <p>10.456</p>
                    </div>
                    <div class="confirmado">
                        <img src="../img/verificado.png" alt="">
                        <p>223</p>
                    </div>
                    <div class="salvar">
                        <img src="../img/salvar.png" alt="">
                    </div>
                </div>

                <div class="texto-post">
                    <h2>São Roque - Medley do Wesley</h2>
                    <p>Levei o melhor do funk pro palco e a festa virou um baile completo. Beat pesado, público cantando tudo e aquela energia que só quem tava lá sabe explicar.</p>
                    <p>#FunkNoPalco #BailePesado #EnergiaExplode</p>
                </div>
            </div>

            <div class="post">
                <div class="top">
                    <img src="../img/perfil3.jpg" alt="">
                    <p>rebeca21</p>
                    <img src="../img/options.png" alt="">
                </div>
                <div class="video">
                    <video width="600" controls autoplay loop  playsinline muted >
                    <source src="../video/instrumental.mp4" type="video/mp4">
                    Seu navegador não suporta vídeos.
                    </video>
                </div>

                <div class="acoes">
                    <div class="coracao">
                        <img src="../img/coracao.png" alt="">
                        <p>4.654</p>
                    </div>
                    <div class="confirmado">
                        <img src="../img/verificado.png" alt="">
                        <p>120</p>
                    </div>
                    <div class="salvar">
                        <img src="../img/salvar.png" alt="">
                    </div>
                </div>

                <div class="texto-post">
                    <h2>Tocando Sweet Child O' Mine</h2>
                    <p>Hoje resolvi apertar REC e deixar fluir o som que mora em mim.
                    Nada como a liberdade de segurar a guitarra e transformar sentimento em música.
                    Se gostou do som, deixa um ❤️ aí que vem mais por aí.</p>
                    <p>#GuitarCover #RockSempre #SweetChildOMineVibes</p>
                </div>
            </div>

            <div class="post">
                <div class="top">
                    <img src="../img/perfil4.jpg" alt="">
                    <p>grupo_animação</p>
                    <img src="../img/options.png" alt="">
                </div>
                <div class="video">
                    <video width="600" controls autoplay loop muted>
                    <source src="..\video\showpagode.mp4" type="video/mp4">
                    Seu navegador não suporta vídeos.
                    </video>
                </div>

                <div class="acoes">
                    <div class="coracao">
                        <img src="../img/coracao.png" alt="">
                        <p>24.543</p>
                    </div>
                    <div class="confirmado">
                        <img src="../img/verificado.png" alt="">
                        <p>572</p>
                    </div>
                    <div class="salvar">
                        <img src="../img/salvar.png" alt="">
                    </div>
                </div>

                <div class="texto-post">
                    <h2>Pagode na TV</h2>
                    <p>Clima leve, sorriso solto e muito samba no coração! Ontem foi dia de pagode daquele jeitinho que a gente ama: roda cheia, energia lá em cima e cada música juntando ainda mais a galera. Obrigado a todo mundo que chegou pra cantar junto e fazer essa noite virar história!</p>
                    <p>#Pagodinho #VibeBoa #AoVivo</p>
                </div>
            </div>
        </div>

            <div class="esquerda">
                <div class="propostas">
                    <div class="proposta">
                    <a href="propostas.php">
                    <h3>Músico para Aniversário da Mãe</h3>
                    <p>preciso de um músico urgente para aniversario da mainha, 200 pila por 2 horas de festa, topa?</p>
                    </a>
                </div>
                <div class="proposta">
                    <a href="propostas.php">
                    <h3>Banda para Casamento</h3>
                    <p>Vou casar com a morena, 1200 pila ou a combinar, beleza?</p>
                    </a>
                </div>
                <div class="proposta">
                    <a href="propostas.php">
                    <h3>Restaurante Precisa de Músicos</h3>
                    <p>Olá, sou o gerente do Ho Rancho! Contratamos artista fixo para todos os Domingos à noite</p>
                    </a>
                </div>
            </div>

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