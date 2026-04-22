import { criarTabelaCadastroLote } from "./tabelaPrincipalVisualizarLote.js";
import { parseDate } from "./timerDate.js";
import { tratamentoJson } from "./tratamentoJson.js";

// VAR INPUT
const dataInicio = document.getElementById('timeInicio');
const dataFim = document.getElementById('timeFim');
const materiaPrima = document.getElementById('materiaPrima');
const lote = document.getElementById('lote');



// BTN 
const btnData = document.getElementById('btnBuscarMateriaTime');
const btnMateriaPrima = document.getElementById('btnBuscarMateriaMateriaPrima');
const btnLote = document.getElementById('btnBuscarMateriaLote');


// VARIAVEL GLOBAL E ARRAY
let VisualizarLote = [];
let tableVisualizarLote;

btnData.onclick  = function (event) {
    event.preventDefault();
    let dataInicioValorReal = parseDate(dataInicio.value);
    let dataFimValorReal = parseDate(dataFim.value);

    if (
           dataInicio.value === '' 
        || dataFim.value === '' 
        || dataInicio === undefined 
        || dataFim === undefined) {
        alert("Selecione os períodos entre a data de início e data de fim.");
        return;
    }

    if (dataInicioValorReal > dataFimValorReal) {
        alert("A data de início não pode ser maior que a data de fim. Por favor, corrija.");
    }

    axios.get(`/visualizarLote/dadosTimer/${dataInicio.value}/${dataFim.value}`).then(response => {
        console.log(response)
        let dadosTratados = tratamentoJson(response.data);
        criarTabelaCadastroLote(dadosTratados);
    }).catch(error => {
        console.error(error);
        const messagem = JSON.parse(error.request.responseText);
        jQuery('#adicionar-modal').modal('hide');
        jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
        jQuery('#message').modal('show');
        jQuery('#messageText').text(messagem.erro);
    });
};

btnMateriaPrima.onclick  = function (event) {
    event.preventDefault();

    if (
        materiaPrima.value === '' 
        || materiaPrima === undefined 
  ) {
        alert("Digite a matéria-prima.");
        return;
    }

    const materiaPrimaTratada = encodeURIComponent(materiaPrima.value);
    console.log('trado materia')
    console.log(materiaPrimaTratada)
    axios.get(`/visualizarLote/materiaPrima/${materiaPrimaTratada}`).then(response => {
        console.log(response)
        let dadosTratados = tratamentoJson(response.data);
        criarTabelaCadastroLote(dadosTratados);
    }).catch(error => {
        console.error(error);
        const messagem = JSON.parse(error.request.responseText);
        jQuery('#adicionar-modal').modal('hide');
        jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
        jQuery('#message').modal('show');
        jQuery('#messageText').text(messagem.erro);
    });
};

btnLote.onclick  = function (event) {
    event.preventDefault();

    if (
        lote.value === '' 
        || lote === undefined 
  ) {
        alert("Digite o lote.");
        return;
    }

    const loteTratado = encodeURIComponent(lote.value);
    
    axios.get(`/visualizarLote/Lote/${loteTratado}`).then(response => {
        console.log(response)
        let dadosTratados = tratamentoJson(response.data);
        criarTabelaCadastroLote(dadosTratados);
    }).catch(error => {
        console.error(error);
        const messagem = JSON.parse(error.request.responseText);
        jQuery('#adicionar-modal').modal('hide');
        jQuery('#messageDivChildren').css({"background":"#ffc107", "border": "2px solid #fff"});
        jQuery('#message').modal('show');
        jQuery('#messageText').text(messagem.erro);
    });
};


// INICIA TABELA VAZIA 
criarTabelaCadastroLote([]);