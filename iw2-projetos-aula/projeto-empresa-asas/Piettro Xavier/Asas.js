let regiao = "norte" /* Seleciona a Região Para Qual Será Realizada a Viagem */ 
let criancaeconomica = 4 /* Indica Quantas Crianças Irão Viajar na Classe Econômica */
let adultoeconomica = 1 /* Indica Quantos Adultos Irão Viajar na Classe Econômica */
let criancaexecutiva = 3 /* Indica Quantas Crianças Irão Viajar na Classe Executiva */
let adultoexecutiva = 2 /* Indica Quantos Adultos Irão Viajar na Classe Executiva */
let totaladulto = adultoeconomica + adultoexecutiva /* Indica Quantos Adultos Irão Viajar */
let totalcrianca = criancaeconomica + criancaexecutiva /* Indica Quantas Crianças Irão Viajar */
let totaleconomica = criancaeconomica + adultoeconomica /* Indica Quantas Pessoas Irão Na Classe Econômica */
let totalexecutiva = criancaexecutiva + adultoexecutiva /* Indica Quantas Pessoas Irão Na Classe Executiva */
 
if (regiao == "norte") { /* Determina Condição Caso A Região Seja O Norte do Brasil */
let total = (criancaeconomica * 1800) + (adultoeconomica * 2500) + (criancaexecutiva * (1800 + 1800 * 10/100)) + (adultoexecutiva * (2500 + 2500 + 20/100)) /* Calcula o Valor TOtal Da Viagem  */
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiras Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao) /* Exibe Para onde Será a Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "sul") { /* Determina Condição Caso A Região Seja O Norte do Brasil */
let total = ((criancaeconomica + adultoeconomica) * 3000) + ((criancaexecutiva + adultoexecutiva) * 4000) /* Calcula o Valor TOtal Da Viagem  */
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiras Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao) /* Exibe Para onde Será a Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "asia") { /* Determina Condição Caso A Região Seja O Norte do Brasil */
let total = ((criancaeconomica + adultoeconomica) * 4600) + ((criancaexecutiva + adultoexecutiva) * 6000) /* Calcula o Valor TOtal Da Viagem  */
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiras Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao) /* Exibe Para onde Será a Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "europa") { /* Determina Condição Caso A Região Seja O Norte do Brasil */
let total = ((criancaeconomica + adultoeconomica) * 5800) + ((criancaexecutiva + adultoexecutiva) * 7300) /* Calcula o Valor TOtal Da Viagem  */
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiras Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao) /* Exibe Para onde Será a Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}

else if (regiao == "africa") { /* Determina Condição Caso A Região Seja O Norte do Brasil */
let total = ((criancaeconomica + adultoeconomica) * 4200) + ((criancaexecutiva + adultoexecutiva) * 6900) /* Calcula o Valor TOtal Da Viagem  */
console.log ()
console.log ("A quantidade de Passageiros Adultos é:", totaladulto) /* Quantidade de Passageiras Adultos */
console.log ()
console.log ("A quantidade de Passageiros Crianças é:", totalcrianca) /* Quantidade de Passageiras Crianças */
console.log ()
console.log ("Destino escolhido:", regiao) /* Exibe Para onde Será a Viagem */
console.log ()
console.log ("A quantidade de pessoas na classe econômica é:", totaleconomica) /* Quantidade de Passageiras Na Classe Econômica */
console.log ("Sendo:", criancaeconomica, "criança(s) &", adultoeconomica, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("A quantidade de pessoas na classe executiva é:", totalexecutiva) /* Quantidade de Passageiras Na Classe Executiva */
console.log ("Sendo:", criancaexecutiva, "criança(s) &", adultoexecutiva, "adulto(s)") /* Quantidade de Adultos e Crianças Separadamente*/
console.log ()
console.log ("o valor total da viagem é: R$", total) /* Valor Total da Viagem*/
console.log ()
}