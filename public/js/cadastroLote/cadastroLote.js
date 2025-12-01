import  { padraoTable }  from '../../datatableJson/dataTableJs.js';
import { preencherSelect, formatText }  from './optionSelect.js';
import { imprimirModal } from './imprimiModal.js';
const DatatbleJson = JSON.stringify(padraoTable);

// BTN
var selectMateria = document.getElementById('materiaPrima');
var btnCriarLote = document.getElementById('btnCriarLote');
var btnImprimir = document.getElementById('btn_imprimir');
var btnModalImprimir = document.getElementById('btn_imprimir_barcode');
var btnCriarTabela = document.getElementById('btn_gerarTabela');

var btnModalDeletar = document.getElementById('btnDeletar')

// VARIAVEIS
//var valueInputMateriaprima = document.getElementById('materiaPrimaSelecionada');
//let optionsCarregadas = false;  Variável para controlar o carregamento das opções
var Lote = []
var LoteTotal = []
var OrdemProducao = []
var valorSelecionadoId 
var valorSelecionado

// TABELA
var tableCadastroLote;


/* FUNÇÕES DE INICIOS PARA CARREGAR DADOS */
function createTable() {
    
    axios.get("/cadastroLote/dadosLote").then(response => {
        //APAGA DADOS DO ARRAY
        Lote = []
        LoteTotal = []
        OrdemProducao = []

        console.log(response)
       
        for(let a of response.data.OrdemProducao) {
            OrdemProducao.push({id: a.id, text: a.Descricao})
            LoteTotal.push([a.id, a.Codigo, a.Descricao, a.Linha, a.Receita, a.QuantidadePrevista, a.TamanhoBatch]);
        }

        // SELECT DADOS REALIZADO 
        $(selectMateria).select2({
          data: OrdemProducao,
          placeholder: "Selecione a materia prima",
          allowClear: true
        });
        // APAGADO OS DADOS SELECIONADO
        $(selectMateria).val(null).trigger('change');       

        console.log(LoteTotal)

        tableCadastroLote = jQuery('#tabela-CadastroLote').DataTable(
            {
                pagingType: 'numbers',
                pageLength : 5,
                bLengthChange: false,
                lengthChange: false, 
                bFilter: true,
                data: [[1, 20, 30]], //Lote,
                columns: [{title: "ID BARCODE"}, {title: "BATELADA"}, {title: "SEQUENCIA"}],
                ordering: false,
                 language: {
                    info: " " 
                }
            });
        
        
        jQuery('#tabela-CadastroLote tbody').on('click', 'tr', function () 
        {
            var tr = jQuery(this).closest('tr');
            var row = tableCadastroLote.row(tr);
            /*Check if row is empty*/
            if (typeof row.data() === 'undefined'){return null;}
            /*Selected row*/
            if (jQuery(this).hasClass('tableSelected')){
                jQuery(this).removeClass('tableSelected');
            }
            else {
                tableCadastroLote.$('tr.tableSelected').removeClass('tableSelected');
                jQuery(this).addClass('tableSelected');
            }   
        });

    }).catch(error => {
        console.log(error);
    });
};

/* OBJETO SELECIONADO DENTRO DO SELECT*/
$(selectMateria).on("select2:select", function(e) {
    valorSelecionadoId = e.params.data.id
    valorSelecionado = e.params.data.text
});

btnCriarTabela.onclick = function (event) {
    event.preventDefault();

    axios.get("/cadastroLote/gerarTabela").then(response => {
    

        tableCadastroLote = jQuery('#tabela-CadastroLote').DataTable(
            {
                pagingType: 'numbers',
                pageLength : 5,
                bLengthChange: false,
                lengthChange: false, 
                bFilter: true,
                data: [[1, 20, 30]], //Lote,
                columns: [{title: "ID BARCODE"}, {title: "BATELADA"}, {title: "SEQUENCIA"}],
                ordering: false,
                 language: {
                    info: " " 
                }
            });
        
        
        jQuery('#tabela-CadastroLote tbody').on('click', 'tr', function () 
        {
            var tr = jQuery(this).closest('tr');
            var row = tableCadastroLote.row(tr);
            /*Check if row is empty*/
            if (typeof row.data() === 'undefined'){return null;}
            /*Selected row*/
            if (jQuery(this).hasClass('tableSelected')){
                jQuery(this).removeClass('tableSelected');
            }
            else {
                tableCadastroLote.$('tr.tableSelected').removeClass('tableSelected');
                jQuery(this).addClass('tableSelected');
            }   
        });

    }).catch(error => {
        console.log(error);
    });
}


/* CADASTRO O LOTE NO BANCO DE DADOS */
btnCriarLote.onclick  = function (event) {
    event.preventDefault();
    console.log('id valido')
    console.log(valorSelecionadoId)
    console.log(valorSelecionado)

    if (
           valorSelecionadoId === '' 
        || valorSelecionado === '' 
        || valorSelecionadoId === undefined 
        || valorSelecionado === undefined) {
        alert("Selecione uma matéria-prima.");
        return;
    }


    const arrayLoteTotal = LoteTotal.filter(item => {
       return item[0] == valorSelecionadoId;
    });

    console.log(arrayLoteTotal)
   
    //axios.post("/cadastroLote/criarLote", {
    //    id: arrayLoteTotal[0][0],
    //    Codigo: arrayLoteTotal[0][1],
    //    Descricao: arrayLoteTotal[0][2],
    //    Linha: arrayLoteTotal[0][3],
    //    Receita: arrayLoteTotal[0][4],
    //      QuantidadePrevista: arrayLoteTotal[0][5],  
    //    TamanhoBatch: arrayLoteTotal[0][6]
    //}).then(response => {
    //            jQuery('#messageDivChildren').css({"background":"#E5192E", "border": "2px solid #fff", "color": "#fff"});
    //            jQuery('#message').modal('show');
    //            jQuery('#messageText').text(response.data.message);
    //            setTimeout(() => {
                   //window.location.reload(); 
    //                jQuery('#adicionar-modal').modal('hide');
    //            },800);
    //}).catch(error => {
    //        console.error(error);
    //        const messagem = JSON.parse(error.request.responseText);
    //        jQuery('#adicionar-modal').modal('hide');
    //        jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
    //        jQuery('#message').modal('show');
    //        jQuery('#messageText').text(messagem.erro);
    //});
};

/* CHAMA MODAL PARA MOSTRAR O BARCODE */
btnImprimir.onclick = function (event) {
    event.preventDefault();
    let selectedRow = tableCadastroLote.row('.tableSelected');
    let id = selectedRow.data()[0];
    let valueDoArray = LoteTotal.filter(item => item[0] === id);
    //let barCoode = valueDoArray[0][3];
    console.log(id);
    console.log(valueDoArray);
    //console.log(barCoode);

    //jQuery('#barCodeDiv').css({
    //    "width": "520px",
    //    "background":"#FFFFFF;", 
    //    "color": "#2f2d2d",
    //    "font-size": "15px",
    //});
    //jQuery('#barCodeModal').modal('show');
    //jQuery('#mensagemBarcode').text('APROVADO');
    //JsBarcode("#idBarcode", barCoode);
};

btnModalImprimir.onclick = () => {
    imprimirModal('barCodeModal')
};




/* INICIA A PAGINA */
createTable();