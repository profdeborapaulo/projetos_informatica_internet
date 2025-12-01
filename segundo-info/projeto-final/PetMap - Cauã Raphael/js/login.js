import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

// Seleciona os forms
const registerForm = document.getElementById("tab-register");
const loginForm = document.getElementById("tab-login");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = registerForm.querySelector('input[placeholder="Seu nome"]').value;
    const email = registerForm.querySelector('input[placeholder="seuemail@exemplo.com"]').value;
    const password = registerForm.querySelector('input[placeholder="Crie uma senha"]').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            createdAt: new Date()
        });

        alert("Conta criada com sucesso, " + name + "!");
        registerForm.reset();

        // Redireciona automaticamente para hotel.html
        window.location.href = "hotel.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao criar conta: " + error.message);
    }
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[placeholder="seuemail@exemplo.com"]').value;
    const password = loginForm.querySelector('input[placeholder="••••••••"]').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const name = userDoc.exists() ? userDoc.data().name : "";

        alert("Bem-vindo, " + (name || "usuário") + "!");

        loginForm.reset();

        // Redireciona automaticamente
        window.location.href = "hotel.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao logar: " + error.message);
    }
});

// Se o usuário já estiver logado, redireciona diretamente para hotel.html
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Busca nome do usuário (opcional)
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const name = userDoc.exists() ? userDoc.data().name : "";
        console.log("Usuário já logado:", name || user.email);

        // Redireciona para hotel.html
        window.location.href = "hotel.html";
    }
});

