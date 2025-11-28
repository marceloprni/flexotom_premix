// console.log(dataHora.toLocaleDateString(), dataHora.toLocaleTimeString())

// Função para inserir o 0 na frente se for menor que 10, isso ajuda para salvar no banco de dados.
function Inserir0Date(valor1) {
    if(valor1 < 10) {
        return "0" + valor1;
    } else {
        return valor1;
    }
}

// Converte dataTime em timestamp
function convertDatetimeOnTimesTamp(dateTme) {
    // Quebrando a string em partes
    const partes = dateTme.split(' ');
    
    // Separando a parte da data e da hora
    const dataParte = partes[0]; // '2023-10-1'
    const horaParte = partes[1]; // '7:2:31:206'
    
    // Convertendo a parte da data para um objeto Date
    const dataObjeto = new Date(dataParte);
    const ano = dataObjeto.getFullYear();
    const mes = dataObjeto.getMonth() + 1;
    const dia = dataObjeto.getDate();
    
    // Separando a parte da hora em partes menores
    const horaPartesMenores = horaParte.split(':');
    
    const horas = parseInt(horaPartesMenores[0]); // 7
    const minutos = parseInt(horaPartesMenores[1]); // 2
    const segundos = parseInt(horaPartesMenores[2]); // 31
    const milissegundos = parseInt(horaPartesMenores[3]); // 206
    
    //console.log(ano, mes, dia, horas, minutos, segundos, milissegundos)
    const dataHora = new Date(ano, mes, dia, horas, minutos, segundos, milissegundos);
    const timeStamp = dataHora.getTime();
    return timeStamp
    }

/*****  Converte Datatime Mysql 2023-09-03 17:08:04 para Datatime Javascript  *****/
function convertDatetimeOnTimesTampMysql(dateTme) {
    // Quebrando a string em partes
    const partes = dateTme.split(' ');
    
    // Separando a parte da data e da hora
    const dataParte = partes[0]; // '2023-10-1'
    let ano1 = dataParte.slice(0,4);
    let mes1 = parseInt(dataParte.slice(5,7)) - 1;
    let dia1 = parseInt(dataParte.slice(8,10));

    const horaParte = partes[1]; // '7:2:31:206'
    
    //Convertendo a parte da data para um objeto Date
    const dataObjeto = new Date(ano1, mes1, dia1);
    const ano = dataObjeto.getFullYear();
    const mes = dataObjeto.getMonth();
    const dia = dataObjeto.getDate();
    //
    //Separando a parte da hora em partes menores
    const horaPartesMenores = horaParte.split(':');
    
    const horas = parseInt(horaPartesMenores[0]); // 7
    const minutos = parseInt(horaPartesMenores[1]); // 2
    const segundos = parseInt(horaPartesMenores[2]); // 31

    const dataHora = new Date(ano, mes, dia, horas, minutos, segundos);
    const timeStamp = dataHora
    return timeStamp
}

/*****  Converte Datatime Mysql 2023-09-03 17:08:04:300 para Datatime Javascript  *****/
function convertDatetimeOnTimesMiliSegundosTampMysql(dateTme) {
    // Quebrando a string em partes
    const partes = dateTme.split(' ');
    
    // Separando a parte da data e da hora
    const dataParte = partes[0]; // '2023-10-1'
    let ano1 = dataParte.slice(0,4);
    let mes1 = parseInt(dataParte.slice(5,7)) - 1;
    let dia1 = parseInt(dataParte.slice(8,10));

    const horaParte = partes[1]; // '7:2:31:206'
    
    //Convertendo a parte da data para um objeto Date
    const dataObjeto = new Date(ano1, mes1, dia1);
    const ano = dataObjeto.getFullYear();
    const mes = dataObjeto.getMonth();
    const dia = dataObjeto.getDate();
    //
    //Separando a parte da hora em partes menores
    const horaPartesMenores = horaParte.split(':');
    
    const horas = parseInt(horaPartesMenores[0]); // 7
    const minutos = parseInt(horaPartesMenores[1]); // 2
    const segundos = parseInt(horaPartesMenores[2]);
    const milisegundos = parseInt(horaPartesMenores[3]); // 31

    const dataHora = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}:${milisegundos}`;
    return dataHora
}


// Gerario conforme 2023/10/01 10:30:40
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

    const Dhora = `${ano1}-${mesConvertido}-${diaConvertido} ${horaConvertido}:${minutoConvertido}:${segundoConvertido}`;
    return Dhora;
}

// Gerario conforme 2023/10/01 10:30:40


// Converte o primeiro timestamp para o timeFinal1
function timeFinal(timeFinal) {
    const TimeF = timeFinal;
    const dataHora = new Date(TimeF);
    const ano = dataHora.getFullYear();

    const mes = dataHora.getMonth() + 1; // Os meses são indexados a partir de 0

    const dia = dataHora.getDate();

    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const segundos = dataHora.getSeconds();
    const milisegundos = dataHora.getMilliseconds();
    const timeTotal = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}:${milisegundos}`;
    return timeTotal;
}

