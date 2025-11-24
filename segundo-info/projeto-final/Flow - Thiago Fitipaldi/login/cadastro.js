const STORAGE_KEY = "Flow_usuario";
const USERS = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const SAVE = u => localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
const setCurrent = email => localStorage.setItem("Flow_usuarioatual", email);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro") || document.getElementById("login");
  if (!form) return;

  if (form.id === "cadastro") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (form.querySelector('input[name="name"]') || {}).value.trim() || "";
      const email = ((form.querySelector('input[name="email"]') || {}).value || "").trim().toLowerCase();
      const senha = (form.querySelector('input[name="senha"]') || {}).value || "";
      const senha_con = (form.querySelector('input[name="senha_con"]') || {}).value || "";
      const terms = !!(form.querySelector('input[name="terms"]') || {}).checked;

        if (!name || !email || !senha || !senha_con) {return alert("Preencha todos os campos.");
      }

        if (senha !== senha_con) {return alert("Senhas não coincidem.");
      }

        if (!terms) {return alert("Concorde com os termos.");
      }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {return alert("E‑mail inválido.");
      }

        const users = USERS();
            if (users.some(u => u.email === email)) {return alert("E‑mail já cadastrado.");
        }

      users.push({ name, email, senha, createdAt: new Date().toISOString() });
      SAVE(users);
      setCurrent(email);

      window.location.href = "/login/login.html";
    });
    return;
  }

  if (form.id === "login") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = ((form.querySelector('input[name="email"]') || {}).value || "").trim().toLowerCase();
      const senha = (form.querySelector('input[name="senha"]') || {}).value || "";

        if (!email || !senha) return alert("Preencha e‑mail e senha.");

      const users = USERS();
        const user = users.find(u => u.email === email);
            if (!user) return alert("Usuário não encontrado.");

            if (senha !== user.senha) return alert("Senha incorreta.");

      setCurrent(email);
      window.location.href = "../dashboard/dashboard.html";
    });
  }
});