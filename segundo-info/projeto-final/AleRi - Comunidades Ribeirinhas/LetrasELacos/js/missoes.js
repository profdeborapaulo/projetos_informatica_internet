// === MISSÕES, TAREFAS DIÁRIAS E DESAFIOS ===

// espera até que todo o conteúdo da página seja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

   
    // 1) SELETORES / ELEMENTOS DO DOM
    // Tarefas diárias (cards)  - lista de elementos
    const tarefas = document.querySelectorAll(".tarefa");

    // barras e textos de progresso
    const progressoDiarioBar = document.getElementById("progress-diario-bar");
    const progressoTotalBar = document.getElementById("progress-total-bar");
    const progressoDiarioTexto = document.getElementById("texto-diario");
    const progressoTotalTexto = document.getElementById("percent-total");

    // elementos que mostram pontos / XP do usuário
    const pontosTotaisElem = document.querySelector(".icone-trofeu")?.nextElementSibling;
    const xpUsuarioElem = document.getElementById("xp-usuario");

    // container onde os cartões de desafios são renderizados
    const desafiosContainer = document.getElementById("desafios-container");

    // elementos relacionados à insígnia lendária
    const insigniaLendarioElem = document.getElementById("insignia-lendario");
    const iconeLendarioElem = document.getElementById("icone-lendario");

    // ---------------------------------------------------------------------
    // 2) ESTADO / CONSTANTES
    // ---------------------------------------------------------------------
    const xpTotal = 1500;          // XP necessário para insígnia lendária
    const XP_META_DIARIA = 35;     // Meta diária de pontos (exibida na UI)

    // Estado mutável
    let xpAtual = 750;             // XP atual (valor inicial; persistido)
    let xpDiario = 0;              // XP ganho hoje pelas tarefas diárias
    let tarefasDiariasStatus = []; // estado persistente das tarefas diárias (array de objetos {concluida, xp})

   
    // 3) DEFINIÇÃO DOS DESAFIOS  
    const DESAFIOS = {
        leitorNacionalFacil: {
            titulo: "Leitor Nacional",
            xp: 300,
            meta: 2,
            descricao: "Leia 2 livros de autores brasileiros este mês.",
            dificuldade: "Fácil"
        },
        maratonistaLiterario: {
            titulo: "Maratonista Literário",
            xp: 300,
            meta: 5,
            descricao: "Leia 5 livros neste mês e supere seus limites.",
            dificuldade: "Difícil"
        },
        criticoLiterarioMedio: {
            titulo: "Crítico Literário",
            xp: 115,
            meta: 3,
            descricao: "Escreva 3 resenhas detalhadas e compartilhe suas opiniões.",
            dificuldade: "Médio"
        }
    };

    // lista de autores brasileiros usada para contabilizar progresso do desafio nacional
    const autoresBrasileiros = [
        "Machado de Assis",
        "Clarice Lispector",
        "Jorge Amado",
        "Paulo Coelho",
        "Carolina Maria de Jesus",
        "José de Alencar"
    ];

    
    // 4) FUNÇÕES UTILITÁRIAS
    // verifica se um autor pertence à lista de autores brasileiros (case-insensitive)
    function ehAutorBrasileiro(autor) {
        if (!autor) return false;
        const autorNormalizado = autor.trim().toLowerCase();
        return autoresBrasileiros.some(br => br.toLowerCase() === autorNormalizado);
    }

    // pequena função de animação para números (usa setInterval)
    function animarNumero(elemento, de, para, duracao = 600) {
        if (!elemento) return;
        const diferenca = para - de;
        const passos = 30;
        let contador = 0;
        const intervalo = duracao / passos;
        const anim = setInterval(() => {
            contador++;
            const valorAtual = Math.round(de + (diferenca * contador / passos));
            elemento.textContent = valorAtual;
            if (contador >= passos) clearInterval(anim);
        }, intervalo);
    }

    // função simples para exibir feedback modallike (create/remover do DOM)
    function mostrarMensagemFeedback(mensagem, callback = null) {
        let feedback = document.getElementById('feedback-modal');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'feedback-modal';
            feedback.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background-color: rgba(0, 0, 0, 0.75); display: flex;
                align-items: center; justify-content: center; z-index: 9999;
            `;
            feedback.innerHTML = `
                <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); max-width: 90%; width: 350px; text-align: center;">
                    <h4 style="font-weight: bold; color: #305167; margin-bottom: 15px; font-size: 1.25rem;">Sucesso!</h4>
                    <p style="margin-bottom: 25px;">${mensagem}</p>
                    <button id="feedback-close" style="background-color: #305167; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">Fechar</button>
                </div>
            `;
            document.body.appendChild(feedback);
            document.getElementById('feedback-close').addEventListener('click', () => {
                feedback.remove();
                if (callback) callback();
            });
        }
    }
   
    // 5) INSÍGNIA LENDÁRIA - VISUAL E LÓGICA
    // atualiza a aparência da insígnia (desbloqueada/bloqueada)
    function aplicarEstadoInsigniaLendaria(isUnlocked) {
        if (!insigniaLendarioElem || !iconeLendarioElem) return;
        if (isUnlocked) {
            insigniaLendarioElem.style.opacity = '1';
            insigniaLendarioElem.style.filter = 'none';
            iconeLendarioElem.classList.remove('fa-lock');
            iconeLendarioElem.classList.add('fa-trophy');
            iconeLendarioElem.style.color = '#e4a67c';
        } else {
            insigniaLendarioElem.style.opacity = '0.5';
            insigniaLendarioElem.style.filter = 'grayscale(100%)';
            iconeLendarioElem.classList.remove('fa-trophy');
            iconeLendarioElem.classList.add('fa-lock');
            iconeLendarioElem.style.color = '#e4a67c';
        }
    }

    // checa se o XP atual permitiu desbloquear a insígnia; persiste e exibe feedback caso desbloqueie agora
    function checarInsigniaLendaria() {
        let isUnlocked = localStorage.getItem("insigniaLendariaDesbloqueada") === "true";

        if (xpAtual >= xpTotal && !isUnlocked) {
            // desbloqueia agora
            localStorage.setItem("insigniaLendariaDesbloqueada", "true");
            const mensagem = "PARABÉNS! Você alcançou o limite de XP (1500) e desbloqueou a INSÍGNIA LENDÁRIA!";
            // mostra feedback; callback aplica o estado visual ao fechar o modal
            mostrarMensagemFeedback(mensagem, () => aplicarEstadoInsigniaLendaria(true));
        } else {
            // aplica estado visual atual (bloqueado/desbloqueado)
            aplicarEstadoInsigniaLendaria(isUnlocked);
        }
    }

    
    // 6) PERSISTÊNCIA: salvar / carregar pontos e tarefas diárias
    function salvarPontos() {
        localStorage.setItem("xpTotalAtual", xpAtual);
        localStorage.setItem("tarefasDiariasStatus", JSON.stringify(tarefasDiariasStatus));
    }

    function carregarPontos() {
        const xpSalvo = localStorage.getItem("xpTotalAtual");
        if (xpSalvo) xpAtual = parseInt(xpSalvo, 10);

        // atualiza UI de progresso total
        const totalPercent = Math.min((xpAtual / xpTotal) * 100, 100);
        if (progressoTotalBar) progressoTotalBar.style.width = `${totalPercent}%`;
        if (progressoTotalTexto) progressoTotalTexto.textContent = `${Math.floor(totalPercent)}%`;
        if (xpUsuarioElem) xpUsuarioElem.textContent = `${xpAtual}/${xpTotal} XP`;
        if (pontosTotaisElem) pontosTotaisElem.textContent = xpAtual;
    }

    // carrega o estado das tarefas diárias e aplica no DOM (recalcula xpDiario)
    function carregarTarefasDiarias() {
        const savedStatus = localStorage.getItem("tarefasDiariasStatus");
        xpDiario = 0;

        if (tarefas.length === 0) return;

        if (savedStatus) {
            tarefasDiariasStatus = JSON.parse(savedStatus);
        } else {
            // inicializa o status com base nas badges de XP das tarefas (se houver)
            tarefasDiariasStatus = Array.from(tarefas).map(tarefa => {
                const xp = parseInt(tarefa.querySelector(".badge")?.textContent.replace(/\D/g, "") || 0, 10);
                return { concluida: false, xp: xp };
            });
        }

        // aplica o estado carregado ao DOM e soma xpDiario
        tarefas.forEach((tarefa, index) => {
            const status = tarefasDiariasStatus[index];
            if (!status) return;

            // garantir que xp do estado seja coerente com o badge do HTML
            const xpHtml = parseInt(tarefa.querySelector(".badge")?.textContent.replace(/\D/g, "") || 0, 10);
            status.xp = xpHtml;

            if (status.concluida) {
                tarefa.classList.add("card-concluida", "ativa");
                xpDiario += status.xp;
            } else {
                tarefa.classList.remove("card-concluida", "ativa");
            }
        });

        // se não existia salvamento, cria-o
        if (!savedStatus) salvarPontos();

        // atualiza barra diária
        atualizarProgressoDiarioDisplay();
    }

    // atualiza display da barra diária (xpDiario / meta diária)
    function atualizarProgressoDiarioDisplay() {
        const progressoPercent = Math.min((xpDiario / XP_META_DIARIA) * 100, 100);
        if (progressoDiarioBar) progressoDiarioBar.style.width = `${progressoPercent}%`;
        if (progressoDiarioTexto) progressoDiarioTexto.textContent = `${xpDiario}/${XP_META_DIARIA} pontos`;
    }

   
    // 7) DESAFIOS: recalcula progresso a partir dos dados persistidos (biblioteca/resenhas)
    // recalcula e inicializa o objeto 'desafios' em localStorage com progresso atualizado
    function inicializarDesafios() {
        // lê estado anterior se existir (mantém flag 'concluido' se já marcado)
        let desafios = JSON.parse(localStorage.getItem("desafios")) || {};

        // recupera livros e resenhas para calcular progresso atual
        const livrosSalvos = localStorage.getItem("livrosBiblioteca");
        const livros = livrosSalvos ? JSON.parse(livrosSalvos) : { jaLi: [] };
        const jaLi = livros.jaLi || [];

        let resenhasSalvas = localStorage.getItem("resenhas");
        let resenhas = resenhasSalvas ? JSON.parse(resenhasSalvas) : [];

        // calcula progressos
        const maratonistaProgresso = jaLi.length;

        let nacionalLidos = 0;
        jaLi.forEach(livro => {
            if (ehAutorBrasileiro(livro.autor)) nacionalLidos++;
        });

        const criticoProgresso = resenhas.length;

        // atualiza objeto desafios reescrevendo progresso e preservando 'concluido'
        desafios.leitorNacionalFacil = {
            progresso: nacionalLidos,
            concluido: desafios.leitorNacionalFacil?.concluido || false
        };

        desafios.maratonistaLiterario = {
            progresso: maratonistaProgresso,
            concluido: desafios.maratonistaLiterario?.concluido || false
        };

        desafios.criticoLiterarioMedio = {
            progresso: criticoProgresso,
            concluido: desafios.criticoLiterarioMedio?.concluido || false
        };

        // persiste o estado recalculado (sem alterar flags já existentes)
        localStorage.setItem("desafios", JSON.stringify(desafios));
    }

    // renderiza os cartões de desafios no container, marca desafios concluídos e soma XP quando necessário
    function renderizarDesafios() {
        if (!desafiosContainer) return;

        desafiosContainer.innerHTML = "";
        // lê o estado atual dos desafios (pode ter sido inicializado antes)
        let desafiosSalvos = JSON.parse(localStorage.getItem("desafios")) || {};
        let xpGanhoNesteCiclo = 0;
        let index = 0;

        Object.keys(DESAFIOS).forEach(key => {
            const desafioInfo = DESAFIOS[key];
            const estado = desafiosSalvos[key] || { progresso: 0, concluido: false };

            // se meta atingida e ainda não marcado como concluído, marca e soma XP (uma vez)
            if (estado.progresso >= desafioInfo.meta && !estado.concluido) {
                estado.concluido = true;
                estado.progresso = desafioInfo.meta;
                xpGanhoNesteCiclo += desafioInfo.xp;
                console.log(`${desafioInfo.titulo} concluído! Você ganhou ${desafioInfo.xp} XP!`);
            }

            const progresso = estado.progresso;
            const meta = desafioInfo.meta;
            const concluido = estado.concluido;
            const progressoPercent = Math.min((progresso / meta) * 100, 100);

            // escolha de ícones/cores por desafio
            let iconeClasse;
            let dificuldadeBadgeBg;
            let progressoBarBg = concluido ? 'bg-success' : 'bg-warning';
            let progressoTextColor = concluido ? 'text-success' : 'text-muted';

            switch (key) {
                case 'leitorNacionalFacil':
                    iconeClasse = 'fas fa-book';
                    dificuldadeBadgeBg = 'rgb(148, 211, 139)';
                    progressoBarBg = concluido ? 'bg-success' : 'bg-info';
                    break;
                case 'maratonistaLiterario':
                    iconeClasse = 'fas fa-bullseye';
                    dificuldadeBadgeBg = '#9C3A3B';
                    progressoBarBg = concluido ? 'bg-success' : '';
                    break;
                case 'criticoLiterarioMedio':
                    iconeClasse = 'fas fa-star';
                    dificuldadeBadgeBg = '#e4a67c';
                    progressoBarBg = concluido ? 'bg-success' : 'bg-primary';
                    break;
                default:
                    iconeClasse = 'fas fa-medal';
                    dificuldadeBadgeBg = 'bg-secondary';
            }

            const mtClass = index > 0 ? 'mt-4' : '';
            const xpBadgeStyle = `background-color: #305167; color: white;`;

            const card = document.createElement("div");
            card.className = `col-md-12 ${mtClass}`;
            card.innerHTML = `
<div class="card h-100 shadow-sm ${concluido ? 'border-success' : ''}">
  <div class="card-body">
    <!-- Cabeçalho responsivo -->
    <div class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
      <div class="d-flex align-items-start align-items-sm-center flex-wrap w-100">
        <i class="${iconeClasse} icone-desafios me-3" style="color: #305167; font-size: 1.7rem;"></i>
        <h5 class="card-title mb-2 mb-sm-0 flex-grow-1">${desafioInfo.titulo}</h5>
        <div class="d-flex flex-column flex-sm-row gap-2 mt-2 mt-sm-0">
          <span class="badge" style="background-color: ${dificuldadeBadgeBg}; white-space: nowrap;">
            ${desafioInfo.dificuldade}
          </span>
          <span class="badge" style="${xpBadgeStyle}; white-space: nowrap;">
            +${desafioInfo.xp} XP
          </span>
        </div>
      </div>
    </div>
    <p class="card-text mt-2">${desafioInfo.descricao}</p>
    <div class="flex-grow-1 mb-4">
      <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap">
        <span class="text-muted">Progresso</span>
        <span class="${progressoTextColor}">${progresso}/${meta}</span>
      </div>
      <div class="progress" style="height: 20px;">
        <div class="progress-bar ${progressoBarBg}"
             role="progressbar"
             style="width: ${progressoPercent}%; transition: width 1s ease-in-out;"
             aria-valuenow="${progressoPercent}"
             aria-valuemin="0"
             aria-valuemax="100">
        </div>
      </div>
    </div>
  </div>
</div>

            `;
            desafiosContainer.appendChild(card);
            index++;
        });

        // se ganhou XP por novas conclusões, atualiza XP global e UI
        if (xpGanhoNesteCiclo > 0) {
            const xpAntes = xpAtual;
            xpAtual += xpGanhoNesteCiclo;

            if (pontosTotaisElem) animarNumero(pontosTotaisElem, xpAntes, xpAtual);

            const totalPercent = Math.min((xpAtual / xpTotal) * 100, 100);
            if (progressoTotalBar) progressoTotalBar.style.width = `${totalPercent}%`;
            if (progressoTotalTexto) progressoTotalTexto.textContent = `${Math.floor(totalPercent)}%`;
            if (xpUsuarioElem) xpUsuarioElem.textContent = `${xpAtual}/${xpTotal} XP`;

            // Checa insígnia logo após ganhar XP
            checarInsigniaLendaria();
        }

        // salva estado final dos desafios (inclui flags 'concluido' atualizadas)
        localStorage.setItem("desafios", JSON.stringify(desafiosSalvos));
        salvarPontos();
    }


    // 8) HANDLERS: TAREFAS DIÁRIAS (click para togglar conclusão)
    tarefas.forEach((tarefa, index) => {
        tarefa.addEventListener("click", () => {
            // proteção: se index fora do array salvo, ignora
            if (index >= tarefasDiariasStatus.length) return;

            // XP da tarefa (lido do status previamente calculado)
            const xp = tarefasDiariasStatus[index].xp;
            const pontosAtuais = parseInt(pontosTotaisElem?.textContent || xpAtual, 10);

            if (tarefa.classList.contains("card-concluida")) {
                // desmarcar tarefa -> subtrai XP diário e total
                tarefa.classList.remove("card-concluida", "ativa");
                xpDiario -= xp;
                xpAtual -= xp;
                tarefasDiariasStatus[index].concluida = false;
            } else {
                // marcar tarefa -> adiciona XP
                tarefa.classList.add("card-concluida");
                setTimeout(() => tarefa.classList.add("ativa"), 10);
                xpDiario += xp;
                xpAtual += xp;
                tarefasDiariasStatus[index].concluida = true;
            }

            // atualiza barras e textos
            atualizarProgressoDiarioDisplay();

            const totalPercent = Math.min((xpAtual / xpTotal) * 100, 100);
            if (progressoTotalBar) progressoTotalBar.style.width = `${totalPercent}%`;
            if (progressoTotalTexto) progressoTotalTexto.textContent = `${Math.floor(totalPercent)}%`;
            if (xpUsuarioElem) xpUsuarioElem.textContent = `${xpAtual}/${xpTotal} XP`;

            // anima contador principal (troféu)
            if (pontosTotaisElem) animarNumero(pontosTotaisElem, pontosAtuais, xpAtual);

            // checa insígnia após alteração de XP
            checarInsigniaLendaria();

            // persiste estado
            salvarPontos();
        });
    });

   
    // 9) INICIALIZAÇÃO: rota de startup
   
    inicializarDesafios();
    carregarPontos();
    carregarTarefasDiarias();
    renderizarDesafios();

    // checa insígnia ao carregar (aplica visual)
    checarInsigniaLendaria();

    // reage a mudanças no localStorage vindas de outras abas (sincronização)
    window.addEventListener('storage', (e) => {
        const keysOfInterest = ['desafios', 'xpTotalAtual', 'tarefasDiariasStatus', 'livrosBiblioteca', 'resenhas', 'insigniaLendariaDesbloqueada'];
        if (keysOfInterest.includes(e.key)) {
            inicializarDesafios();
            carregarPontos();
            carregarTarefasDiarias();
            renderizarDesafios();
            checarInsigniaLendaria();
        }
    });

});
