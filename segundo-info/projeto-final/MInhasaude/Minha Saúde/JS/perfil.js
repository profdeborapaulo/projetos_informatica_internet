//lógica que engloba as duas funções principais do perfil (exibição de dados e agendamentos)

document.addEventListener('DOMContentLoaded', () => {

    // --- DADOS E CHAVES ---
    const AGENDAMENTOS_STORAGE_KEY = 'agendamentos_minha_saude';
    const USUARIO_LOGADO_KEY = 'usuarioLogado';
    const CADASTROS_STORAGE_KEY = 'cadastros_simulados'; 
    
    // --- FUNÇÕES AUXILIARES DE FORMATAÇÃO ---
    const formatarCPF = (cpf) => {
        if (!cpf) return '';
        cpf = cpf.replace(/\D/g, ''); 
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    const formatarTelefone = (tel) => {
        if (!tel) return '';
        tel = tel.replace(/\D/g, ''); 
        if (tel.length === 11) {
            return tel.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        }
        return tel;
    }

    // Verificação e carregamento do login
    const carregarPerfil = () => {
        const usuarioJSON = sessionStorage.getItem(USUARIO_LOGADO_KEY);
        
        //  Verifica o login, para evitar usuarios nao logados de acessar a pagina de perfil
        if (!usuarioJSON) {
            alert('Você não está logado. Redirecionando para a tela de login.');
            window.location.href = 'login.html'; 
            return null;
        }

        const usuario = JSON.parse(usuarioJSON);
        
        // Preenche os dados do perfil
        document.getElementById('perfil-nome-completo').textContent = usuario.nome || 'N/A';
        document.getElementById('perfil-idade-anos').textContent = `Idade: ${usuario.idade || 'N/A'}`;
        
        document.getElementById('perfil-cpf').textContent = formatarCPF(usuario.cpf) || 'N/A';
        document.getElementById('perfil-rg').textContent = usuario.rg || 'N/A';
        document.getElementById('perfil-email').textContent = usuario.email || 'N/A';
        document.getElementById('perfil-telefone').textContent = formatarTelefone(usuario.telefone) || 'N/A';

        return usuario;
    };
    
    // função logout
    const configurarLogout = () => {
        const botoesLogout = document.querySelectorAll('.logout');
        botoesLogout.forEach(btn => {
            btn.addEventListener('click', () => {
                sessionStorage.removeItem(USUARIO_LOGADO_KEY);
                alert('Sessão encerrada com sucesso.');
                window.location.href = 'index.html'; 
            });
        });
    };

    // deletar conta 
    const configurarDeletarConta = (usuario) => {
        const btnDeletar = document.getElementById('btn-deletar-conta');
        if (!btnDeletar) return;

        btnDeletar.addEventListener('click', () => {
            
            const confirmacao = confirm(`ATENÇÃO! Você tem certeza que deseja deletar sua conta permanentemente, ${usuario.nome.split(' ')[0]}? Todos os seus dados e agendamentos serão perdidos.`);

            if (!confirmacao) {
                return;
            }

            // remove o usuario do cadastro geral
            const cadastros = JSON.parse(localStorage.getItem(CADASTROS_STORAGE_KEY)) || [];
            const cadastrosAtualizados = cadastros.filter(c => c.email !== usuario.email);
            localStorage.setItem(CADASTROS_STORAGE_KEY, JSON.stringify(cadastrosAtualizados));

            // remover os agendamentos do usuario removido
            const agendamentos = JSON.parse(localStorage.getItem(AGENDAMENTOS_STORAGE_KEY)) || [];
            // Remove todos os agendamentos que pertencem ao email do usuário
            const agendamentosAtualizados = agendamentos.filter(a => a.userEmail !== usuario.email);
            // Salva a lista de agendamentos sem os dados do usuário deletado
            localStorage.setItem(AGENDAMENTOS_STORAGE_KEY, JSON.stringify(agendamentosAtualizados));

            // encerra a sessao
            sessionStorage.removeItem(USUARIO_LOGADO_KEY);

            alert('✅ Sua conta e todos os dados associados foram deletados com sucesso. Sentiremos sua falta!');
            
            // redireciona pra tela inicial
            window.location.href = 'index.html'; 
        });
    };
    
    // função de visualizar agendamentos
    const visualizarAgendamentos = (usuario) => {
        const listaHTML = document.getElementById('lista-agendamentos');
        const agendamentosSalvos = JSON.parse(localStorage.getItem(AGENDAMENTOS_STORAGE_KEY)) || [];
        
        // Filtra agendamentos pelo email
        const meusAgendamentos = agendamentosSalvos
            .filter(a => a.userEmail === usuario.email)
            .sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora)); 

        listaHTML.innerHTML = ''; //limpa o texto do html

        if (meusAgendamentos.length === 0) {
            listaHTML.innerHTML = '<li class="nenhum-agendamento">Você não tem agendamentos futuros.</li>';
            return;
        }

        let agendamentosExibidos = false;

        meusAgendamentos.forEach((agendamento) => {
            const dataHora = new Date(agendamento.dataHora);
            
            // Verifica se o agendamento é futuro
            if (dataHora > new Date()) {
                agendamentosExibidos = true;
                const dataFormatada = dataHora.toLocaleDateString('pt-BR');
                const horaFormatada = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                
                const listItem = document.createElement('li');
                listItem.classList.add('agendamento-item');
                
                listItem.innerHTML = `
                    <p><strong>Serviço:</strong> ${agendamento.servico}</p>
                    <p><strong>Hospital ID:</strong> ${agendamento.hospitalId}</p>
                    <p><strong>Data:</strong> ${dataFormatada} às ${horaFormatada}</p>
                    <button class="btn-cancelar-agendamento" 
                            data-email="${agendamento.userEmail}"
                            data-datahora="${agendamento.dataHora}">Cancelar</button>
                `;
                listaHTML.appendChild(listItem);
            }
        });

        // Se após filtrar, não houver futuros agendamentos
        if (!agendamentosExibidos) {
             listaHTML.innerHTML = '<li class="nenhum-agendamento">Você não tem agendamentos futuros.</li>';
        }
        
        // lógica de cancelamento
        listaHTML.querySelectorAll('.btn-cancelar-agendamento').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const email = event.target.getAttribute('data-email');
                const dataHoraString = event.target.getAttribute('data-datahora');
                
                if (confirm(`Tem certeza que deseja cancelar o agendamento do dia ${new Date(dataHoraString).toLocaleDateString('pt-BR')}?`)) {
                    
                    // Carrega a lista de agendamentos
                    let todosAgendamentos = JSON.parse(localStorage.getItem(AGENDAMENTOS_STORAGE_KEY)) || [];

                    // Encontra o índice do agendamento a ser cancelado
                    const indiceParaRemover = todosAgendamentos.findIndex(agendamento => 
                        agendamento.userEmail === email && 
                        agendamento.dataHora === dataHoraString
                    );

                    if (indiceParaRemover > -1) {
                        // Remove o agendamento
                        todosAgendamentos.splice(indiceParaRemover, 1);

                        // Salva a lista atualizada no localStorage
                        localStorage.setItem(AGENDAMENTOS_STORAGE_KEY, JSON.stringify(todosAgendamentos));
                        
                        alert('Agendamento cancelado com sucesso.');

                        // Atualiza a visualização na tela
                        visualizarAgendamentos(usuario);
                    } else {
                        alert('Erro: Agendamento não encontrado.');
                    }
                }
            });
        });
    };
    
    // inicializção da pagina
    const usuarioLogado = carregarPerfil();
    if (usuarioLogado) {
        configurarLogout();
        configurarDeletarConta(usuarioLogado); 
        visualizarAgendamentos(usuarioLogado);
    }
});