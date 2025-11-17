/* Objeto armazenando ID e para onde redirecionar usuários quando acessa-los */
let regioesCodigos = {
        "0601": "Demonstracao.html",
    };


/* Função que encaminha para região baseado em ID */
function pararegiao() {
    const codigo = document.getElementById("CodRegiao").value.trim();

    const conteudo = localStorage.getItem(codigo);

    if (regioesCodigos[codigo]) {
    window.location.href = regioesCodigos[codigo];
    }  
    else if (conteudo) {
        window.location.href = "visualizar.html?id=" + codigo;
    } 
    else {
        alert("Região não encontrada.");
    }
}