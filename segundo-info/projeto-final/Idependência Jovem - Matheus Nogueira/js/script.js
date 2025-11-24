// Gerenciamento de estado do usuário
const UserState = {
    // Dados do usuário
    data: {
        aulasCompletas: [],
        aulasSalvas: [],
        progressoCursos: {},
        profileImage: null,
        profileName: null,
        profileEmail: null,
        profileCourse: null,
        firstVisit: true
    },

    // Carregar dados do localStorage
    init() {
        const savedData = localStorage.getItem('independenciaJovem');
        if (savedData) {
            this.data = JSON.parse(savedData);
            // Normalizar entradas antigas (strings) para objetos {id, title, href}
            if (Array.isArray(this.data.aulasSalvas)) {
                this.data.aulasSalvas = this.data.aulasSalvas.map(item => {
                    if (typeof item === 'string') {
                        // Garantir que o href comece com '/' e termine com '.html'
                        let href = item;
                        if (!href.startsWith('/')) href = '/' + href;
                        if (!href.endsWith('.html')) href = href + '.html';
                            // normalizar barras para '/'
                            href = href.replace(/\\/g, '/');
                        const parts = href.split('/');
                        const id = parts.pop().replace('.html', '');
                        const title = id;
                        return { id, title, href };
                    }
                    return item;
                });
            }
        }
    },

    // Salvar dados no localStorage
    save() {
        localStorage.setItem('independenciaJovem', JSON.stringify(this.data));
    },

    // Atualizar imagem de perfil (dataURL)
    setProfileImage(dataUrl) {
        this.data.profileImage = dataUrl;
        this.save();
    },

    clearProfileImage() {
        this.data.profileImage = null;
        this.save();
    },
    
    // Removido setProfileData

    // Marcar aula como completa
    marcarAulaConcluida(aulaId) {
        // Certifica que o ID da aula inclui o caminho completo
        const pathParts = window.location.pathname.split('/');
        const cursoId = pathParts[1].replace('.html', ''); // pega a pasta do curso
        const aulaCompleta = cursoId + '/' + aulaId;
        
        console.log('Marcando aula como concluída:', aulaCompleta);
        
        if (!this.data.aulasCompletas.includes(aulaCompleta)) {
            this.data.aulasCompletas.push(aulaCompleta);
            this.save();
            console.log('Aulas completas atualizadas:', this.data.aulasCompletas);
        }
    },
    // Remover marcação de aula concluída
    desmarcarAulaConcluida(aulaId) {
        const pathParts = window.location.pathname.split('/');
        const cursoId = pathParts[1].replace('.html', '');
        const aulaCompleta = cursoId + '/' + aulaId;
        const idx = this.data.aulasCompletas.indexOf(aulaCompleta);
        if (idx !== -1) {
            this.data.aulasCompletas.splice(idx, 1);
            this.save();
            console.log('Aula desmarcada como concluída:', aulaCompleta);
        }
    },

    // Salvar aula como favorita (salva metadados: id, title, href)
    salvarAulaMeta(aulaMeta) {
        const exists = this.data.aulasSalvas.some(item => item.href === aulaMeta.href || item.id === aulaMeta.id);
        if (!exists) {
            this.data.aulasSalvas.push(aulaMeta);
            this.save();
        }
    },

    // Remover aula dos favoritos por id ou href
    removerAulaSalva(aulaIdOrHref) {
        this.data.aulasSalvas = this.data.aulasSalvas.filter(item => (item.id !== aulaIdOrHref && item.href !== aulaIdOrHref));
        this.save();
    },

    // Atualizar progresso do curso
    atualizarProgressoCurso(aulaId) {
        const curso = this.identificarCurso(aulaId);
        if (!curso) return;

        if (!this.data.progressoCursos[curso]) {
            this.data.progressoCursos[curso] = {
                total: this.contarAulasCurso(curso),
                completas: 0
            };
        }

        this.data.progressoCursos[curso].completas = this.data.aulasCompletas
            .filter(aula => aula.startsWith(curso))
            .length;

        this.save();
                    if (document.querySelector('.curso-grid')) {
                atualizarProgressoPerfil();
            }
    },

    // Identificar curso baseado no ID da aula
    identificarCurso(aulaId) {
        const cursosMap = {
            'culinaria': 'Culinária Prática',
            'etiqueta': 'Etiqueta Profissional',
            'financas': 'Finanças Pessoais',
            'manutencao': 'Manutenção de Automóveis',
            'vida-domestica': 'Vida Doméstica',
            'saude-mental': 'Saúde Mental'
        };

        for (const [key, value] of Object.entries(cursosMap)) {
            if (aulaId.includes(key)) return key;
        }
        return null;
    },

    // Contar total de aulas em um curso
    contarAulasCurso(curso) {
        const aulasPorCurso = {
            'culinaria': 4,
            'etiqueta': 4,
            'financas': 3,
            'manutencao': 4,
            'vida-domestica': 5,
            'saude-mental': 3
        };
        return aulasPorCurso[curso] || 0;
    }
};

