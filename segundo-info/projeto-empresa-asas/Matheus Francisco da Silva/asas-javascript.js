let regiao = "sul" /*Região Onde a Viagem Será Realizada*/
let criancaeconomica = 2 /* Indica a Quantidade de Crianças Que Irão Viajar na Classe Econômica */ 
let adultoeconomica = 1 /* Indica a Quantidade de Adultos Que Irão Viajar na Classe Econômica */
let criancaexecutiva = 4 /* Indica a Quantidade de Adultos Que Irão Viajar na Classe Executiva */
let adultoexecutiva = 1 /* Indica a Quantidade de Adultos Que Irão Viajar na Classe Executiva */
let totaladulto = adultoeconomica + adultoexecutiva /*Indica o total de Passageiros adultos*/ 
let totalcrianca = criancaeconomica + criancaexecutiva /*Indica o toal de Passageiros Crianças*/ 
let totaleconomica = criancaeconomica + adultoeconomica /*Indica o total de Passageiros na classe econômica*/
let totalexecutiva = criancaexecutiva + adultoexecutiva /*Indica o total de Passageiros na calsse executiva*/
 
if (regiao == "sul") {  /* Se A Região For O Sul do Brasil */
let total = (criancaeconomica * 1800) + (adultoeconomica * 2500) + (criancaexecutiva * (1800 + 1800 * 10/100)) + (adultoexecutiva * (2500 + 2500 + 20/100)) /* Calcula o Valor TOtal Da Viagem  */
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto)/* Quantidade de Passageiros Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca)/* Quantidade de Passageiras Crianças */ 
console.log ()
console.log ("Destino escolhido:", regiao)/* Exibe O local da Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica)/* Quantidade de Passageiras Na Classe Econômica */ 
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva)/* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)")  /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "norte") { /* Se A Região For O norte do Brasil */
let total = ((criancaeconomica + adultoeconomica) * 3000) + ((criancaexecutiva + adultoexecutiva) * 4000) /* Calcula o Valor TOtal Da Viagem  */
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiros Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao)/* Exibe O local da Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */ 
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)")/* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "asia") { /* Se A Região For a Ásia */
let total = ((criancaeconomica + adultoeconomica) * 4600) + ((criancaexecutiva + adultoexecutiva) * 6000) 
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiros Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao)/* Exibe O local da Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */ 
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)")/* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "europa") { /* Se A Região For A Europa */
let total = ((criancaeconomica + adultoeconomica) * 5800) + ((criancaexecutiva + adultoexecutiva) * 7300)
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiros Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao)/* Exibe O local da Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */ 
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)")/* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "africa") { /* Se A Região For A África */
let total = ((criancaeconomica + adultoeconomica) * 4200) + ((criancaexecutiva + adultoexecutiva) * 6900) 
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiros Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao)/* Exibe O local da Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */ 
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)")/* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}