let destino= "sul"; // Variável de Destino, onde o usuário irá selecionar o destino; 
let economicainfantil= 3; // Quantidade de passagens infantis na classe econômica;
let executivainfantil= 2; // Quantidade de passagens infantis na classe executiva;
let economicaadulta= 2; // Quantidade de passagens adultas na classe econômica;
let executivaadulta= 2; // Quantidade de passagens adultas na classe executiva;
if (destino === "norte" ) { // Se o destino selecionado for norte, as seguintes informações serão impressas;
    console.log ("A quantidade de Passageiros Adultos é:",(economicaadulta + executivaadulta)) // Quantidade de passageiros adultos (que seria a soma das passagens adultas da classe econômica e da classe executiva)
    console.log ()
    console.log ("A quantidade de Passageiros Infantis é:" ,(economicainfantil + executivainfantil)) // Quantidade de passageiros crianças (que seria a soma das passagens infantis da classe econômica e da classe executiva)
    console.log ()
    console.log ("O destino escolhido foi:", destino) // A escolha do destino;
    console.log ()
    console.log ("A quantidade de passageiros na executiva é:", (executivainfantil + executivaadulta)) // Quantidade de passageiros na classe executiva (que seria a soma das passagens de classe executiva adultas e infantis); 
    console.log ("Sendo", executivainfantil, "criança(s), e", executivaadulta, "adulto(s)") // Especificando quantas passagens da classe executiva são infantis e quantas são adultas;
    console.log ()
    console.log ("A quantidade de passageiros na econômica é:", (economicainfantil + economicaadulta)) // Quantidade de passageiros na classe econômica (que seria a soma das passagens de econômica adultas e infantis) ;
    console.log ("Sendo", economicainfantil, "criança(s), e", economicaadulta, "adulto(s)") // Especificando quantas passagens da classe econômica são infantis e quantas são adultas;
    console.log ()
    console.log ("O custo total da viagem foi: R$", (economicainfantil * 1800) + (economicaadulta * 2500) + (executivainfantil * 1800+ (1800*10/100)) + (executivaadulta * 2500+ (2500*10/1000))) // O custo total da viagem ( que seria a soma de todas as passagens, sendo cada classe e idade com um valor diferente)
    
} else if (destino === "sul" ) {  // Se o destino selecionado for sul, as seguintes informações serão impressas;
    console.log ("A quantidade de Passageiros Adultos é:",(economicaadulta + executivaadulta)) // Quantidade de passageiros adultos (que seria a soma das passagens adultas da classe econômica e da classe executiva)
    console.log ()
    console.log ("A quantidade de Passageiros Infantis é:" ,(economicainfantil + executivainfantil)) // Quantidade de passageiros crianças (que seria a soma das passagens infantis da classe econômica e da classe executiva)
    console.log ()
    console.log ("O destino escolhido foi:", destino) // A escolha do destino;
    console.log ()
    console.log ("A quantidade de passageiros na executiva é:", (executivainfantil + executivaadulta)) // Quantidade de passageiros na classe executiva (que seria a soma das passagens de classe executiva adultas e infantis); 
    console.log ("Sendo", executivainfantil, "criança(s), e", executivaadulta, "adulto(s)") // Especificando quantas passagens da classe executiva são infantis e quantas são adultas;
    console.log ()
    console.log ("A quantidade de passageiros na econômica é:", (economicainfantil + economicaadulta)) // Quantidade de passageiros na classe econômica (que seria a soma das passagens de econômica adultas e infantis);
    console.log ("Sendo", economicainfantil, "criança(s), e", economicaadulta, "adulto(s)") // Especificando quantas passagens da classe econômica são infantis e quantas são adultas;
    console.log ()
    console.log ("O custo total da viagem foi: R$", ((economicainfantil + economicaadulta) * 3000) + ((executivainfantil + executivaadulta) * 4000))  // O custo total da viagem ( que seria a soma de todas as passagens, sendo cada classe com um valor diferente)
  
} else if (destino === "asia" ) { // Se o destino selecionado for asia, as seguintes informações serão impressas;
    console.log ("A quantidade de Passageiros Adultos é:",(economicaadulta + executivaadulta)) // Quantidade de passageiros adultos (que seria a soma das passagens adultas da classe econômica e da classe executiva)
    console.log ()
    console.log ("A quantidade de Passageiros Infantis é:" ,(economicainfantil + executivainfantil)) // Quantidade de passageiros crianças (que seria a soma das passagens infantis da classe econômica e da classe executiva)
    console.log ()
    console.log ("O destino escolhido foi:", destino) // A escolha do destino;
    console.log ()
    console.log ("A quantidade de passageiros na executiva é:", (executivainfantil + executivaadulta)) // Quantidade de passageiros na classe executiva (que seria a soma das passagens de classe executiva adultas e infantis); 
    console.log ("Sendo", executivainfantil, "criança(s), e", executivaadulta, "adulto(s)") // Especificando quantas passagens da classe executiva são infantis e quantas são adultas;
    console.log ()
    console.log ("A quantidade de passageiros na econômica é:", (economicainfantil + economicaadulta)) // Quantidade de passageiros na classe econômica (que seria a soma das passagens de econômica adultas e infantis);
    console.log ("Sendo", economicainfantil, "criança(s), e", economicaadulta, "adulto(s)") // Especificando quantas passagens da classe econômica são infantis e quantas são adultas;
    console.log ()
    console.log ("O custo total da viagem foi: R$", ((economicainfantil + economicaadulta) * 4600) + ((executivainfantil + executivaadulta) * 6000))  // O custo total da viagem ( que seria a soma de todas as passagens, sendo cada classe com um valor diferente)
  
}

