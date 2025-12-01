
        const open = document.getElementById("openModal");
        const modal = document.getElementById("modal");
        const close = document.getElementById("closeModal");
        const overlay = document.getElementById("overlay");

        open.onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            overlay.style.display = "block";
        };

        close.onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'none';
            overlay.style.display = "none";
        };

        overlay.onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'none';
            overlay.style.display = "none";
        };
