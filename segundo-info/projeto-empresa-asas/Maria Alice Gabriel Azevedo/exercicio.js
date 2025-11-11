const destino="Continente Asiático"; //*Esta variável indica o destino das passagens;
const classe= "Classe Econômica";  //*Esta variável indica a(as) a classe(s) escholhida(s) no voo;
let criançaeconomica=1; //*Esta variável indica a quantidade de crianças na classe econômica;
let criançaexecutiva=0; //*Esta variável indica a quantidade de crianças na classe executiva;
let adultoeconomica=3; //*Esta variável indica a quantidade de adulto na classe econômica;
let adultoexecutiva=0; //*Esta variável indica a quantidade de adulto na classe econômica;


if (destino==="Norte do Brasil" && classe==="Classe Econômica") { //*Define a condição para as próximas informações;
    let total = (criançaeconomica*1800) + (adultoeconomica*2500); //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:"); //*Indica as informações sobre as passagens compradas;
    console.log(""); //*Pula linha;
    console.log("Destino escolhido: ", destino); //*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe); //*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaeconomica); //*Indica a quantidade de crianças escolhidas na classe escolhida;
    console.log("A quantidade de passageiros adultos é: ", adultoeconomica); //*Indica a quantidade de passagens de adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) ); //*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Norte do Brasil" && classe==="Classe Executiva") { //*Define a condição para as próximas informações;
    let total = (criançaexecutiva*(1800/100*10)) + (adultoexecutiva*(2500/100*20)); //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:"); //*Indica as informações sobre as passagens compradas;
    console.log("");  //*Pula linha;
    console.log("Destino escolhido: ", destino); //*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe); //*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaeconomica);  //*Indica a quantidade de crianças escolhidas na classe escolhida;
    console.log("A quantidade de passageiros adultos é: ", adultoeconomica); //*Indica a quantidade de passagens de adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
    
}

else if (destino==="Norte do Brasil" && classe==="Classe Econômica e Executiva") { //*Define a condição para as próximas informações;
    let total = (criançaeconomica*1800) + (adultoeconomica*2500) + (criançaexecutiva*(1800/100*10)) + (adultoexecutiva*(2500/100*20)); //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");  //*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);  //*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançatotal);  //*Indica a quantidade de crianças escolhidas na classe escolhida;
    console.log("A quantidade de passageiros adultos é: ", adultototal); //*Indica a quantidade de passagens de adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) ); //*Indica o custo total da viagem, pela variável criada para esta condição;
    
}



if (destino==="Sul do Brasil" && classe==="Classe Econômica") { //*Define a condição para as próximas informações;
    
    let total=(criançaeconomica+adultoeconomica)*3000; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaeconomica); //*Indica a quantidade de crianças escolhidas na classe escolhida;
    console.log("A quantidade de passageiros adultos é: ", adultoeconomica); //*Indica a quantidade de passagens de adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) ); //*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Sul do Brasil" && classe==="Classe Executiva") {//*Define a condição para as próximas informações;
    
    let total=(criançaexecutiva+adultoexecutiva)*4000; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaexecutiva); //*Indica a quantidade de crianças escolhidas na classe escolhida;
    console.log("A quantidade de passageiros adultos é: ", adultoexecutiva);//*Indica a quantidade de passagens de adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) ); //*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Sul do Brasil" && classe==="Classe Econômica e Executiva") { //Define a condição para as próximas informações;
    
    let total= (criançaeconomica+adultoeconomica)*3000; (criançaexecutiva+adultoexecutiva)*4000 //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançatotal); //*Indica a quantidade de crianças escolhidas na classe escolhida;
    console.log("A quantidade de passageiros adultos é: ", adultototal); //*Indica a quantidade de passagens de adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) ); //*Indica o custo total da viagem, pela variável criada para esta condição;
    
}



if (destino==="Continente Asiático" && classe==="Classe Econômica") {//Define a condição para as próximas informações;

    let total = (criançaeconomica+adultoeconomica*4600); //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log(""); //*Pula linha;
    console.log("Destino escolhido: Continente Asiático"); //*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaeconomica);  //*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultoeconomica);//*Indica a quantidade de passageiros  adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Continente Asiático" && classe==="Classe Executiva") { //Define a condição para as próximas informações;

    let total = (criançaexecutiva+adultoexecutiva*6000); //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: Continente Asiático"); //*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe); //*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaexecutiva); //*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultoexecutiva);//*Indica a quantidade de passageiros  adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) ); //*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Continente Asiático" && classe==="Classe Econômica e Executiva") {  //Define a condição para as próximas informações;

    let total = (criançaeconomica+adultoeconomica*4600) + (criançaexecutiva+adultoexecutiva*6000); //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: Continente Asiático");//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançatotal);//*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultototal);//*Indica a quantidade de passageiros  adultos selecionadas no voo;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
}



if (destino==="Continente Europeu" && classe==="Classe Econômica") {//Define a condição para as próximas informações;

    let total = (criançaeconomica+adultoeconomica)*5800; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaeconomica);//*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultoeconomica);//*Indica a quantidade de  passageiros adultos escolhidas na classe escolhida;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Continente Europeu" && classe==="Classe Executiva") {//Define a condição para as próximas informações;

    let total = (criançaexecutiva+adultoexecutiva)*7300; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaexecutiva);//*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultoexecutiva);//*Indica a quantidade de  passageiros adultos escolhidas na classe escolhida;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Continente Europeu" && classe==="Classe Econômica e Executiva") {//Define a condição para as próximas informações;

    let total = (criançaeconomica+adultoeconomica)*5800 + (criançaexecutiva+adultoexecutiva)*7300; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançatotal);//*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultototal);//*Indica a quantidade de  passageiros adultos escolhidas na classe escolhida;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
    
}



if (destino==="Continente Africano" && classe==="Classe Econômica") {//Define a condição para as próximas informações;

    let total = (criançaeconomica+adultoeconomica)*4200; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaeconomica);//*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultoeconomica);//*Indica a quantidade de  passageiros adultos escolhidas na classe escolhida;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Continente Africano" && classe==="Classe Executiva") {//Define a condição para as próximas informações;

    let total = (criançaexecutiva+adultoexecutiva)*6900; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançaexecutiva);//*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultoexecutiva);//*Indica a quantidade de  passageiros adultos escolhidas na classe escolhida;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
}

else if (destino==="Continente Africano" && classe==="Classe Econômica e Executiva") {//Define a condição para as próximas informações;

    let total = (criançaeconomica+adultoeconomica)*4200 + (criançaexecutiva+adultoexecutiva)*6900; //*Variável criada para as condições específicas acima;
    console.log("Informações sobre o voo:");//*Indica as informações sobre as passagens compradas;
    console.log("");//*Pula linha;
    console.log("Destino escolhido: ", destino);//*Indica a região/continente escolhido como destino;
    console.log("Classe selecionada: ", classe);//*Indica a classe do voo selecionada;
    console.log("A quantidade de passageiros crianças é: ", criançatotal);//*Indica a quantidade de  passageiros crianças escolhidas na classe escolhida;
    console.log("A quantidade de passgeiros adultos é: ", adultototal);//*Indica a quantidade de  passageiros adultos escolhidas na classe escolhida;
    console.log("O custo total da viagem é: ", (total) );//*Indica o custo total da viagem, pela variável criada para esta condição;
    
    
}


