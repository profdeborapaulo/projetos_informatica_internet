document.addEventListener("DOMContentLoaded", () => {
    const livros = {
        ipanema: {
            info: {
                nota: "4,6",
                autor: "Manu Barbosa",
                data: "15 de julho de 2024",
                pag: 433,
                categoria: "Romance aquileano"
            }
        },
        amor: {
            info: {
                nota: "4,8",
                autor: "Elayne Baeta",
                data: "5 de novembro de 2019",
                pag: 392,
                categoria: "Romance Sáfico"
            }
        },
        milhao: {
            info: {
                nota: "4,8",
                autor: "Vitor Martins",
                data: "16 de julho de 2018",
                pag: 352,
                categoria: "Romance aquileano"
            }
        },
        lichia: {
            info: {
                nota: "4,5",
                autor: "Emery Lee",
                data: "4 de setembro de 2023",
                pag: 320,
                categoria: "Romance aquileano"
            }
        },
        enquanto: {
            info: {
                nota: "4,7",
                autor: "Pedro Rhuas",
                data: "5 de julho de 2021",
                pag: 272,
                categoria: "Romance aquileano"
            }
        },
        feras: {
            info: {
                nota: "4,8",
                autor: "Luisa Landre",
                data: "16 de maio de 2025",
                pag: 342,
                categoria: "Romance Sáfico"
            }
        },
        vidas: {
            info: {
                nota: "4,9",
                autor: "Robert Curran, Janet e Jack Smurl, Ed e Lorraine Warren",
                data: "30 de novembro 2020",
                pag: 420,
                categoria: "Terror"
            }
        },
        demologistas: {
            info: {
                nota: "4,8",
                autor: "Gerald Brittle",
                data: "6 de outubro de 2016",
                pag: 272,
                categoria: "Terror"
            }
        },
        luz: {
            info: {
                nota: "4,9",
                autor: "Gerald Brittle",
                data: "4 de abril de 2023",
                pag: 240,
                categoria: "Terror"
            }
        },
        lugar: {
            info: {
                nota: "4,9",
                autor: "Gerald Brittle",
                data: "14 de setembro de 2017",
                pag: 272,
                categoria: "Terror"
            }
        },
        ohayo: {
            info: {
                nota: "4,7",
                autor: "Joshua Frydman",
                data: "1 de março de 2024",
                pag: 310,
                categoria: "História"
            }
        },
        egito: {
            info: {
                nota: "4,6",
                autor: "Camelot Editora",
                data: "23 de novembro 2023",
                pag: 144,
                categoria: "História"
            }
        },
        amores: {
            info: {
                nota: "5",
                autor: " Das Squarisi, Linda Goulart ",
                data: "25 de setembro de 2017",
                pag: 64,
                categoria: "Juvenil"
            }
        },
        sherlock: {
            info: {
                nota: "4,8",
                autor: "Arthur Conan Doyle",
                data: "28 de março de 2019",
                pag: 176,
                categoria: "Mistério"
            }
        },
        metamorfose: {
            info: {
                nota: "4,7",
                autor: "Franz Kafka",
                data: "27 de setembro de 2019",
                pag: 96,
                categoria: "Clássico"
            }
        },
        retrato: {
            info: {
                nota: "4,7",
                autor: "Oscar Wilde",
                data: "12 de abril de 2012",
                pag: 264,
                categoria: "Ficção Gótica"
            }
        },
        robo: {
            info: {
                nota: "4,7",
                autor: " Isaac Asimov",
                data: "24 de novembro de 2014",
                pag: 320,
                categoria: "Ficção Científica "
            }
        },
        dracula: {
            info: {
                nota: "4,7",
                autor: "Bram Stoker",
                data: "27 abril 2020",
                pag: 368,
                categoria: "Ficção Gótica"
            }
        }
    };

    // Variável para controlar se o livro está mostrado
    let mostrando = false;

    // Função para mostrar/esconder informações do livro
    function mostrarLivro(idLivro) {
        const livro = livros[idLivro];
        const div = document.getElementById("saida");

        if (!mostrando) {
            div.innerHTML = `
                <h3>Informações extras:</h3>
                <div class="info">
                    <strong>Nota:</strong> ${livro.info.nota} <br>
                    <strong>Autor:</strong> ${livro.info.autor} <br>
                    <strong>Data de Publicação:</strong> ${livro.info.data} <br>
                    <strong>Quantidade de páginas:</strong> ${livro.info.pag} páginas <br>
                    <strong>Categoria:</strong> ${livro.info.categoria} <br>
                </div>`;
            mostrando = true;
        } else {
            div.innerHTML = "";
            mostrando = false;
        }
    }

    // Adiciona os event listeners para todos os botões "Saiba mais"
    document.querySelectorAll("[id^='btn-saiba-']").forEach(btn => {
        const idLivro = btn.id.replace("btn-saiba-", "");
        btn.addEventListener("click", () => mostrarLivro(idLivro));
    });

    // Player de áudio
    const audioContainer = document.getElementById('audio-player-container');
    const btnAudio = document.getElementById('btn-audio');
    const audio = document.getElementById('audio-sinopse');
    const playBtn = document.getElementById('play-pause');
    const progress = document.getElementById('progress');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    btnAudio.addEventListener('click', () => {
        audioContainer.style.display = 'flex';
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playBtn.textContent = '▶️';
        }
    });

    audio.addEventListener('loadedmetadata', () => durationEl.textContent = formatTime(audio.duration));
    audio.addEventListener('timeupdate', () => {
        progress.style.width = (audio.currentTime / audio.duration * 100) + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    progressContainer.addEventListener('click', (e) => {
        audio.currentTime = (e.offsetX / progressContainer.clientWidth) * audio.duration;
    });

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playBtn.textContent = '▶️';
        }
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
});
