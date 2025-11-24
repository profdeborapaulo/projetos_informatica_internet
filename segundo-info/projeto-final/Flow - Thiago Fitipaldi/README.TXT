Flow - Projeto (README)

Descrição
---------
A Flow é uma empresa especializada em finanças pessoais, focada em oferecer soluções personalizadas e inovadoras. Nosso objetivo é ajudar pessoas com problemas financeiros a organizar suas finanças, fornecendo o suporte necessário para uma vida financeira saudável.


Estrutura do workspace
----------------------
- dashboard/
  - dashboard.html     -> página principal do dashboard (UI)
  - dashboard.css      -> estilos da página
  - dashboard.js       -> lógica de transações (add, render, saveState/loadState)
  - dashboard-graf.js  -> cria gráfico de pizza (Chart.js via CDN)
  - inshgt.js          -> script simples que atualiza o parágrafo `#insights` com mensagens
- index/
  - index.html         -> página inicial (pode conter link para o dashboard)
  - style.css
- login/
  - login.html         -> página de login (front-end apenas)
  - cadastro.html      -> página de cadastro (front-end apenas)
  - cadastro.js        -> script de cadastro/login (front-end)
  - style.css
- img/
  - fundo.avif         -> imagem de background/asset

Como executar
--------------
Opção 1 — abrir direto (rápido):
- Abra [dashboard/dashboard.html](cci:7://file:///c:/Users/Microsoft/Desktop/Flow/dashboard/dashboard.html:0:0-0:0) no navegador (arrastar o arquivo funciona). Atenção: o gráfico usa Chart.js via CDN e requer internet.

Opção 2 — servidor local (recomendado):
1) Abra PowerShell na pasta `c:\Users\Microsoft\Desktop\Flow`
2) Rode um servidor simples (ex.: Python 3):

   python -m http.server 8000

3) Acesse: http://localhost:8000/dashboard/dashboard.html

O que cada parte faz / comportamento esperado
-------------------------------------------
- `dashboard.js`: armazena transações em localStorage sob a chave `flow-transacoes` e atualiza DOM (`#saldo`, `#transacoes`, `#receita-historico`).

- `dashboard-graf.js`: lê a mesma chave do storage e constrói um gráfico de pizza com Chart.js.

  - Atenção: Chart.js é carregado via CDN (https://cdn.jsdelivr.net/...), sem internet o gráfico não aparecerá.

- `inshgt.js`: lê `flow-transacoes` e aplica regras simples (IFs) para escrever uma mensagem curta no parágrafo `#insights`.

- `index/` e `login/`: páginas estáticas de entrada/cadastro; não há backend — tudo é front-end.

Estrutura de dados esperada
--------------------------
Transações armazenadas em `localStorage` como array de objetos. Exemplo de item:

  {
    id: 1670000000000,
    amount: -45.5,          // número: negativo = despesa, positivo = receita
    category: 'Comida',
    description: 'Almoço',
    date: '2025-11-09T12:34:56.789Z'
  }

Verificações rápidas / depuração
--------------------------------
- Console do navegador (F12) mostrará erros de carregamento do Chart.js se sem internet.
- Se o gráfico não atualizar automaticamente, veja se `flow-transacoes` está sendo atualizado no DevTools → Application → Local Storage.


Teste rápido
------------
1) Abra [dashboard/dashboard.html](cci:7://file:///c:/Users/Microsoft/Desktop/Flow/dashboard/dashboard.html:0:0-0:0).
2) Adicione uma receita e uma despesa.
3) Verifique:
   - `#saldo` atualiza
   - `#transacoes` lista as entradas
   - `#insights` mostra mensagem correspondente (ex.: alerta se despesas > entradas)
   - Gráfico aparece se Chart.js carregou