
// Variaveis que mudam ao decorrer do programa
const regiao = "Sul do Brasil";// regiao escolhida para a viagem podendo ser: Norte do Brasil, Sul do Brasil, Asia, Europa e Africa
const classe = "Classe Economica"; //classe escolhida para a viagem podendo ser: Classe Economica ou Classe Executiva
const adulto = 2;// Número de adultos
const infantil = 1;// Número de crianças

// Variaveis dos voos do Brasil 
let valoradultonorte = 2500.00;// valor da passagem adulta para o norte do Brasil
let valorinfantilnorte = 1800.00;// valor da passagem infantil para o norte do Brasil
let valortotaladultonorte = (valoradultonorte * adulto);// valor da passagem total dos adultos
let valortotalinfantilnorte = (valorinfantilnorte * infantil) ;// valor da passagem total das crianças
let totalnorteeconomica = (valortotalinfantilnorte + valortotaladultonorte);//valor todas das passagens economicas
let poradulto = ((2500*10)/100)+ adulto * valoradultonorte; // 10% a mais 
let porinfantil = ((1800*20)/100)+ infantil * valorinfantilnorte; // 20% a mais
let totalnorteexecutiva = (poradulto + porinfantil);//valor total da classe executiva
let suleconomica = 3000.00;// valor da passagem  para o sul do Brasil economica
let totalsuleconomica = (suleconomica *adulto)+ (suleconomica * infantil); //valor total das passagens economicas para o sul do brasil
let sulexecutiva = 4000.00;// valor da passagem  para o norte do Brasil executiva
let totalsulexecutiva = (sulexecutiva *adulto)+ (sulexecutiva * infantil);//valor total das passagens executivas para o sul do brasil

// Variaveis dos voos do Asia 
let asiaeconomica = 4600.00;// valor da passagem economica para a Asia
let totalasiaeconomica = (asiaeconomica *adulto)+ (asiaeconomica * infantil);// valor da passagem  para a Asia economica
let asiaexecutiva = 6000.00;// valor da passagem executiva para a Asia
let totalasiaexecutiva = (asiaexecutiva *adulto)+ (asiaexecutiva * infantil);// valor da passagem  para a Asia executiva

// Variaveis dos voos da Europa 
let europaeconomica = 5800.00;// valor da passagem economica para a Europa
let totaleuropaeconomica = (europaeconomica *adulto)+ (europaeconomica * infantil);// valor da passagem  para a Europa economica
let europaexecutiva = 7300.00;// valor da passagem executiva para a Europa
let totaleuropaexecutiva = (europaexecutiva *adulto)+ (europaexecutiva * infantil);// valor da passagem  para a Europa executiva

// Variaveis dos voos da Africa 
let africaaeconomica = 4200.00;// valor da passagem economica para a Africa
let totalafricaeconomica = (africaaeconomica *adulto)+ (africaaeconomica * infantil);// valor da passagem  para a Africa economica
let africaexecutiva = 6900.00;// valor da passagem executiva para a Africa
let totalafricaexecutiva = (africaexecutiva *adulto)+ (africaexecutiva * infantil);// valor da passagem  para a Africa executiva


