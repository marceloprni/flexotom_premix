const express = require('express');
const session = require("express-session");
const router = express.Router();
const { adminAuth, usuarioAuth } = require("./middlewares/adminAuth");
const UsuarioController = require("./controller/usuarioController");
const CadastroLoteController = require("./controller/cadastroLoteController");
const CadastroLoteMaterialController = require("./controller/cadastroLoteMateriaController");
const HabilitaProducaoController = require("./controller/habilitaProducaoController");
const VincularLoteController = require("./controller/vincularLoteController");
const VisualizarLoteController = require("./controller/visualizarLoteController");

const usuarioController = new UsuarioController();
const cadastroLoteController = new CadastroLoteController();
const habilitaProducaoController = new HabilitaProducaoController();
const visualizarLoteController = new VisualizarLoteController();
const vincularLoteController = new VincularLoteController();
const cadastroLoteMateriaController = new CadastroLoteMaterialController()

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


/***************** HOME *****************/

router.get("/home", usuarioAuth, (req, res) => {
  res.render("pageSelection/pageSelection", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 


/***************** CADASTRO DE LOTE *****************/

router.get("/cadastroLote", usuarioAuth, (req, res) => {
  res.render("cadastroLote/cadastroLote", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 

router.get("/cadastroLote/dadosLote", usuarioAuth, cadastroLoteController.dadosLote);
router.get("/cadastroLote/gerarTabela/:ID", usuarioAuth, cadastroLoteController.gerarTabela);
router.post("/cadastroLote/criarLote", usuarioAuth, cadastroLoteController.criarLote);


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
router.get("/vizualizarLote", adminAuth, (req, res) => {
  res.render("visualizarLote/visualizarLote", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 

router.get("/visualizarLote/dadosTimer/:dataInicio/:dataFim", adminAuth, visualizarLoteController.dadosTimer);
router.get("/visualizarLote/materiaPrima/:materiaPrima", adminAuth, visualizarLoteController.dadosMateriaPrima);
router.get("/visualizarLote/Lote/:lote", adminAuth, visualizarLoteController.dadosLote);
//router.get("/visualizarLote/dadosLote", adminAuth, visualizarLoteController.dadosLoteVisualizar)

/***************** CADASTRO LOTE MATERIA *****************/

router.get("/cadastroLoteMateria", usuarioAuth, (req, res) => {
  res.render("cadastroLote/cadastroLoteMateria", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 

router.get("/cadastroLoteMateria/dadosLote", usuarioAuth, cadastroLoteMateriaController.dadosLote);
router.post("/cadastroLoteMateria/criarLote", usuarioAuth, cadastroLoteMateriaController.criarLote);
router.delete("/cadastroLoteMateria/:deleteLote", usuarioAuth, cadastroLoteMateriaController.deletaLoteUnico);

/***************** VINCULAÇÃO DE LOTE *****************/

router.get("/vincularLote", usuarioAuth, (req, res) => {
  res.render("vinculacaoLote/vinculacaoLote", {
      privilegio1: req.session.user.privilegio,
      erro: " ",
      acionaWarmin: false
  });
}); 

router.get("/vincularLote/dadosLote", usuarioAuth, vincularLoteController.dadosLoteVinculo);
router.get("/vincularLote/:barcode", usuarioAuth, vincularLoteController.barcodeVinculo);
router.post("/vincularLote/:vincularLote", usuarioAuth, vincularLoteController.criarVinculoLote);
router.delete("/vincularLote/:vincularDeleteLote", usuarioAuth, vincularLoteController.deletarLoteVinculo);


module.exports = router