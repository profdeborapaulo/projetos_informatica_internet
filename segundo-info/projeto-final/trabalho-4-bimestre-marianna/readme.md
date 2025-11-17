Tournament Organizer


Um sistema digital e centralizado para transformar a organização, gestão e acompanhamento de jogos e campeonatos escolares, promovendo transparência, agilidade e justiça nas competições.



Descrição do Problema


Atualmente, a gestão de competições esportivas escolares é marcada pela falta de padronização e pela desorganização. Cada árbitro, escola ou região utiliza métodos próprios, como planilhas e documentos físicos, o que gera sérios desafios:

Conflitos de Agendamento: Horários de jogos que se sobrepõem ou geram atrasos.

Inconsistência de Dados: Registro de resultados e placares de forma dispersa e inconsistente.

Comunicação Fragmentada: Dificuldade em manter árbitros, professores e organizadores alinhados em tempo real.

Falta de Histórico: Ausência de um arquivo digital confiável para análises estatísticas, valorização de atletas e acompanhamento de desempenho a longo prazo.

Essa abordagem manual sobrecarrega os organizadores e compromete a credibilidade e a eficiência dos eventos.



 Solução Proposta


O Tournament Organizer é uma plataforma tecnológica desenhada para resolver a desorganização e a falta de padronização nos jogos escolares. Ele centraliza todas as etapas da gestão de torneios em um único sistema, oferecendo duas modalidades de tabela: Eliminação Simples e Pontuação.

Funcionalidades Chave:

Cadastro e Gestão de Equipes: Interface intuitiva para registro de equipes ou atletas.

Chaveamento Automatizado: Gera chaves de eliminação simples, com suporte a BYE (folgas), ideal para torneios.

Registro de Resultados em Tempo Real: Permite a atualização dos placares de forma dinâmica.

Tabelas de Pontuação: Calcula rankings e aplica critérios de desempate automaticamente para competições por pontos como exemplo o xadrez.

Geração de PDF: Permite baixar as tabelas e o ranking gerado em formato PDF usei o html2pdf.js.

Simulação de Login/Registro: Possui uma interface de login/registro puramente frontend para fins demonstrativos.



Tecnologias Envolvidas


Este é um projeto de frontend puro:

Frontend Principal: HTML5, CSS e JavaScript.

Estilização: CSS Customizado (várias folhas de estilo, incluindo style.css e login.css).

Persistência de Dados (Simulada): O projeto utiliza localStorage no JavaScript (script.js e login.js) para salvar temporariamente o cadastro de times/atletas e o histórico das partidas no navegador do usuário.

Biblioteca Externa: html2pdf.js para exportar o conteúdo das tabelas para PDF.

Ícones: Boxicons (boxicons@2.1.4).