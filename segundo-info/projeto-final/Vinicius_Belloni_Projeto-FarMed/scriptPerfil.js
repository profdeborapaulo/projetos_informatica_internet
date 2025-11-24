let container= document.querySelector(".mid")



async function vericarMedicamentos() {
        
        let datas = document.getElementById("date").value;
        const api = (await axios.get("http://localhost:3000/login")).data;
        
       
 
        var brData = datas.split('-').reverse().join('/');
        

        console.log(brData);

        const remedio =    api.find(elemento => elemento.remedios.find(remedio => remedio.data === brData))
        // if(remedio){
        //     return remedio
        // }else{
        //       container.innerHTML= `
        //             <i class="fa-regular fa-calendar"></i>
        //             <p class="cinza">Nenhuma dose registrada nessa data</p>
        //         `
        // }
                
            
        console.log('achou esse aqui', remedio)

   
        const filtro = remedio.remedios.filter(function(element) {
            if (element.data === brData) {
                return true;
            } else {
                return false
            }
        });


        container.innerHTML=""
        
        console.log(filtro);
        filtro.forEach(element => {
                console.log(element.horario);

                    
            
            if(remedio.remedios.data === brData.value){
                
                container.innerHTML+=`
                    <div class="parte">

                        <div class="alinhamento"><p class="categoria">Nome: <p class="conteudo">${element.nome}</p></p></div>
                        <div class="alinhamento"><p class="categoria">Horario: <p class="conteudo">${element.horario}</p></p></div>
                        <div class="alinhamento"><p class="categoria">Sintomas: <p class="conteudo">${element.sintoma}</p></p></div>
                        <div class="alinhamento"><p class="categoria">Eficacia: <p class="conteudo">${element.eficacia}</p></p></div>
                        <div class="alinhamento"><p class="categoria">Outros Sintomas: <p class="conteudo">${element.OutriosSintomas}</p></p></div>
                        <div class="alinhamento"><p class="categoria">Data: <p class="conteudo">${element.data}</p></p></div>
                    </div>
                    <br>
                
                `
                    

            }else if(datas.value == "" || datas.value != element.data){
                container.innerHTML= `
                    <i class="fa-regular fa-calendar"></i>
                    <p class="cinza">Nenhuma dose registrada nessa data</p>
                `
            }
        });
}