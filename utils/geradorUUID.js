const { v4: uuidv4 } = require('uuid');

//const uuid = uuidv4();
//let variavel = uuid;
//let variavel2 = variavel.split("-", 3);
//const idLoteBarcode = gerarUUID();  // Cria um UUID único para cada batelada

var lotes = [];

function gerarUUID(
   id, 
   Codigo, 
   Descricao, 
   Linha, 
   Receita, 
   QuantidadePrevista, 
   TamanhoBatch,
   idReceitaProducao
) {
   lotes = [];
   
   const numeroDeBateladas = Math.ceil(QuantidadePrevista / TamanhoBatch);


   for (let i = 0; i < numeroDeBateladas; i++) {
        
        
         const lote = {
             idLoteBarcodePremix: `${Codigo}-${i + 1}-${numeroDeBateladas}`,
             BateladaPremix: TamanhoBatch,
             idOrdemPremix: id,
             idProdutoPremix: Receita,
             SequenciaPremix: i + 1,
             StatusPremix: false,
             idReceitaPremix: idReceitaProducao
         };

         lotes.push(lote);
      }

   return lotes;

}

function gerarUUIDMaterial(id) {
    const uuid = uuidv4();
    let variavel = uuid;
    let variavel2 = variavel.split("-", 3);
    let jsonInformation  = {
        idBarcode: (variavel2[0] + variavel2[1]+ variavel2[2] + id.toString())
    }
    return jsonInformation;
}

module.exports = { gerarUUID, gerarUUIDMaterial };
