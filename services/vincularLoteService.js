const Lote = require("../models1/Lote/Lote");
const Insumos = require("../models/Insumos/Insumos");
const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { Op, Sequelize, QueryTypes} = require("sequelize");


  async function dadosParaPage() {

      let lote = await Lote.findAll({
          attributes: ['id', 'Lote', 'MateriaPrimaIdInsumo', 'MateriaPrimaInsumo', 'Barcode'],
          order: [
              ['id', 'DESC']
          ],
          where: {
              Status: 'CV',
          },
      });

      if(!lote) {
          return {
            lote: [],
          };
      } else {
          return {
              loteAtivo: lote,
          };
      }

  }

  async function chamarDadosBarcode(BarcodeIn) {

      const StatusSv = 'SV';

      if(!BarcodeIn) {
          throw new ModeloInvalidoErro("Campo Barcode vazio.");
      }

      let dadosBarcode = await Lote.findOne({
        attributes: [
          "Lote",
          "MateriaPrimaIdInsumo",
          "MateriaPrimaInsumo",
          "Status",
        ],
        where: {
           [Op.and]: [
              { Barcode: BarcodeIn },
              { Status: StatusSv },
          ],
        },
      });

      if(!dadosBarcode) {
          throw new ModeloInvalidoErro("Não existe lote ou barcode errado.");
      }


      return dadosBarcode;

  }
  
  async function vincularLote(
    LoteId,
    MateriaPrimaIdInsumo,
    MateriaPrimaInsumo,
    Status
      ) {

      try {
        // Verifica campos obrigatórios
        if (!LoteId || !MateriaPrimaIdInsumo || !MateriaPrimaInsumo || !Status) {
          throw new ModeloInvalidoErro("Campos obrigatórios preencher.");
        }

        let identificacaoStatus = 'Finalizado';



        const dadosInsumo = await Insumos.findOne({
          attributes: ['id', 'Descricao', 'Lote'],
          where: { id: MateriaPrimaIdInsumo },
        });

        if (!dadosInsumo) {
          throw new NaoAutorizadoErro("Insumo não encontrado.");
        }

        if (dadosInsumo.Lote === '' || dadosInsumo.Lote === null || dadosInsumo.Lote === undefined) {
           console.log("não contem nem um lote vinculado na tabela insumo");
        } else {
          await Lote.update({ Status: identificacaoStatus }, { where: { Lote: dadosInsumo.Lote } });
        }

      
        await Insumos.update(
          { Lote: LoteId },
          { where: { id: MateriaPrimaIdInsumo } }
        );

      
        await Lote.update(
          { Status: Status }, 
          { where: { Lote: LoteId } }
      );


        return {
          mensagemTabela: 'Vinculação de lote com sucesso.',
        };

      } catch (err) {
              if (err instanceof ModeloInvalidoErro) {
                throw err; 
              } else {
                throw new NaoAutorizadoErro("Erro ao vincular o lote.");
              }
      }
  }

  async function deletarVinculo(idMaterial) {

      let mensagem = "Ok."

      if (!idMaterial) {
          throw new ModeloInvalidoErro("Sem id para indentificação.");
      }

      const deleteInsumo = await Insumos.update(
          { Lote: null },
          { where: { Lote: idMaterial } }
        );
      
      const deleteLote = await Lote.update(
          { Status: 'SV' }, 
          { where: { Lote: idMaterial } }
      );

      if(deleteInsumo && deleteLote ) {
        return mensagem
      } else {
        throw new ModeloInvalidoErro("Erro ao deletar o lote.");
      }

      
  }

module.exports =  {
    dadosParaPage,
    chamarDadosBarcode,
    vincularLote,
    deletarVinculo
}