document.addEventListener('DOMContentLoaded', () => {

    // 1. Funcionalidade de Tabs (Rolagem para Seção)
    (function () {
        const tabs = document.querySelectorAll('.tab');

        // Mapeamento dos data-targets para os seletores reais no DOM
        const selectors = {
            'dash': '.container',
            'reps': '.rep-grid-container', // contêiner da lista de representantes
            'hist': '.table-wrap',
            'proj': '.projects-wrap'
        };

        tabs.forEach(t => {
            t.addEventListener('click', () => {
                // Remove classe "active" de todas as tabs e adiciona na clicada
                tabs.forEach(x => x.classList.remove('active'));
                t.classList.add('active');

                const target = t.dataset.target;
                const selector = selectors[target];

                if (selector) {
                    const el = document.querySelector(selector);

                    if (el) {
                        // Se for dashboard, rola para o topo do container principal
                        const scrollTarget = target === 'dash' ? document.querySelector('.container') : el;
                        scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    })();

    // 2. Funcionalidade de Accordion
    (function () {
        const accs = document.querySelectorAll('[data-acc]');

        accs.forEach(acc => {
            const head = acc.querySelector('.acc-head');
            const body = acc.querySelector('.acc-body');

            // Garante que os bodies iniciem fechados (se não estiver com classe 'open')
            if (!acc.classList.contains('open')) {
                body.style.display = 'none';
            }

            head.addEventListener('click', () => {
                const isOpen = acc.classList.toggle('open');

                if (isOpen) {
                    // Abre o conteúdo
                    body.style.display = 'block';
                } else {
                    // Fecha o conteúdo
                    body.style.display = 'none';
                }
            });
        });
    })();

    // 3. Funcionalidade de Modal (Detalhes do Representante)
    (function () {
        const overlay = document.getElementById('overlay');
        const closeBtn = document.getElementById('closeModal');
        const detailButtons = document.querySelectorAll('button[data-action="details"]');

        // Elementos do modal
        const modalName = document.getElementById('modalName');
        const modalRole = document.getElementById('modalRole');
        const modalBio = document.getElementById('modalBio');
        const modalProjects = document.getElementById('modalProjects');
        const modalPresence = document.getElementById('modalPresence');
        const modalTag = document.getElementById('modalTag');
        const modalPhoto = document.getElementById('modalPhoto');

        // Dados estáticos dos políticos
        const data = {
            "Chris Tonietto": {
                name: "Chris Tonietto", role: "Deputada Federal", party: "PL", state: "RJ",
                bio: "Deputada Federal pelo Rio de Janeiro, advogada e integrante do Partido Liberal (PL). Atua em pautas de defesa da vida desde a concepção, valores cristãos e direitos da família tradicional.",
                projects: 9, presence: "90%",
                photo: "chris.png"
            },
            "Nicolas Ferreira": {
                name: "Nicolas Ferreira",
                role: "Deputado Federal",
                party: "PL",
                state: "MG",
                bio: "Deputado Federal por Minas Gerais e integrante do Partido Liberal (PL). Conhecido por suas pautas conservadoras, defende a liberdade de expressão, valores cristãos e políticas voltadas à família e à segurança pública.",
                projects: 11,
                presence: "92%",
                photo: "nicolas.png"
            },

            "Erika Hilton": {
                name: "Erika Hilton",
                role: "Deputada Federal",
                party: "PSOL",
                state: "SP",
                bio: "Deputada Federal por São Paulo e primeira mulher trans eleita para o Congresso Nacional. Atua em pautas de direitos humanos, igualdade racial, defesa da população LGBTQIA+ e justiça social.",
                projects: 18,
                presence: "96%",
                photo: "erika.png"
            },

            "Tabata Amaral": {
                name: "Tabata Amaral",
                role: "Deputada Federal",
                party: "PSB",
                state: "SP",
                bio: "Deputada Federal por São Paulo, cientista política e ativista pela educação. Cofundadora do Movimento Mapa Educação, Tabata atua em pautas ligadas à educação, ciência, inovação e combate à desigualdade social.",
                projects: 14,
                presence: "95%",
                photo: "tabata.png"
            },
            "Wendel Lagartixa": {
                name: "Wendel Lagartixa",
                role: "Deputado Estadual",
                party: "PL",
                state: "RN",
                bio: "Deputado Estadual do Rio Grande do Norte, conhecido por sua atuação em defesa da segurança pública e apoio às forças policiais. Defende pautas conservadoras e políticas de endurecimento penal no combate ao crime organizado.",
                projects: 7,
                presence: "91%",
                photo: "wendel.png"
            },

            "Kim Kataguiri": {
                name: "Kim Kataguiri",
                role: "Deputado Federal",
                party: "UNIÃO",
                state: "SP",
                bio: "Deputado Federal por São Paulo e um dos fundadores do Movimento Brasil Livre (MBL). Atua em pautas de responsabilidade fiscal, transparência pública, liberdade de expressão e combate à corrupção.",
                projects: 16,
                presence: "93%",
                photo: "kim.png"
            },

            "Guilherme Boulos": {
                name: "Guilherme Boulos",
                role: "Deputado Federal",
                party: "PSOL",
                state: "SP",
                bio: "Deputado Federal por São Paulo, fundador do Movimento dos Trabalhadores Sem Teto (MTST) e professor universitário. Atua em pautas de habitação, justiça social, direitos trabalhistas e combate à desigualdade.",
                projects: 17,
                presence: "94%",
                photo: "boulos.png"
            },

            "Sâmia Bomfim": {
                name: "Sâmia Bomfim",
                role: "Deputada Federal",
                party: "PSOL",
                state: "SP",
                bio: "Deputada Federal por São Paulo, feminista e militante dos direitos das mulheres e da população LGBTQIA+. Defende pautas ligadas à igualdade de gênero, educação pública e direitos sociais.",
                projects: 13,
                presence: "95%",
                photo: "samia.png"
            },
            "Gleisi Hoffmann": {
                name: "Gleisi Hoffmann",
                role: "Deputada Federal",
                party: "PT",
                state: "PR",
                bio: "Deputada Federal pelo Paraná e presidente nacional do Partido dos Trabalhadores (PT). Defende pautas de justiça social, fortalecimento de políticas públicas e defesa dos direitos trabalhistas e das mulheres.",
                projects: 15,
                presence: "93%",
                photo: "gleisi.png"
            },

            "Lindbergh Farias": {
                name: "Lindbergh Farias",
                role: "Deputado Federal",
                party: "PT",
                state: "RJ",
                bio: "Deputado Federal pelo Rio de Janeiro, ex-senador e militante histórico do movimento estudantil. Atua em pautas de economia popular, proteção social, soberania nacional e defesa dos direitos trabalhistas.",
                projects: 12,
                presence: "92%",
                photo: "farias.png"
            },

        };

        function setModalState(isOpen) {
            if (isOpen) {
                overlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // bloqueia scroll da página
            } else {
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = ''; // libera scroll
            }
        }

        function openModal(person) {
            // Busca os dados do político
            const d = data[person];
            if (!d) return;

            // Preenche os campos do modal
            modalName.textContent = d.name;
            modalRole.textContent = `${d.role} · ${d.party} · ${d.state}`;
            modalBio.textContent = d.bio;
            modalProjects.textContent = d.projects;
            modalPresence.textContent = d.presence;
            modalTag.textContent = `${d.party} · ${d.state}`;
            modalPhoto.innerHTML = `<img src="${d.photo}" alt="${d.name}" class="modal-rep-photo">`;

            setModalState(true);
        }

        // Dados simulados: histórico de votos e projetos recentes
        const atividades = {
            "Chris Tonietto": {
                votos: [
                    { projeto: "PL 2151/2019 — Patronos da Música Popular Brasileira", voto: "A favor", resultado: "Aprovado na CCJ" },
                    { projeto: "PL 2514/2023 — Terapia nutricional para pacientes com câncer", voto: "A favor", resultado: "Aprovado na CCJ" },
                    { projeto: "PEC 3/2021 — PEC das Prerrogativas", voto: "A favor", resultado: "Em tramitação no Senado" }
                ],
                projetos: [
                    { nome: "PL 2151/2019 — Patronos da Música Popular Brasileira", status: "Aprovado na CCJ" },
                    { nome: "PL 2514/2023 — Terapia nutricional para pacientes com câncer", status: "Aprovado na CCJ" },
                    { nome: "PL 4205/2024 — Semana Nacional de Valorização da Vida e da Família", status: "Em tramitação" }
                ]
            },
            "Nicolas Ferreira": {
                votos: [
                    { projeto: "PL 2215/2024", voto: "Sim", resultado: "Registro de voto em plenário" },
                    { projeto: "PLP 58/2025", voto: "Sim", resultado: "Registro de voto em plenário" },
                    { projeto: "PLP 22/2025", voto: "Não", resultado: "Registro de voto em plenário" },
                    { projeto: "PL 2379/2023", voto: "Não", resultado: "Registro de voto em plenário" }
                ],
                projetos: [
                    { nome: "PL 609/2023 — PL contra Aumento Abusivo de Preços em Calamidade", status: "Em tramitação" },
                    { nome: "PL 1676/2024 — PL de Penas Endurecidas por Furtos em Calamidade", status: "Em tramitação" },
                    { nome: "PL 2120/2023 — Marco Legal das Plataformas Digitais", status: "Em tramitação" }
                ]
            },
            "Erika Hilton": {
                votos: [
                    { projeto: "PLP 58/2025", voto: "Sim", resultado: "Registro de voto em plenário (ver resultado geral)" },
                    { projeto: "PLP 58/2025 - DTQ 1", voto: "Não", resultado: "Registro de voto em plenário (ver resultado geral)" },
                    { projeto: "PL 22/2025 - Requerimento de retirada de pauta", voto: "Sim", resultado: "Registro de voto em plenário (ver resultado geral)" },
                    { projeto: "PL 22/2025 - Substitutivo", voto: "Não", resultado: "Registro de voto em plenário (ver resultado geral)" }
                ],
                projetos: [
                    { nome: "PL 1621/2024 — PL da Dignidade Menstrual", status: "Em tramitação" },
                    { nome: "PL 1031/2024 — PL de Informação às Vítimas de Violência Sexual", status: "Em tramitação" },
                    { nome: "PL 3109/2023 — PL das Cotas para Pessoas Trans", status: "Em tramitação" },
                    { nome: "PL 2668/2024 — PL de Registro de Crimes Homotransfóbicos", status: "Em tramitação" },
                    { nome: "PL PopRua — Lei da População em Situação de Rua", status: "Aprovado na Câmara" },
                    { nome: "PL 3564/2024 — PL contra Queimadas Criminosas", status: "Em tramitação" }
                ]
            },
            "Tabata Amaral": {
                votos: [
                    { projeto: "PL 2630/2020 — Projeto das Fake News", voto: "A favor", resultado: "Aprovado na Câmara" },
                    { projeto: "PL 1425/2023 — Piso Nacional da Enfermagem", voto: "A favor", resultado: "Aprovado" },
                    { projeto: "PEC 45/2019 — Reforma Tributária", voto: "A favor", resultado: "Aprovado no Congresso" }
                ],
                projetos: [
                    { nome: "PL 2613/2023 — Criação do Programa Nacional de Bolsas de Estudo", status: "Em tramitação" },
                    { nome: "PL 4125/2022 — Incentivo à Educação Técnica e Científica", status: "Aprovado na Comissão de Educação" },
                    { nome: "PL 1908/2024 — Bolsa Permanência Universitária", status: "Em tramitação" }
                ]
            },
            "Wendel Lagartixa": {
                votos: [
                    { projeto: "PL 102/2024 — Reforço do Patrulhamento Escolar", voto: "A favor", resultado: "Aprovado na Assembleia" },
                    { projeto: "PL 217/2024 — Isenção de ICMS para Policiais na Compra de Armas", voto: "A favor", resultado: "Em tramitação" },
                    { projeto: "PL 301/2024 — Criação da Semana Estadual de Segurança Pública", voto: "A favor", resultado: "Aprovado" }
                ],
                projetos: [
                    { nome: "PL 102/2024 — Reforço do Patrulhamento Escolar", status: "Aprovado" },
                    { nome: "PL 217/2024 — Isenção de ICMS para Policiais na Compra de Armas", status: "Em tramitação" },
                    { nome: "PL 301/2024 — Semana Estadual de Segurança Pública", status: "Aprovado" }
                ]
            },

            "Kim Kataguiri": {
                votos: [
                    { projeto: "PEC 45/2019 — Reforma Tributária", voto: "A favor", resultado: "Aprovado no Congresso" },
                    { projeto: "PL 2630/2020 — Projeto das Fake News", voto: "Contra", resultado: "Em tramitação no Senado" },
                    { projeto: "PL 2757/2022 — Marco Legal das Startups", voto: "A favor", resultado: "Aprovado" }
                ],
                projetos: [
                    { nome: "PL 349/2023 — Fim dos Benefícios para Condenados por Corrupção", status: "Em tramitação" },
                    { nome: "PL 1425/2024 — Responsabilidade Fiscal nas Estatais", status: "Aprovado na Comissão de Finanças" },
                    { nome: "PL 2757/2022 — Incentivo à Inovação e Startups", status: "Aprovado" }
                ]
            },
            "Guilherme Boulos": {
                votos: [
                    { projeto: "PEC 45/2019 — Reforma Tributária", voto: "A favor", resultado: "Aprovado no Congresso" },
                    { projeto: "PL 2630/2020 — Projeto das Fake News", voto: "A favor", resultado: "Aprovado na Câmara" },
                    { projeto: "PL 504/2021 — Censura à Diversidade nas Escolas", voto: "Contra", resultado: "Rejeitado" }
                ],
                projetos: [
                    { nome: "PL 2631/2023 — Programa Nacional de Habitação Popular", status: "Em tramitação" },
                    { nome: "PL 1984/2023 — Taxação de Grandes Fortunas", status: "Em tramitação" },
                    { nome: "PL 1770/2024 — Programa de Renda Básica Permanente", status: "Em tramitação" }
                ]
            },

            "Sâmia Bomfim": {
                votos: [
                    { projeto: "PL 1425/2023 — Piso Nacional da Enfermagem", voto: "A favor", resultado: "Aprovado" },
                    { projeto: "PL 504/2021 — Censura à Diversidade nas Escolas", voto: "Contra", resultado: "Rejeitado" },
                    { projeto: "PEC 45/2019 — Reforma Tributária", voto: "A favor", resultado: "Aprovado" }
                ],
                projetos: [
                    { nome: "PL 2033/2023 — Igualdade Salarial entre Homens e Mulheres", status: "Aprovado na Câmara" },
                    { nome: "PL 1801/2024 — Proteção a Vítimas de Violência Política", status: "Em tramitação" },
                    { nome: "PL 2295/2023 — Ampliação da Licença-Maternidade", status: "Em tramitação" }
                ]
            },

            "Gleisi Hoffmann": {
                votos: [
                    { projeto: "PEC 45/2019 — Reforma Tributária", voto: "A favor", resultado: "Aprovado" },
                    { projeto: "PL 1425/2023 — Piso Nacional da Enfermagem", voto: "A favor", resultado: "Aprovado" },
                    { projeto: "PL 2630/2020 — Projeto das Fake News", voto: "A favor", resultado: "Em tramitação no Senado" }
                ],
                projetos: [
                    { nome: "PL 1934/2023 — Fortalecimento do SUS", status: "Em tramitação" },
                    { nome: "PL 2655/2024 — Programa Nacional de Combate à Fome", status: "Aprovado na Câmara" },
                    { nome: "PL 2142/2023 — Política Nacional de Igualdade Salarial", status: "Em tramitação" }
                ]
            },

            "Lindbergh Farias": {
                votos: [
                    { projeto: "PEC 45/2019 — Reforma Tributária", voto: "A favor", resultado: "Aprovado" },
                    { projeto: "PL 1425/2023 — Piso Nacional da Enfermagem", voto: "A favor", resultado: "Aprovado" },
                    { projeto: "PL 504/2021 — Censura à Diversidade nas Escolas", voto: "Contra", resultado: "Rejeitado" }
                ],
                projetos: [
                    { nome: "PL 1811/2023 — Programa de Renda Básica Permanente", status: "Em tramitação" },
                    { nome: "PL 2205/2024 — Incentivo à Economia Popular e Solidária", status: "Em tramitação" },
                    { nome: "PL 2333/2023 — Criação do Fundo Nacional de Emprego Jovem", status: "Em análise na Comissão" }
                ]
            }

        };

        const modal = document.querySelector('.modal');
        const infoContainer = document.createElement('div');
        infoContainer.id = 'modalDynamicContent';
        infoContainer.style.marginTop = '20px';
        modal.appendChild(infoContainer);

        function mostrarConteudo(tipo, nome) {
            const pessoa = atividades[nome];
            if (!pessoa) {
                infoContainer.innerHTML = "<p class='muted'>Sem dados disponíveis.</p>";
                return;
            }

            if (tipo === 'projetos') {
                infoContainer.innerHTML = `
                    <h4>Projetos Recentes</h4>
                    <ul>${pessoa.projetos.map(p => `<li><b>${p.nome}</b> — ${p.status}</li>`).join('')}</ul>`;
            } else if (tipo === 'votos') {
                infoContainer.innerHTML = `
                    <h4>Histórico de Votos</h4>
                    <ul>${pessoa.votos.map(v => `<li><b>${v.projeto}</b>: ${v.voto} (${v.resultado})</li>`).join('')}</ul>`;
            }
        }

        const botoesAcoes = document.querySelectorAll('.modal-actions .btn');
        botoesAcoes[0].addEventListener('click', () => mostrarConteudo('projetos', modalName.textContent));
        botoesAcoes[1].addEventListener('click', () => mostrarConteudo('votos', modalName.textContent));

        detailButtons.forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.name)));
        closeBtn.addEventListener('click', () => setModalState(false));
        overlay.addEventListener('click', e => { if (e.target === overlay) setModalState(false); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') setModalState(false); });


        const focusBtn = document.getElementById('focusBtn');
        const focusSearch = document.getElementById('focusSearch');
        const focusInput = document.getElementById('focusInput');
        const focusResults = document.getElementById('focusResults');


        const names = Object.keys(data);

        function showFocus(visible) {
            focusSearch.setAttribute('aria-hidden', String(!visible));
            focusBtn.setAttribute('aria-expanded', String(visible));
            if (visible) {
                focusInput.focus();
                focusInput.select();
            } else {
                focusInput.value = '';
                focusResults.innerHTML = '';
            }
        }

        focusBtn.addEventListener('click', () => {
            const open = focusSearch.getAttribute('aria-hidden') === 'false';
            showFocus(!open);
        });

        function buildResults(term) {
            const q = term.trim().toLowerCase();
            if (!q) {
                focusResults.innerHTML = '';
                return;
            }
            const matches = names.filter(n => n.toLowerCase().includes(q));
            if (matches.length === 0) {
                focusResults.innerHTML = '<li class="no-results">Nenhum resultado</li>';
                return;
            }
            focusResults.innerHTML = matches.map(m => {
                const party = data[m]?.party || '';
                return `<li role="option" data-name="${m}"><span>${m}</span><span class="party">${party}</span></li>`;
            }).join('');
            focusResults.querySelectorAll('li[data-name]').forEach(li => {
                li.addEventListener('click', () => goToPolitician(li.dataset.name));
            });
        }

        focusInput.addEventListener('input', e => buildResults(e.target.value));

        function goToPolitician(name) {
            const cards = document.querySelectorAll('.rep-card');
            let card = null;
            cards.forEach(c => {
                const h4 = c.querySelector('.rep-info h4');
                if (h4 && h4.textContent.trim() === name) card = c;
            });
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            openModal(name);
            showFocus(false);
        }

        document.addEventListener('click', e => {
            const inside = e.target.closest('#focusSearch') || e.target.closest('#focusBtn');
            if (!inside) showFocus(false);
        });
    })();
});
