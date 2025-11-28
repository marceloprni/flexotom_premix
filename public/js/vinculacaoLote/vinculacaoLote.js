

// INPUT 
let inputLoteModal = document.getElementById('LoteInput');
let inputMateriaPrimaModal = document.getElementById('MateriaInput');

// BTN
let buscarLote = document.getElementById('buscarLoteInput');
let btnBuscarLote = document.getElementById('btnBuscarLote');
let btnFinalizavinculo = document.getElementById('btnVinculaLoteFinal');
let btnDeleteVinculo = document.getElementById('btn_vincular_lote');
let btnDeletModal = document.getElementById('btnDeletarFinal');

// VARIAVEL GLOBAL E ARRAY
let vincularLoteCv = [];
let barCodeLote = [];
let tableVincularLote;


// CARREGA DADOS NA TABELA
function createTable() {
    axios.get("/vincularLote/dadosLote").then(response => {
        //APAGA DADOS DO ARRAY
        vincularLoteCv = [];
        console.log(response)
        
        for(let b of response.data.loteAtivo){
            vincularLoteCv.push([b.Lote, b.MateriaPrimaInsumo]);
        }
       
        tableVincularLote = jQuery('#tabela-VincularLote').DataTable(
            {
                pageLength : 4,
                bLengthChange: false,
                bFilter: true,
                data: vincularLoteCv,
                columns: [{title: "LOTE"}, {title: "DESCRIÇÃO"}],
                ordering: false
            });
        
        
        jQuery('#tabela-VincularLote tbody').on('click', 'tr', function () 
        {
            var tr = jQuery(this).closest('tr');
            var row = tableVincularLote.row(tr);
            /*Check if row is empty*/
            if (typeof row.data() === 'undefined'){return null;}
            /*Selected row*/
            if (jQuery(this).hasClass('tableSelected')){
                jQuery(this).removeClass('tableSelected');
            }
            else {
                tableVincularLote.$('tr.tableSelected').removeClass('tableSelected');
                jQuery(this).addClass('tableSelected');
            }   
        });

    }).catch(error => {
        console.log(error);
    });
};


btnBuscarLote.onclick = () => {

    const paramsId = buscarLote.value;

    if(paramsId === ''){
        alert("Preencha o campo corretamente.");
        return;
    }

    axios.get(`/vincularLote/${paramsId}`).then(response => {
            console.log(response);
            barCodeLote.push(response.data);
            console.log(barCodeLote);
            if(response.status == 200){
                inputLoteModal.value = response.data.Lote;
                inputMateriaPrimaModal.value = response.data.MateriaPrimaInsumo;
                jQuery('#barCodeModal').modal('show');   
            }
        }).catch(error => {
                console.log(error);
                const messagem = JSON.parse(error.request.responseText);
                jQuery('#barCodeModal').modal('hide');
                jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
                jQuery('#messageText').text(messagem.erro);
                jQuery('#message').modal('show');
                
    }) 
    
  
}


btnFinalizavinculo.onclick = (event) => {
    event.preventDefault();
    
    if(inputLoteModal.value === '' || inputMateriaPrimaModal.value === ''){
        alert("Preencha os campos corretamente.");
        return;
    }

    axios
      .post("/vincularLote/criarVinculo", {
        LoteId: barCodeLote[0].Lote,
        MateriaPrimaIdInsumo: barCodeLote[0].MateriaPrimaIdInsumo,
        MateriaPrimaInsumo: barCodeLote[0].MateriaPrimaInsumo,
        Status: "CV",
      })
      .then((response) => {
        console.log(response);
        jQuery('#barCodeModal').modal('hide');  
        jQuery('#messageDivChildren').css({"background":"#E5192E", "border": "2px solid #fff", "color": "#fff"});
        jQuery('#message').modal('show');
        jQuery('#messageText').text(response.data.mensagemTabela);
        setTimeout(() => {
            window.location.reload(); 
        },1000);
      })
      .catch((error) => {
        const messagem = JSON.parse(error.request.responseText);
        jQuery('#barCodeModal').modal('hide');
        jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
        jQuery('#message').modal('show');
        jQuery('#messageText').text(messagem.erro);
      });
}

btnDeleteVinculo.onclick = (event) => {
    event.preventDefault();

    let selectedRow = tableVincularLote.row('.tableSelected');

    if (selectedRow.length === 0) {
        alert("Selecione uma materia prima para desvincular.");
        return;
    }

    let deleteLote = selectedRow.data()[0];
    let deleteMateriaPrima = selectedRow.data()[1];

    jQuery('#delete_lote').val(deleteLote);
    jQuery('#delete_materia').val(deleteMateriaPrima);
    jQuery('#deleteModal').modal('show');
    
}


btnDeletModal.onclick = (event) => {
    event.preventDefault(); 

    let deleteLote = jQuery('#delete_lote').val();
   
    axios.delete(`/vincularLote/${deleteLote}`).then(response => {
            console.log(response.data)
            if(response.status == 201){
                jQuery('#deleteModal').modal('hide');
                jQuery('#messageDivChildren').css({"background":"#E5192E", "border": "2px solid #fff", "color": "#fff"});
                jQuery('#message').modal('show');
                jQuery('#messageText').text(response.data.message);
                setTimeout(() => {
                    window.location.reload(); 
                },1000);     
            }
        }).catch(error => {
                const messagem = JSON.parse(error.request.responseText);
                jQuery('#deleteModal').modal('hide');
                jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
                jQuery('#message').modal('show');
                jQuery('#messageText').text(messagem.erro);
    }) 
}

createTable();