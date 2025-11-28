function Inserir0Date(valor1) {
    if(valor1 < 10) {
        return "0" + valor1;
    } else {
        return valor1;
    }
}

function Datetime(time) {

    var DataHora;

    if(!time) {
        DataHora = new Date();
       
    } else {
        DataHora = new Date(time);
    }
    
    //console.log(DataHora);
    const ano1 = DataHora.getFullYear();

    const mes1 = DataHora.getMonth() + 1;
    let mesConvertido = Inserir0Date(mes1);

    const dia1 = DataHora.getDate();
    let diaConvertido = Inserir0Date(dia1)

    const hora1 = DataHora.getHours();
    let horaConvertido = Inserir0Date(hora1);

    const minuto1 = DataHora.getMinutes();
    let minutoConvertido = Inserir0Date(minuto1);

    const segundo1 = DataHora.getSeconds();
    let segundoConvertido = Inserir0Date(segundo1);

    const Dhora = `${diaConvertido}-${mesConvertido}-${ano1} ${horaConvertido}:${minutoConvertido}:${segundoConvertido}`;
    return Dhora;
}

function dataTimestamp(data) {
    const timeInicio = new Date(data)
    const nowTime = (new Date().getTime() - timeInicio.getTime()) / 3600000
    return nowTime.toFixed(2)
}

export {
    Datetime,
    dataTimestamp,
    Inserir0Date
}