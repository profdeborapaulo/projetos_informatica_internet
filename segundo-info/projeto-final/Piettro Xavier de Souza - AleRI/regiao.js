/* Function para adicionar imagem à página HTML */
const input = document.getElementById("imagemregiao");
const imagem = document.querySelector("img");

input.addEventListener("change", () => {
  const arquivo = input.files[0];
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = e => {
      imagem.src = e.target.result;
      imagem.style.display = "block";
    };
    leitor.readAsDataURL(arquivo);
  }
});


/* Function para habilitar container que receberá nome da região */
function nome() {
  const nome = document.getElementById("adicionar");

  nome.innerHTML = `
  <div id="menu" class="container">

      <form onsubmit="cor(); return false;">
      <div class="textInputWrapper">
      <input placeholder="Insira o Nome da Divisão" type="text" class="textInput" id="nomeregiao" required>
      </div>
      <br>
      <button type="submit" class="btn">Próximo</button>
      <form>

  </div>
  `;
}

let nomedivisao = ""; /* Variável que irá armazenar o nome da região */

/* Função que irá habilitar container para que seja escolhida a cor da região */
function cor() {
  nomedivisao = document.getElementById("nomeregiao").value;
  const cor = document.getElementById("adicionar");

  cor.innerHTML = `
  <div id="menu" class="container">

      <h1>Escolha a Cor da Divisão</h1>

      
      <div class="radio-input">
      <label>
      <input value="value-1" name="value-radio" id="value-1" type="radio" checked="">
     <span id="laranja" ondblclick="novobotao(this.id)">Laranja</span>
     </label>
     <label>
    <input value="value-2" name="value-radio" id="value-2" type="radio">
     <span id="roxo" ondblclick="novobotao(this.id)">Roxo</span>
      </label>
     <label>
    <input value="value-3" name="value-radio" id="value-3" type="radio">
     <span id="azul" ondblclick="novobotao(this.id)">Azul</span>
      </label>
    <label>
    <input value="value-3" name="value-radio" id="value-3" type="radio">
     <span id="verde" ondblclick="novobotao(this.id)">Verde</span>
     </label>
     <span class="selection"></span>
      </div>

  </div>
  `;
}

/* Função que irá criar um botão para a região com as funções de estado unidas a nome e cor selecionados */
function novobotao(id) {
  const cor = id;
  const uniqueId = `${cor}-${Date.now()}`;
  const regioes = document.getElementById("regioes");

  const container = document.createElement("div");
  container.id = uniqueId;
  container.className = `container ${cor}`;
  container.innerHTML = `
  
<div class="card">
  <div class="first-content">
    <span>
    <h1 class="nomeregiao"><a>${nomedivisao}</a></h1>
    <h1><a>ESTADO: NORMAL</a></h1>
    </span>
  </div>
  <div class="second-content">
<span class="grid">
<h3 onclick="seca('${uniqueId}')"><a>Seca</a></h3>
<h3 onclick="normal('${uniqueId}')"><a>Normal</a></h3>
<h3 onclick="cheia('${uniqueId}')"><a>Cheia</a></h3>
</span>
  </div>
  <div class="second-content">
  <span class="grid">
<h3 onclick="excluir('${uniqueId}')" class="excluir"><a>Excluir Divisão</a></h3>
</span>
  </div>
</div>
  `;


  regioes.appendChild(container);

  const menu = document.getElementById("adicionar");
  menu.innerHTML = `
    <div id="adicionar">
   <div class="adicionar" onclick="nome()">
        <h1><a class="add">+ Adicionar Nova Divisão</a></h1>
    </div>
    </div>
  `;
}

/* Função usada para excluir região */
function excluir(id) {

  const excluir = document.getElementById(id);
  excluir.remove();
}


