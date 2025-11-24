async function adicionarRemedio() {
    let eficacia= document.querySelector('input[name="saude"]:checked');
    let sintomas = document.querySelectorAll('input[name="sintomas"]:checked');
    let horarios = document.getElementById("horario").value;
    let outroSintoma = document.getElementById('descreva').value;
    let Nome = document.getElementById("Nome").textContent;
    const id= localStorage.getItem("id");   

    console.log(Nome);
    

    const hoje = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
    });
    const dataFormatada = formatter.format(hoje);

    console.log(eficacia, sintomas);
    
    const valorSintomas = [];
    sintomas.forEach(sintoma => {
        valorSintomas.push(sintoma.value);
    });
    const valorEficacia = eficacia.value;


       
     const resposta =await axios.post(`http://localhost:3000/login/${id}`, 
        {
            nome: Nome,
            horario: horarios,
            sintoma: [valorSintomas],
            eficacia: valorEficacia,
            OutriosSintomas: outroSintoma,
            data: dataFormatada

        }
    )

    let remediosCadastrados= resposta.data
    console.log(id);
    
    console.log(remediosCadastrados);
   
}

// adicionarRemedio();