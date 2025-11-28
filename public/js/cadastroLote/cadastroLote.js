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
function createTable() {
    
    axios.get("/cadastroLote/dadosLote").then(response => {
        //APAGA DADOS DO ARRAY
        Lote = []
        LoteTotal = []
        console.log(response)

        // Configura o evento de focus uma única vez

        /*
        $('#materiaPrima').off('focus').on('focus', function () {
            if (!optionsCarregadas) {
                preencherSelect("materiaPrima", response.data.insumoAtivo);
                optionsCarregadas = true; // garante que carregue só uma vez
            }
        });
        */
       
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
        
        for(let b of response.data.loteAtivo){
            Lote.push([b.Lote, b.MateriaPrimaInsumo]);
            LoteTotal.push( [b.Lote, b.MateriaPrimaIdInsumo, b.MateriaPrimaInsumo, b.Barcode]);
        }
       
        tableCadastroLote = jQuery('#tabela-CadastroLote').DataTable(
            {
                pagingType: 'numbers',
                pageLength : 4,
                bLengthChange: false,
                lengthChange: false, 
                bFilter: true,
                data: Lote,
                columns: [{title: "LOTE"}, {title: "DESCRIÇÃO"}],
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

btnDeleta.onclick = (event) => {
 
    event.preventDefault();

    let selectedRow = tableCadastroLote.row('.tableSelected');

    if (selectedRow.length === 0) {
        alert("Selecione uma materia prima para deletar.");
        return;
    }

    let deleteLote = selectedRow.data()[0];
    let deleteMateriaPrima = selectedRow.data()[1];

    jQuery('#delete_lote').val(deleteLote);
    jQuery('#delete_materia').val(deleteMateriaPrima);
    jQuery('#deleteModal').modal('show');

}


btnModalDeletar.onclick = (event) => {
    event.preventDefault();
    let selectedRow = tableCadastroLote.row('.tableSelected');
    let deleteLote = selectedRow.data()[0];

    axios.delete(`/cadastroLote/${deleteLote}`).then(response => {
            console.log(response.data)
            if(response.status == 201){
                jQuery('#deleteModal').modal('hide');
                jQuery('#messageDivChildren').css({"background":"#E5192E", "border": "2px solid #fff", "color": "#fff"});
                jQuery('#message').modal('show');
                jQuery('#messageText').text(response.data.message);
                setTimeout(() => {
                    window.location.reload(); 
                },800);     
            }
        }).catch(error => {
                const messagem = JSON.parse(error.request.responseText);
                jQuery('#adicionar-modal').modal('hide');
                jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
                jQuery('#message').modal('show');
                jQuery('#messageText').text(messagem.erro);
    }) 

}


/* INICIA A PAGINA */
createTable();