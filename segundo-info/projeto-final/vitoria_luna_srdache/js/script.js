const dogs = [
  { nome: "Joca", cidade: "Barueri", porte: "Pequeno", pelagem: "Curta", img: "https://cobasi.vteximg.com.br/arquivos/ids/723981/vira-lata-filhote.png?v=637588609420370000", historia: "Joca foi resgatado debaixo de uma ponte e é um cãozinho muito grato. Adora colo e se aconchegar no sofá. Perfeito para apartamentos e pessoas que buscam um companheiro tranquilo. Se dá bem com gatos." },
  { nome: "Macha", cidade: "Carapicuíba", porte: "Médio", pelagem: "Média", img: "https://www.patasdacasa.com.br/sites/default/files/noticias/2020/08/vira-lata-tudo-o-que-voce-precisa-saber-sobre-os-caes-sem-raca-definida-srd.jpg", historia: "Mancha tem esse nome por causa de sua suas manchinhas na pele. Ele é muito brincalhão, mas ainda um pouco tímido com estranhos. Precisa de um lar paciente para ajudá-lo a se soltar. Excelente farejador e ama brinquedos de roer." },
  { nome: "Sol", cidade: "Osasco", porte: "Grande", pelagem: "Longa", img: "https://www.shutterstock.com/image-photo/friendly-mutt-dog-isolated-on-600nw-2563587763.jpg", historia: "Sol é uma cadela imponente, mas com coração de manteiga. Foi abandonada após a mudança de seu antigo tutor. É leal, protetora e precisa de escovação diária por causa da pelagem longa. Ideal para casas com quintal seguro." },
  { nome: "Pirulito", cidade: "Itapevi", porte: "Médio", pelagem: "Curta", img: "https://cdn0.peritoanimal.com.br/pt/razas/5/3/7/vira-lata-caramelo_735_0_orig.jpg", historia: "Pirulito é um filhote de 8 meses cheio de energia e curiosidade. Aprende truques rapidamente e precisa de um tutor ativo para gastar toda sua vitalidade. Não recomendado para idosos devido ao seu entusiasmo excessivo." },
  { nome: "Flor", cidade: "Jandira", porte: "Pequeno", pelagem: "Média", img: "https://uploads.metroimg.com/wp-content/uploads/2020/11/25144952/Vira-lata-nao-fica-doente-Descubra-mitos-e-verdades-sobre-os-caes.jpg", historia: "Flor é uma vira-lata SRD que foi encontrada na rua com uma pata machucada. Totalmente recuperada, ela é muito carinhosa e se adapta bem a rotinas. Uma ótima companheira para quem trabalha em home office." },
  { nome: "Gigante", cidade: "Santana de Parnaíba", porte: "Grande", pelagem: "Longa", img: "https://www.patasdacasa.com.br/sites/default/files/styles/article_detail_1200/public/2024-04/vira-latas-peludos-flip-aaano-capa.jpg.webp?itok=Sp9nkSRY", historia: "Apesar do nome, Gigante é dócil. É um cão mais velho que busca um lugar tranquilo para descansar. Perfeito para quem busca um pet de baixa energia e muito carinho. Suas caminhadas são curtas e lentas." },
  { nome: "Bolacha", cidade: "Barueri", porte: "Pequeno", pelagem: "Curta", img: "https://www.patasdacasa.com.br/sites/default/files/noticias/2022/03/filhote-de-vira-lata-da-gestacao-ao-adestramento-tudo-que-voce-precisa-saber-sobre-os-caezinhos-srd_1.jpg", historia: "Bolacha é um terrier misturado que não para quieto. É o rei das travessuras e precisa de muitos brinquedos interativos. Excelente para crianças mais velhas que entendem como brincar de forma segura." },
  { nome: "Serena", cidade: "Osasco", porte: "Médio", pelagem: "Média", img: "https://portaledicase.com/wp-content/uploads/2023/03/vira-lata-caramelo-1.jpg", historia: "Serena é uma cadela madura e calma. Ela observa o movimento e só late se necessário. Busca um lar sem outros pets, onde possa ser o centro das atenções e receber muito afeto." },
  { nome: "Cacau", cidade: "Carapicuíba", porte: "Grande", pelagem: "Curta", img: "https://cdn0.peritoanimal.com.br/pt/posts/8/5/5/quantos_anos_vive_um_cachorro_vira_lata_21558_orig.jpg", historia: "Cacau é um jovem de 2 anos, atlético e muito esperto. Precisa de espaço para correr e exercícios diários. Ideal para quem pratica jogging ou trilhas e quer um parceiro para acompanhá-lo." },
  { nome: "Pingo", cidade: "Jandira", porte: "Pequeno", pelagem: "Longa", img: "https://blog-static.petlove.com.br/wp-content/uploads/2024/04/29030254/cachorro-vira-lata-Petlove.jpg", historia: "Pingo é um shih-tzu misturado, pequeno e com uma pelagem linda que exige atenção. É mimado e adora ser penteado. Viveu a vida todo em apartamento e se adaptou muito bem a esse ambiente." },
  { nome: "Urso", cidade: "Itapevi", porte: "Grande", pelagem: "Média", img: "https://super.abril.com.br/wp-content/uploads/2018/04/com-quantas-rac3a7as-se-faz-um-vira-lata.png?crop=1&resize=1212,909", historia: "Urso é um cão de guarda, mas muito leal à sua família. Já tem treinamento básico de obediência. Requer um tutor firme e experiente que entenda suas necessidades de proteção e território." },
  { nome: "Lady", cidade: "Santana de Parnaíba", porte: "Pequeno", pelagem: "Curta", img: "https://www.patasdacasa.com.br/sites/default/files/noticias/2021/06/cachorro-vira-lata-filhote-quais-os-cuidados-mais-importantes-durante-essa-fase.jpg", historia: "Lady é uma vira-lata SRD de personalidade forte. Gosta de ter seu espaço, mas é a primeira a vir pedir carinho na hora da soneca. Não tem problemas em passar um tempo sozinha, sendo independente." },
];
dogs.push(
  { nome: "Fubá", cidade: "Barueri", porte: "Médio", pelagem: "Curta", img: "https://blog-static.petlove.com.br/wp-content/uploads/2021/04/cachorro-de-pelo-curto-beagle-petlove.jpg", historia: "Fubá é brincalhão e cheio de energia. Ama correr e pegar bolinhas. Foi encontrado em um parque e logo conquistou todos com seu jeito alegre. Se dá bem com outros cães." },
  { nome: "Nina", cidade: "Carapicuíba", porte: "Pequeno", pelagem: "Longa", img: "https://img.freepik.com/fotos-premium/filhote-de-cachorro-vira-lata-esperando-por-novo-lar_119439-706.jpg", historia: "Nina é delicada e adora carinho. Foi resgatada com seus filhotes e hoje está pronta para um novo lar. Ideal para famílias tranquilas e que gostam de pets afetuosos." },
  { nome: "Ventura", cidade: "Osasco", porte: "Grande", pelagem: "Média", img: "https://tudosobrecachorros.com.br/wp-content/uploads/6-1-400x300.jpg", historia: "Ventura é um grandão bonzinho. Mesmo com seu tamanho, é super dócil e gosta de crianças. Adora brincar com água e tomar banho de mangueira." },
  { nome: "Canela", cidade: "Itapevi", porte: "Médio", pelagem: "Curta", img: "https://portalvet.royalcanin.com.br/media/wp-content/uploads/2023/05/pinscher-1.jpg", historia: "Canela tem o pelo dourado e um olhar encantador. É uma cachorra calma, gosta de passeios leves e se adapta bem a ambientes tranquilos." },
  { nome: "Nino", cidade: "Jandira", porte: "Pequeno", pelagem: "Média", img: "https://cdn6.campograndenews.com.br/uploads/noticias/2020/03/10/1japbe9awu8mm.jpg", historia: "Nino é esperto e curioso. Ama brincar com garrafas pet e cordas. Foi resgatado filhote e já está vacinado e saudável, esperando uma nova família." },
  { nome: "Lola", cidade: "Santana de Parnaíba", porte: "Médio", pelagem: "Longa", img: "https://blog.liderdamatilha.com.br/wp-content/uploads/2024/05/peludo_8.jpeg", historia: "Lola tem uma pelagem linda e um olhar meigo. É companheira e leal, ótima para quem quer um cão para caminhadas e tardes tranquilas em casa." },
  { nome: "Toddy", cidade: "Barueri", porte: "Grande", pelagem: "Curta", img: "https://adotar.com.br/painel/upload/2024-04/animais_imagem1108310.jpg", historia: "Toddy é forte e protetor, mas super carinhoso com quem confia. Foi resgatado de um terreno baldio e se tornou um verdadeiro companheiro de vida." },
  { nome: "Lua", cidade: "Carapicuíba", porte: "Pequeno", pelagem: "Curta", img: "https://adimax.com.br/wp-content/uploads/2024/08/cachorro-de-pelo-curto-confira-dicas-e-cuidados.jpg", historia: "Lua é uma filhotinha de 5 meses cheia de energia. Adora correr atrás da bola e receber atenção. Ideal para quem quer um pet ativo e divertido." },
  { nome: "Bruce", cidade: "Osasco", porte: "Grande", pelagem: "Longa", img: "https://cobasiblog.blob.core.windows.net/production-ofc/2020/09/cachorro-peludo-capa.png", historia: "Bruce parece um urso de pelúcia! É tranquilo e adora cochilar no sol. Apesar do tamanho, é super dócil e se dá bem com outros cães." },
  { nome: "Maggie", cidade: "Itapevi", porte: "Médio", pelagem: "Média", img: "https://prefeitura.sp.gov.br/documents/d/saude/brigadeiro-jpg", historia: "Maggie é muito carinhosa e sempre abanando o rabo. Ama passear e convive bem com crianças. Está castrada e pronta para adoção." },
  { nome: "Chico", cidade: "Jandira", porte: "Grande", pelagem: "Curta", img: "https://www.petz.com.br/blog/wp-content/uploads/2022/03/vira-lata-filhote.jpg", historia: "Chico é brincalhão e cheio de energia. Gosta de correr, pular e brincar na água. Ideal para casas com quintal e tutores ativos." },
  { nome: "Mel", cidade: "Santana de Parnaíba", porte: "Pequeno", pelagem: "Média", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsO59n-s9ZSB03hedd8Sv1IM7U1TFUcm2pwg&s", historia: "Mel é uma cadelinha amorosa e companheira. Gosta de deitar pertinho do tutor e acompanhar tudo o que acontece. É discreta e muito dócil." }
);




// Seletores do DOM
const secaodogs = document.getElementById('mostrardogs');
const btnFiltrar = document.getElementById('btnFiltrar');
const selectCidade = document.getElementById('cidades');
const selectPorte = document.getElementById('porte');
const selectPelagem = document.getElementById('pelagem');

// Seletores do Modal
const modal = document.getElementById('modal');
const fecharModal = document.querySelector('.fecharmodal');
const imgModal = document.getElementById('imgmodal'); 
const nomeModal = document.getElementById('nomemodal'); 
const infoModal = document.getElementById('infomodal'); 
const historiaModal = document.getElementById('historiamodal') 

// NOVO: Seletor do card de adição
const adicionarPetCard = document.getElementById('adicionarPetCard');


// Função para criar e exibir os cards de cães
function mostrarCards(lista) {
  // O card "Adicionar Pet" agora está no HTML, então só limpamos os cards dos cães.
  // Procuramos o card de adição, removemos ele temporariamente para limpar o resto,
  // e o inserimos de volta no final.
  
  const adicionarCardHTML = adicionarPetCard.outerHTML; // Salva o HTML do card
  secaodogs.innerHTML = ''; // Limpa tudo
  
  if (lista.length === 0) {
      const mensagem = document.createElement('h2');
      mensagem.textContent = 'Nenhum cão encontrado com esses filtros.';
      mensagem.style.color = '#2F2519';
      mensagem.style.marginTop = '20px';
      secaodogs.appendChild(mensagem);
      // Re-adiciona o card de adição mesmo sem cães
      secaodogs.insertAdjacentHTML('beforeend', adicionarCardHTML); 
      // Re-ativa o listener no elemento recém-adicionado
      document.getElementById('adicionarPetCard').addEventListener('click', mostrarAlertaEquipe);
      return;
  }
  
  lista.forEach(dog => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${dog.img}" alt="${dog.nome}">
      <h3>${dog.nome}</h3>
      <p>${dog.cidade} • ${dog.porte} • ${dog.pelagem}</p>
    `;
    card.addEventListener('click', () => abrirModal(dog));
    secaodogs.appendChild(card);
  });
  
  // Re-adiciona o card de adição no final da galeria
  secaodogs.insertAdjacentHTML('beforeend', adicionarCardHTML);
  // Re-ativa o listener no elemento recém-adicionado
  document.getElementById('adicionarPetCard').addEventListener('click', mostrarAlertaEquipe);
}

// Lógica de filtragem
function filtrarDogs(){
  const cidade = selectCidade.value;
  const porte = selectPorte.value;
  const pelagem = selectPelagem.value;
  
  // Filtra o array dogs baseado nos valores selecionados (se o valor for "", o filtro é ignorado)
  const filtrados = dogs.filter(dog =>
    (cidade === "" || dog.cidade === cidade) &&
    (porte === "" || dog.porte === porte) &&
    (pelagem === "" || dog.pelagem === pelagem)
  );
  
  mostrarCards(filtrados);
}

// Função para abrir o modal
function abrirModal(dog){
  imgModal.src = dog.img;
  imgModal.alt = dog.nome;
  nomeModal.textContent = dog.nome;
  infoModal.textContent = `${dog.cidade} • ${dog.porte} • ${dog.pelagem}`;
  historiaModal.textContent = dog.historia;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}

// NOVO: Função para o alert
function mostrarAlertaEquipe() {
    const session = getSession();
    if (session && session.isAdmin) {
        alert("Funcionalidade de Admin: Abrindo formulário de cadastro de novo cão...");
        // Em um projeto real, redirecionaria para a página de cadastro do Admin
    } else {
        alert("Ops! Para publicar um novo cão, você precisa fazer parte da equipe SRDache.");
    }
}


// Listeners de eventos
btnFiltrar.addEventListener('click', filtrarDogs);
fecharModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
});

// Fecha o modal 
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
});


const adotar = document.getElementById('queroadotar');
adotar.addEventListener('click', (e) => {
    // Acessa o formulário somente se o usuário estiver logado
    enforceLogin(e, 'login.html'); 
    if (getSession()) {
        window.location.href = 'forms.html';
    }
});
if (adicionarPetCard) {
    adicionarPetCard.addEventListener('click', () => {
        // Força o login (se não estiver logado) ou o login de Admin (se for usuário comum)
        const session = getSession();
        if (!session) {
            enforceLogin(null, 'login-admin.html');
        } else if (session.isAdmin) {
            mostrarAlertaEquipe(); // Permite a ação do admin
        } else {
            // Se for usuário comum, força o login de admin com um alerta
            alert("Apenas administradores podem adicionar novos pets.");
            enforceLogin(null, 'login-admin.html');
        }
    });
}


// Inicialização: Exibe todos os cães ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Certifique-se de que o session.js está carregado antes do script.js no HTML
    mostrarCards(dogs); 
});
