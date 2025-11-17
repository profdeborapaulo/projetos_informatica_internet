document.addEventListener('DOMContentLoaded', () => {

    // 1. Gerenciamento de Pontuação no Cabeçalho

    // Inicializa ou carrega a pontuação (Será sobrescrito pelo valor do banco se a tela de Perfil ou Painel carregar)
    let points = localStorage.getItem('kidlingoPoints');
    if (!points) {
        points = 0; 
        localStorage.setItem('kidlingoPoints', points);
    }
    
    // Atualiza o display de pontuação no cabeçalho
    const pointsBadge = document.querySelector('.points-badge');
    if (pointsBadge) {
        pointsBadge.childNodes[0].nodeValue = points + ' '; 
    }

    // 2. Funcionalidade da Tela de Seleção (selecao.html)

    if (document.getElementById('select-language-screen')) {
        document.querySelectorAll('.card-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const selectedLanguage = event.currentTarget.getAttribute('data-language');
                
                // Salva o idioma escolhido no localStorage
                localStorage.setItem('kidlingoLanguage', selectedLanguage);
                
                // Redireciona para a tela de lições
                window.location.href = 'licoes.html';
            });
        });
    }


    // 3. Funcionalidade da Tela de Lições (licoes.html) e Lógica do Quiz
 
    if (document.getElementById("lessons-screen")) {
        const selectedLanguage = localStorage.getItem('kidlingoLanguage');
        const lessonScreenTitle = document.getElementById('lesson-screen-title');
        const lessonStatus = document.getElementById('lesson-status');
        const lessonContent = document.getElementById('lesson-content');
        const nextBtn = document.getElementById('next-lesson-btn');
        const prevBtn = document.getElementById('prev-lesson-btn');
        const backToSelectBtn = document.getElementById('back-lesson-btn');
        const completeBtn = document.getElementById('complete-lesson-btn');
        const startActivityBtn = document.getElementById('start-activity-btn');
        
        let allLessons = [];
        let currentLessonIndex = parseInt(localStorage.getItem(`kidlingoIndex_${selectedLanguage}`)) || 0; 

        // Variáveis de estado do Quiz
        let selectedPair = null; 
        let correctMatches = 0;
        let quizPairsData = [];

        lessonScreenTitle.textContent = `Lições de ${selectedLanguage}`;

        // --- FUNÇÕES DE NAVEGAÇÃO ---
        function updateNavigationButtons() {
            nextBtn.style.display = (currentLessonIndex + 1 < allLessons.length) ? 'flex' : 'none';
            prevBtn.style.display = (currentLessonIndex > 0) ? 'flex' : 'none';
        }

        function saveLessonProgress() {
            localStorage.setItem(`kidlingoIndex_${selectedLanguage}`, currentLessonIndex);
        }

        function renderLesson(lesson) {
            lessonContent.innerHTML = `
                <div class="lesson-card">
                    <h3>${lesson.titulo}</h3>
                    <img src="${lesson.imagem}" alt="${lesson.titulo}" class="lesson-image">
                    <p class="lesson-text">${lesson.conteudo}</p>
                    <div class="lesson-example">
                        <strong>Exemplo:</strong> ${lesson.exemplo}
                    </div>
                </div>
            `;
            lessonStatus.textContent = `Lição ${currentLessonIndex + 1} de ${allLessons.length}`;
            updateNavigationButtons();

            // Reseta a tela de lições e esconde a conclusão
            document.getElementById('activity-content').style.display = 'none';
            lessonContent.style.display = 'block';
            completeBtn.style.display = 'none';
            startActivityBtn.style.display = 'block';
        }

        async function loadLessonsAndRenderInitial() {
            try {
                // Rota original para buscar o conteúdo das lições
                const response = await fetch(`http://localhost:3000/licoes/${selectedLanguage}`);
                allLessons = await response.json();
                
                if (currentLessonIndex >= allLessons.length) {
                    currentLessonIndex = allLessons.length - 1;
                    if (currentLessonIndex < 0) currentLessonIndex = 0;
                }

                if (allLessons.length > 0) {
                    renderLesson(allLessons[currentLessonIndex]);
                } else {
                    lessonContent.innerHTML = `<p class="alert-info">Nenhuma lição encontrada para ${selectedLanguage}.</p>`;
                }
            } catch (error) {
                console.error("Erro ao carregar lições:", error);
                lessonContent.innerHTML = `<p class="alert-info">Erro ao conectar com o servidor para buscar lições. Certifique-se de que o backend está rodando.</p>`;
            }
        }

        function goToNextLesson() {
            if (currentLessonIndex < allLessons.length - 1) {
                currentLessonIndex++;
                saveLessonProgress(); 
                renderLesson(allLessons[currentLessonIndex]);
            }
        }

        function goToPrevLesson() {
            if (currentLessonIndex > 0) {
                currentLessonIndex--;
                saveLessonProgress(); 
                renderLesson(allLessons[currentLessonIndex]);
            }
        }
        
        // --- FUNÇÕES DO QUIZ ---
        function showActivityScreen() {
            lessonContent.style.display = 'none';
            document.getElementById('activity-content').style.display = 'block';
            startActivityBtn.style.display = 'none'; 

            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';

            loadActivity(allLessons[currentLessonIndex].id);
        }
        
        async function loadActivity(licaoId) {
            const activityTitle = document.getElementById('activity-title');
            const quizContainer = document.getElementById('quiz-container');
            const activitySubtitle = document.getElementById('activity-subtitle');

            activityTitle.textContent = 'Carregando Atividade...';
            quizContainer.innerHTML = '';
            
            try {
                const response = await fetch(`http://localhost:3000/atividade/${licaoId}`);
                const activity = await response.json();

                if (activity && activity.tipo === 'pareamento') {
                    activityTitle.textContent = activity.pergunta;
                    activitySubtitle.textContent = `Atividade Lição ${currentLessonIndex + 1}`;
                    // Transforma o JSON do MySQL em array de pares (ex: [{"Hello": "Olá"}])
                    quizPairsData = JSON.parse(activity.dados); 
                    renderMatchingActivity(quizPairsData, quizContainer);
                } else {
                     activityTitle.textContent = "Nenhuma atividade de pareamento encontrada.";
                     activitySubtitle.textContent = "Você pode concluir a lição diretamente.";
                     document.getElementById('complete-lesson-btn').style.display = 'block';
                }
            } catch (error) {
                console.error("Erro ao carregar atividade:", error);
                quizContainer.innerHTML = `<p class="alert-info">Erro de conexão com o servidor. Verifique o backend.</p>`;
            }
        }
        
        function renderMatchingActivity(pairs, container) {
            let leftItems = [];
            let rightItems = [];
            
            pairs.forEach(pair => {
                const key = Object.keys(pair)[0];
                const value = pair[key];
                
                // key é o item da língua, value é a tradução (par de verificação)
                leftItems.push({ item: key, pair: value }); 
                rightItems.push({ item: value, pair: key }); 
            });

            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            leftItems = shuffle(leftItems);
            rightItems = shuffle(rightItems);
            
            let html = `
                <div class="matching-quiz-grid">
                    <div class="column" id="left-column">
                        ${leftItems.map(item => 
                            `<button class="match-item left-item" data-value="${item.item}" data-pair="${item.pair}">${item.item}</button>`
                        ).join('')}
                    </div>
                    <div class="column" id="right-column">
                        ${rightItems.map(item => 
                            `<button class="match-item right-item" data-value="${item.item}" data-pair="${item.pair}">${item.item}</button>`
                        ).join('')}
                    </div>
                </div>
            `;
            container.innerHTML = html;
            
            document.querySelectorAll('.match-item').forEach(button => {
                button.addEventListener('click', handleMatchClick);
            });
        }
        
        function handleMatchClick(event) {
            const clickedButton = event.target;
            
            if (clickedButton.classList.contains('matched')) return;

            // 1. É o PRIMEIRO clique? 
            if (!selectedPair) {
                selectedPair = clickedButton;
                clickedButton.classList.add('selected');
                return;
            }

            // Se for o mesmo botão, deseleciona
            if (clickedButton === selectedPair) {
                selectedPair.classList.remove('selected');
                selectedPair = null;
                return;
            }
            
            // Não pode ligar dois itens da mesma coluna
            if (selectedPair.classList.contains('left-item') === clickedButton.classList.contains('left-item')) {
                 selectedPair.classList.remove('selected');
                 selectedPair = clickedButton; 
                 clickedButton.classList.add('selected');
                 return;
            }

            // --- LÓGICA DE VERIFICAÇÃO (Checa se o valor do primeiro é par do valor do segundo) ---
            
            const isMatch = (selectedPair.getAttribute('data-value') === clickedButton.getAttribute('data-pair')) ||
                            (clickedButton.getAttribute('data-value') === selectedPair.getAttribute('data-pair'));
            
            selectedPair.classList.remove('selected');
            
            if (isMatch) {
                selectedPair.classList.add('matched');
                clickedButton.classList.add('matched');
                
                correctMatches++;

                if (correctMatches === quizPairsData.length) {
                    setTimeout(() => {
                        alert("Parabéns! Atividade concluída com sucesso! Agora você pode finalizar a lição.");
                        document.getElementById('activity-content').style.display = 'none';
                        document.getElementById('complete-lesson-btn').style.display = 'block';
                    }, 500);
                }
            } else {
                selectedPair.classList.add('error');
                clickedButton.classList.add('error');
                
                setTimeout(() => {
                    selectedPair.classList.remove('error');
                    clickedButton.classList.remove('error');
                }, 500);
            }

            selectedPair = null;
        }


        nextBtn.addEventListener('click', goToNextLesson);
        prevBtn.addEventListener('click', goToPrevLesson); 
        
        backToSelectBtn.addEventListener('click', () => {
            window.location.href = "selecao.html";
        });
        
        startActivityBtn.addEventListener('click', () => {
             correctMatches = 0; 
             showActivityScreen(); 
        });


        // Lógica para completar a lição 
        completeBtn.addEventListener('click', async () => {
            
            // 1. Aumenta a pontuação local
            let currentPoints = parseInt(localStorage.getItem('kidlingoPoints')) || 0;
            currentPoints += 10;
            localStorage.setItem('kidlingoPoints', currentPoints);

            // 2. Avança o índice da lição (Marca como feita)
            currentLessonIndex++;
            saveLessonProgress();
            
            // 3. Calcula o total de lições completas para sincronização
            const allCompletedLessons = ['Inglês', 'Espanhol', 'Francês'].reduce((sum, lang) => {
                 return sum + (parseInt(localStorage.getItem(`kidlingoIndex_${lang}`)) || 0);
            }, 0);
            
            // 4. Sincroniza o progresso com o servidor (Tempo, Pontos, Lições)
            await syncProgressWithServer(allCompletedLessons);

            // 5. Atualiza o display no cabeçalho
            const currentPointsBadge = document.querySelector('.points-badge');
            if (currentPointsBadge) {
                currentPointsBadge.childNodes[0].nodeValue = currentPoints + ' '; 
            }
            
            alert(`Lição completa! Você ganhou 10 pontos. Pontuação total: ${currentPoints}`);
            
            // 6. Vai para a próxima lição e reseta o quiz/conclusão
            if (currentLessonIndex < allLessons.length) {
                renderLesson(allLessons[currentLessonIndex]);
            } else {
                renderLesson(allLessons[allLessons.length - 1]);
                alert("Parabéns! Você completou todas as lições neste idioma!");
            }
        });

        loadLessonsAndRenderInitial();
    }
    
    // 5. Inicialização do Timer Global e Lógica de Sincronização
    
    if (document.getElementById("lessons-screen") || document.getElementById("painel-screen") || document.getElementById('select-language-screen')) {
        startTimer();
    }
    
    window.addEventListener('beforeunload', () => {
        const allCompletedLessons = ['Inglês', 'Espanhol', 'Francês'].reduce((sum, lang) => {
             return sum + (parseInt(localStorage.getItem(`kidlingoIndex_${lang}`)) || 0);
        }, 0);
        syncProgressWithServer(allCompletedLessons); 
    });


