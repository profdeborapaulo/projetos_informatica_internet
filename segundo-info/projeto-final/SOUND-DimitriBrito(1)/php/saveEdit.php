<?php 
include_once('config.php');

if(isset($_POST['update']))
{
    $id = $_POST['id'];
    $nome = $_POST['nome'];  
    $senha = $_POST['senha'];
    $email = $_POST['email'];
    $data_nasc = $_POST['data_nascimento'];

    $sqlUpdate = "UPDATE usuarios SET nome='$nome', senha='$senha', email='$email', data_nasc='$data_nasc' WHERE id='$id'";

    $result = $conexao->query($sqlUpdate);
    
    if($result) {
        echo "<script>alert('Cadastro atualizado com sucesso!');</script>";
    } else {
        echo "Erro na atualização: " . mysqli_error($conexao);
    }
}
header('Location: sistema.php');
?>