// ======================================================================
// 1. CONSTANTES E VARIÁVEIS GLOBAIS
// ======================================================================
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('game-search-input');
const resultsDisplay = document.getElementById('game-results-display');
// Elemento da lista do histórico e limite
const historyList = document.getElementById('search-history-list'); 
const MAX_HISTORY_ITEMS = 5; 
// ✅ NOVO: Elemento do Banner
const silksongBanner = document.getElementById('silksong-banner-search');

const USD_TO_BRL = 5.3761; //taxa de conversão USD para BRL
const BASE_URL = "https://game-finder-sw2025.onrender.com";
const API_URL = "http://localhost:3000/api/search";
const DETAILS_API_URL = "http://localhost:3000/api/game-details";

// Palavras-chave para filtrar resultados que não sejam o jogo base (DLC, etc.)
const NON_GAME_KEYWORDS = [
  "dlc", "soundtrack", "expansion", "pack", "bundle", "edition", "map", "artbook", "wallpaper", "season pass", "ultimate", "deluxe", "gold", "premium", "key"
];

// ✅ LISTA MESTRE FIXA (7 LOJAS DE PC)
const MASTER_PC_STORES = [
    // Lojas com Ícone (use: IMG/steam_logo.png e IMG/epic_logo.png)
    { name: "Steam", mapNames: ["steam"], icon: "IMG/steam_logo.png" },
    { name: "Epic Games Store", mapNames: ["epic games store"], icon: "IMG/epic_logo.png" },
    // Lojas com Texto Estilizado (Text-Logo)
    { name: "GOG", mapNames: ["gog"], textClass: "gog-text" },
    { name: "Origin (EA App)", mapNames: ["origin", "origin (ea app)"], textClass: "origin-text" },
    { name: "Humble Store", mapNames: ["humble store"], textClass: "humble-text" },
    { name: "Ubisoft Store", mapNames: ["ubisoft store"], textClass: "store-logo-text" },
    { name: "GreenManGaming", mapNames: ["greenmangaming"], textClass: "greenmangaming-text" }, 
];

// Mapeamento CheapShark ID (da API) para o Nome Limpo
const CHEAPSHARK_STORE_MAP = {
  "1": "Steam",
  "2": "GamersGate", 
  "3": "GreenManGaming", 
  "7": "GOG",
  "8": "Origin (EA App)",
  "11": "Humble Store",
  "13": "Ubisoft Store", 
  "25": "Xbox Marketplace", 
  "29": "Epic Games Store",
  "31": "GOG" 
};

// ... Mapeamentos RAWG (Mantidos, apenas para referência)
const RAWG_ID_TO_NAME_MAP = {
    "1": "Steam",
    "2": "Xbox Marketplace", 
    "3": "PlayStation Store",
    "4": "App Store",
    "5": "GOG",
    "6": "Nintendo eShop",
    "7": "Xbox Marketplace", 
    "8": "PlayStation Store", 
    "9": "Epic Games Store",
    "10": "GOG", 
    "11": "Google Play",
    "12": "itch.io",
    "13": "Xbox Marketplace",
    "14": "Web",
    "15": "Google Play",
    "16": "App Store",
    "17": "PlayStation Store",
    "18": "Xbox Marketplace",
    "20": "Epic Games Store"
};

// ======================================================================
// 2. FUNÇÕES DE HISTÓRICO 
// ======================================================================

function loadSearchHistory() {
    if (!historyList) return; 

    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    displaySearchHistory(history);
}

function saveToSearchHistory(gameName) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    history = history.filter(item => item.toLowerCase() !== gameName.toLowerCase());
    
    history.unshift(gameName);
    
    history = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem('searchHistory', JSON.stringify(history));
    displaySearchHistory(history);
}