// 6. Funcionalidade do Painel de Acompanhamento (painel-acompanhamento.html)

    if (document.getElementById("painel-screen")) {

        async function loadAndDisplayPanelData() {
            
            // 1. Busca dados de Progresso (Pontos, Tempo, Conquistas Desbloqueadas)
            const progressResponse = await fetch('http://localhost:3000/progresso/simulado');
            const progressData = await progressResponse.json();
            
            // 2. Checa e exibe conquistas
            const totalUnlocked = await checkAndUnlockAchievements(progressData); 
            
            const totalPointsValue = document.getElementById('total-points-value');
            const totalTimeValue = document.getElementById('total-time-value');
            const achievementsValue = document.getElementById('achievements-value');

            totalPointsValue.textContent = progressData.pontos_total || 0;
            totalTimeValue.textContent = formatTime(progressData.tempo_total_seg || 0);
            achievementsValue.textContent = totalUnlocked;

            // 3. Progresso por Idioma (CHAMADA DA FUNÇÃO REUTILIZÁVEL)
            loadLanguageProgress('language-progress-grid');
        }
        
        loadAndDisplayPanelData();
    }


// 7. Funcionalidade do Perfil (perfil.html)

    if (document.getElementById("profile-screen")) {

        // Função para carregar e exibir os detalhes do perfil
        async function loadAndDisplayProfileData() {
            
            // 1. Busca dados de Progresso (Pontos e Conquistas)
            const progressResponse = await fetch('http://localhost:3000/progresso/simulado');
            const progressData = await progressResponse.json();
            
            // 2. Busca todas as Conquistas
            let allAchievements = [];
            try {
                 const achievementsResponse = await fetch('http://localhost:3000/conquistas');
                 allAchievements = await achievementsResponse.json();
            } catch (error) {
                 console.error("Erro ao buscar conquistas:", error);
                 // Continua mesmo se falhar, apenas sem as conquistas
            }

            // 3. Exibe Pontuação REAL e atualiza o badge do cabeçalho
            const totalPoints = progressData.pontos_total || 0;
            document.getElementById('profile-points-value').textContent = totalPoints;
            
            // Atualiza o badge de pontos no cabeçalho (para a página de perfil)
            const pointsBadge = document.querySelector('.points-badge');
            if (pointsBadge) {
                // Remove o valor do localStorage e usa o do banco
                pointsBadge.childNodes[0].nodeValue = totalPoints + ' '; 
            }


            // 4. Exibe Conquistas Desbloqueadas
            const achievementsDisplay = document.getElementById('achievements-display');
            achievementsDisplay.innerHTML = '';
            
            // O campo 'conquistas_desbloqueadas' é um JSON string no banco, precisa ser parseado.
            let unlockedMap = {};
            try {
                // Garante que se vier NULL ou vazio, será um objeto vazio
                unlockedMap = JSON.parse(progressData.conquistas_desbloqueadas || '{}');
            } catch (e) {
                console.error("Erro ao parsear conquistas_desbloqueadas:", e);
            }
            
            if (allAchievements.length === 0) {
                achievementsDisplay.innerHTML = `<p class="alert-info">Não foi possível carregar as conquistas do servidor.</p>`;
            } else {
                
                let unlockedCount = 0;

                allAchievements.forEach(achievement => {
                    // Verifica se o ID da conquista (convertido para string) está no mapa
                    const isUnlocked = unlockedMap[achievement.id.toString()];
                    
                    if (isUnlocked) {
                        unlockedCount++;
                        const card = document.createElement('div');
                        card.classList.add('achievement-card');
                        card.innerHTML = `
                            <span class="icon">🏅</span>
                            <div>
                                <p class="name">${achievement.nome}</p>
                                <p class="desc">${achievement.descricao}</p>
                            </div>
                        `;
                        achievementsDisplay.appendChild(card);
                    }
                });

                if (unlockedCount === 0) {
                     achievementsDisplay.innerHTML = `<p style="text-align: center; color: var(--cor-texto-cinza);">Nenhuma conquista desbloqueada ainda. Continue aprendendo para ganhar a primeira!</p>`;
                }
            }
        }
        
        // Carrega os dados do Perfil (Pontos, Conquistas)
        loadAndDisplayProfileData();
        
        // NOVO: Adiciona a chamada para o progresso dos idiomas na tela de perfil
        // Assumindo que você adicionou o ID 'profile-language-progress-grid' no perfil.html
        loadLanguageProgress('profile-language-progress-grid');
    }
});