// Converte os tempos para salvar no banco de dados em milisegundos
function convertDateTime(timeSensor) {
    let timeStamp = Date.now() 
    let timeFinal1 = timeFinal(timeStamp);
    let timeSubtraido = timeStamp - timeSensor;

    const dataHora = new Date(timeSubtraido);
    const ano = dataHora.getFullYear();
    const mes = dataHora.getMonth() + 1; // Os meses são indexados a partir de 0
    const dia = dataHora.getDate();
    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const segundos = dataHora.getSeconds();
    const milisegundos = dataHora.getMilliseconds();
    const timeInicial1 = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}:${milisegundos}`;
    return  {
        timeInicial: timeInicial1,
        timeFinal: timeFinal1
    } 
}

function timeMilisegundos() {
    const timeStamp = Date.now();
    return timeStamp;
}

function timeMilisegundosVariavel(tempo) {
    const timeStamp = new Date(tempo);
    const timeReal = Date.now() - timeStamp.getTime(); //
    return timeReal;
}

function calculoMilisegundos(tempoInicio, tempoFim) {
    const timeStamp1 = new Date(tempoInicio).getTime();
    const timeStamp2 = new Date(tempoFim).getTime();
    const timeReal = timeStamp2 - timeStamp1 //
    
    const dataHora = new Date(timeReal);
    const ano = dataHora.getFullYear();
    const mes = dataHora.getMonth() + 1; // Os meses são indexados a partir de 0
    const dia = dataHora.getDate();
    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const segundos = dataHora.getSeconds();
    //const milisegundos = dataHora.getMilliseconds();
    const timeInicial1 = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    return timeInicial1;
}

function calculoMilisegundosOut(tempoInicio, tempoFim) {
    const timeStamp1 = new Date(tempoInicio).getTime();
    const timeStamp2 = new Date(tempoFim).getTime();
    const timeReal = timeStamp2 - timeStamp1 //

    const dataHora = new Date(timeReal);
    const ano = dataHora.getFullYear();
    const mes = dataHora.getMonth() + 1; // Os meses são indexados a partir de 0
    const dia = dataHora.getDate();
    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const segundos = dataHora.getSeconds();
    const milisegundos = dataHora.getMilliseconds();
    const timeInicial1 = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}:${milisegundos}`;
    return timeInicial1;
}

function timeMilisegundosVariavel(tempo, final) {
    const timeStamp = new Date(tempo);
    const timeStamp2 = new Date(final);
    var ano
    var mes
    var dia
    console.log(timeStamp.getHours(), timeStamp2.getHours())
    console.log(timeStamp.getMinutes(), timeStamp2.getMinutes())
    console.log(timeStamp.getSeconds(), timeStamp2.getSeconds())

    if(timeStamp.getFullYear() > timeStamp2.getFullYear()) {
        ano = timeStamp.getFullYear() - timeStamp2.getFullYear() 
    } else {
        ano = timeStamp2.getFullYear() - timeStamp.getFullYear();
    }
    
    if(timeStamp.getMonth() > timeStamp2.getMonth()) {
        mes = timeStamp.getMonth() - timeStamp2.getMonth() 
    } else {
        mes = timeStamp2.getMonth() -  timeStamp.getMonth();
    }
    
    if(timeStamp.getDate() > timeStamp2.getDate()) {
        dia = timeStamp.getDate() - timeStamp2.getDate()
    } else {
        dia = timeStamp2.getDate() - timeStamp.getDate();
    }
    
    if(ano < 0) {
        ano = '0000'
    } else if(ano < 10) {
        ano = '000' + ano
    } else if(ano < 100) {
        ano = '00' + ano
    } else if (ano < 1000) {
        ano = '0' + ano
    }

    if(mes < 0) {
        mes = '00'
    } else if (mes < 10) {
        mes = '0' + mes
    } else if (mes < 12) {
        mes = mes
    }

    if(dia < 0) {
        dia = '00'
    } else if (dia < 10) {
        dia = '0' + dia
    } else if (dia < 31) {
        dia = dia
    }
    
    var hora;
    var hora1;
    if(timeStamp2.getHours() < timeStamp.getHours()) {
         hora = timeStamp.getHours() - timeStamp2.getHours()
         
         if(hora < 10) {
            hora1 = "0" + hora;
        } else {
            hora1 = hora;
        }
    } else {
         hora = timeStamp2.getHours() - timeStamp.getHours() 
         
         if(hora < 10) {
            hora1 =  "0" + hora;
        } else {
            hora1 =  hora;
        }
    }

    var minuto;
    var minuto1;
    if(timeStamp2.getMinutes() < timeStamp.getMinutes()) {
        minuto = timeStamp.getMinutes() - timeStamp2.getMinutes();
        
        if(minuto < 10) {
            minuto1 =  "0" + minuto;
        } else {
            minuto1 = minuto;
        }
        
   } else {
        minuto = timeStamp2.getMinutes() - timeStamp.getMinutes();
        
        if(minuto < 10) {
            minuto1 = "0" + minuto;
        } else {
            minuto1 = minuto;
        }
   }

   var segundos;
   var segundos1;
   if(timeStamp2.getSeconds() < timeStamp.getSeconds()) {
        segundos = timeStamp.getSeconds() - timeStamp2.getSeconds();
        
        if(segundos < 10) {
         segundos1 = "0" + segundos;
        } else {
         segundos1 = segundos;
        }
    } else {
        segundos = timeStamp2.getSeconds() - timeStamp.getSeconds();
        
        if(segundos < 10) {
            segundos1 = "0" + segundos;
        } else {
            segundos1 = segundos;
        }
    }
    const dataFinal = `${ano}-${mes}-${dia} ${hora1}:${minuto1}:${segundos1}`;
    return dataFinal;
}

