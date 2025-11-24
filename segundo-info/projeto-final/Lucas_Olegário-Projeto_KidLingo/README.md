# KidLingo - Plataforma de Aprendizado de Idiomas Infantil

## Visão Geral do Projeto

**KidLingo** é uma **plataforma de aprendizado de idiomas gratuita e interativa** projetada especificamente para o público infantil, simulando um ambiente de ensino completo. O projeto aborda a falta de ferramentas educativas de qualidade e acessíveis para crianças, focando na **acessibilidade, ludicidade e monitoramento**.

### Objetivos

1. Tornar o aprendizado de idiomas mais **acessível, divertido e supervisionado** para crianças.
2. Despertar a curiosidade e promover a **autonomia** das crianças através de uma interface vibrante, mascotes e **gamificação**.
3. Permitir que **pais e professores** acompanhem o progresso do aprendizado da criança.
4. Demonstrar a simulação de um sistema de aprendizado online real usando exclusivamente o **desenvolvimento client-side** (HTML, CSS e JavaScript).

### Funcionalidades Principais

**Lições Interativas:** Acesso a lições com **imagens, áudios e quizzes**.
**Gamificação:** Sistema de **pontuações e recompensas simbólicas** com base no desempenho.
**Seleção de Idiomas:** A criança pode escolher o idioma que deseja aprender.
**Painel de Acompanhamento (Supervisores):** Visualização de **progresso, tempo de estudo total e conquistas** para pais e professores.

## Tecnologias Utilizadas

Este projeto é uma simulação de um sistema de aprendizado online e foi construído com o objetivo de representar o comportamento de um sistema real utilizando apenas o lado do cliente. Os arquivos de código indicam o uso das seguintes tecnologias:

**HTML, CSS e JavaScript:** Utilizados para implementar toda a simulação sem a necessidade de backend ou banco de dados[cite: 17].
**Node.js/Express:** Utilizado nos arquivos `server.js` e `db.js` para simular um ambiente de servidor e persistência.
**SQL:** Utilizado no script `KidLingo-BD.sql` para simular a estrutura de um banco de dados relacional.

## Estrutura de Arquivos

| Arquivo | Descrição |

| `index.html` | Página inicial/login da plataforma. |

| `selecao.html` | Tela onde a criança seleciona o idioma a ser aprendido. |

| `licoes.html` | Página principal de visualização e execução das lições e quizzes. |

| `perfil.html` | Tela de perfil do usuário/criança. |

| `painel-acompanhamento.html` | **Painel para pais e professores** visualizarem o progresso e conquistas. |

| `script.js` | Lógica principal do lado do cliente, controle de estado, quizzes e gamificação. |

| `server.js` | Simulação de servidor usando Node.js/Express. |

| `db.js` | Módulo usado por `server.js` para simular a lógica de banco de dados e persistência. |

| `KidLingo-BD.sql` | Script SQL que define a estrutura de tabelas da simulação de banco de dados. |