//Processamento dos voos do Norte do Brasil, onde vai ser a analisado a classe escolhida, o numero de adultos e crianças e dar o valor total das viagem
if (regiao === "Norte do Brasil") {
    console.log("    ")
    console.log("BEM VINDO AS VIAGENS AO NORTE DO BRASIL!")

        if (classe === "Classe Economica") {
        console.log("Classe da Viagem:", classe)
        console.log("    ")
        console.log("Quantidade de passagens de adultos:",adulto)
        console.log("    ")
        console.log("Quantidade de passagens infantis:", infantil)
        console.log("    ")
        console.log("Custo total da viagem:", totalnorteeconomica)}

        else if (classe === "Classe Executiva") {
            console.log("Classe da Viagem:", classe)
            console.log("    ")
            console.log("Quantidade de passagens de adultos:", adulto)
            console.log("    ")
            console.log("Quantidade de passagens infantis:", infantil)
            console.log("    ")
            console.log("Custo total da viagem:", totalnorteexecutiva)
    }
}else if (regiao === "Sul do Brasil") {
console.log("    ")
console.log("BEM VINDO AS VIAGENS AO SUL DO BRASIL!")
    
        if (classe === "Classe Economica") {
        console.log("Classe da Viagem:", classe)
        console.log("    ")
        console.log("Quantidade de passagens de adultos:", adulto)
        console.log("    ")
        console.log("Quantidade de passagens infantis:", infantil)
        console.log("    ")
        console.log("Custo total da viagem:", totalsuleconomica)
}
        else if (classe === "Classe Executiva") {
        console.log("Classe da Viagem:", classe)
        console.log("    ")
        console.log("Quantidade de passagens de adultos:", adulto)
        console.log("    ")
        console.log("Quantidade de passagens infantis:", infantil)
        console.log("    ")
        console.log("Custo total da viagem:", totalsulexecutiva) 
}
}

//Processamento dos voos da Asia, onde vai ser a analisado a classe escolhida, o numero de adultos e crianças e dar o valor total das viagem
else if (regiao === "Asia") {
console.log("    ")
console.log("BEM VINDO AS VIAGENS A ASIA!")

        if (classe === "Classe Economica") {
        console.log("Classe da Viagem:", classe)
        console.log("    ")
        console.log("Quantidade de passagens de adultos:", adulto)
        console.log("    ")
        console.log("Quantidade de passagens infantis:", infantil)
        console.log("    ")
        console.log("Custo total da viagem:", totalasiaeconomica)
    
}       else if (classe === "Classe Executiva") {
        console.log("Classe da Viagem:", classe)
        console.log("    ")
        console.log("Quantidade de passagens de adultos:", adulto)
        console.log("    ")
        console.log("Quantidade de passagens infantis:", infantil)
        console.log("    ")
        console.log("Custo total da viagem:", totalasiaexecutiva)
}

//Processamento dos voos da Europa, onde vai ser a analisado a classe escolhida, o numero de adultos e crianças e dar o valor total das viagem
}else if (regiao === "Europa") {
console.log("    ")
console.log("BEM VINDO AS VIAGENS A EUROPA !")
    
            if (classe === "Classe Economica") {
            console.log("Classe da Viagem:", classe)
            console.log("    ")
            console.log("Quantidade de passagens de adultos:", adulto)
            console.log("    ")
            console.log("Quantidade de passagens infantis:", infantil)
            console.log("    ")
            console.log("Custo total da viagem:", totaleuropaeconomica)
        
    }       else if (classe === "Classe Executiva") {
            console.log("Classe da Viagem:", classe)
            console.log("    ")
            console.log("Quantidade de passagens de adultos:", adulto)
            console.log("    ")
            console.log("Quantidade de passagens infantis:", infantil)
            console.log("    ")
            console.log("Custo total da viagem:", totaleuropaexecutiva)
    }
    }


//Processamento dos voos da Africa, onde vai ser a analisado a classe escolhida, o numero de adultos e crianças e dar o valor total das viagem
else if (regiao === "Africa") {
console.log("    ")
console.log("BEM VINDO AS VIAGENS A AFRICA !")
    
            if (classe === "Classe Economica") {
            console.log("Classe da Viagem:", classe)
            console.log("    ")
            console.log("Quantidade de passagens de adultos:", adulto)
            console.log("    ")
            console.log("Quantidade de passagens infantis:", infantil)
            console.log("    ")
            console.log("Custo total da viagem:", totalafricaeconomica)
        
    }       else if (classe === "Classe Executiva") {
            console.log("Classe da Viagem:", classe)
            console.log("    ")
            console.log("Quantidade de passagens de adultos:", adulto)
            console.log("    ")
            console.log("Quantidade de passagens infantis:", infantil)
            console.log("    ")
            console.log("Custo total da viagem:", totalafricaexecutiva)
    }
    }