/* PEGA A DATA DA PARADA E TRANSFORMA EM TIMESTAMP */
function calculoHorasParada(dataCalc) {
    const partes = dataCalc.split(' ');
    
    // Separando a parte da data e da hora
   const dataParte = partes[0]; // '2023-10-01'
   const ano = dataParte.slice(0,4);
   const mes = dataParte.slice(5,7);
   const dia = dataParte.slice(8,10);

   const horaParte = partes[1]; // '7:2:31:206'
   const horas = horaParte.slice(0,2);
   const minutos = horaParte.slice(3,5);
   const segundos = horaParte.slice(6,8);
   
   const dateNow = new Date(ano, mes, dia, horas, minutos, segundos)
   return dateNow.getTime();
}

function somarTempoTimestamp(data, data2) {
    var novaData = new Date(data);
    var novaData2 = new Date(data2)

    // Somando meses
    novaData.setMonth(novaData.getMonth() + novaData2.getMonth())
    // Somando dias
    novaData.setDate(novaData.getDate() + novaData2.getDate());
    // Somando horas
    novaData.setHours(novaData.getHours() + novaData2.getHours());
    // Somando minutos
    novaData.setMinutes(novaData.getMinutes() + novaData2.getMinutes());
    // Somando segundos
    novaData.setSeconds(novaData.getSeconds() + novaData2.getSeconds());
  
    return novaData;
}


function transformaTimesatampToHours(data) {
    var novaData = new Date(data);
    //console.log(novaData)
    
    // Somando dias
    if(novaData.getDate() == 1 || novaData.getFullYear() == 1899) {
		dia	= 0
        
	} else {
		dia	= (Number(novaData.getDate()) - 1) * 24
	}
  
    // Somando horas
    var horas = novaData.getHours() 
  
    // Somando minutos
    var minutos = novaData.getMinutes() / 60
  
    // Somando segundos
    var segundos = novaData.getSeconds() / 3600
    //console.log(dia, horas, minutos, segundos);

    let soma = dia + horas + minutos + segundos;
    
    return soma
}

function calculoMilisegundosTakt(fim, inicio){
    const incioTakt = new Date(`${inicio}`).getTime();
    const fimTakt = new Date(`${fim}`).getTime();
  
    const nowTakt = ((fimTakt - incioTakt) / 3600000) * 1000

    return nowTakt
}


module.exports = {
    convertDateTime,
    convertDatetimeOnTimesTamp,
    timeFinal,
    Datetime,
    convertDatetimeOnTimesTampMysql,
    timeMilisegundos,
    timeMilisegundosVariavel,
    calculoMilisegundos,
    timeMilisegundosVariavel,
    calculoHorasParada,
    somarTempoTimestamp,
    transformaTimesatampToHours,
    convertDatetimeOnTimesMiliSegundosTampMysql,
    calculoMilisegundosOut,
    calculoMilisegundosTakt
}