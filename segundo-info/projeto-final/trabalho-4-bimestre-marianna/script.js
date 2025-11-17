document.addEventListener('DOMContentLoaded', () => {
    const formAtleta = document.getElementById('form-atleta');
    const nomeAtletaInput = document.getElementById('nome-atleta');
    const logoUrlInput = document.getElementById('logo-url'); 
    const logoFileInput = document.getElementById('logo-file'); 
    const listaUl = document.getElementById('lista-ul');
    const countAtletas = document.getElementById('count-atletas');
    const btnGerarChaveamento = document.getElementById('btn-gerar-chaveamento');
    const chaveamentoSection = document.getElementById('chaveamento');
    const bracketContainer = document.getElementById('bracket-container');
    const thirdPlaceMatchDiv = document.getElementById('third-place-match');
    const thirdPlaceContainer = document.getElementById('third-place-container');
    const campeaoDisplay = document.getElementById('campeao-display');
    
    // ! Dados armazenados localmente
    let atletas = JSON.parse(localStorage.getItem('atletas')) || [];
    let matches = JSON.parse(localStorage.getItem('matches')) || {};
    let thirdPlaceMatch = JSON.parse(localStorage.getItem('thirdPlaceMatch')) || null;

    updateAtletasList();
    if (Object.keys(matches).length > 0) {
        chaveamentoSection.classList.remove('hidden');
        renderBracket();
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // * Lógica de Adicionar Time 
    formAtleta.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = nomeAtletaInput.value.trim();
        
        const logoUrl = logoUrlInput.value.trim();
        const logoFile = logoFileInput.files[0];
        let logoData = ''; 

        if (!nome) {
            alert("O nome do time não pode estar vazio.");
            return;
        }

        if (logoUrl) {
            logoData = logoUrl;
        } else if (logoFile) {
            try {
                logoData = await getBase64(logoFile);
            } catch (error) {
                alert("Erro ao ler o arquivo de logo. Use um formato de imagem válido.");
                return;
            }
        }

        // ! Adiciona o time
        atletas.push({ id: Date.now(), name: nome, logo: logoData }); 
        localStorage.setItem('atletas', JSON.stringify(atletas));

        nomeAtletaInput.value = '';
        logoUrlInput.value = '';
        logoFileInput.value = ''; 

        updateAtletasList();
    });

    // * Lógica de Remoção de Time
    function removeAtleta(id) {
        if (!confirm("Remover este time também apagará o chaveamento. Continuar?")) return;
        
        atletas = atletas.filter(atleta => atleta.id !== id);
        localStorage.setItem('atletas', JSON.stringify(atletas));
        
        // * Limpa o chaveamento ao remover um time
        matches = {};
        thirdPlaceMatch = null;
        localStorage.removeItem('matches');
        localStorage.removeItem('thirdPlaceMatch');
        chaveamentoSection.classList.add('hidden');
        bracketContainer.innerHTML = '';
        thirdPlaceContainer.classList.add('hidden');
        campeaoDisplay.classList.add('hidden');
        
        updateAtletasList();
    }

    // * Atualiza a Lista de Times
    function updateAtletasList() {
        listaUl.innerHTML = '';
        
        atletas.forEach(atleta => {
            const li = document.createElement('li');
            li.className = 'atleta-item'; 
            
            const logoHtml = atleta.logo ? 
                `<img src="${atleta.logo}" alt="Logo" style="height: 20px; width: 20px; object-fit: contain; margin-right: 10px;">` : 
                '';

            li.innerHTML = `
                <span class="atleta-info">${logoHtml}${atleta.name}</span>
                <button class="btn-remover" data-id="${atleta.id}">Remover</button>
            `;
            listaUl.appendChild(li);
        });
        
        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                removeAtleta(id);
            });
        });

        countAtletas.textContent = atletas.length;
        // ! Habilita com 4 ou mais times
        btnGerarChaveamento.disabled = atletas.length < 4; 
    }

    function nextPowerOfTwo(n) {
        let p = 1;
        while (p < n) {
            p *= 2;
        }
        return p;
    }
    
    btnGerarChaveamento.addEventListener('click', () => {
        if (atletas.length < 4) {
            alert("É necessário cadastrar no mínimo 4 times.");
            return;
        }
        createBracket();
    });

    function createBracket() {
        chaveamentoSection.classList.remove('hidden');
        bracketContainer.innerHTML = '';
        matches = {};
        thirdPlaceMatch = null; 

        const initialTeams = [...atletas]; 
        const teamsCount = initialTeams.length;
        const bracketSize = nextPowerOfTwo(teamsCount);
        const numByes = bracketSize - teamsCount;
        
        const teamsToPlay = [...initialTeams]; 
        
        for(let i = 0; i < numByes; i++) {
            teamsToPlay.push({ name: 'BYE' });
        }

        teamsToPlay.sort(() => Math.random() - 0.5);

        let currentTeams = teamsToPlay;
        const rounds = Math.ceil(Math.log2(bracketSize));
        
        // ! Cria as rodadas 
        for (let r = 1; r <= rounds; r++) {
            const nextRoundTeams = [];
            
            for (let i = 0; i < currentTeams.length; i += 2) {
                const matchId = `M${Object.keys(matches).length + 1}`;
                
                const teamA = currentTeams[i];
                const teamB = currentTeams[i + 1] || { name: 'BYE' };
                
                matches[matchId] = {
                    id: matchId,
                    round: r,
                    teamA: teamA.name,
                    teamB: teamB.name,
                    winner: null,
                    loser: null, 
                    scoreA: null,
                    scoreB: null,
                    time: ''      
                };
                nextRoundTeams.push({ name: `Vencedor ${matchId}` });
            }
            currentTeams = nextRoundTeams;
        }

        // ! Configura o jogo de 3º lugar 
        const semiFinalRoundNumber = rounds - 1;
        
        if (semiFinalRoundNumber >= 1) {
            const semiFinalMatches = Object.values(matches).filter(m => m.round === semiFinalRoundNumber);

            if (semiFinalMatches.length === 2) {
                thirdPlaceMatch = {
                    id: 'M3RD',
                    teamA: 'Perdedor ' + semiFinalMatches[0].id, 
                    teamB: 'Perdedor ' + semiFinalMatches[1].id, 
                    round: rounds,
                    winner: null,
                    scoreA: null,
                    scoreB: null,
                    sfMatchIds: semiFinalMatches.map(m => m.id),
                    time: ''      
                };
                localStorage.setItem('thirdPlaceMatch', JSON.stringify(thirdPlaceMatch));
            }
        }


        localStorage.setItem('matches', JSON.stringify(matches));
        renderBracket();
    }

    function createTeamSlot(matchId, teamName, score, isWinner) {
        const team = atletas.find(a => a.name === teamName);
        const logoHtml = team && team.logo ? 
            `<img src="${team.logo}" alt="Logo" style="height: 18px; width: 18px; object-fit: contain; margin-right: 5px;">` : 
            '';

        const isPlaceholder = teamName.startsWith('Vencedor') || teamName.startsWith('Perdedor');
        const isDisabled = teamName === 'BYE' || isPlaceholder ? 'disabled' : '';
        const finalScore = teamName === 'BYE' ? 0 : (score !== null ? score : '');

        return `
            <div class="team-slot ${isWinner ? 'winner' : ''}" data-match="${matchId}">
                ${logoHtml}
                <span class="team-name">${teamName}</span>
                ${!isPlaceholder ? `<input type="number" class="score-input" value="${finalScore}" min="0" ${isDisabled}>` : ''}
            </div>
        `;
    }
    
    // * Renderiza o Chaveamento Principal e 3º Lugar 
    function renderBracket() { 
        bracketContainer.innerHTML = '';
        const rounds = {};

        Object.values(matches).forEach(match => {
            if (!rounds[match.round]) rounds[match.round] = [];
            rounds[match.round].push(match);
        });

        const roundKeys = Object.keys(rounds).sort((a, b) => Number(a) - Number(b));

        roundKeys.forEach(roundNum => {
            const roundDiv = document.createElement('div');
            roundDiv.className = 'round';
            roundDiv.innerHTML = `<h3>${Number(roundNum) === roundKeys.length ? 'FINAL' : 'RODADA ' + roundNum}</h3>`;
            bracketContainer.appendChild(roundDiv);

            rounds[roundNum].forEach(match => {
                const matchCompleted = match.winner !== null;
                const isByeMatch = match.teamA === 'BYE' || match.teamB === 'BYE';
                
                const matchDiv = document.createElement('div');
                matchDiv.className = `match ${matchCompleted ? 'completed' : ''}`;
                matchDiv.id = match.id;
                
                // ! Input de Horário
                const detailsInputHtml = `
                    <div class="match-details-inputs single-input">
                        <input type="text" class="detail-input match-time" 
                                placeholder="Horário (Ex: 15:30)" value="${match.time || ''}" 
                                data-match-id="${match.id}" data-type="time" 
                                ${matchCompleted ? 'disabled' : ''}>
                    </div>
                `;

                matchDiv.innerHTML = `
                    <div class="match-info">Jogo ${match.id}</div>
                    ${detailsInputHtml} 
                    ${createTeamSlot(match.id, match.teamA, match.scoreA, match.winner === match.teamA)}
                    ${createTeamSlot(match.id, match.teamB, match.scoreB, match.winner === match.teamB)}
                    ${!matchCompleted && !isByeMatch ? `<button class="btn-confirm" data-match="${match.id}">Confirmar Placar</button>` : ''}
                    ${isByeMatch && !matchCompleted ? `<button class="btn-confirm-bye" data-match="${match.id}">Processar W.O.</button>` : ''}
                `;
                roundDiv.appendChild(matchDiv);
            });
        });

        renderThirdPlaceMatch();
        addScoreListeners();
        addByeListeners();
        addDetailInputListeners(); 
        updateChampionDisplay();
    }
     
    function addDetailInputListeners() {
        document.querySelectorAll('.detail-input').forEach(input => {
            input.addEventListener('blur', (e) => {
                const matchId = e.target.dataset.matchId;
                const dataType = e.target.dataset.type; 
                const value = e.target.value.trim();

                if (dataType === 'time') {
                    if (matchId === 'M3RD') {
                        if (thirdPlaceMatch) {
                            thirdPlaceMatch.time = value;
                            localStorage.setItem('thirdPlaceMatch', JSON.stringify(thirdPlaceMatch));
                        }
                    } else if (matches[matchId]) {
                        matches[matchId].time = value;
                        localStorage.setItem('matches', JSON.stringify(matches));
                    }
                }
            });
        });
    }

    function renderThirdPlaceMatch() {
        thirdPlaceMatchDiv.innerHTML = '';
        
        if (!thirdPlaceMatch) {
            thirdPlaceContainer.classList.add('hidden');
            return;
        }
        
        thirdPlaceContainer.classList.remove('hidden');
        
        const match = thirdPlaceMatch;
        const matchCompleted = match.winner !== null;
        const teamsReady = !match.teamA.startsWith('Perdedor') && !match.teamB.startsWith('Perdedor');

        const matchDiv = document.createElement('div');
        matchDiv.className = `match third-place ${matchCompleted ? 'completed' : ''} ${!teamsReady ? 'pending' : ''}`;
        matchDiv.id = match.id;
        
        const detailsInputHtml = `
            <div class="match-details-inputs single-input">
                <input type="text" class="detail-input match-time" 
                        placeholder="Horário (Ex: 18:00)" value="${match.time || ''}" 
                        data-match-id="${match.id}" data-type="time"
                        ${matchCompleted ? 'disabled' : ''}>
            </div>
        `;
            
        matchDiv.innerHTML = `
            <div class="match-info">${matchCompleted ? '3º LUGAR' : 'Em Espera'}</div>
            ${detailsInputHtml}
            ${createTeamSlot(match.id, match.teamA, match.scoreA, match.winner === match.teamA)}
            ${createTeamSlot(match.id, match.teamB, match.scoreB, match.winner === match.teamB)}
            ${!matchCompleted && teamsReady ? `<button class="btn-confirm-third" data-match="${match.id}">Confirmar 3º/4º</button>` : ''}
        `;
        
        thirdPlaceMatchDiv.appendChild(matchDiv);
        
        // * Adiciona o listener para o 3º lugar
        document.querySelector('.btn-confirm-third')?.addEventListener('click', (e) => {
            const matchId = e.currentTarget.dataset.match;
            const matchDiv = document.getElementById(matchId);
            const inputs = matchDiv.querySelectorAll('.score-input:not([disabled])');
            
            if (inputs.length < 2) return; 

            const scoreA = parseInt(inputs[0].value);
            const scoreB = parseInt(inputs[1].value);

            if (isNaN(scoreA) || isNaN(scoreB) || scoreA === scoreB) {
                alert("Insira placares válidos e diferentes.");
                return;
            }

            const winnerName = scoreA > scoreB ? match.teamA : match.teamB;
            setThirdPlaceWinner(matchId, winnerName, scoreA, scoreB);
        });
    }

    function setThirdPlaceWinner(matchId, winnerName, scoreA, scoreB) {
        thirdPlaceMatch.winner = winnerName;
        thirdPlaceMatch.scoreA = scoreA;
        thirdPlaceMatch.scoreB = scoreB;
        thirdPlaceMatch.time = '';
        
        localStorage.setItem('thirdPlaceMatch', JSON.stringify(thirdPlaceMatch));
        renderBracket(); 
    }

    function addByeListeners() {
        document.querySelectorAll('.btn-confirm-bye').forEach(btn => {
            btn.addEventListener('click', () => {
                const matchId = btn.dataset.match;
                const match = matches[matchId];
                
                if (match.winner) return;
                
                let winnerName;
                let loserName;
                
                if (match.teamA === 'BYE' && !match.teamB.startsWith('Vencedor')) {
                    winnerName = match.teamB;
                    loserName = match.teamA;
                } else if (match.teamB === 'BYE' && !match.teamA.startsWith('Vencedor')) {
                    winnerName = match.teamA;
                    loserName = match.teamB;
                } else {
                    return;
                }
                
                matches[matchId].time = '';
                
                setWinner(matchId, winnerName, 1, 0, loserName); 
            });
        });
    }

    function addScoreListeners() {
        document.querySelectorAll('.btn-confirm').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const matchId = e.currentTarget.dataset.match;
                const matchDiv = document.getElementById(matchId);
                const inputs = matchDiv.querySelectorAll('.score-input:not([disabled])');
                
                if (inputs.length < 2) return; 

                const scoreA = parseInt(inputs[0].value);
                const scoreB = parseInt(inputs[1].value);

                if (isNaN(scoreA) || isNaN(scoreB) || scoreA === scoreB) {
                    alert("Insira placares válidos e diferentes.");
                    return;
                }

                const winnerName = scoreA > scoreB ? matches[matchId].teamA : matches[matchId].teamB;
                const loserName = winnerName === matches[matchId].teamA ? matches[matchId].teamB : matches[matchId].teamA;
                
                matches[matchId].time = '';
                
                setWinner(matchId, winnerName, scoreA, scoreB, loserName);
            });
        });
    }

    function setWinner(matchId, winnerName, scoreA, scoreB, loserName) {
        const match = matches[matchId];
        
        match.winner = winnerName;
        match.loser = loserName === 'BYE' ? null : loserName;
        match.scoreA = scoreA;
        match.scoreB = scoreB;
        
        const nextMatchId = findNextMatch(matchId);
        if (nextMatchId) {
            const nextMatch = matches[nextMatchId];
            const placeholder = `Vencedor ${matchId}`;
            
            if (nextMatch.teamA === placeholder) {
                nextMatch.teamA = winnerName;
            } else if (nextMatch.teamB === placeholder) {
                nextMatch.teamB = winnerName;
            }
        }
        
        if (thirdPlaceMatch && match.round === thirdPlaceMatch.round - 1) {
            const sfMatchIds = thirdPlaceMatch.sfMatchIds;
            
            if (matchId === sfMatchIds[0]) {
                thirdPlaceMatch.teamA = match.loser || 'BYE_LOSER';
            } else if (sfMatchIds.length > 1 && matchId === sfMatchIds[1]) {
                thirdPlaceMatch.teamB = match.loser || 'BYE_LOSER';
            }
            
            localStorage.setItem('thirdPlaceMatch', JSON.stringify(thirdPlaceMatch));
        }


        localStorage.setItem('matches', JSON.stringify(matches));
        renderBracket();
    }

    function findNextMatch(matchId) {
        return Object.keys(matches).find(id => {
            return matches[id].teamA === `Vencedor ${matchId}` || matches[id].teamB === `Vencedor ${matchId}`;
        });
    }

    function updateChampionDisplay() {
        const allMatches = Object.values(matches);
        const finalRoundNumber = allMatches.length > 0 ? Math.max(...allMatches.map(m => m.round)) : 0;
        
        let championHtml = '';
        let fourthPlaceLoser = null;

        if (finalRoundNumber > 0) {
            const finalRound = allMatches.filter(m => m.round === finalRoundNumber);
            const finalMatch = finalRound.find(m => m.winner);
            
            if (finalMatch) {
                const viceChampion = finalMatch.loser;

                championHtml += `<h3>🏆 CAMPEÃO: ${finalMatch.winner}</h3>`; 
                
                if (viceChampion && viceChampion !== 'BYE') {
                    championHtml += `<p>🥈 2º Lugar: ${viceChampion}</p>`; 
                }
            }
        }
        

        if (thirdPlaceMatch && thirdPlaceMatch.winner) {
            fourthPlaceLoser = thirdPlaceMatch.winner === thirdPlaceMatch.teamA ? thirdPlaceMatch.teamB : thirdPlaceMatch.teamA;
            
            championHtml += `<p>🥉 3º Lugar: ${thirdPlaceMatch.winner}</p>`; 
            
            if (fourthPlaceLoser) {
                championHtml += `<p>4º Lugar: ${fourthPlaceLoser}</p>`; 
            }
        }
        
        if (championHtml) {
            campeaoDisplay.innerHTML = championHtml;
            campeaoDisplay.classList.remove('hidden');
        } else {
            campeaoDisplay.classList.add('hidden');
        }
    }
});

const botaoGerarPdf =document.querySelector("#gerar-pdf");

botaoGerarPdf.addEventListener("click", () =>{

    const conteudo = document.querySelector("#conteudo")

    html2pdf().from(conteudo).save()
})