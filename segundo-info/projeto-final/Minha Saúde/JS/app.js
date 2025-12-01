//carrossel
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('current'));
        
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        
        slides[currentIndex].classList.add('current');
    };

    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });
});

// Botão de agendamento
document.addEventListener('DOMContentLoaded', () => {
    
    const USUARIO_LOGADO_KEY = 'usuarioLogado';
    const linkAgendamentos = document.getElementById('link-agendamentos');
    
    if (linkAgendamentos) {
        
        linkAgendamentos.addEventListener('click', (event) => {
            event.preventDefault(); // Impede a navegação padrão do href="#"

            // Checa se o usuário está logado
            const isLogado = sessionStorage.getItem(USUARIO_LOGADO_KEY) !== null;

            if (isLogado) {
                // Se o usuário está logado, leva para a tela de perfil (onde estão os agendamentos)
                window.location.href = '../HTML/perfil.html'; 
            } else {
                // Se o usuário NÃO está logado, exibe a mensagem de erro
                alert("Você precisa estar logado para ver seus agendamentos. Por favor, faça login.");
            }
        });
    }
});