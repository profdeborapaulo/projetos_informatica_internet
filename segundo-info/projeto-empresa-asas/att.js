//atribuição dos passageiros
 const numadultos = 3;
 const  numcrianca = 2;

//região escolhida
const regiao = "Norte do Brasil"
const classe = "economica"

// custo total da viagem
function calcularCusto(regiao, classe, numadultos, numcriancas) {
  let precoadulto = 0;
  let precocrianca = 0;
 
  if (regiao === 'Norte do Brasil') {
    if (classe === 'economica') {
      precoadulto = 2500;
      precocrianca = 1800;
    } else if (classe === 'executiva') {
      precoadulto = 2500 * 1.20;
      precocrianca = 1800 * 1.10;
    }
  } else if (regiao === 'Sul do Brasil') {
    if (classe === 'economica') {
      precoadulto = 3000;
      precocrianca = 3000;
    } else if (classe === 'executiva') {
      precoadulto = 4000;
      precocrianca = 4000;
    }
  } else if (regiao === 'Ásia') {
    if (classe === 'economica') {
      precoadulto = 4600;
      precocrianca = 4600;
    } else if (classe === 'executiva') {
      precosdulto = 6000;
      precocrianca = 6000;
    }
  } else if (regiao === 'Europa') {
    if (classe === 'economica') {
      precoadulto = 5800;
      precocrianca = 5800;
    } else if (classe === 'executiva') {
      precoadulto = 7300;
      precocrianca = 7300;
    }
  } else if (regiao === 'África') {
    if (classe === 'economica') {
      precoadulto = 4200;
      precocrianca = 4200;
    } else if (classe === 'executiva') {
      precoadulto = 6900;
      precocrianca = 6900;
    }
  }
 
  const custototal = (numadultos * precoadulto) + (numcriancas * precocrianca);
  return custototal;
}
 
const custototal = calcularcusto(regiao, classe, numAdultos, numCriancas);
 
// total de passagens adulto, total de passagens infantis, quantas executiva e quantas econômicas e o custo total da viagem.
console.log(`Total de passagens adulto: ${numadultos}`);
console.log(`Total de passagens infantil: ${numcriancas}`);
console.log(`Classe: ${classe}`);
console.log(`Custo total da viagem: R$ ${custoTotal.tofixed(2)}`);
