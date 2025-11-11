//Voos Domésticos
//Passagens Para O Norte Do Brasil
let NorteBR_Economica = 2500 //Passagens Econômica Sul
let NorteBR_Economica_Kids = 1800 //Passagens Econômica Sul
let NorteBR_Executiva = (NorteBR_Economica+(2500*20)/100) //Passagens Executiva Para Crianças Norte
let NorteBR_Executiva_Kids = (NorteBR_Economica_Kids+(1800*10)/100) //Passagens Executiva Para Crianças Norte

//Passagens Para O Sul Do Brasil
let SulBR_Economica = 3000 //Passagens Econômica Sul
let SulBR_Executiva = 4000 //Passagens Executiva Sul
let SulBR_Economica_Kids = 3000 //Passagens Econômica Para Crianças Sul
let SulBR_Executiva_Kids = 4000 //Passagens Executiva Para Crianças Sul

//Voos Internacionais
//Continente Asiático
let Classe_Economica_Asia = 4600 //Passagens Econômica
let Classe_Executiva_Asia = 6000 //Passagens Executiva

//Continente Europeu
let Classe_Economica_Europa = 5800 //Passagens Econômica
let Classe_Executiva_Europa = 7300 //Passagens Executiva

//Continente Africano
let Classe_Economica_Africa = 4200 //Passagens Econômica
let Classe_Executiva_Africa = 6900 //Passagens Executiva

let Passageiros_Adultos = 34 //Quantidade De Passageiros Adultos
let Passageiros_Kids = 13 //Quantidade de Passageiros Crianças


//Definição Do Destino e Classe (Exemplo)
let Destino = 'Norte'; //Destino Escolhido Para o Voo, Pode Ser 'Norte', 'Sul', 'Ásia', 'Europa', ou 'África'
let Classe = 'Executiva'; //Classe Escolhida Para o Voo, Pode Ser 'Econômica' ou 'Executiva'

//Variáveis Para o Cálculo
let Custo_Total = 0; //Inicializa o Custo Total Da Viagem
let Total_Passagens_Adultos = 0;  //Inicializa o Total De Passagens Adultas
let Total_Passagens_Kids = 0; //Inicializa o Total De Passagens Infantis
let Total_Executiva = 0; //Inicializa o Total De Passagens Da Classe Executiva
let Total_Economica = 0; //Inicializa o Total De Passagens Da Classe Econômica

