//Em resposta à crise econômica, a companhia aérea "Asas" está
//implementando uma nova estratégia para aumentar a receita, 
//oferecendo voos domésticos e internacionais. A companhia 
//aérea tem diferentes estruturas de preços para diferentes 
//regiões e classes de voo.

let regiao = "Ásia"; //Essa let representa o destino do vôo
let classe = "Econômica"; // Essa let representa o tipo de classe da passagem
let criancaECO = 2; // Quantidade de crianças com passagem econômica
let criancaEXE = 3; // Quantidade de crianças com passagem executiva
let criancatotal = (criancaECO+criancaEXE);
let adultoECO = 4; // Quantidade de adultos com passagem econômica
let adultoEXE = 6; // Quantidade de adultos com passagem econômica
let adultototal = (adultoECO+adultoEXE);

if (regiao === "Norte" && classe === "Econômica"){ //Representa o que aparecerá se o vôo for para o Norte, com passagem econômica
    let total =((criancaECO * 2500.00) + (adultoECO * 1800.00)); //cálculo para custo total
        console.log(`----- Dados do Pacote -----`); //linha decorativa
        console.log(``)//linha decorativa
        console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
        console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
        console.log(`A quantidade de passageiros adultos é: ${adultoECO}`); //Mostra a quantidade de passageiros adultos
        console.log(`A quantidade de passageiros infantis é: ${criancaECO}`); //Mostra a quantidade de passageiros infantis
        console.log(`O custo total da viagem é R$ ${total}`); //Mostra o custo total que o cliente irá pagar em passagens
        console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "Norte" && classe === "Executiva"){ //Representa o que aparecerá se o vôo for para o Norte, com passagem executiva
    let total = ((criancaEXE * (2500.00 + ((2500.00 / 100)* 2)) + (adultoEXE * (1800.00 + (1800.00 / 100)))));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``);//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultoEXE}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancaEXE}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}
if (regiao === "Norte" && classe === "Econômica e Executiva"){ //Representa o que aparecerá se o vôo for para o Norte, com passagem econômica
    let total =((criancaECO * 2500.00) + (adultoECO * 1800.00)+(criancaEXE * (2500.00 + ((2500.00 / 100)* 2)) + (adultoEXE * (1800.00 + (1800.00 / 100))))); //cálculo para custo total
        console.log(`----- Dados do Pacote -----`); //linha decorativa
        console.log(``)//linha decorativa
        console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
        console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
        console.log(`A quantidade de passageiros adultos é: ${adultototal}`); //Mostra a quantidade de passageiros adultos
        console.log(`A quantidade de passageiros infantis é: ${criancatotal}`); //Mostra a quantidade de passageiros infantis
        console.log(`O custo total da viagem é R$ ${total}`); //Mostra o custo total que o cliente irá pagar em passagens
        console.log(`---------------------------`);//linha decorativa
}



 else if (regiao === "Sul" && classe === "Econômica"){ //Representa o que aparecerá se o vôo for para o Sul, com passagem econômica
    let total = ((criancaECO * 3000.00) + (adultoECO * 3000.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultoECO}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancaECO}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "Sul" && classe === "Executiva"){ //Representa o que aparecerá se o vôo for para o Sul, com passagem executiva
    let total = ((criancaEXE * 4000.00) + (adultoEXE * 4000.00));//cálculo para custo total
console.log(`----- Dados do Pacote -----`);//linha decorativa
console.log(``);//linha decorativa
console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
console.log(`A quantidade de passageiros adultos é: ${adultoEXE}`); //Mostra a quantidade de passageiros adultos
console.log(`A quantidade de passageiros infantis é: ${criancaEXE}`); //Mostra a quantidade de passageiros infantis
console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "Sul" && classe === "Econômica e Executiva"){ //Representa o que aparecerá se o vôo for para o Sul, com passagem econômica
    let total = ((criancaECO * 3000.00) + (adultoECO * 3000.00)+(criancaEXE * 4000.00) + (adultoEXE * 4000.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultototal}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancatotal}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}



