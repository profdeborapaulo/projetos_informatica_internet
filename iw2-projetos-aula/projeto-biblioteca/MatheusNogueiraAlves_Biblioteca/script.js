// Array de objetos, cada um representando um livro com suas informações
const livros = [{
    Nome: "Assassinato no expresso do oriente",
    isnb: "9788535920009",
    img: "img/assassinato-no-expresso-do-oriente.jpg",
    autor: "Agatha Christie",
    editora: "L&PM",
    ano: 1934,
    quantidadeDePaginas: "200",
    genero: "Policial",
    sinopse: "Publicado em 1934, o livro traz o famoso detetive Hercule Poirot viajando no luxuoso trem Expresso do Oriente. Durante a viagem, um passageiro chamado Ratchett é assassinado em sua cabine. Com o trem parado pela neve, Poirot investiga todos os ocupantes, descobrindo segredos e contradições. Aos poucos, percebe que cada passageiro tem ligação com um antigo crime envolvendo a vítima. No fim, revela que todos, em conjunto, participaram do assassinato, formando um dos desfechos mais célebres da literatura policial.",
    capa: "capa1.jpg",
    link: "https://www.amazon.com.br/Assassinato-no-Expresso-do-Oriente/dp/8595086788",
    audio:"aud/assassinato-no-expresso-do-oriente.wav"
}, {
    Nome: "A hora da estrela",
    isnb: "9788535920016",
    img: "img/hora-da-estrela.png",
    autor: "Clarice Lispector",
    editora: "Rocco",
    ano: 1977,
    quantidadeDePaginas: "120",
    genero: "Romance",
    sinopse: "Publicado em 1977, A Hora da Estrela conta a história de Macabéa, uma jovem nordestina pobre e ingênua que vai morar no Rio de Janeiro. Ela trabalha como datilógrafa, vive de forma simples e quase invisível, sonhando apenas em ser notada. O narrador, Rodrigo S.M., conduz a trama refletindo sobre a própria escrita e o destino da personagem. Macabéa vive uma vida de solidão, até que conhece Olímpico, que a abandona para ficar com sua colega. No fim, ao consultar uma cartomante que lhe prevê felicidade, Macabéa é atropelada e morre, simbolizando a tragédia de sua existência anônima.",
    capa: "capa2.jpg",
    link: "https://www.amazon.com.br/hora-estrela-Edição-comemorativa/dp/6555320354/ref=sr_1_1?crid=3T46D6T9FFVVJ&dib=eyJ2IjoiMSJ9._qCPEHJDkbLHNH54Gd3nZMfZIoU1Phr9keLRRpLvFbjgvx5_X1maN6chMfXObaUxzmEd1996WNkRy9haoQzIsa6n-HaE8_EabZ4Ju66Nuk9VLhZeRV38lpnCJWjpTDFypMVaZCC1NyABkVehIHEbPKbHS24w02HdyxCLl0Hr4G2w12jZPqR_Y_duM5C9LwQPxiQJ8T3WE0dA6RB4oRs3szoWJVz_jzugr0pycOySuYw.kO53as9EEBA93lNi5pndyRxYn7IzrSmFef4hagXsFIQ&dib_tag=se&keywords=a+hora+da+estrela&qid=1756837785&s=books&sprefix=A+hora+da+%2Cstripbooks%2C307&sr=1-1",
    audio:"aud/hora-da-estrela.wav"
}, {
    Nome: "Dom Casmurro",
    isnb: "9788535920023",
    img: "img/dom-casmurro.jpg",
    autor: "Machado de Assis",
    editora: "Companhia das Letras",
    ano: 1899,
    quantidadeDePaginas: "300",
    genero: "Romance",
    sinopse: "Publicado em 1899, Dom Casmurro é narrado por Bentinho, que relembra sua vida desde a juventude até a velhice. Criado para ser padre, ele acaba se casando com sua amiga de infância, Capitu. Com o tempo, Bentinho passa a desconfiar da fidelidade da esposa e acredita que ela o traiu com seu melhor amigo, Escobar. Essas suspeitas levam ao fim do casamento e ao afastamento do filho, Ezequiel. A obra é marcada pela dúvida, já que nunca fica claro se Capitu realmente traiu ou se tudo é fruto do ciúme do narrador.",
    capa: "capa3.jpg",
    link: "https://www.amazon.com.br/Dom-Casmurro-Coleção-Biblioteca-Luso-Brasileira/dp/8567097096/ref=sr_1_1?crid=1DXO6JVG9NRW0&dib=eyJ2IjoiMSJ9.UwcGllXjYFSAeFZbFhnwSTmUVW8U1biKWUZoTQ-lT_IQbr4ZK4vI8bu9Ot23yhoI5F7zBH9BvPTCFZGj86gNmmclHYopw9oOZOzG9FBPnEG8-Or52QTYpwMDh3o3OVtQwuAT890ye3bP1cKPvz-2giumHJyFcc-F48HH6msakdSiTJBM2PbdzS4je2ik6-5Z_jQ1fo8ppg7L-41JBCqFjJncfR0zzv6iWqNUqThM2vDo5aGymcd5KgoS5VPibcujW0jThSpRvfiFkIR2xi89YcaMePTvVA3bQu5wYEkgSmw.TsMdQqrceyhcJFGXzB2TSUzkgYopv61jXPA76yW3DTk&dib_tag=se&keywords=dom+casmurro+via+leitura&qid=1756837901&sprefix=Dom+Casmurro+via+%2Caps%2C339&sr=8-1",
    audio:"aud/dom-casmurro.wav"
}, {
    Nome: "A divina comédia",
    img: "img/divina-comedia.jpg",
    isnb: "9788535920030",
    autor: "Dante Alighieri",
    editora: "Companhia das Letras",
    ano: 1320,
    quantidadeDePaginas: "500",
    genero: "Poesia",
    sinopse: "A Divina Comédia, escrita no século XIV, narra a viagem do poeta Dante pelos três reinos do além: Inferno, Purgatório e Paraíso. Guiado pelo poeta Virgílio, ele atravessa o Inferno e o Purgatório, presenciando os castigos e as purificações das almas. Depois, sob a orientação de Beatriz, símbolo do amor e da fé, Dante chega ao Paraíso. A obra é uma alegoria da busca pela salvação e pelo sentido da vida. Considerada uma das maiores obras da literatura universal, mistura filosofia, religião e poesia.",
    capa: "capa4.jpg",
    link: "https://www.amazon.com.br/Divina-Comédia-Dante-Alighieri/dp/857326120X/ref=sr_1_2?__mk_pt_BR=ÅMÅŽÕÑ&crid=2W049W6VR9RFD&dib=eyJ2IjoiMSJ9.h9Rb5dw2KXFdYlcl90IISnY-W2n3SzdusYMSIEwa14joE_pQz9ILi8ttJFa7MKgJApKQyu1T-gNOTmjJAt8IQN_WUz_7jEQGFaLnKeeqqwKDLB5UKXBozuJqQw8dqWowoTPpK1Qv5__y08dVa4L3-t-u-0WqVZGYYTn9N2JkFARikzZBHSj5_ZCtCAHlkgpfjVXbhMuGpTDKzLJ4bgPxin2o-7jW8fOBLcHiiWEWCn_rGvrwo4evwqx1R24L4EKBvQ9NdpWtWUpX70-r11XDXTgCgAWuLRhvV1aROQrINtk.qPEcl8DIsMH4JRGr4EiONZaWDJfu7EHssMetSn0kv4A&dib_tag=se&keywords=A+divina+comédia&qid=1756837935&sprefix=a+divina+comédia%2Caps%2C360&sr=8-2&ufe=app_do%3Aamzn1.fos.6121c6c4-c969-43ae-92f7-cc248fc6181d",
    audio:"aud/divina-comedia.wav"
}, {
    Nome: "O idiota",
    isnb: "9788535920047",
    img: "img/idiota.jpg",
    autor: "Fiódor Dostoiévski",
    editora: "Companhia das Letras",
    ano: 1869,
    quantidadeDePaginas: "400",
    genero: "Romance",
    sinopse: "Publicado em 1869, O Idiota narra a história do príncipe Liev Míchkin, um homem bondoso e ingênuo que retorna à Rússia após tratamento de saúde na Suíça. Sua pureza contrasta com a sociedade russa do século XIX, marcada por ambição, egoísmo e corrupção. Ele se envolve em um triângulo amoroso com a instável Nastássia Filíppovna e a doce Aglaia. A incapacidade de Míchkin de lidar com intrigas e paixões leva a desfechos trágicos. A obra explora os limites da bondade em um mundo hostil e cheio de contradições humanas.",
    capa: "capa5.jpg",
    link: "https://www.amazon.com.br/Idiota-Fiódor-Dostoiévski/dp/8544001882/ref=sr_1_4?__mk_pt_BR=ÅMÅŽÕÑ&crid=DPVY12QII1US&dib=eyJ2IjoiMSJ9.end5Kz4kIaVq9Yqa0wAs3b1_2-FNGJTyjlbyCn929wqgGozCCj_mCOlfBw9pDgcK9EYO_JdmHcl9h3HEiCdRsF57D3p7SXpxv6P8zWG74GDmTqOQOUH69Ua1U12PYtCxWbASQd9AuZtfDBqw_yrKmuU9_z8EdhV7Rh4hxMWTl8kviE27Pmo1CzGvZXhyLfL57d-NmDqyLMtzYTT7xmcr1pVgIozTXirKCHw7TvbII7Ywetr1VptTD4ULP5euLurRSB6jd8T5Egh8AFji_w5-uDIutYMnJAd6YAaqva4wz04.k7p8qOBFJ3CYpb2wvQ39NVFypyPruwSbjBsv3FpBSEk&dib_tag=se&keywords=O+idiota&qid=1756837979&sprefix=o+idiota%2Caps%2C257&sr=8-4&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9",
    audio:"aud/idiota.wav"
}, {
    Nome: "O cortiço",
    isnb: "9788535920054",
    img: "img/cortico.jpg",
    autor: "Aluísio Azevedo",
    editora: "Companhia das Letras",
    ano: 1890,
    quantidadeDePaginas: "250",
    genero: "Romance",
    sinopse: "Publicado em 1890, O Cortiço, de Aluísio Azevedo, retrata a vida em um cortiço do Rio de Janeiro, espaço coletivo marcado por miséria, exploração e contrastes sociais. O ambicioso João Romão enriquece às custas do trabalho da escrava fugida Bertoleza e dos moradores do local. Entre eles, destaca-se Rita Baiana, cuja paixão envolve Jerônimo, imigrante português transformado pelo ambiente. A obra mostra como o meio influencia as pessoas, revelando violência, desejos e desigualdades. No fim, João Romão alcança a ascensão social, mas às custas da tragédia de Bertoleza, denunciando as injustiças do Brasil do século XIX.",
    capa: "capa6.jpg",
    link: "https://www.amazon.com.br/cortiço-Aluísio-Azevedo/dp/8578886437/ref=sr_1_2?__mk_pt_BR=ÅMÅŽÕÑ&crid=2BAT4Z2SF3S86&dib=eyJ2IjoiMSJ9.FOVALoq7iFDbuzSvEwFwjB_Hxk2QWS-5flYdaumzlJFz4_815k8xC2Lbd9cL1saMEVzQijK693yo0qDX-lUCTPrlpH2IEeJkdcnfWEdhGQstKElQBq4dosIzcajJc6D8ZTrMpXGi-YSGoXlOAIGcX3tdSZ48Cne1orzpDW58XLNsVMWtgNN99dEGEDwrh3ZwAi7pCjBpSihXeRxhckzLSFgV47q5FFURepWTMdV_83vFlfXje_uLShGuqOlZsSBSp1iE2SOYDd5zCYtH19rzmWXx82u_UblmZ5zKgsGcp8I.dFLz_DrWzQaQUSTCgkCyB-6kDIx3v82nmHCa7eTuHr8&dib_tag=se&keywords=O+cortiço&qid=1756838011&sprefix=o+cortiço%2Caps%2C271&sr=8-2&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9",
    audio:"aud/cortico.wav"
}];

