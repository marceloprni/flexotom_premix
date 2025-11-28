import  { padraoTable }  from '../../datatableJson/dataTableJs.js';
import { preencherSelect, formatText }  from './optionSelect.js';
import { imprimirModal } from './imprimiModal.js';
const DatatbleJson = JSON.stringify(padraoTable);

// BTN
var selectMateria = document.getElementById('materiaPrima');
var btnCriarLote = document.getElementById('btnCriarLote');
var btnImprimir = document.getElementById('btn_imprimir');
var btnModalImprimir = document.getElementById('btn_imprimir_barcode');
var btnDeleta = document.getElementById('btn_deletar');
var btnModalDeletar = document.getElementById('btnDeletar')

// VARIAVEIS
//var valueInputMateriaprima = document.getElementById('materiaPrimaSelecionada');
//let optionsCarregadas = false;  Variável para controlar o carregamento das opções
var Lote = []
var LoteTotal = []
var InsumoTotal = []
var valorSelecionadoId 
var valorSelecionado


var inputLote = document.getElementById('materiaPrimaLote');

// TABELA
var tableCadastroLote;


/* FUNÇÕES DE INICIOS PARA CARREGAR DADOS */
function createComponent() {
    
    axios.get("/cadastroLote/dadosLote").then(response => {
        //APAGA DADOS DO ARRAY
        Lote = []
        LoteTotal = []
        console.log(response)
       
        for(let a of response.data.insumoAtivo) {
            InsumoTotal.push({id: a.id, text: a.Descricao})
        }

        // SELECT DADOS REALIZADO 
        $(selectMateria).select2({
          data: InsumoTotal,
          placeholder: "Selecione a materia prima",
          allowClear: true
        });
        // APAGADO OS DADOS SELECIONADO
        $(selectMateria).val(null).trigger('change');
    

    }).catch(error => {
        console.log(error);
    });
};

/* OBJETO SELECIONADO DENTRO DO SELECT*/
$(selectMateria).on("select2:select", function(e) {
    valorSelecionadoId = e.params.data.id
    valorSelecionado = e.params.data.text
});



/* CADASTRO O LOTE NO BANCO DE DADOS */
btnCriarLote.onclick  = function (event) {
    event.preventDefault();
   
    if (inputLote.value === '' || valorSelecionadoId === '' || valorSelecionado === '') {
        alert("Selecione uma matéria-prima ou digite o Lote.");
        return;
    }

    axios.post("/cadastroLote/criarLote", {
        Lote: inputLote.value,
        materiaPrimaId: valorSelecionadoId,
        materiaPrimaDescricao: valorSelecionado
    }).then(response => {
                jQuery('#messageDivChildren').css({"background":"#E5192E", "border": "2px solid #fff", "color": "#fff"});
                jQuery('#message').modal('show');
                jQuery('#messageText').text(response.data.message);
                setTimeout(() => {
                    window.location.reload(); 
                },800);
    }).catch(error => {
            console.error(error);
            const messagem = JSON.parse(error.request.responseText);
            jQuery('#adicionar-modal').modal('hide');
            jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
            jQuery('#message').modal('show');
            jQuery('#messageText').text(messagem.erro);
    });
};

/* CHAMA MODAL PARA MOSTRAR O BARCODE  */
btnImprimir.onclick = function (event) {
    event.preventDefault();
    let selectedRow = tableCadastroLote.row('.tableSelected');
    let id = selectedRow.data()[0];
    let valueDoArray = LoteTotal.filter(item => item[0] === id);
    let barCoode = valueDoArray[0][3];

    jQuery('#barCodeDiv').css({
        "width": "520px",
        "background":"#FFFFFF;", 
        "color": "#2f2d2d",
        "font-size": "15px",
    });
    jQuery('#barCodeModal').modal('show');
    jQuery('#mensagemBarcode').text('APROVADO');
    JsBarcode("#idBarcode", barCoode);
};

btnModalImprimir.onclick = () => {
    imprimirModal('barCodeModal')
};



/* INICIA A PAGINA */
createComponent();