// Event Listeners e Inicialização
document.addEventListener('DOMContentLoaded', () => {
    UserState.init();
    
    // Função para atualizar a exibição do perfil
    function updateProfileDisplay() {
        const nameElement = document.getElementById('profileName');
        const emailSpan = document.getElementById('profileEmail');
        const courseSpan = document.getElementById('profileCourse');

        if (nameElement) nameElement.textContent = UserState.data.profileName || 'Matheus Nogueira';
        if (emailSpan) emailSpan.textContent = UserState.data.profileEmail || 'matheus.nogueira@etec.sp.gov.br';
        if (courseSpan) courseSpan.textContent = UserState.data.profileCourse || 'Informática para Internet';
    }

    // Modal de edição: abrir/fechar, popular, salvar
    const editBtn = document.getElementById('editProfileBtn');
    const profileModal = document.getElementById('profileModal');
    const modalName = document.getElementById('modalName');
    const modalEmail = document.getElementById('modalEmail');
    const modalCourse = document.getElementById('modalCourse');
    const modalSave = document.getElementById('modalSaveProfile');
    const modalCancel = document.getElementById('modalCancelProfile');

    function openProfileModal(){
        if (modalName) modalName.value = UserState.data.profileName || '';
        if (modalEmail) modalEmail.value = UserState.data.profileEmail || '';
        if (modalCourse) modalCourse.value = UserState.data.profileCourse || '';
        if (profileModal) profileModal.style.display = 'flex';
        if (modalName) modalName.focus();
    }

    function closeProfileModal(){
        if (profileModal) profileModal.style.display = 'none';
    }

    if (editBtn) editBtn.addEventListener('click', openProfileModal);

    if (modalCancel) modalCancel.addEventListener('click', (e)=>{ e.preventDefault(); closeProfileModal(); });

    if (modalSave) modalSave.addEventListener('click', (e)=>{
        e.preventDefault();
        const newName = modalName ? modalName.value.trim() : '';
        const newEmail = modalEmail ? modalEmail.value.trim() : '';
        const newCourse = modalCourse ? modalCourse.value.trim() : '';

        if (!newName || newName.length < 2){ alert('Insira um nome válido'); return; }
        if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)){ alert('Insira um e-mail válido'); return; }

        UserState.data.profileName = newName;
        UserState.data.profileEmail = newEmail;
        UserState.data.profileCourse = newCourse;
        UserState.data.firstVisit = false;
        UserState.save();
        updateProfileDisplay();
        closeProfileModal();
    });

    // Se não houver dados, abrir modal automaticamente (primeira visita ou storage limpo)
    updateProfileDisplay();
    if (!UserState.data.profileName) {
        openProfileModal();
    }
    // (injeção de CSS e marcação de aulas concluídas removidas — revertendo para comportamento anterior ao pedido de sidebar)

    // Marca de aulas concluídas removida — esta lógica foi revertida para manter apenas o comportamento de progresso

    // Inicializar botões de ação nas aulas
    const btnConcluir = document.querySelector('.btn-principal');
    const btnSalvar = document.querySelector('.btn-secundario');

    // Criar e controlar menu hamburger dinamicamente para não precisar editar todos os HTMLs
    (function initHamburgerMenu(){
        const navs = document.querySelectorAll('nav.container');
        if (!navs.length) return;

        navs.forEach(nav => {
            const links = nav.querySelector('.nav-links');
            if (!links) return;

            // criar botão apenas se ainda não existir
            if (nav.querySelector('.nav-toggle')) return;

            const btn = document.createElement('button');
            btn.className = 'nav-toggle';
            btn.id = 'navToggle';
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Abrir menu');
            btn.innerHTML = '&#9776;'; // ☰

            // inserir antes dos links
            nav.insertBefore(btn, links);

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = links.classList.toggle('open');
                btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            // fechar ao clicar em um link (mobile)
            links.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => {
                    links.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                });
            });

            // fechar ao clicar fora
            document.addEventListener('click', (ev) => {
                if (!nav.contains(ev.target)) {
                    links.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            // garantir comportamento ao redimensionar
            window.addEventListener('resize', () => {
                if (window.innerWidth > 900) {
                    links.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    })();

    // Carregar imagem de perfil, se houver
    const avatarImg = document.getElementById('profileAvatar');
    const fileInput = document.getElementById('profileImageInput');
    const clearBtn = document.getElementById('clearProfileImage');

    if (avatarImg) {
        if (UserState.data.profileImage) {
            avatarImg.src = UserState.data.profileImage;
        }
    }

    // Removida a lógica de edição de perfil

    if (fileInput && avatarImg) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert('Por favor escolha um arquivo de imagem.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(evt) {
                const dataUrl = evt.target.result;
                avatarImg.src = dataUrl;
                UserState.setProfileImage(dataUrl);
            };
            reader.readAsDataURL(file);
        });
    }

    if (clearBtn && avatarImg) {
        clearBtn.addEventListener('click', () => {
            avatarImg.src = '/img/avatar.png';
            UserState.clearProfileImage();
            // limpar input
            if (fileInput) fileInput.value = '';
        });
    }
    
    if (btnConcluir) {
        const pathname = window.location.pathname;
        const aulaId = pathname.split('/').pop().replace('.html', '');

        const cursoId = pathname.split('/')[1];
        const aulaCompleta = cursoId + '/' + aulaId;

        const isConcluded = () => UserState.data.aulasCompletas.includes(aulaCompleta);

        function updateConcluirButton() {
            if (isConcluded()) {
                btnConcluir.innerHTML = '<i class="fas fa-check-circle"></i> Aula Concluída';
                btnConcluir.style.backgroundColor = '#10B981';
            } else {
                btnConcluir.innerHTML = '<i class="fas fa-check-circle"></i> Marcar como concluída';
                btnConcluir.style.backgroundColor = '';
            }
        }

        updateConcluirButton();

        btnConcluir.addEventListener('click', () => {
            if (isConcluded()) {
                UserState.desmarcarAulaConcluida(aulaId);
            } else {
                UserState.marcarAulaConcluida(aulaId);
            }
            // Recalcular progresso e atualizar UI (passa identificador completo para detecção de curso)
            UserState.atualizarProgressoCurso(aulaCompleta);
            updateConcluirButton();
        });
    }

    if (btnSalvar) {
        const aulaHref = window.location.pathname;
        const aulaId = aulaHref.split('/').pop().replace('.html', '');
        const aulaTitle = document.querySelector('h1')?.innerText || document.title || aulaId;

        const isSaved = () => UserState.data.aulasSalvas.some(item => item.href === aulaHref || item.id === aulaId);

        const updateSalvarButton = () => {
            if (isSaved()) {
                btnSalvar.innerHTML = '<i class="fas fa-bookmark"></i> Aula Salva';
                btnSalvar.style.borderColor = '#10B981';
                btnSalvar.style.color = '#10B981';
            } else {
                btnSalvar.innerHTML = '<i class="fas fa-bookmark"></i> Salvar aula';
                btnSalvar.style.borderColor = '#3B82F6';
                btnSalvar.style.color = '#3B82F6';
            }
        };

        updateSalvarButton();

        btnSalvar.addEventListener('click', () => {
            if (isSaved()) {
                UserState.removerAulaSalva(aulaHref);
            } else {
                UserState.salvarAulaMeta({ id: aulaId, title: aulaTitle.trim(), href: aulaHref });
            }
            updateSalvarButton();
            // Se estivermos no perfil, atualizar a lista renderizada
            if (document.getElementById('savedLessonsContainer')) renderSavedLessons();
        });
    }

    // Validação do formulário de contato
    const formContato = document.querySelector('.form-contato');
    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = formContato.querySelector('input[type="text"]').value;
            const email = formContato.querySelector('input[type="email"]').value;
            const mensagem = formContato.querySelector('textarea').value;

            if (nome.length < 3) {
                alert('Por favor, insira um nome válido');
                return;
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert('Por favor, insira um e-mail válido');
                return;
            }

            if (mensagem.length < 10) {
                alert('Por favor, escreva uma mensagem mais detalhada');
                return;
            }

            // Aqui você pode adicionar o código para enviar o formulário
            alert('Mensagem enviada com sucesso!');
            formContato.reset();
        });
    }

    // Atualizar barras de progresso no perfil
    function atualizarProgressoPerfil() {
        // Verifica se estamos na página de perfil
        const perfilCards = document.querySelectorAll('.curso-card[data-curso]');
        if (!perfilCards.length) return;

        console.log('Atualizando progresso do perfil...');
        console.log('Aulas completas:', UserState.data.aulasCompletas);

        let totalGeral = 0;
        let completasGeral = 0;

        perfilCards.forEach(card => {
            const cursoId = card.dataset.curso;
            if (!cursoId) return;

            const total = UserState.contarAulasCurso(cursoId);
            const completas = UserState.data.aulasCompletas.filter(aula => aula.includes(cursoId)).length;

            console.log(`Curso ${cursoId}: ${completas}/${total} aulas completas`);

            const porcentagem = Math.round((completas / total) * 100) || 0;
            totalGeral += total;
            completasGeral += completas;

            // Atualizar barra de progresso
            const barra = card.querySelector('.progress-bar > div');
            if (barra) {
                barra.style.width = `${porcentagem}%`;
                console.log(`Atualizando barra de ${cursoId} para ${porcentagem}%`);
            }

            // Atualizar texto de progresso
            const texto = card.querySelector('.progresso');
            if (texto) {
                texto.textContent = `${porcentagem}% concluído`;
            }
        });

        // Atualizar progresso geral
        const progressoGeral = Math.round((completasGeral / totalGeral) * 100) || 0;
        // Atualizar elemento específico por id (mais robusto) e fallback para o parágrafo
        const progressSpan = document.getElementById('profileProgress');
        if (progressSpan) {
            progressSpan.textContent = `${progressoGeral}%`;
        } else {
            const textoProgressoGeral = document.querySelector('.perfil-info p:last-child');
            if (textoProgressoGeral) {
                textoProgressoGeral.innerHTML = `<strong>Progresso geral:</strong> ${progressoGeral}%`;
            }
        }

        console.log(`Progresso geral: ${progressoGeral}%`);
    }

    // Se estivermos na página de perfil, atualizar progresso e adicionar navegação nos cards
    if (document.querySelector('.curso-grid')) {
        atualizarProgressoPerfil();

        // Adicionar navegação para os cards dos cursos
        document.querySelectorAll('.curso-card').forEach(card => {
            card.addEventListener('click', () => {
                const cursoId = card.dataset.curso;
                if (cursoId) {
                    const cursosMap = {
                        'vida-domestica': '/vida-domestica/vida-domestica.html',
                        'financas': '/finacas-pessoais/financas-pessoais.html',
                        'culinaria': '/culinaria/culinaria.html',
                        'saude-mental': '/saude-mental/saude-mental.html',
                        'manutencao': '/manutencao-de-automoveis/manutencao-de-automoveis.html',
                        'etiqueta': '/etiqueta-profissional/etiqueta-profissional.html'
                    };
                    const url = cursosMap[cursoId];
                    if (url) {
                        window.location.href = url;
                    }
                }
            });
        });
    }
    // Renderizar lista de aulas salvas (se estivermos na página de perfil)
    if (document.getElementById('savedLessonsContainer')) {
        renderSavedLessons();
    }
});

