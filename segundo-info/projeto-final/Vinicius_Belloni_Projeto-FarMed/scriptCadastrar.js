

async function verificacao() {
    
    let nomes = document.getElementById("Nome");
    let senhas = document.getElementById("Senha");

    const resposta =await axios.post("http://localhost:3000/login", {
        nome: nomes.value,
        senha: senhas.value
    })


    const dadosCadastrados = resposta.data
    console.log(dadosCadastrados);
    
    
    
    if(api && api.nome) {
        console.log(api.nome);
        location.href= `./index.html?usuario=${nomes.value}`
    }else{
            alert("Usuario ou Senha incorretos");
    }
    //    if(api.nome === nome.value && api.senha === senha.value){
    //         console.log(api.nome);
    //         location.href= `./index.html?usuario=${nome.value}`
    //    }else{
    //         alert("Usuario ou Senha incorretos");
    //    }
    

        

    // localStorage.setItem("usuario", nome.value);
    // localStorage.setItem("id", api._id);


}
verificacao()