document.addEventListener('DOMContentLoaded', () => {
    const formJogador = document.getElementById('form-jogador-xadrez');
    const nomeJogadorInput = document.getElementById('nome-jogador-xadrez');
    const pontosIniciaisInput = document.getElementById('pontos-iniciais-xadrez'); // NOVO
    const listaJogadoresUl = document.getElementById('lista-jogadores-xadrez-ul');
    const countJogadores = document.getElementById('count-jogadores-xadrez');

    const jogadorBrancoSelect = document.getElementById('jogador-branco-select');
    const jogadorPretoSelect = document.getElementById('jogador-preto-select');
    const resultadoSelect = document.getElementById('resultado-select');
    const duracaoJogoInput = document.getElementById('duracao-jogo'); // NOVO
    const acrescimoTempoInput = document.getElementById('acrescimo-tempo'); // NOVO
    const btnRegistrarPartida = document.getElementById('btn-registrar-partida');
    const tabelaRankingBody = document.querySelector('#tabela-ranking-xadrez tbody');
    const historicoPartidasUl = document.getElementById('historico-partidas-ul');
    const btnLimparPartidas = document.getElementById('btn-limpar-partidas');

    let jogadores = JSON.parse(localStorage.getItem('jogadoresXadrez')) || [];
    let partidas = JSON.parse(localStorage.getItem('partidasXadrez')) || [];

    updateJogadoresList();
    updateSelects();
    renderHistorico();
    renderRanking();

    // ! Cadastro de Jogadores ou equipe 
    formJogador.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = nomeJogadorInput.value.trim();
        const pontosIniciais = parseFloat(pontosIniciaisInput.value) || 0; 

        if (nome && !jogadores.some(j => j.name === nome)) {
            jogadores.push({ 
                id: Date.now(), 
                name: nome, 
                initialPoints: pontosIniciais // * Armazena pontos iniciais
            });
            localStorage.setItem('jogadoresXadrez', JSON.stringify(jogadores));
            nomeJogadorInput.value = '';
            pontosIniciaisInput.value = '0'; 
            updateJogadoresList();
            updateSelects();
            renderRanking();
        } else if (jogadores.some(j => j.name === nome)) {
            alert("Este nome já foi cadastrado.");
        }
    });

    // * Função para remover jogador
    function removeJogador(id) {
        if (!confirm("Remover o jogador também apagará todas as partidas dele. Continuar?")) return;

        const jogadorRemovido = jogadores.find(j => j.id === id);
        jogadores = jogadores.filter(j => j.id !== id);
        localStorage.setItem('jogadoresXadrez', JSON.stringify(jogadores));

        partidas = partidas.filter(p => p.white !== jogadorRemovido.name && p.black !== jogadorRemovido.name);
        localStorage.setItem('partidasXadrez', JSON.stringify(partidas));
        
        updateJogadoresList();
        updateSelects();
        renderHistorico();
        renderRanking();
    }
    
    // * Atualiza a lista de jogadores e exibe os pontos iniciais
    function updateJogadoresList() {
        listaJogadoresUl.innerHTML = '';
        jogadores.forEach(jogador => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${jogador.name} (Pts Iniciais: ${jogador.initialPoints || 0})</span>
                <button class="btn-remover btn-remover-xadrez" data-id="${jogador.id}">Remover</button>
            `;
            listaJogadoresUl.appendChild(li);
        });

        document.querySelectorAll('.btn-remover-xadrez').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                removeJogador(id);
            });
        });

        countJogadores.textContent = jogadores.length;
    }
    
    function updateSelects() {
        const optionsHtml = jogadores.map(j => `<option value="${j.name}">${j.name}</option>`).join('');
        
        jogadorBrancoSelect.innerHTML = `<option value="" disabled selected>Brancas</option>` + optionsHtml;
        jogadorPretoSelect.innerHTML = `<option value="" disabled selected>Pretas</option>` + optionsHtml;
        resultadoSelect.selectedIndex = 0; 
    }

    // ! Lançamento de Resultados 
    btnRegistrarPartida.addEventListener('click', () => {
        const white = jogadorBrancoSelect.value;
        const black = jogadorPretoSelect.value;
        const result = resultadoSelect.value;
        const duracao = duracaoJogoInput.value.trim(); 
        const acrescimo = acrescimoTempoInput.value.trim(); 

        if (!white || !black || !result || !duracao || !acrescimo) {
            alert("Selecione os jogadores, o resultado e preencha o tempo de jogo e acréscimo.");
            return;
        }

        if (white === black) {
            alert("Os jogadores Branco e Preto devem ser diferentes.");
            return;
        }

        partidas.push({ 
            white, 
            black, 
            result, 
            duracao,     
            acrescimo,   
            timestamp: Date.now() 
        });
        localStorage.setItem('partidasXadrez', JSON.stringify(partidas));

        updateSelects();
        duracaoJogoInput.value = '';
        acrescimoTempoInput.value = '';
        renderHistorico();
        renderRanking();
    });
    
    btnLimparPartidas.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja limpar todo o histórico de partidas?")) {
            partidas = [];
            localStorage.removeItem('partidasXadrez');
            renderHistorico();
            renderRanking();
        }
    });
    
    function renderHistorico() {
        historicoPartidasUl.innerHTML = '';
        partidas.slice(-10).reverse().forEach(p => { 
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${p.white} (${p.result}) ${p.black} | Tempo: ${p.duracao}, Acréscimo: ${p.acrescimo}</span>
            `;
            historicoPartidasUl.appendChild(li);
        });
    }

    // ! Tabela de Ranking com Pontos Iniciais, Ganhos e Totais
    function calculateStats() {
        // * Encontra o jogador e usa o ponto inicial
        const stats = jogadores.map(j => ({
            name: j.name,
            initialPoints: j.initialPoints || 0,
            earnedPoints: 0,
            totalPoints: j.initialPoints || 0,
            wins: 0,
            losses: 0,
            games: 0
        }));

        partidas.forEach(p => {
            const whiteStats = stats.find(s => s.name === p.white);
            const blackStats = stats.find(s => s.name === p.black);

            if (!whiteStats || !blackStats) return;

            whiteStats.games++;
            blackStats.games++;

            switch (p.result) {
                case '1-0': 
                    whiteStats.earnedPoints += 1;
                    whiteStats.wins++;
                    blackStats.losses++;
                    break;
                case '0-1': 
                    blackStats.earnedPoints += 1;
                    blackStats.wins++;
                    whiteStats.losses++;
                    break;
            }
        });
        
        //* Calcula o total após processar todas as partidas
        stats.forEach(s => {
            s.totalPoints = s.initialPoints + s.earnedPoints;
        });

        return stats;
    }

    function renderRanking() {
        const stats = calculateStats();
        
        // * CRITÉRIOS DE DESEMPATE: Pontos Totais > Vitórias > Jogos Disputados
        stats.sort((a, b) => {
            if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
            if (b.wins !== a.wins) return b.wins - a.wins;
            return b.games - a.games;
        });

        tabelaRankingBody.innerHTML = '';
        stats.forEach((s, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${s.name}</td>
                <td>${s.initialPoints}</td>
                <td>${s.earnedPoints}</td>
                <td>${s.totalPoints}</td>
                <td>${s.wins}</td>
                <td>${s.games}</td>
            `;
            tabelaRankingBody.appendChild(tr);
        });
    }
});

const botaoGerarPdf =document.querySelector("#gerar-pdf");

botaoGerarPdf.addEventListener("click", () =>{

    const conteudo = document.querySelector("#conteudo")

    html2pdf().from(conteudo).save()
})