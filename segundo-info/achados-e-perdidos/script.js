// Smooth scroll para os links da navegação
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handler: submissão do formulário "Registrar Item Perdido"
    const lostForm = document.getElementById('lost-item-form');
    const carousel = document.getElementById('items-carousel');

    if (lostForm && carousel) {
        lostForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Use validação nativa do formulário antes de processar (reportValidity mostra mensagens)
            if (!lostForm.checkValidity()) {
                lostForm.reportValidity();
                return;
            }

            const itemName = document.getElementById('item-name').value.trim();
            const line = document.getElementById('line').value.trim();
            const lostDate = document.getElementById('lost-date') ? document.getElementById('lost-date').value : '';
            // Formata a data (YYYY-MM-DD -> DD/MM/YYYY) se fornecida
            const formattedDate = formatDateForDisplay(lostDate);

            // Cria novo item do carrossel com os dados do formulário
            const itemDiv = document.createElement('div');
            itemDiv.className = 'carousel-item';
            itemDiv.innerHTML = `\
                <div class="carousel-image"></div>\
                <h3>${escapeHtml(itemName)}</h3>\
                <p>Data da perda: ${escapeHtml(formattedDate || 'Não informada')}</p>\
                <p>Local: ${escapeHtml(line || 'Não informado')}</p>\
                <button class="btn" onclick="scrollToForm()">Agendar Busca</button>`;

            // Insere o novo item no início do carrossel para ficar visível imediatamente
            carousel.prepend(itemDiv);

            // Limpa o formulário
            lostForm.reset();

            // Rola até o novo item para feedback visual
            itemDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});

// Função para scroll até o formulário de agendamento
function scrollToForm() {
    const formSection = document.querySelector('.form-section[style*="background: white"]');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Pequena função utilitária para escapar HTML em strings inseridas no DOM
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Formata YYYY-MM-DD para DD/MM/YYYY
function formatDateForDisplay(isoDate) {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}