function displaySearchHistory(history) {
    if (!historyList) return; 
    
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<li style="color: #6b7280; font-style: italic;">Nenhum jogo pesquisado.</li>';
        return;
    }

    history.forEach(gameName => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.textContent = gameName; 
        link.href = "#";
        
        link.onclick = (e) => {
            e.preventDefault(); 
            searchInput.value = gameName;
            searchInput.focus(); 
        };
        
        listItem.appendChild(link);
        historyList.appendChild(listItem);
    });
}

// ======================================================================
// 3. FUNÇÕES AUXILIARES (EXISTENTES)
// ======================================================================

// Simulação de Avaliação
function simulateRating(storeName){
  const name = storeName.toLowerCase();
  if (name.includes("steam")) return 5.0;
  if (name.includes("gog")) return 5.0;
  if (name.includes("epic games")) return 4.0;
  return 4.0; // Padrão para outras lojas de PC
}

// Função para criar o card de loja (Com Lógica de Logo/Text-Logo)
function createStoreCardHTML(store) {
    const { storeName, offer, url, renderIcon, renderTextClass } = store; 
    // ... (lógica existente) ...
    
    // 1. Definição do Preço e Taxa de Economia
    let priceHTML = '<p>Preço: N/A</p>';
    let normalPriceHTML = '';
    let savingsBadgeHTML = '';
    let priceSorting = Infinity; 
    let cardClass = "store-card";

    if (offer) {
        const salePriceUSD = parseFloat(offer.salePrice);
        const normalPriceUSD = parseFloat(offer.normalPrice);
        const savingsPercentage = parseFloat(offer.savings);

        const salePriceBRL = (salePriceUSD * USD_TO_BRL).toFixed(2);
        const normalPriceBRL = (normalPriceUSD * USD_TO_BRL).toFixed(2);

        priceSorting = salePriceUSD; 

        if (salePriceUSD < normalPriceUSD) {
            priceHTML = `<p>Preço: R$ <strong>${salePriceBRL}</strong></p>`;
            normalPriceHTML = `<p class="strikethrough">De: R$ ${normalPriceBRL}</p>`;
            savingsBadgeHTML = `<div class="savings-badge">-${Math.round(savingsPercentage)}%</div>`;
            cardClass += " offer-card";
        } else {
            priceHTML = `<p>Preço: R$ <strong>${salePriceBRL}</strong></p>`;
        }
    } else {
        // Se não houver oferta CheapShark, mostra Indisponível/N/A
        priceHTML = `<p>Preço: <span class="unavailable-price">Indisponível</span></p>`;
        priceSorting = Infinity;
    }

    // 2. Outras Informações
    const storeRating = (parseFloat(simulateRating(storeName)).toFixed(1)) || 'N/A';
    const ptbrText = 'N/A'; 
    const storeRatingHTML = `<p>Avaliação: ${storeRating} ⭐⭐</p>`;
    const ptbrHTML = `<p>PT-BR: ${ptbrText}</p>`;
    
    // O link do card
    const finalUrl = url && url !== 'N/A' && url !== '#' ? url : '#';
    const cursorStyle = finalUrl === '#' ? 'cursor-default' : 'cursor-pointer';

    // 3. Lógica de Renderização do Cabeçalho
    let cardHeaderContent = '';

    if (renderIcon) {
        cardHeaderContent = `<img src="${renderIcon}" alt="${storeName} Logo" class="store-logo"> ${storeName}`;
    } else if (renderTextClass) {
        cardHeaderContent = `<span class="${renderTextClass}">${storeName}</span>`;
    } else {
        cardHeaderContent = `<span class="store-logo-text">${storeName}</span>`;
    }
    
    // 4. Retorno do HTML do Card
    return `
        <div class="${cardClass} ${cursorStyle}" onclick="${finalUrl !== '#' ? `window.open('${finalUrl}', '_blank')` : ''}" data-price="${priceSorting}" data-pc="true"> 
            ${savingsBadgeHTML}
            <div class="card-header">
                ${cardHeaderContent}
            </div>
            <div class="card-body">
                ${normalPriceHTML}
                ${priceHTML}
                ${storeRatingHTML}
                ${ptbrHTML}
                ${finalUrl === '#' ? '<p class="link-unavailable">Link Indisponível</p>' : ''}
            </div>
        </div>
    `;
}