// Função auxiliar para buscar o total de lições por idioma
async function fetchTotalLessons(language) {
    try {

        const response = await fetch(`http://localhost:3000/licoes/total/${language}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        return { total: data.total || 0 }; 
    } catch (error) {
        console.error(`Erro ao buscar total de lições para ${language}:`, error);
        return { total: 0 };
    }
}

// Função reutilizável para carregar e exibir o progresso dos idiomas em qualquer grid
async function loadLanguageProgress(containerId) {
    const progressGrid = document.getElementById(containerId);
    if (!progressGrid) return; 

    // Limpa o conteúdo inicial
    progressGrid.innerHTML = ''; 

    const languages = ['Inglês', 'Espanhol', 'Francês'];

    for (const lang of languages) {
        // Busca o total de lições no servidor
        const totalData = await fetchTotalLessons(lang);
        const totalLessons = totalData.total || 0;

        // Recupera o progresso de lições completadas do localStorage
        const completedLessons = parseInt(localStorage.getItem(`kidlingoIndex_${lang}`)) || 0; 

        let percentage = 0;
        if (totalLessons > 0) {
            percentage = Math.floor((completedLessons / totalLessons) * 100);
        }
        
        const progressCard = document.createElement('div');
        progressCard.classList.add('stat-card', 'language-progress-card');
        
        // Define a cor da barra (baseado na sua lógica existente)
        const barColor = lang === 'Inglês' ? '#a256f6' : lang === 'Espanhol' ? '#17a2b8' : '#ffc107';

        progressCard.innerHTML = `
            <h4>Progresso em ${lang}</h4>
            <div class="value">${percentage}%</div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${percentage}%; background-color: ${barColor};"></div>
            </div>
            <p style="font-size: 0.8rem; margin-top: 5px; color: var(--cor-texto-cinza);">
                ${completedLessons} de ${totalLessons} lições
            </p>
        `;

        progressGrid.appendChild(progressCard);
    }
    
    // Se não houver progresso exibido, mostra uma mensagem
    if (progressGrid.children.length === 0) {
        progressGrid.innerHTML = `<p style="font-size: 0.9rem; color: var(--cor-texto-cinza); width: 100%; text-align: center;">Nenhuma lição encontrada para exibir. Verifique o servidor.</p>`;
    }
}


// FUNÇÕES DE TEMPO E GAMIFICAÇÃO 

let allAchievements = [];
let timerInterval = null;
let secondsStudied = parseInt(sessionStorage.getItem('kidlingoSessionTime')) || 0; 

// Sincroniza o tempo de estudo, a pontuação e as lições completas com o backend
async function syncProgressWithServer(totalLessonsCompleted) {
    const currentPoints = parseInt(localStorage.getItem('kidlingoPoints')) || 0;
    
    try {
         // 1. Puxa os dados atuais do servidor
         const response = await fetch('http://localhost:3000/progresso/simulado');
         const data = await response.json();
         
         if(data && data.tempo_total_seg !== undefined) {
             // Adiciona o tempo da sessão ao tempo total do servidor
             const newTotalTime = data.tempo_total_seg + secondsStudied;
             
             // 2. Envia a atualização do tempo, dos pontos e do total de lições
             const syncResponse = await fetch('http://localhost:3000/progresso/tempo', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    tempo_total_seg: newTotalTime,
                    pontos_total: currentPoints,
                    licoes_completadas: totalLessonsCompleted
                })
            });

            if (syncResponse.ok) {
                secondsStudied = 0; 
                sessionStorage.setItem('kidlingoSessionTime', 0);
                
                // 3. Após sincronizar, checa se alguma conquista foi desbloqueada
                const updatedProgress = await fetch('http://localhost:3000/progresso/simulado').then(r => r.json());
                await checkAndUnlockAchievements(updatedProgress);
            }
         }
    } catch (error) {
        console.error("Erro ao sincronizar progresso:", error);
    }
}

async function checkAndUnlockAchievements(progressData) {
    // Carrega as conquistas se ainda não foram carregadas
    if (allAchievements.length === 0) {
         const achievementsResponse = await fetch('http://localhost:3000/conquistas');
         allAchievements = await achievementsResponse.json();
    }

    let unlockedAchievements = JSON.parse(progressData.conquistas_desbloqueadas || '{}');
    let totalUnlocks = 0;
    let mustSync = false;

    for (const achievement of allAchievements) {
        const achievementId = achievement.id.toString();
        
        if (unlockedAchievements[achievementId]) {
             totalUnlocks++;
             continue;
        }
        
        let isUnlocked = false;
        
        // Lógica de checagem com os dados dinâmicos do progresso
        switch (achievement.tipo) {
            case 'pontos':
                isUnlocked = progressData.pontos_total >= achievement.requisito;
                break;
            case 'licoes':
                isUnlocked = progressData.licoes_completadas >= achievement.requisito;
                break;
            case 'tempo':
                isUnlocked = progressData.tempo_total_seg >= achievement.requisito;
                break;
        }

        if (isUnlocked) {
            unlockedAchievements[achievementId] = true;
            totalUnlocks++;
            mustSync = true;
            alert(`🏅 Conquista Desbloqueada: ${achievement.nome}!`);
        }
    }
    
    if (mustSync) {
        await fetch('http://localhost:3000/progresso/conquista', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ conquistas_desbloqueadas: unlockedAchievements })
        });
    }
    
    return totalUnlocks;
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        secondsStudied++;
        
        if (secondsStudied % 10 === 0) {
            const allCompletedLessons = ['Inglês', 'Espanhol', 'Francês'].reduce((sum, lang) => {
                 return sum + (parseInt(localStorage.getItem(`kidlingoIndex_${lang}`)) || 0);
            }, 0);
            sessionStorage.setItem('kidlingoSessionTime', secondsStudied);
            syncProgressWithServer(allCompletedLessons);
        }
    }, 1000);
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${String(minutes).padStart(2, '0')}min`;
}