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
   TamanhoBatch
) {
   lotes = [];
   
   const numeroDeBateladas = Math.ceil(QuantidadePrevista / TamanhoBatch);


   for (let i = 0; i < numeroDeBateladas; i++) {
        
        
         const lote = {
             idLoteBarcode: `${Codigo}-${i + 1}-${id}`,
             Batelada: TamanhoBatch,
             idOrdem: id,
             idProduto: Receita,
             Sequencia: i + 1,
             Status: false,
         };

         lotes.push(lote);
      }

   return lotes;

}

module.exports = gerarUUID;