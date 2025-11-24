

async function verificacao() {
    
    let nome = document.getElementById("Nome");
    let senha = document.getElementById("Senha");
    const api = (await axios.post("http://localhost:3000/logando", {nome:nome.value,senha: senha.value})).data;


    if(api && api.nome) {
        console.log(api.nome);
        location.href= `./index.html?usuario=${nome.value}`
    }else{
            alert("Usuario ou Senha incorretos");
    }
    //    if(api.nome === nome.value && api.senha === senha.value){
    //         console.log(api.nome);
    //         location.href= `./index.html?usuario=${nome.value}`
    //    }else{
    //         alert("Usuario ou Senha incorretos");
    //    }
    

        

    localStorage.setItem("usuario", nome.value);
    localStorage.setItem("id", api._id);


}
