let availableKeywords = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês', 'Artes'];

const resultBox = document.querySelector('.result-box');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function() {
  let result = [];
  let input = inputBox.value;  //O evento onkeyup é acionado quando começamos a utilizar uma tecla, como por exemplo, na digitação. Nesse caso, quando o usuário começar a digitar no inputBox, a função será acionada.

  if(input.length){ //Se o input tiver algum comprimento, ou seja, se o usuário tiver digitado algo, o código acionará o filtro.
    result = availableKeywords.filter((keyword)=>{
      return keyword.toLowerCase().includes(input.toLowerCase()); //O método includes() verifica se uma string pode ser encontrada dentro de outra string, retornando true ou false conforme apropriado. Nesse caso, o código está verificando se a palavra-chave inclui o valor digitado pelo usuário.
    });

  }
  showKeyWords(result);

  if(!result.length){
    resultBox.innerHTML = "";
  }
}

function showKeyWords(result){
  const content = result.map((list)=>{
    return "<li onclick=selectInput(this)>"+ list +"</li>";
  });

  resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
  inputBox.value = list.innerHTML;
  resultBox.innerHTML = "";
}