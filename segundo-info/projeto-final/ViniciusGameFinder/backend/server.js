// Importa o framework Express e o pacote CORS
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Inicializa o aplicativo Express
const app = express();
const port = 3000; // Porta onde o servidor irá escutar

//API RAWG
const RAWG_API_KEY = "919ae0f52fcd4858835eeed19e16ecf0";
const RAWG_BASE_URL = "https://api.rawg.io/api/games";

//API CheapShark
const CHEAPSHARK_BASE_URL = "https://www.cheapshark.com/api/1.0";
const CHEAPSHARK_STORE_MAP = {

    "1": "Steam",
    "2": "GamersGate",
    "3": "GreenManGaming",
    "7": "GOG",
    "8": "Origin", 
    "11": "Humble Store",
    "13": "Ubisoft Store",
    "25": "Xbox Marketplace", // O nome da loja CheapShark para a Microsoft Store
    "29": "Epic Games Store",
    "21": "IGNORAR_21", 
    "28": "IGNORAR_28",
};


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
const RAWG_URL_TO_NAME_MAP = {
    'store.steampowered.com': 'Steam',
    'playstation.com': 'PlayStation Store',
    'epicgames.com': 'Epic Games Store',
    'microsoft.com': 'Xbox Marketplace', 
    'gog.com': 'GOG',
    'nintendo.com': 'Nintendo eShop',
    'xbox.com': 'Xbox Marketplace',
    'origin.com': 'Origin (EA App)', 
    'ea.com': 'Origin (EA App)',     
    'ubisoft.com': 'Ubisoft Store',  
}
function getStoreNameFromUrl(url) {
    if (!url) return null;
    const urlLower = url.toLowerCase();
    for (const [key, name] of Object.entries(RAWG_URL_TO_NAME_MAP)) {
        if (urlLower.includes(key)) {
            return name;
        }
    }
    return null; 
}

/**
 * Função para validar se uma URL está acessível.
 * Faz uma requisição HEAD.
 */
async function checkUrlAccessibility(url) {
    if (!url || url.includes('N/A')) return false;

    // Remove parâmetros de query/hash que podem quebrar o HEAD request
    const cleanedUrl = url.split('?')[0].split('#')[0];
    
    // Lista de domínios que vão quebrar o HEAD
    const knownFailingDomains = ['nintendo.com', 'nintendo.co.jp', 'nintendo.co.uk'];
    if (knownFailingDomains.some(domain => cleanedUrl.includes(domain))) {
        // Assume que está ok para não penalizar lojas importantes que falham no HEAD por região
        console.log(`[VALIDAÇÃO URL] IGNORADO (Domínio Conhecido por Falhar): ${cleanedUrl}`);
        return true; 
    }

    try {
        const response = await axios.head(cleanedUrl, {
            timeout: 5000, // Tempo limite de 5 segundos
            maxRedirects: 5, // Segue até 5 redirecionamentos
        });
        
        return response.status >= 200 && response.status < 400;

    } catch (error) {
        // Logs de erro para saber qual URL quebrou
        console.error(`[VALIDAÇÃO URL] FALHA (${error.response ? error.response.status : 'Timeout/Conexão'}): ${cleanedUrl}`);
        return false;
    }
}


// Middleware (funções que rodam antes da rota)
app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
app.use(express.json()); // Permite que o servidor entenda JSON no corpo das requisições

// Rota POST para /api/search.
app.post("/api/search", async (req, res) => {
  const gameName = req.body.gameName;
  if (!gameName) {
    return res.status(400).json({ error: "Termo de busca não fornecido." });
  }
  console.log(`Recebido pedido de busca para: ${gameName}`); 

  try {
    //requisitar lista de jogos que batem com o nome
    const response = await axios.get(RAWG_BASE_URL, {
      params: {
        key: RAWG_API_KEY,
        search: gameName,
        page_size: 5, // Limita a 5 resultados
        search_precise: false, // Busca aproximada
      },
    });
    const rawgGames = response.data.results;

    if (rawgGames.length === 0) {
      return res.json({
        message: `Nenhum jogo encontrado para: ${gameName}`,
        results: [],
      });
    }

    const simpleResults = rawgGames.map((game) => ({
      id: game.id,
      slug: game.slug,
      name: game.name,
      released: game.released,
      image: game.background_image,
      //simplificando as plataformas disponíveis
      platforms: game.platforms
        ? game.platforms.map((p) => p.platform.name)
        : [],
    }));

    res.json({
      message: `[SUCESSO RAWG] Encontrados ${simpleResults.length} jogos para: ${gameName}`,
      results: simpleResults,
    });
  } catch (error) {
    console.error("ERRO RAWG API:", error.message);
    res.status(500).json({
      error:
        "Erro ao comunicar com a API RAWG durante a busca. Tente novamente mais tarde.",
    });
  }
});

