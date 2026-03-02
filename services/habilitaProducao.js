const Lote = require("../models1/Lote/Lote");
const OrdemProducaos = require("../models/OrdemProducaos/OrdemProducaos");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes, or} = require("sequelize");
const { PLC, TagConst } = require("../utils/ethernetIp");


async function habilitaProducao(status, ordeArgamassa, idOrdemArgamassaId, ordemPremix, idPremix, idPremixLote) {

    let erroValue;
    let messageErro;

    try {

        let verifyStatus = await Lote.findOne({
            where: {
                idLoteBarcode: ordemPremix,
            }
        });
    
      if(verifyStatus.Status == 1){
           erroValue = 1;
           throw new Error()

       } else {  
            // CONEXÃO COM O PLC
            await PLC.connect("192.168.0.16", 0);
    
            //console.log(PLC.properties);
            const httpPremix = await PLC.readTag(TagConst);

            if(httpPremix.value = 0){
                await PLC.writeTag(TagConst, Number(idPremix));

                await Lote.update(
                    { 
                        Status: status ,
                        ordemArgamassa: ordeArgamassa ,
                        idOrdemArgamassa: idOrdemArgamassaId
                    },
                    {
                      where: {
                        id: idPremixLote,
                      },
                    },
                );

                 return {
                    message: 'Produto utilizado e ordem enviada para o controlador.'
                }
            } else {
                erroValue = 2;
                throw new Error()
            } 
       }

        
    } catch (error) {

            switch(erroValue) {
                case 1:
                    messageErro = "Produto utilizado já, por favor usar outro.";
                    break;
                case 2:
                    messageErro = "Produto ainda está na balança, aguardar a proxima batch.";
                    break;
                default:
                    messageErro = "Erro comunicação plc ou Erro no Banco de dados.";
            }
            throw new ModeloInvalidoErro(400, messageErro);

    } finally {

        // destroy normalmente força limpeza de recursos/sockets
        if (typeof PLC.destroy === "function") {
          try 
          { 
            PLC.destroy(); 
            console.log("Conexão encerrada.");
          } 
          catch (e) 
          { /* ignore/log */ }
        }

        //console.log("Conexão encerrada.");

    }

      
     

}

async function dadosParaPage(id) {
      

      let lote = await Lote.findOne({
          order: [
              ['id', 'DESC']
          ],
          where: {
              idLoteBarcode: `${id}`,
          }
      });

      
      let ordensProducao = await OrdemProducaos.findOne({
          where: { 
            [Op.and]: [{ Status: 'A' }, { Linha: 1 }]
          }});
             
      let dadosLote = lote == null ? [] : lote;
      let dadosOrdemProducao = ordensProducao == null ? [] : ordensProducao;

      
      return {
        loteAtivo: dadosLote,
        ordemProducao: dadosOrdemProducao,
      };
}

  

module.exports =  {
    dadosParaPage,
    habilitaProducao
}