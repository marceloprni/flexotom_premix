


/******************************* FUNÇÕS COMPLEMENTARES PARA AJUDAR NA TRANSFORMAÇÃO *******************************/
function Inserir0Date(valor1) {
    if(valor1 < 10) {
        return "0" + valor1;
    } else {
        return valor1;
    }
}

function diasPlus() {
    const total = new Date()
    const totalDias = new Date(total.getFullYear(), total.getMonth(), 0).getDate();
    const resultado = totalDias == 28 ? 28 : 
                      totalDias == 29 ? 29 : 
                      totalDias == 30 ? 30 : 
                      totalDias == 31 ? 31 : null;
    if(resultado == total.getDate()) {
        return Inserir0Date(1)
    } else {
        return Inserir0Date(total.getDate() + 1)
    }

}

// TIRAR O ZERO
function valueTiraZero(value) {
    let valorNow = Number(value); 
    if(valorNow < 10) {
        return valorNow.toString()
    } else {
        return valorNow.toString()
    }
}



/******************************* CONVERTE OS DADOS PARA LEITURA CORRETA DO BANCO DE DADOS *******************************/
function DateTime(time) {
    var DataHora;

    if(!time) {
        DataHora = new Date();
    } else {
        DataHora = new Date(time);
    }

    const ano1 = DataHora.getFullYear();

    const mes1 = DataHora.getMonth() + 1;
    let mesConvertido = Inserir0Date(mes1);

    const dia1 = DataHora.getDate();
    let diaConvertido = Inserir0Date(dia1);

    const hora1 = DataHora.getHours();
    let horaConvertido = Inserir0Date(hora1);

    const minuto1 = DataHora.getMinutes();
    let minutoConvertido = Inserir0Date(minuto1);

    const segundo1 = DataHora.getSeconds();
    let segundoConvertido = Inserir0Date(segundo1);

    const Dhora = `${diaConvertido}/${mesConvertido}/${ano1} ${horaConvertido}:${minutoConvertido}:${segundoConvertido}`
    return Dhora
}

function DateAddDay(time) {
    var DataHora;

    if(!time) {
        DataHora = new Date();
    } else {
        DataHora = new Date(time);
    }

    const ano1 = DataHora.getFullYear();

    const mes1 = DataHora.getMonth() + 1;
    let mesConvertido = Inserir0Date(mes1);

    const dia1 = DataHora.getDate();
    let diaConvertido = Inserir0Date(dia1);

    let horaConvertido = diasPlus();

    const minuto1 = DataHora.getMinutes();
    let minutoConvertido = Inserir0Date(minuto1);

    const segundo1 = DataHora.getSeconds();
    let segundoConvertido = Inserir0Date(segundo1);

    const Dhora = `${diaConvertido}/${mesConvertido}/${ano1} ${horaConvertido}:${minutoConvertido}:${segundoConvertido}`
    return Dhora
}

function DateTimeJunto(time) {
    var DataHora;

    if(!time) {
        DataHora = new Date();
    } else {
        DataHora = new Date(time);
    }

    const ano1 = DataHora.getFullYear();

    const mes1 = DataHora.getMonth() + 1;
    let mesConvertido = Inserir0Date(mes1);

    const dia1 = DataHora.getDate();
    let diaConvertido = Inserir0Date(dia1);

    const hora1 = DataHora.getHours();
    let horaConvertido = Inserir0Date(hora1);

    const minuto1 = DataHora.getMinutes();
    let minutoConvertido = Inserir0Date(minuto1);

    const segundo1 = DataHora.getSeconds();
    let segundoConvertido = Inserir0Date(segundo1);

    const Dhora = `${diaConvertido}${mesConvertido}${ano1}${horaConvertido}${minutoConvertido}${segundoConvertido}`
    return Dhora
}


export {
    DateTime,
    DateTimeJunto,
    DateAddDay,
    valueTiraZero,
    Inserir0Date
}