// ======================================================================
// 4. FUNÇÕES PRINCIPAIS (EXISTENTES)
// ======================================================================

// Função para criar o card do jogo (Lista de Resultados)
function createGameListItem(game){
    const platformsArray = Array.isArray(game.plataforms) ? game.plataforms : game.platforms || [];
    const platformsDisplay = platformsArray.slice(0,3).join(", ") || "N/A";
    
    return `
    <div class="game-list-item" data-game-id="${game.id}"> 
    <img src="${game.image}" alt="${game.name}" class="item-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
    <div class="item-details">
        <h3 class="item-title">${game.name}</h3>
        <p class="item-release">Lançamento: ${game.released || 'N/A'}</p>
        <p class="item-platforms">Plataformas: ${platformsDisplay}${platformsArray.length > 3 ? '...' : ''}</p>
    </div>
    <button class="select-button" onclick="handleGameSelection('${game.id}', '${game.name}' )">Ver Detalhes </button>
    </div>
    `;
}

// Função para para exibir os resultados em lista
function displayGames(games){
      resultsDisplay.innerHTML = `
        <h2>Resultados da Busca (Clique para Detalhes)</h2>
        <div class="game-list-container">
        ${games.map(createGameListItem).join("")}
        </div>
    `;
}


// função para exibir os detalhes do jogo selecionado
function displayGameDetails(game){
    const platforms = Array.isArray(game.plataforms) ? game.plataforms : game.platforms || []; 
    const platformsText = platforms.join(", ");

    const developers = Array.isArray(game.developers) ? game.developers.join(", ") : "N/A";
    const genres = Array.isArray(game.genres) ? game.genres.map((g) => g.name).join(", ") : "N/A"; 
    const descriptionSnippet = game.description ? game.description.substring(0, 500).split(' ').slice(0,-1).join(' ') + "..." : "Descrição indisponível.";

    // Site Oficial
    const websiteUrl = game.website && game.website !== 'http://' ? game.website : null;
    const websiteDisplayUrl = websiteUrl ? websiteUrl.replace(/https?:\/\//, '').split('/')[0] : 'N/A';
    const websiteHtml = websiteUrl 
        ? `<p><strong>Site Oficial:</strong> <a href="${websiteUrl}" target="_blank" rel="noopener noreferrer">${websiteDisplayUrl}</a></p>` 
        : '<p><strong>Site Oficial:</strong> N/A</p>';

    // 1. Processo de filtro CheapShark
    let bestOffers = {};
    const allowedStoreNames = MASTER_PC_STORES.flatMap(s => s.mapNames);

    (game.offers || [])
    .filter(offer => {
        const storeID = offer.storeID;
        const csStoreName = CHEAPSHARK_STORE_MAP[storeID] || '';
        
        const offerTitleLower = offer.title ? offer.title.toLowerCase().trim() : ''; 
        const gameNameLower = game.name ? game.name.toLowerCase().trim() : ''; 

        const isDLCKeyword = NON_GAME_KEYWORDS.some(keyword => offerTitleLower.includes(keyword));
        const isNameMismatch = offerTitleLower !== gameNameLower && !offerTitleLower.startsWith(gameNameLower);

        if (isDLCKeyword || isNameMismatch) {
            return false;
        }
        
        // Filtro CheapShark por Loja PC
        const csNameLower = csStoreName.toLowerCase().split('(')[0].trim(); 
        const isPCStore = allowedStoreNames.some(allowedName => allowedName === csNameLower);

        return isPCStore;
    })
    .forEach(offer => {
        const storeID = offer.storeID; 
        const salePrice = parseFloat(offer.salePrice);
        
        if (!bestOffers[storeID] || salePrice < parseFloat(bestOffers[storeID].salePrice)) {
            bestOffers[storeID] = offer;
        }
    });

    // 2. Processo de Mapeamento RAWG
    const rawgStoreMap = new Map();
    (game.stores || [])
        .filter(rawgStore => {
            const rawgNameLower = rawgStore.storeName.toLowerCase().trim();
            const isPCStore = allowedStoreNames.some(allowedName => allowedName === rawgNameLower);
            
            return rawgStore && isPCStore;
        })
        .forEach(rawgStore => {
            const rawgNameLower = rawgStore.storeName.toLowerCase().trim();
            rawgStoreMap.set(rawgNameLower, rawgStore);
        });
        
    // 3. Iterar sobre a MASTER_PC_STORES para garantir que todos os 7 cards apareçam.
    const combinedStores = [];

    MASTER_PC_STORES.forEach(masterStore => {
        const masterNameLower = masterStore.mapNames[0];

        let rawgMatch = rawgStoreMap.get(masterNameLower);
        let offerMatch = null;
        let usedStoreId = null;

        // Encontra a melhor oferta CheapShark
        for (const storeID in bestOffers) {
            const csStoreName = CHEAPSHARK_STORE_MAP[storeID] || '';
            const csNameLower = csStoreName.toLowerCase().split('(')[0].trim(); 

            if (masterStore.mapNames.includes(csNameLower)){
                offerMatch = bestOffers[storeID];
                usedStoreId = storeID;
                break;
            }
        }
        
        if (offerMatch && usedStoreId) {
            delete bestOffers[usedStoreId]; 
        }

        combinedStores.push({
            storeName: masterStore.name,
            url: offerMatch ? (offerMatch.dealID ? `https://www.cheapshark.com/redirect?dealID=${offerMatch.dealID}` : offerMatch.link) : (rawgMatch ? rawgMatch.url : 'N/A'),
            offer: offerMatch,
            renderIcon: masterStore.icon, 
            renderTextClass: masterStore.textClass,
        });
    });

    // Ordenação: por preço
    const orderedStores = combinedStores.sort((a, b) => {
        const priceA = a.offer ? parseFloat(a.offer.salePrice) : Infinity;
        const priceB = b.offer ? parseFloat(b.offer.salePrice) : Infinity;

        return priceA - priceB; // menor preço primeiro
    });

    // ======================================================================
    // Lógica do Aviso (Se todas as lojas estão indisponíveis/sem link)
    // ======================================================================
    // Verifica se alguma das 7 lojas master tem um preço da CheapShark ou um link RAWG válido
    const isAnyStoreAvailable = orderedStores.some(store => store.offer !== null || (store.url && store.url !== 'N/A' && store.url !== '#'));
    let warningMessageHtml = '';

    if (!isAnyStoreAvailable) {
        let reason = "Nenhuma loja de PC convencional (Steam, Epic, GOG, GreenManGaming, etc.) foi encontrada com link ou preço disponível para este jogo.";
        
        // Tenta inferir a razão
        const platformsLower = platformsText.toLowerCase();

        if (platformsLower.includes("playstation") || platformsLower.includes("xbox") || platformsLower.includes("nintendo")) {
            reason = "O jogo pode ser um **exclusivo de Console** (PlayStation, Xbox ou Nintendo) ou vendido apenas em suas lojas oficiais.";
        } else if (platformsLower.includes("android") || platformsLower.includes("ios") || platformsLower.includes("mobile")) {
            reason = "O jogo pode ser um **exclusivo Mobile** (Android ou iOS) e só está disponível em suas respectivas lojas.";
        } else if (websiteUrl && websiteUrl.toLowerCase().includes('microsoft.com')) {
             reason = "O jogo pode ser um **exclusivo da Microsoft Store** ou de uma loja específica.";
        } 
        
        // Adiciona convite para o site oficial se houver um link
        if (websiteUrl) {
             reason += " Por favor, verifique o **Site Oficial** do jogo para mais informações sobre onde comprar.";
        }

        warningMessageHtml = `
            <div class="warning-box">
                <h4>Atenção: Lojas Indisponíveis/Links Quebrados</h4>
                <p>${reason}</p>
            </div>
        `;
    }

    // Geração do HTML dos cards das lojas
    const storeCardsHtml = orderedStores.map(createStoreCardHTML).join('');

    const storesHtml = `
        <h3 class="section-title">Lojas de PC Disponíveis (Preços da CheapShark e Links da RAWG)</h3>
        <div class="store-list-container">
            ${storeCardsHtml}
        </div>
    `;

    resultsDisplay.innerHTML = `
        <div class="game-details-card">
            <button class="back-button" onclick="document.location.reload()">Voltar à Busca</button>
            <img src="${game.image}" alt="${game.name}" class="details-image" onerror="this.onerror=null;this.src='https://via.placeholder.com/460';">
            <h2 class="details-title">${game.name}</h2>
            <p><strong>Metacritic:</strong> ${game.metacritic || 'N/A'}</p>
            <p><strong>Lançamento:</strong> ${game.released || 'N/A'}</p>
            <p><strong>Desenvolvedor:</strong> ${developers}</p>
            <p><strong>Gêneros:</strong> ${genres}</p>
            <p><strong>Plataformas:</strong> ${platformsText}</p>
            
            ${websiteHtml}
            
            <h3>Descrição</h3>
            <p class="details-description">${descriptionSnippet}</p>

            ${warningMessageHtml}
            ${storesHtml}
        </div>
    `;
    
    // Salva no histórico APÓS os detalhes serem carregados
    saveToSearchHistory(game.name);
}

// função para buscar os detalhes do jogo selecionado
async function handleGameSelection(gameId, gameName) {
    resultsDisplay.innerHTML = `<h2>Buscando Detalhes de ${gameName}...</h2>`;

    try {
        const response = await fetch(`${DETAILS_API_URL}/${gameId}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP ao buscar detalhes! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.game) {
            displayGameDetails(data.game);
        } else {
            resultsDisplay.innerHTML = `<h2>Erro: Detalhes do jogo ${gameName} não encontrados.</h2>`;
        }
    } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
        resultsDisplay.innerHTML = `<h2>Erro ao buscar detalhes!</h2>
                                    <p>Não foi possível obter os detalhes do jogo. Detalhes do erro: ${error.message}</p>`;
    }
}
window.handleGameSelection = handleGameSelection;

async function searchGame() {
    resultsDisplay.innerHTML = '<h2>Buscando...</h2>';
    const gameName = searchInput.value.trim();

    if (gameName === "") {
        resultsDisplay.innerHTML = "<h2>Por favor, digite o nome de um jogo.</h2>";
        return;
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameName: gameName }),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.results && data.results.length > 0){
            displayGames(data.results);
        } else {
            resultsDisplay.innerHTML = `<h2>Nenhum jogo encontrado para "${gameName}".</h2>`;
        }

    } catch (error) {
        console.error("Erro ao buscar jogo:", error);
        resultsDisplay.innerHTML = `<h2>Erro na Conexão!</h2>
                                        <p>Não foi possível conectar ao servidor. Verifique se o Node.js está rodando em **http://localhost:3000** e se a permissão de rede foi concedida.</p>`;
    }
}

// ======================================================================
// 5. EVENTOS E INICIALIZAÇÃO
// ======================================================================

// eventos de clique e enter
searchButton.addEventListener("click", searchGame);

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchGame();
  }
});

// ✅ NOVO: Evento de clique no Banner para pesquisar "Hollow Knight: Silksong"
if (silksongBanner) {
    silksongBanner.addEventListener('click', () => {
        searchInput.value = 'Hollow Knight: Silksong';
        searchGame();
    });
}


// CHAMADA PARA CARREGAR O HISTÓRICO

window.addEventListener('load', loadSearchHistory);

