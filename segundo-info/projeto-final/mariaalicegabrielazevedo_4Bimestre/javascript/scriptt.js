const openButtons = document.querySelectorAll('.open-modal');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
         const modalId = button.getAttribute('data-modal');
          const modal = document.getElementById(modalId);

          modal.close();
    });
});

/*---------------------------------------------------------------------------------------------------------------------------------------*/

/*Para exibir outras informações no card da dica*/

document.querySelectorAll('.dica').forEach(dica => {
  const section2 = dica.querySelector('.section2');
  const section3 = dica.querySelector('.section3');

  section2.addEventListener('mouseenter', () => {
    section3.classList.add('ativo');
    section2.classList.add('invisivel');
  });

  section2.addEventListener('mouseleave', () => {
    section3.classList.remove('ativo');
    section2.classList.remove('invisivel');
  });
});

/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/*Para trocar as palavras da primeira tela*/

let palavras = ["assustador", "terrível", "pavoroso", "medonho"]; /*Cria um array com as palavras*/
let i = 0; /*Define a variável que vai controlar a palavra a ser usada, nesse caso "assustador"*/
const span = document.getElementById("palavra"); /*procura o span pelo id "palavra"*/
setInterval(() => { /*Cria uma função de intervalo */

span.style.opacity = 0; /*faz a palavra sumir */
setTimeout(() => { /*A partir de 0,5 segundos a próxima ação ocorrerá*/

  span.textContent =palavras[i]; /*Troca o conteúdo do span */
  span.style.opacity = 1; /*Faz a próxima palavra aparecer */
  i = (i + 1) % palavras.length /*Define que a próxima palavra depois de assustador vai aparecer*/

   }, 500);
}, 2000); /*Intervalo total entre duas trocas */

//---------------------------------------------------------------------------------------------------------------------------------------------

//Imagens mudando na tela "oque é?"

var slideIndex = 0; 
showSlides(); 

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("img_carrosel"); 
    
    // 1. Remove a classe 'active-slide' de TODAS as imagens
    for (i = 0; i < slides.length; i++) {
        // REMOVA: slides[i].style.display = "none";
        slides[i].classList.remove("active-slide"); 
    }
    
    // 2. Avança para a próxima imagem.
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    
    // 3. ADICIONA a classe 'active-slide' à nova imagem
    // REMOVA: slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].classList.add("active-slide"); 
    
    // 4. Temporizador (7 segundos sugeridos)
    setTimeout(showSlides, 7000); 
}


