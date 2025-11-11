const grid = document.querySelector('.grid');
const acertos = document.getElementById('acertos');
const pokemons = [
    { name: 'pikachu', img: "img/dragonite_card.png"},
    { name: 'charizard', img: 'img/gyarados_card.png' },
    { name: 'pikachu', img: 'img/jigglypuff_card.png' },
    { name: 'charizard', img: 'img/lucario_card.png' },
    { name: 'jigglypuff', img: 'img/mewtwo_card.png' },
    { name: 'jigglypuff', img: 'img/pikachu_card.png' }
];
const cardsArray = [...pokemons, ...pokemons];

let firstCard = null;
let secondCard = null;
let lock = false;
let contadorAcertos = 0;

function createCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = pokemon.name;

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = '?';

    const back = document.createElement('div');
    back.classList.add('card-back');
    const img = document.createElement('img');
    img.src = pokemon.img;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => {
    if (lock || card.classList.contains('flip')) return;

    card.classList.add('flip');

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lock = true;

        if (
            firstCard.dataset.name === secondCard.dataset.name &&
            firstCard !== secondCard
        ) {
            contadorAcertos++;
            acertos.textContent = `Acertos: ${contadorAcertos}`;
            setTimeout(resetCards, 800);
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetCards();
            }, 1000);
        }
    }
});

    return card;
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initGame() {
    grid.innerHTML = ""; // Limpa o grid ao reiniciar
    const shuffled = shuffle(cardsArray);
    shuffled.forEach(pokemon => {
        const card = createCard(pokemon);
        grid.appendChild(card);
    });
    contadorAcertos = 0;
    acertos.textContent = `Acertos: ${contadorAcertos}`;
}

document.getElementById('reiniciar').addEventListener('click', () => {
    window.location.reload();
});

initGame();