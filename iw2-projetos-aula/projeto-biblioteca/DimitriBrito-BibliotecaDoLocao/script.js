document.addEventListener("DOMContentLoaded", () => {
    const livros = document.querySelectorAll(".book");

    livros.forEach((livro, index) => {
        livro.addEventListener("click", () => {
            window.location.href = `livros.html?id=${index}`;
        });
    });
});