//Rota 2: Detalhes para lojas do jogo
app.get("/api/game-details/:id", async (req, res) => {
  const gameId = req.params.id;
  if (!gameId) {
    return res.status(400).json({
      error: "ID do jogo não fornecido.",
    });
  }
  console.log(`Recebido pedido de detalhes para o jogo com ID: ${gameId}`);

  try {
    //Busca para detalhes do jogo incluindo os preços
    const detailsResponse = await axios.get(`${RAWG_BASE_URL}/${gameId}`, {
      params: { key: RAWG_API_KEY },
    });
    const gameDetails = detailsResponse.data;

    const gameName = gameDetails.name;
    let offers = [];

    try {
      const offersResponse = await axios.get(`${CHEAPSHARK_BASE_URL}/deals`, {
        params: {
          title: gameName,
          limit: 60, 
        },
      });
      
      offers = offersResponse.data.map((offer) => ({
        storeID: offer.storeID, 
        salePrice: offer.salePrice,
        normalPrice: offer.normalPrice,
        savings: offer.savings,
        dealID: offer.dealID,
        link: `https://www.cheapshark.com/redirect?dealID=${offer.dealID}`,
        title: offer.title || gameName, // Usar o título da oferta CheapShark, se existir, senão o da RAWG
      }));

    } catch (error) {
        console.error("Erro ao buscar ofertas CheapShark:", error.message);
        offers = []; 
    }
    //Busca para lojas do jogo
    const storesResponse = await axios.get(
      `${RAWG_BASE_URL}/${gameId}/stores`,
      {
        params: { key: RAWG_API_KEY },
      }
    );
    const gameStores = storesResponse.data.results;

    // Mapeamento e Filtro de URLs Quebradas
    const validatedStores = [];
    for (const s of gameStores) {
        const storeId = s.store?.id || s.id;
        const url = s.url;
        
        // 1. Tenta mapear pelo ID 
        let cleanStoreName = RAWG_ID_TO_NAME_MAP[storeId]; 
        
        // 2. Tenta mapear pela URL
        if (!cleanStoreName) {
            cleanStoreName = getStoreNameFromUrl(url);
        }
        
        // 3. Tenta usar o nome que a RAWG pode ter fornecido
        if (!cleanStoreName) {
            cleanStoreName = s.store?.name || s.name;
        }
        //Normaliza o nome para o frontend
        if (cleanStoreName && cleanStoreName.toLowerCase() === 'origin') {
            cleanStoreName = 'Origin (EA App)';
        }

        // 4. Último recurso: Loja Desconhecida
        if (!cleanStoreName) {
            cleanStoreName = "Loja Desconhecida";
        }
        
        // 5. Verificação e Sanitização de URL
        let finalUrl = url;


        // Se a loja for a Epic e a URL contiver '2game.com' (revendedor indesejado), anulamos o link RAWG.
        if (cleanStoreName && cleanStoreName.toLowerCase() === 'epic games store' && url && url.toLowerCase().includes('2game.com')) {
            console.log(`[RAWG STORE] Link da Epic Games Store (2game.com) anulado.`);
            finalUrl = "N/A"; // Anula a URL RAWG para que o frontend priorize o CheapShark ou mostre N/A
        } else {
            // Tenta validar a acessibilidade da URL 
            const isUrlValid = await checkUrlAccessibility(url);
            if (!isUrlValid) {
                console.log(`[RAWG STORE] Loja ignorada devido à URL inacessível/quebrada: ${cleanStoreName} (${url})`);
                continue; // Ignora esta loja se a URL for inacessível
            }
        }
        
        validatedStores.push({
            storeId: storeId || "N/A",
            storeName: cleanStoreName,
            url: finalUrl,
        });
    }

    // Simplificar e combinar os dados
    const detailedGame = {
      id: gameDetails.id,
      name: gameDetails.name,
      description: gameDetails.description_raw,
      released: gameDetails.released,
      image: gameDetails.background_image,
      website: gameDetails.website,
      metacritic: gameDetails.metacritic,
      developers: gameDetails.developers
        ? gameDetails.developers.map((d) => d.name)
        : [],
      genres: gameDetails.genres ? gameDetails.genres.map((g) => g.name) : [],
      plataforms: gameDetails.platforms
        ? gameDetails.platforms.map((p) => p.platform.name)
        : [],
      offers: offers,
      stores: validatedStores, // Usa a lista de lojas validada
    };
    
    console.log("RAWG Lojas Retornadas (Válidas):", detailedGame.stores.map(s => s.storeName));
    console.log("CheapShark Ofertas Retornadas:", detailedGame.offers.length);
    console.log(
      "DADOS DO JOGO C/ IDIOMAS/RATING:",
      detailedGame.esrbRating,
      detailedGame.languages
    );
    res.json({
      message: `[SUCESSO RAWG] Detalhes encontrados para o jogo ID: ${gameId}`,
      game: detailedGame,
    });
  } catch (error) {
    console.log("ERRO RAWG API (Detalhes):", error.message);
    const status = error.response && error.response.status === 404 ? 404 : 500;
    res.status(status).json({
      error: `Erro ao obter detalhes para o jogo ID: ${gameId}. Detalhes do erro: ${error.message}`,
    });
  }
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log("Backend pronto para receber requisições...");
});