//Cálculo Do Dusto Com Base No Destino e Na Classe
if (Destino === 'Norte') { //Verifica Se o Destino é o Norte
    if (Classe === 'Econômica') { //Verifica Se a Classe é Econômica
        Custo_Total = (Passageiros_Adultos * NorteBR_Economica) + (Passageiros_Kids * NorteBR_Economica_Kids); //Calcula o Custo Total Da Viagem Para Classe Econômica
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = 0; //Não Há Passagens Executivas
        Total_Economica = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Econômicas        
    } else if (Classe === 'Executiva') { //Verifica Se a Classe é Executiva
        Custo_Total = (Passageiros_Adultos * NorteBR_Executiva) + (Passageiros_Kids * NorteBR_Executiva_Kids); //Calcula o Custo Total Da Viagem Para Classe Executiva
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Executivas
        Total_Economica = 0; //Não Há Passagens Econômicas
    }
} else if (Destino === 'Sul') { //Verifica Se o Destino é o Sul
    if (Classe === 'Econômica') { //Verifica Se a Classe é Econômica
        Custo_Total = (Passageiros_Adultos * SulBR_Economica) + (Passageiros_Kids * SulBR_Economica_Kids); //Cálculo Para o Sul Na Classe Econômica
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = 0; //Não Há Passagens Executivas
        Total_Economica = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Econômicas
    } else if (Classe === 'Executiva') { //Verifica Se a Classe é Executiva
        Custo_Total = (Passageiros_Adultos * SulBR_Executiva) + (Passageiros_Kids * SulBR_Executiva_Kids); //Cálculo Para o Sul Na Classe Executiva
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Executivas
        Total_Economica = 0; //Não Há Passagens Econômicas
    }
} else if (Destino === 'Ásia') { //Verifica Se o Destino é a Ásia
    if (Classe === 'Econômica') { //Verifica Se a Classe é Econômica
        Custo_Total = (Passageiros_Adultos * Classe_Economica_Asia) + (Passageiros_Kids * Classe_Economica_Asia); //Cálculo Para a Ásia Na Classe Econômica
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = 0; //Não Há Passagens Executivas
        Total_Economica = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Econômicas
    } else if (Classe === 'Executiva') { //Verifica Se a Classe é Executiva
        Custo_Total = (Passageiros_Adultos * Classe_Executiva_Asia) + (Passageiros_Kids * Classe_Executiva_Asia); //Cálculo Para A Ásia Na Classe Executiva
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Executivas
        Total_Economica = 0; //Não Há Passagens Econômicas
    }
} else if (Destino === 'Europa') { //Verifica Se o Destino é a Europa
    if (Classe === 'Econômica') { //Verifica Se a Classe é Econômica
        Custo_Total = (Passageiros_Adultos * Classe_Economica_Europa) + (Passageiros_Kids * Classe_Economica_Europa); //Cálculo Para a Europa Na Classe Econômica
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = 0; //Não Há Passagens Executivas
        Total_Economica = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Econômicas
    } else if (Classe === 'Executiva') { //Verifica Se a Classe é Executiva
        Custo_Total = (Passageiros_Adultos * Classe_Executiva_Europa) + (Passageiros_Kids * Classe_Executiva_Europa); //Cálculo Para a Europa Na Classe Executiva
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Executivas
        Total_Economica = 0; //Não Há Passagens Econômicas
    }
} else if (Destino === 'África') { //Verifica Se o Destino é a Áfriaca
    if (Classe === 'Econômica') { //Verifica Se a Classe é Econômica
        Custo_Total = (Passageiros_Adultos * Classe_Economica_Africa) + (Passageiros_Kids * Classe_Economica_Africa); //Cálculo Para A África Na Classe Econômica
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = 0; //Não Há Passagens Executivas
        Total_Economica = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Econômicas
    } else if (Classe === 'Executiva') { //Verifica Se a Classe é Executiva
        Custo_Total = (Passageiros_Adultos * Classe_Executiva_Africa) + (Passageiros_Kids * Classe_Executiva_Africa); //Cálculo Para a África Na Classe Executiva
        Total_Passagens_Adultos = Passageiros_Adultos; //Atualiza o Número De Passagens Adultas
        Total_Passagens_Kids = Passageiros_Kids; //Atualiza o Número De Passagens Infantis
        Total_Executiva = Passageiros_Adultos + Passageiros_Kids; //Atualiza o Total De Passagens Executivas
        Total_Economica = 0; //Não Há Passagens Econômicas
    }
}

// Exibindo o Resultado
console.log(`---O custo total do seu pacote é de---`) //Linha De Introdução Do Pacote De Viagem
console.log(` `) //Espaçamento De Linha
console.log(`Total de passagens adultas é: ${Total_Passagens_Adultos}`); //Mostrar Quantidade/Passagens Adultas
console.log(`Total de passagens infantis é: ${Total_Passagens_Kids}`); //Mostrar Quantidade/Passagens Infantis
console.log(`O destino escolhido foi: ${Destino}`); //Mostrar Destino Escolhido Da Viagem
console.log(`A classe do seu voo é: ${Classe}`); //Mostrar Classe Escolhida Da Viagem
console.log(`Custo total da viagem é: R$ ${Custo_Total.toFixed(2)}`); //Mostrar Valor Total Da Viagem
console.log(` `) //Espaçamento De Linha
console.log(`---Fim do Programa---`) //Mensagem Final Do Programa
