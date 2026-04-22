function tratamentoJson(date) {
    let dadosArray = [];
    for(let b of date) {

            if(b.Status === "SV") {
                dadosArray.push([
                    b.Lote, 
                    b.MateriaPrimaIdInsumo,
                    b.MateriaPrimaInsumo,
                    b.Barcode,
                    'EM ESTOQUE'
                ]);
            } else if (b.Status === "CV") {
                dadosArray.push([
                    b.Lote, 
                    b.MateriaPrimaIdInsumo,
                    b.MateriaPrimaInsumo,
                    b.Barcode,
                    'PRODUZINDO'
                ]);
            } else {
                    dadosArray.push([
                    b.Lote, 
                    b.MateriaPrimaIdInsumo,
                    b.MateriaPrimaInsumo,
                    b.Barcode,
                    'FINALIZADO'
                ]);
            }
            
    }
    return dadosArray;
}

export {
    tratamentoJson
}