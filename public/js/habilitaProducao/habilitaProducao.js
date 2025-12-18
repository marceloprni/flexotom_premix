

// INPUT 
let inputBuscarLote = document.getElementById('buscarLoteInput');
let inputOrdemProducaoModal = document.getElementById('OrdemProdinput');
let inputLoteModal = document.getElementById('LoteInput');
let inputMateriaPrimaModal = document.getElementById('MateriaInput');

// BTN
let btnBuscarLote = document.getElementById('btnBuscarLote');
let btnFinalizavinculo = document.getElementById('btnVinculaLoteFinal');


// VARIAVEL GLOBAL E ARRAY
let idOrdemProducao;
let idPremix;
let idPremixDoLote;

btnBuscarLote.onclick  = function (event) {
    idOrdemProducao = '';
    idPremix = '';

    event.preventDefault();
    if (
        inputBuscarLote.value === '' 
        || inputBuscarLote.value === undefined 
        ) {
        alert("Sem premix selecionado.");
        return;
    }

    axios.get(`/habilitaProducao/gerarPop/${inputBuscarLote.value}`, {
    }).then(response => {
        console.log(response.data);
        if(response.data.ordemProducao.length == 0){
            console.log("Nenhuma ordem de produção ativa na argamassa.");
            jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
            jQuery('#messageText').text('Nenhuma ordem de produção ativa na argamassa');
            jQuery('#message').modal('show');
        } else {
            idOrdemProducao = response.data.ordemProducao.id;
            inputOrdemProducaoModal.value = response.data.ordemProducao.Descricao;
            inputLoteModal.value = response.data.ordemProducao.Lote;
            inputMateriaPrimaModal.value = response.data.loteAtivo.IdLoteBarcode;
            idPremix = response.data.loteAtivo.IdOrdem
            idPremixDoLote = response.data.loteAtivo.id
            jQuery('#barCodeModal').modal('show');  
        }
         
    
    }).catch(error => {
        console.error(error);
        tableCadastroLote = criarTabelaCadastroLote([]);
        const messagem = JSON.parse(error.request.responseText);
        jQuery('#adicionar-modal').modal('hide');
        jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
        jQuery('#messageText').text(messagem.erro);
        jQuery('#message').modal('show');
    });

};

btnVinculaLoteFinal.onclick = function (event) {
    event.preventDefault();
    console.log(`Ordem de produção: ${idOrdemProducao}`);

    axios.put("/habilitaProducao/habilitaProduto", {
        status: 1,
        ordeArgamassa: inputOrdemProducaoModal.value,
        idOrdemArgamassaId: idOrdemProducao,
        ordemPremix: inputMateriaPrimaModal.value,
        idPremix: idPremix,
        idPremixLote: idPremixDoLote
    }).then(response => {
            console.log(response);
            jQuery('#barCodeModal').modal('hide');
            jQuery('#messageDivChildren').css({"background":"#E5192E", "border": "2px solid #fff", "color": "#fff"});
            jQuery('#message').modal('show');
            jQuery('#messageText').text(response.data.message);
            setTimeout(() => {
                //window.location.reload(); 
                jQuery('#adicionar-modal').modal('hide');
            },800);
    }).catch(error => {
            console.error(error);
            const messagem = JSON.parse(error.request.responseText);
            jQuery('#barCodeModal').modal('hide');
            jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
            jQuery('#message').modal('show');
            jQuery('#messageText').text(messagem.erro);
    });
 
};

