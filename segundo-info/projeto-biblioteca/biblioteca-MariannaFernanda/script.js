document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btnEntrar");
    const boasVindas = document.getElementById("boasVindas");
    const btnVoltar = document.getElementById("btnVoltar");

   
    if (btnEntrar) {
        const apelidoInput = document.getElementById("apelido");

        const entrarBiblioteca = () => {
            const nome = apelidoInput.value.trim();
            if (nome) {
                if (nome.length < 2) {
                    alert("O apelido deve ter pelo menos 2 caracteres.");
                    return;
                }
                localStorage.setItem("apelido", nome);
                window.location.href = "biblioteca.html";
            } else {
                alert("Digite um apelido antes de continuar.");
                apelidoInput.focus();
            }
        };

        btnEntrar.addEventListener("click", entrarBiblioteca);
        apelidoInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                entrarBiblioteca();
            }
        });
        apelidoInput.focus();
    }

    
    if (boasVindas) {
        const nome = localStorage.getItem("apelido");

        if (!nome) {
            alert("Você precisa inserir um apelido primeiro!");
            window.location.href = "index.html";
            return;
        }

        boasVindas.textContent = `Bem-vindo, ${nome}, à Dark Book's...`;

        const cabecalho = document.querySelector("header")

        const livros = {
            1: {
                titulo: "Drácula - Dark Edition",
                autor: "Bram Stoker",
                desc: "A história do Conde Drácula, um vampiro imortal da Transilvânia, que viaja para a Inglaterra para espalhar sua maldição. Uma obra clássica que definiu o gênero de horror gótico e vampiros.",
                img: "fotos/livro1.png",
                audio: "audio/audio1.mp4",
            },
            2: {
                titulo: "Lady Killers: Assassinas em Série",
                autor: "Tori Telfer",
                desc: "Uma exploração detalhada e perturbadora das histórias de mulheres assassinas em série. O livro examina os perfis psicológicos, os motivos e os crimes de algumas das serial killers mais infames da história.",
                img: "fotos/livro2.png",
                audio: "audio/audio2.mp4",
            },
            3: {
                titulo: "Ed & Lorraine Warren - Demonologistas",
                autor: "Gerald Brittle",
                desc: "Baseado nos casos reais da vida de Ed e Lorraine Warren, o livro narra algumas de suas investigações paranormais mais famosas, incluindo a boneca Annabelle e o caso da família Perron, que inspirou 'Invocação do Mal'.",
                img: "fotos/livro3.png",
                audio: "audio/audio3.mp4",
            },
            4: {
                titulo: "Psicose - Limited Edition",
                autor: "Robert Bloch",
                desc: "A história de Norman Bates, um gerente de hotel com uma relação doentia com sua mãe, que o leva a cometer crimes terríveis. O livro é a base para o filme clássico de Alfred Hitchcock e é um marco no terror psicológico.",
                img: "fotos/livro4.png",
                audio: "audio/audio4.mp4",
            },
            5: {
                titulo: "A Garota da Casa ao Lado",
                autor: "Jack Ketchum",
                desc: "Um romance de horror baseado em eventos reais, que narra a história chocante de uma adolescente que é brutalmente torturada e abusada por sua cuidadora e os filhos dela. Uma leitura intensa sobre a crueldade humana.",
                img: "fotos/livro5.png",
                audio: "audio/audio5.mp4",
            },
            6: {
                titulo: "Frankenstein",
                autor: "Mary Shelley",
                desc: "A história de Victor Frankenstein, um cientista ambicioso que cria um ser humano artificial, mas o abandona por sua aparência grotesca. Uma reflexão sobre a ciência, a moralidade e a natureza do monstro.",
                img: "fotos/livro6.png",
                audio: "/audio6.mp4",
            },
            7: {
                titulo: "Medicina Macabra",
                autor: "Thomas Morris",
                desc: "Uma coleção de relatos históricos sobre as práticas médicas mais bizarras e assustadoras ao longo dos séculos. O livro explora a evolução da medicina, desde tratamentos sem base científica até cirurgias cruéis.",
                img: "fotos/livro7.png",
                audio: "/audio7.mp4",
            },
            8: {
                titulo: "O Silêncio dos Inocentes",
                autor: "Thomas Harris",
                desc: "A agente do FBI Clarice Starling busca a ajuda do psiquiatra canibal Hannibal Lecter para capturar um serial killer conhecido como 'Buffalo Bill'. Um thriller psicológico que se tornou um clássico do cinema e da literatura.",
                img: "fotos/livro8.png",
                 audio: "/audio8.mp4",
            },
            9: {
                titulo: "Fragmentos do Horror",
                autor: "Junji Ito",
                desc: "Uma coleção de oito contos de horror curtos, criados pelo mestre japonês do terror. Cada história explora medos universais através de desenhos detalhados e narrativas arrepiantes, características do estilo único de Ito.",
                img: "fotos/livro9.png",
            },
            10: {
                titulo: "O Chamado de Cthulhu - Miskatonic Edition",
                autor: "H.P. Lovecraft",
                desc: "Este livro apresenta contos que introduzem o universo do horror cósmico de Lovecraft, centrado na entidade cósmica Cthulhu e na Universidade Miskatonic. É uma obra fundamental para o gênero, explorando a insignificância da humanidade diante de forças inimagináveis.",
                img: "fotos/livro10.png",
            },
            11: {
                titulo: "It A - Coisa",
                autor: "Stephen king",
                desc: "Este livro é retratado durante as férias de 1958, sete amigos em Derry enfrentam um ser sobrenatural. Trinta anos depois, eles retornam para combater o terror novamente.",
                img: "fotos/livro11.png",
            },

             12: {
                titulo: "11/22/63",
                autor: "Stephen king",
                desc: "Em 22 de novembro de 1963, três tiros foram disparados em Dallas: o presidente John F. Kennedy foi assassinado, e sua morte, que nunca foi totalmente esclarecida, marcou para sempre a história dos Estados Unidos.",
                img: "fotos/livro12.png",
            },

            13: {
                titulo: "Christine",
                autor: "Stephen king",
                desc: "Arnie Cunnigham era só mais um adolescente cheio de espinhas, magrelo e desajeitado. Isso até Christine entrar em sua vida. Foi amor à primeira vista. Desde então, o mundo ganhou cores e passou a fazer sentido. Tudo o que ele queria era ficar perto de Christine. Mas não espere um novo Romeu e Julieta, afinal, estamos falando de Stephen King. Christine é um carro. Um Plymouth Fury de 1958. Uma força sobrenatural que se apodera de Arnie e o transforma, deixando um rastro de sangue por onde passa.",
                img: "fotos/livro13.png",
            },

            14: {
                titulo: "O Garoto do Colorado",
                autor: "Stephen king",
                desc: "O Garoto do Colorado é um mistério de Stephen King centrado na investigação de um corpo encontrado sem identificação em 1980, conhecido como o Garoto do Colorado. A história é contada através da perspectiva de três jornalistas — Dave, Vince e Stephanie — enquanto eles tentam desvendar o caso, explorando a natureza do próprio mistério e a busca humana por explicações, sem, no entanto, oferecer uma solução definitiva. ",
                img: "fotos/livro14.png",
            },

             15: {
                titulo: "Joyland",
                autor: "Stephen king",
                desc: "Em Joyland , Stephen King mistura mistério, suspense e drama para construir uma história poderosa sobre amar e perder, crescer e envelhecer ― e sobre aqueles que não tiveram a chance de experimentar nada disso, pois a morte lhes chegou cedo demais.",
                img: "fotos/livro15"
            },

             16: {
                titulo: "Dias Perfeitos",
                autor: "Raphael Montes",
                desc: "Sombrio e claustrofóbico, Dias perfeitos narra uma história de amor obsessivo e paranoico que consolida Raphael Montes como uma das mais gratas surpresas da literatura nacional..",
                img: "fotos/livro16"
            },

             17: {
                titulo: "Jantar Secreto",
                autor: "Raphael Montes",
                desc: "Um grupo de jovens deixa uma pequena cidade no Paraná para viver no Rio de Janeiro. Eles alugam um apartamento em Copacabana e fazem o possível para pagar a faculdade e manter vivos seus sonhos de sucesso na capital fluminense. Mas o dinheiro está curto e o aluguel está vencido. Para sair do buraco e manter o apartamento, os amigos adotam uma estratégia heterodoxa: arrecadar fundos por meio de jantares secretos, divulgados pela internet para uma clientela exclusiva da elite carioca.",
                img: "fotos/livro17"
            },

              18: {
                titulo: "Suícidas",
                autor: "Raphael Montes",
                desc: "Antes que o mundo pudesse sonhar com o terrível jogo da baleia azul, que leva jovens a tirar a própria vida, ou que a série de televisão Thirteen Reasons Why fosse lançada e se tornasse o sucesso que é hoje, Raphael Montes, então com 22 anos, já tratava do tema do suicídio entre jovens, com a ousadia que virou sua marca registrada.",
                img: "fotos/livro18"
            },

             19: {
                titulo: "Uma Família Feliz",
                autor: "Raphael Montes",
                desc: "Eva tem a vida perfeita. Seu marido é um jovem advogado em ascensão. Suas filhas gêmeas são lindas, inteligentes e saudáveis. Seu trabalho, a arte reborn, é um sucesso na internet. À sua volta, tudo está à mão: o Blue Paradise, condomínio fechado de classe média-alta na Barra da Tijuca, oferece todo tipo de serviço para que ela não precise sair do conforto de seu lar. Eva tem a vida perfeita ― até descobrir que está grávida e seu mundo virar de cabeça para baixo.",
                img: "fotos/livro19"
            },

              20: {
                titulo: "O Vilarejo",
                autor: "Raphael Montes",
                desc: "Em 1589, o padre e demonologista Peter Binsfeld fez a ligação de cada um dos pecados capitais a um demônio, supostamente responsável por invocar o mal nas pessoas. É a partir daí que Raphael Montes cria sete histórias situadas em um vilarejo isolado, apresentando a lenta degradação dos moradores do lugar, e pouco a pouco o próprio vilarejo vai sendo dizimado, maculado pela neve e pela fome.",
                img: "fotos/livro20"
            },


        };
        const modal = document.getElementById("modal");
        const fecharBtn = document.querySelector(".fechar");
        const titulo = document.getElementById("tituloLivro");
        const autor = document.getElementById("autorLivro");
        const desc = document.getElementById("descLivro");
        const audio = document.getElementById("audioLivro");
        const audioContainer = document.getElementById("audioContainer");
        const imgLivro = document.getElementById("imgLivro");

        if (!modal || !titulo || !autor || !desc) {
            console.warn("Estrutura do modal não encontrada. Confira o HTML de biblioteca.html.");
            return;
        }

        document.querySelectorAll(".livro").forEach((el) => {
            el.addEventListener("click", () => {
                const num = el.getAttribute("data-num");
                const dados = livros[num];
                if (!dados) return;

                titulo.textContent = dados.titulo || "";
                autor.textContent = dados.autor ? `Autor: ${dados.autor}` : "";
                desc.textContent = dados.desc || "";

                if (imgLivro) {
                    imgLivro.src = dados.img || el.querySelector("img")?.src || "";
                    imgLivro.alt = `Capa de ${dados.titulo || "Livro"}`;
                }

                if (dados.audio && audio && audioContainer) {
                    audio.src = dados.audio;
                    audioContainer.style.display = "block";
                    try {
                        audio.load();
                    } catch (e) {
                        console.warn("Erro ao carregar áudio:", e);
                    }
                } else if (audioContainer) {
                    audioContainer.style.display = "none";
                }

             
                if (cabecalho) {
                    cabecalho.style.display = "none"
                }

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            });

            el.addEventListener("mouseenter", () => {
                el.style.transform = "translateY(-10px) scale(1.02)";
            });

            el.addEventListener("mouseleave", () => {
                el.style.transform = "translateY(0) scale(1)";
            });
        });

       const fecharModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            if (cabecalho) {
                cabecalho.style.display = "block"
            }
        };
        if (fecharBtn) {
            fecharBtn.addEventListener("click", fecharModal);
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.style.display === "block") {
                fecharModal();
            }
        });

        if (btnVoltar) {
            btnVoltar.addEventListener("click", () => {
                if (confirm("Tem certeza que deseja sair da biblioteca?")) {
                    localStorage.removeItem("apelido");
                    window.location.href = "index.html";
                }
            });
        }
    }
});