/* Função para exibir notificação quando há mudança de estado das regiões */
function notificar(titulo, mensagem, regiao = "") {
  /* Mensagem final */
  const body = `${mensagem} ${regiao}`.trim();

  /* Se o navegador não suporta, usa alert */
  if (!("Notification" in window)) return alert(body);

  /* Pede permissão se ainda não tiver */
  if (Notification.permission !== "granted") Notification.requestPermission();

  /* Cria a notificação */
  if (Notification.permission === "granted") new Notification(titulo, { body });
  else alert(body);
}

/* Função que definirá estado de região para seca */
function seca(id) {
  const container = document.getElementById(id);
  container.className = "container seca";

  // Nome da região
  const nomeRegiao = container.querySelector(".first-content span h1.nomeregiao a")?.textContent;

  // Estado
  const estadoRegiao = container.querySelector(".first-content span h1:nth-of-type(2) a");
  if (estadoRegiao) estadoRegiao.textContent = "ESTADO: SECA";

  alert("Alerta de Seca na Região: " + nomeRegiao);
  notificar("Alerta de Seca", "Região:", nomeRegiao);
}

/* Função que definirá estado de região para normal */
function normal(id) {
  const container = document.getElementById(id);
  const corOriginal = String(id).split("-")[0] || "";
  container.className = corOriginal ? `container ${corOriginal}` : "container";

  const nomeRegiao = container.querySelector(".first-content span h1.nomeregiao a")?.textContent;

  const estadoRegiao = container.querySelector(".first-content span h1:nth-of-type(2) a");
  if (estadoRegiao) estadoRegiao.textContent = "ESTADO: NORMAL";

  alert("Região " + nomeRegiao + " Fora de Alerta!");
  notificar("Fora de Alerta", "Região:", nomeRegiao);
}

/* Função que definirá estado de região para cheia */
function cheia(id) {
  const container = document.getElementById(id);
  container.className = "container cheia";

  const nomeRegiao = container.querySelector(".first-content span h1.nomeregiao a")?.textContent;

  const estadoRegiao = container.querySelector(".first-content span h1:nth-of-type(2) a");
  if (estadoRegiao) estadoRegiao.textContent = "ESTADO: CHEIA";

  alert("Alerta de Cheia na Região: " + nomeRegiao);
  notificar("Alerta de Cheia", "Região:", nomeRegiao);
}

/* Função para finalizar edição da região */
function finalizar() {
  /* Exlui elementos de edição */
  document.querySelectorAll('.excluir').forEach(e => e.remove());  
    document.querySelectorAll('.btn').forEach(e => e.remove());
    document.querySelector('.margem').remove();
    document.querySelector('.adicionar').remove();

    /* Gera ID para região */
  const id = Date.now() % 10000;
  const pagina = document.getElementById("paginaCompleta");

  /* cria elementos para visualização mais confortável */
  const br1 = document.createElement("br");
  const link = document.createElement("a");
  const br2 = document.createElement("br");

  link.textContent = "ID: " + id;
  link.href = "#";
  link.style.cursor = "pointer";

  /* Função para copiar ID exibido na página com click */
  const onclickCode = "(function(id){"
    + "var copyFallback=function(text){var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');alert('ID copiado: '+text);}catch(e){alert('Copie manualmente: '+text);}document.body.removeChild(ta);};"
    + "if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(String(id)).then(function(){alert('ID copiado: '+id);}).catch(function(){copyFallback(String(id));});}else{copyFallback(String(id));}"
    + "})(" + JSON.stringify(String(id)) + "); return false;";

  link.setAttribute("onclick", onclickCode);

  /* armazena data-id */
  link.setAttribute("data-id", String(id));

  /* insere elementos no topo para visualização mais confortável */
  pagina.prepend(br2);
  pagina.prepend(link);
  pagina.prepend(br1);

  /* salva depois de inserir link */
  const conteudoFinal = pagina.innerHTML;
  localStorage.setItem(id, conteudoFinal);

  /* Confirma que região foi criada e exibe seu ID */
  alert("Região Criada com Sucesso! Seu ID é: " + id);
}