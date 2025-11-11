//Estratégia de melhoria da receita da companhia aérea Asas
//Em resposta à crise econômica, a companhia aérea "Asas" está implementando uma nova estratégia para aumentar a receita, oferecendo voos domésticos e internacionais. A companhia aérea tem diferentes estruturas de preços para diferentes regiões e classes de voo.

let regiao1 = "Norte" //Define a Direção da Viagem dentro do Brasil
let regiao2 = "Sul" //Define a Direção da Viagem dentro do Brasil
let continente1 = "Asia" //Desine a continente que a viagem tem como destino
let continente2 = "Europa" //Desine a continente que a viagem tem como destino
let continente3 = "Africa" //Desine a continente que a viagem tem como destino
let criancaEc = 8 //define a quantidade de crianças no vôo
let adultoEc = 15 //define a quantidade de adultos no vôo
let criancaEx = 8 //define a quantidade de crianças no vôo
let adultoEx = 19 //define a quantidade de adultos no vôo
let classe = "Executiva" //define qual a classe escolhida no vôo

if (regiao1 === "Norte") {
    let total = (criancaEx * (2500.00 + ((2500.00 / 100)* 2)) + (adultoEx * (1800.00 + (1800.00 / 100)))) //fazer o calculo do total da Viagem
    console.log(`O destinho escolhido foi ${regiao1}`); //mostrar o destinho
    console.log(" ");
    console.log(`A quantidade de crianças no vôo é: ${criancaEc}`); //mostrar a quantidade de crianças registradas
    console.log(" ");
    console.log(`A quantidade de adultos no vôo é ${adultoEc}`); //mostrar a quantidade de adultos registradas
    console.log(" ");
    console.log(`A classe do vôo é: ${classe}`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área executiva vai ser: R$ ${total}`);//mostrar o valor da viagem na classe executiva
    console.log("--------------------------------------------------------------");
} else if (classe === "Economica"){
    let total = (criancaEc * 2500.00) + (adultoEc * 1800.00) //fazer o calculo do total da Viagem
    console.log(`A classe do vôo é: Economica`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área Economica vai ser: R$ ${totalEC}`);
    console.log("--------------------------------------------------------------");
}

if (regiao2 === "Sul") {
    let total = (criancaEx * 4000.00) + (adultoEx * 4000.00) //fazer o calculo do total da Viagem
    console.log(`O destinho escolhido foi ${regiao2}`); //mostrar o destinho 
    console.log(" ");
    console.log(`A quantidade de crianças no vôo é: ${criancaEc}`); //mostrar a quantidade de crianças registradas
    console.log(" ");
    console.log(`A quantidade de adultos no vôo é ${adultoEc}`); //mostrar a quantidade de adultos registradas
    console.log(" ");
    console.log(`A classe do vôo é: ${classe}`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área executiva vai ser: R$ ${total}`); //mostrar o valor da viagem na classe executiva
    console.log("--------------------------------------------------------------");
} else if (classe === "Economica"){
    let total = (criancaEc * 3000.00) + (adultoEc * 3000.00) //fazer o calculo do total da Viagem
    console.log(`A classe do vôo é: Economica`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área Economica vai ser: R$ ${total}`); //mostrar o valor da viagem na classe economica
    console.log("--------------------------------------------------------------");
}

if (continente1 === "Asia") {
    let total = (criancaEx * 6000.00) + (adultoEx * 6000.00) //fazer o calculo do total da Viagem
    console.log(`O destinho escolhido foi ${continente1}`); //mostrar o destinho
    console.log(" ");
    console.log(`A quantidade de crianças no vôo é: ${criancaEc}`); //mostrar a quantidade de crianças registradas
    console.log(" ");
    console.log(`A quantidade de adultos no vôo é ${adultoEc}`); //mostrar a quantidade de adultos registradas
    console.log(" ");
    console.log(`A classe do vôo é: ${classe}`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área executiva vai ser: R$ ${total}`); //mostrar o valor da viagem na classe executiva
    console.log("--------------------------------------------------------------");
} else if (classe === "Economica"){
    let total = (criancaEc * 4600.00) + (adultoEc * 4600.00) //fazer o calculo do total da Viagem
    console.log(`A classe do vôo é: Economica`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área Economica vai ser: R$ ${total}`); //mostrar o valor da viagem na classe economica
    console.log("--------------------------------------------------------------");
}

if (continente2 === "Europa") {
    let total = (criancaEx * 7300.00) + (adultoEx * 7300.00) //fazer o calculo do total da Viagem
    console.log(`O destinho escolhido foi ${continente2}`); //mostrar o destinho
    console.log(" ");
    console.log(`A quantidade de crianças no vôo é: ${criancaEc}`); //mostrar a quantidade de crianças registradas
    console.log(" ");
    console.log(`A quantidade de adultos no vôo é ${adultoEc}`); //mostrar a quantidade de adultos registradas
    console.log(" ");
    console.log(`A classe do vôo é: ${classe}`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área executiva vai ser: R$ ${total}`); //mostrar o valor da viagem na classe executiva
    console.log("--------------------------------------------------------------");
} else if (classe === "Economica"){
    let total = (criancaEc * 5800.00) + (adultoEc * 5800.00) //fazer o calculo do total da Viagem
    console.log(`A classe do vôo é: Economica`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área Economica vai ser: R$ ${total}`); //mostrar o valor da viagem na classe economica
    console.log("--------------------------------------------------------------");
}


if (continente3 === "Africa") {
    let total = (criancaEx * 6900.00) + (adultoEx * 6900.00) //fazer o calculo do total da Viagem
    console.log(`O destinho escolhido foi ${continente3}`); //mostrar o destinho
    console.log(" ");
    console.log(`A quantidade de crianças no vôo é: ${criancaEc}`); //mostrar a quantidade de crianças registradas 
    console.log(" ");
    console.log(`A quantidade de adultos no vôo é ${adultoEc}`); //mostrar a quantidade de adultos registradas
    console.log(" ");
    console.log(`A classe do vôo é: ${classe}`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área executiva vai ser: R$ ${total}`); //mostrar o valor da viagem na classe executiva
    console.log("--------------------------------------------------------------");
} else if (classe === "Economica"){
    let total = (criancaEc * 4200.00) + (adultoEc * 4200.00) //fazer o calculo do total da Viagem
    console.log(`A classe do vôo é: Economica`); //mostrar a classe escolhida para o seu vôo
    console.log(`O valor na área Economica vai ser: R$ ${total}`); //mostrar o valor da viagem na classe economica
    console.log("--------------------------------------------------------------");
}