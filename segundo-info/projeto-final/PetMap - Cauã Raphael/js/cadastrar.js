import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const hotelForm = document.getElementById("hotel-form");

// Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Você precisa estar logado para cadastrar um hotel.");
        window.location.href = "login.html";
    }
});

// Preview de imagens selecionadas
const fileInput = document.getElementById("additional-upload");
const previewGrid = document.createElement("div");
previewGrid.classList.add("preview-grid");
fileInput.parentNode.appendChild(previewGrid);

fileInput.addEventListener("change", (e) => {
    previewGrid.innerHTML = ""; // Limpa previews antigos
    const files = e.target.files;

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const div = document.createElement("div");
            div.classList.add("preview-item");
            const img = document.createElement("img");
            img.src = event.target.result; // URL local da imagem
            div.appendChild(img);
            previewGrid.appendChild(div);
        };
        reader.readAsDataURL(file);
    }
});

// Função para converter endereço em coordenadas via Nominatim
async function geocodeEndereco(endereco) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        } else {
            throw new Error("Endereço não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao converter endereço:", error);
        return null;
    }
}

// Envio do formulário
hotelForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    const endereco = document.getElementById("endereco").value;

    // Converte endereço em coordenadas
    const coords = await geocodeEndereco(endereco);
    if (!coords) {
        alert("Não foi possível encontrar as coordenadas para o endereço informado.");
        return;
    }

    const hotelData = {
        nome: document.getElementById("nome").value,
        endereco: endereco,
        pets: document.getElementById("pets").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        coords: coords,  // Adiciona latitude e longitude
        createdAt: new Date()
        // Imagens podem ser adicionadas depois
    };

    try {
        await setDoc(doc(db, "hoteis", user.uid), hotelData);
        alert("Hotel cadastrado com sucesso!");
        window.location.href = "hotel.html";
    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar hotel: " + error.message);
    }
});