// Renderiza os itens salvos na seção de perfil
function renderSavedLessons() {
    const container = document.getElementById('savedLessonsContainer');
    if (!container) return;
    container.innerHTML = '';

    const list = UserState.data.aulasSalvas || [];
    if (!list.length) {
        const p = document.createElement('p');
        p.className = 'empty';
        p.innerText = 'Você não salvou nenhuma aula ainda.';
        container.appendChild(p);
        return;
    }

    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'saved-item';
        // tornar o card todo clicável e navegar para a aula
        const href = item.href || (`/${item.id}.html`);
        card.addEventListener('click', (e) => {
            // se clicou no botão Remover, não navegar
            if (e.target && e.target.classList && e.target.classList.contains('remove-saved')) return;
            window.location.href = href;
        });

        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.flexDirection = 'column';

        const a = document.createElement('a');
        a.href = href;
        a.innerText = item.title || item.id;
        // garantir que o clique no link não dispare duas navegações
        a.addEventListener('click', (e) => {
            e.stopPropagation();
            // navega normalmente
        });

        left.appendChild(a);

        const btn = document.createElement('button');
        btn.className = 'remove-saved';
        btn.innerText = 'Remover';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            UserState.removerAulaSalva(item.href || item.id);
            renderSavedLessons();
        });

        card.appendChild(left);
        card.appendChild(btn);
        container.appendChild(card);
    });
}

// Animações suaves de scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Feedback visual para interações
document.querySelectorAll('.recurso-card, .cta-button, .btn-principal, .btn-secundario').forEach(element => {
    element.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Botão "Voltar ao topo" — injetado dinamicamente para evitar editar todos os HTMLs
(function initBackToTop(){
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.innerHTML = '▲';

    Object.assign(btn.style, {
        position: 'fixed',
        right: '18px',
        bottom: '18px',
        width: '44px',
        height: '44px',
        borderRadius: '8px',
        border: 'none',
        background: '#1E3A8A',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontSize: '18px'
    });

    // Acessibilidade: teclas Enter/Espaço
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    document.body.appendChild(btn);

    const showOn = 250; // mostra o botão após 250px de scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > showOn) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();
