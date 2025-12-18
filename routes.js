const express = require('express');
const session = require("express-session");
const router = express.Router();
const { adminAuth, usuarioAuth } = require("./middlewares/adminAuth");
const UsuarioController = require("./controller/usuarioController");
const CadastroLoteController = require("./controller/cadastroLoteController");
const HabilitaProducaoController = require("./controller/habilitaProducaoController");
const VisualizarLoteController = require("./controller/visualizarLoteController");

const usuarioController = new UsuarioController();
const cadastroLoteController = new CadastroLoteController();
const habilitaProducaoController = new HabilitaProducaoController();
const visualizarLoteController = new VisualizarLoteController();

router.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: (60000 * 60) 
  }
}))

/***************** ROTA LOGIN *****************/
router.get("/", (req, res) => { 
  res.render("users/login", { 
    privilegio1: 0,
    erro: " ",
    acionaWarmin: false
  });
});

/* POST */
router.post("/login", usuarioController.login); 
router.get("/logout", usuarioController.logout); 


/***************** CADASTRO DE LOTE *****************/

router.get("/cadastroLote", adminAuth, (req, res) => {
  res.render("cadastroLote/cadastroLote", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 

router.get("/cadastroLote/dadosLote", adminAuth, cadastroLoteController.dadosLote);
router.get("/cadastroLote/gerarTabela/:ID", adminAuth, cadastroLoteController.gerarTabela);
router.post("/cadastroLote/criarLote", adminAuth, cadastroLoteController.criarLote);


/***************** HABILITA PRODUCAO *****************/

router.get("/habProdLote", usuarioAuth, (req, res) => {
  res.render("habilitaProducao/habilitaProducao", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 


router.get("/habilitaProducao/gerarPop/:ID", usuarioAuth, habilitaProducaoController.verifyDados);
router.put("/habilitaProducao/habilitaProduto", usuarioAuth, habilitaProducaoController.habilitaProduto);


/***************** VISUALIZAÇÃO DE LOTE *****************/
router.get("/vizualizarLote", usuarioAuth, (req, res) => {
  res.render("visualizarLote/visualizarLote", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 

router.get("/visualizarLote/dadosLote", usuarioAuth, visualizarLoteController.dadosLoteVisualizar)

module.exports = router