var tableCadastroLote;

function criarTabelaCadastroLote(dadosArray) {

// Se já existe, apenas atualiza os dados
  if ($.fn.dataTable.isDataTable('#tabela-VisualizarLote') && tableCadastroLote) {
    tableCadastroLote.clear();                  // limpa linhas atuais
    tableCadastroLote.rows.add(dadosArray);    // adiciona novos dados (array de arrays)
    tableCadastroLote.draw();                  // redesenha a tabela
    return tableCadastroLote;
  }

  // Cria inicialmente
  tableCadastroLote = jQuery('#tabela-VisualizarLote').DataTable({
    pagingType: 'numbers',
    pageLength: 10,
    bLengthChange: false,
    lengthChange: false,
    bFilter: true,
    data: dadosArray,
    columns: [{title: "LOTE"}, {title: "MATERIA PRIMA ID"}, {title: "MATERIA PRIMA"}, {title: "BARCODE"}, {title: "STATUS"}],
    ordering: false,
    language: { info: " " },
    columnDefs: [
                    {
                        targets: 4, // índice da coluna "STATUS"
                        createdCell: function(td, cellData, rowData, row, col) {
                            if (cellData === 'EM ESTOQUE') {
                                $(td).addClass('status-estoque');
                            } else if (cellData === 'PRODUZINDO') {
                                $(td).addClass('status-producao');
                            } else if (cellData === 'FINALIZADO') {
                                $(td).addClass('status-finalizado');
                            }
                        }
                    }
                ]
  });

  // Desvincula handler antigo (se houver) antes de vincular
  jQuery('#tabela-VisualizarLote tbody').off('click').on('click', 'tr', function () {
    var tr = jQuery(this).closest('tr');
    var row = tableCadastroLote.row(tr);
    if (typeof row.data() === 'undefined') { return null; }
    if (jQuery(this).hasClass('tableSelected')) {
      jQuery(this).removeClass('tableSelected');
    } else {
      tableCadastroLote.$('tr.tableSelected').removeClass('tableSelected');
      jQuery(this).addClass('tableSelected');
    }
  });

  return tableCadastroLote;
}

export {
    criarTabelaCadastroLote
};
        