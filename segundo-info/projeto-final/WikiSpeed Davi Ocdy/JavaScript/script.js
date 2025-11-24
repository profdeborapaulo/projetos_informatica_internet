document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');
    const gameCards = Array.from(document.querySelectorAll('.game-card'));
    const sideLinks = Array.from(document.querySelectorAll('.side-index a'));

    function normalizeText(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function getCardTitle(card) {
        const h3 = card.querySelector('h3');
        return h3 ? h3.textContent.trim() : '';
    }

    function filter(term) {
        const query = normalizeText(term);
        gameCards.forEach(card => {
            const title = normalizeText(getCardTitle(card));
            card.style.display = title.includes(query) ? '' : 'none';
        });

        sideLinks.forEach(link => {
            const text = normalizeText(link.textContent.trim());
            link.style.display = text.includes(query) ? '' : 'none';
        });
    }

    input.addEventListener('input', e => filter(e.target.value));

    clearBtn.addEventListener('click', () => {
        input.value = '';
        filter('');
        input.focus();
    });

    input.addEventListener('keydown', e => {
        if (e.key === 'Escape') clearBtn.click();
    });
});
