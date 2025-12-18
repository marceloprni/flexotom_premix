var tableCadastroLote;

function criarTabelaCadastroLote(dadosArray) {

// Se já existe, apenas atualiza os dados
  if ($.fn.dataTable.isDataTable('#tabela-CadastroLote') && tableCadastroLote) {
    tableCadastroLote.clear();                  // limpa linhas atuais
    tableCadastroLote.rows.add(dadosArray);    // adiciona novos dados (array de arrays)
    tableCadastroLote.draw();                  // redesenha a tabela
    return tableCadastroLote;
  }

  // Cria inicialmente
  tableCadastroLote = jQuery('#tabela-CadastroLote').DataTable({
    pagingType: 'numbers',
    pageLength: 5,
    bLengthChange: false,
    lengthChange: false,
    bFilter: true,
    data: dadosArray,
    columns: [{title: "ID"}, {title: "ID BARCODE"}, {title: "BATELADA"}, {title: "SEQUENCIA"}],
    ordering: false,
    language: { info: " " }
  });

  // Desvincula handler antigo (se houver) antes de vincular
  jQuery('#tabela-CadastroLote tbody').off('click').on('click', 'tr', function () {
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
        