else if (regiao === "África" && classe === "Econômica"){ //Representa o que aparecerá se o vôo for para a África, com passagem econômica
    let total = ((criancaECO * 4200.00) + (adultoECO * 4200.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultoECO}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancaECO}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "África" && classe === "Executiva"){ //Representa o que aparecerá se o vôo for para a África, com passagem executiva
    let total = ((criancaEXE * 6900.00) + (adultoEXE * 6900.00));//cálculo para custo total
console.log(`----- Dados do Pacote -----`);//linha decorativa
console.log(``);//linha decorativa
console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
console.log(`A quantidade de passageiros adultos é: ${adultoEXE}`); //Mostra a quantidade de passageiros adultos
console.log(`A quantidade de passageiros infantis é: ${criancaEXE}`); //Mostra a quantidade de passageiros infantis
console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "África" && classe === "Econômica e Executiva"){ //Representa o que aparecerá se o vôo for para a África, com passagem econômica
    let total = ((criancaECO * 4200.00) + (adultoECO * 4200.00)+(criancaEXE * 6900.00) + (adultoEXE * 6900.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultototal}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancatotal}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}



else if (regiao === "Ásia" && classe === "Econômica"){ //Representa o que aparecerá se o vôo for para a Ásia, com passagem econômica
    let total = ((criancaECO * 4600.00) + (adultoECO * 4600.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultoECO}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancaECO}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "Ásia" && classe === "Executiva"){ //Representa o que aparecerá se o vôo for para a Ásia, com passagem executiva
    let total = ((criancaEXE * 6000.00) + (adultoEXE * 6000.00));//cálculo para custo total
console.log(`----- Dados do Pacote -----`);//linha decorativa
console.log(``);//linha decorativa
console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
console.log(`A quantidade de passageiros adultos é: ${adultoEXE}`); //Mostra a quantidade de passageiros adultos
console.log(`A quantidade de passageiros infantis é: ${criancaEXE}`); //Mostra a quantidade de passageiros infantis
console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "Ásia" && classe === "Econômica e Executiva"){ //Representa o que aparecerá se o vôo for para a África, com passagem econômica
    let total = ((criancaECO * 4600.00) + (adultoECO * 4600.00)+(criancaEXE * 6000.00) + (adultoEXE * 6000.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultototal}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancatotal}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}



else if (regiao === "Europa" && classe === "Econômica"){ //Representa o que aparecerá se o vôo for para a Europa, com passagem econômica
    let total = ((criancaECO * 5800.00) + (adultoECO * 5800.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultoECO}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancaECO}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}
else if (regiao === "Europa" && classe === "Executiva"){ //Representa o que aparecerá se o vôo for para a Europa, com passagem executiva
    let total = ((criancaEXE * 7300.00) + (adultoEXE * 7300.00));//cálculo para custo total
console.log(`----- Dados do Pacote -----`);//linha decorativa
console.log(``);//linha decorativa
console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
console.log(`A quantidade de passageiros adultos é: ${adultoEXE}`); //Mostra a quantidade de passageiros adultos
console.log(`A quantidade de passageiros infantis é: ${criancaEXE}`); //Mostra a quantidade de passageiros infantis
console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
console.log(`---------------------------`);
}
else if (regiao === "África" && classe === "Econômica e Executiva"){ //Representa o que aparecerá se o vôo for para a África, com passagem econômica
    let total = ((criancaECO * 5800.00) + (adultoECO * 5800.00)+(criancaEXE * 7300.00) + (adultoEXE * 7300.00));//cálculo para custo total
    console.log(`----- Dados do Pacote -----`);//linha decorativa
    console.log(``)//linha decorativa
    console.log(`O destino do vôo é: ${regiao}`); //Mostra o destino, de acordo com  a equivalência da variável
    console.log(`A classe selecionada é: ${classe}`); //Mostra a classe selecionada para o vôo
    console.log(`A quantidade de passageiros adultos é: ${adultototal}`); //Mostra a quantidade de passageiros adultos
    console.log(`A quantidade de passageiros infantis é: ${criancatotal}`); //Mostra a quantidade de passageiros infantis
    console.log(`O custo total da viagem é R$ ${total}`);  //Mostra o custo total que o cliente irá pagar em passagens
    console.log(`---------------------------`);//linha decorativa
}