else if (destino === "europa" ) { // Se o destino selecionado for europa, as seguintes informações serão impressas;
    console.log ("A quantidade de Passageiros Adultos é:",(economicaadulta + executivaadulta)) // Quantidade de passageiros adultos (que seria a soma das passagens adultas da classe econômica e da classe executiva);
    console.log ()
    console.log ("A quantidade de Passageiros Infantis é:" ,(economicainfantil + executivainfantil)) // Quantidade de passageiros crianças (que seria a soma das passagens infantis da classe econômica e da classe executiva);
    console.log ()
    console.log ("O destino escolhido foi:", destino) // A escolha do destino;
    console.log ()
    console.log ("A quantidade de passageiros na executiva é:", (executivainfantil + executivaadulta)) // Quantidade de passageiros na classe executiva (que seria a soma das passagens de classe executiva adultas e infantis); 
    console.log ("Sendo", executivainfantil, "criança(s), e", executivaadulta, "adulto(s)") // Especificando quantas passagens da classe executiva são infantis e quantas são adultas;
    console.log ()
    console.log ("A quantidade de passageiros na econômica é:", (economicainfantil + economicaadulta)) // Quantidade de passageiros na classe econômica (que seria a soma das passagens de econômica adultas e infantis);
    console.log ("Sendo", economicainfantil, "criança(s), e", economicaadulta, "adulto(s)") // Especificando quantas passagens da classe econômica são infantis e quantas são adultas;
    console.log ()
    console.log ("O custo total da viagem foi: R$", ((economicainfantil + economicaadulta) * 5800) + ((executivainfantil + executivaadulta) * 7300))  // O custo total da viagem ( que seria a soma de todas as passagens, sendo cada classe com um valor diferente).
}
else if (destino === "africa" ) { // Se o destino selecionado for africa, as seguintes informações serão impressas;
    console.log ("A quantidade de Passageiros Adultos é:",(economicaadulta + executivaadulta)) // Quantidade de passageiros adultos (que seria a soma das passagens adultas da classe econômica e da classe executiva);
    console.log ()
    console.log ("A quantidade de Passageiros Infantis é:" ,(economicainfantil + executivainfantil)) // Quantidade de passageiros crianças (que seria a soma das passagens infantis da classe econômica e da classe executiva);
    console.log ()
    console.log ("O destino escolhido foi:", destino) // A escolha do destino;
    console.log ()
    console.log ("A quantidade de passageiros na executiva é:", (executivainfantil + executivaadulta)) // Quantidade de passageiros na classe executiva (que seria a soma das passagens de classe executiva adultas e infantis); 
    console.log ("Sendo", executivainfantil, "criança(s), e", executivaadulta, "adulto(s)") // Especificando quantas passagens da classe executiva são infantis e quantas são adultas;
    console.log ()
    console.log ("A quantidade de passageiros na econômica é:", (economicainfantil + economicaadulta)) // Quantidade de passageiros na classe econômica (que seria a soma das passagens de econômica adultas e infantis);
    console.log ("Sendo", economicainfantil, "criança(s), e", economicaadulta, "adulto(s)") // Especificando quantas passagens da classe econômica são infantis e quantas são adultas;
    console.log ()
    console.log ("O custo total da viagem foi: R$", ((economicainfantil + economicaadulta) * 4200) + ((executivainfantil + executivaadulta) * 6900))  // O custo total da viagem ( que seria a soma de todas as passagens, sendo cada classe com um valor diferente).
}
