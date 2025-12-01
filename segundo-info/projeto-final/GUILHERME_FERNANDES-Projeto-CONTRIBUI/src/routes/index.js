const router = require("express").Router();

router.use("/", require("./pages.routes"));
router.use("/api/auth", require("./auth.routes"));
router.use("/api/usuario", require("./user.routes"));
router.use("/api/grupo", require("./group.routes"));
router.use("/api/conta", require("./count.routes"));
router.use("/api/lista", require("./list.routes"));

module.exports = router;