// Evento para mostrar ou ocultar a seção de livros populares ao clicar no botão
document.getElementById('loadBooksBtn').addEventListener('click', function() {
    const populares = document.querySelector('.destaques-populares-oculto');
    if (populares) {
        // Alterna entre mostrar e ocultar a seção
        populares.style.display = populares.style.display === 'none' ? 'block' : 'none';
    }
});

// Função para renderizar livros dinamicamente (não utilizada no HTML atual, mas pode ser útil)
function renderizarLivros() {
    const container = document.querySelector('.Destaques.populares');
    if (!container) return;
    container.innerHTML = '';
    livros.forEach((livro, idx) => {
        const div = document.createElement('div');
        div.className = 'livro';
        div.innerHTML = `
            <img src="\${livro.img}" alt="\${livro.Nome}" style="width:100px;height:150px;cursor:pointer;">
            <p>\${livro.Nome}</p>
        `;
        div.addEventListener('click', () => mostrarPopupLivro(idx));
        container.appendChild(div);
    });
}

// Função para mostrar o pop-up com informações detalhadas do livro
function mostrarPopupLivro(idx) {
    const livro = livros[idx];
    let popup = document.getElementById('popupLivro');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popupLivro';
        document.body.appendChild(popup);
    }
    popup.innerHTML = `
        <div class="popup-content">
            <button class="popup-close" id="fecharPopup">&times;</button>
            <h2>${livro.Nome}</h2>
            <div class="popup-flex">
                <img src="${livro.img}" alt="${livro.Nome}">
                <table>
                    <tr>
                        <td>Autor:</td>
                        <td>${livro.autor}</td>
                    </tr>
                    <tr>
                        <td>Editora:</td>
                        <td>${livro.editora}</td>
                    </tr>
                    <tr>
                        <td>Ano:</td>
                        <td>${livro.ano}</td>
                    </tr>
                    <tr>
                        <td>Páginas:</td>
                        <td>${livro.quantidadeDePaginas}</td>
                    </tr>
                    <tr>
                        <td>Gênero:</td>
                        <td>${livro.genero}</td>
                    </tr>
                    <tr>
                        <td>ISBN:</td>
                        <td>${livro.isnb}</td>
                    </tr>
                    <tr>
                        <td>Link de compra:</td>
                        <td><a href="${livro.link}" target="_blank">Compre aqui</a></td>
                    </tr>
                </table>
            </div>
            <div class="popup-sinopse">
                <strong>Sinopse:</strong> ${livro.sinopse}
            </div>
            <div class="popup-audio">
                <audio controls>
                    <source src="${livro.audio}" type="audio/wav">
                    Seu navegador não suporta o elemento de áudio.
                </audio>
            </div>
        </div>
    `;
    popup.querySelector('#fecharPopup').onclick = () => popup.remove();
}