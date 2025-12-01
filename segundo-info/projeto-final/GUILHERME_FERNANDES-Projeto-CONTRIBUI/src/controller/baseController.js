exports.index = (req, res) => {
    res.render("pages/index");
};

exports.loginPage = (req, res) => {
    res.render("pages/login");
};

exports.registrarPage = (req, res) => {
    res.render("pages/cadastro");
};

exports.dashboardPage = (req, res) => {
    res.render("pages/dashboard");
};

exports.perfilPage = (req, res) => {
    res.render("pages/perfil");
};
