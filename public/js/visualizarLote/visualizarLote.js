

// VARIAVEL GLOBAL E ARRAY
let VisualizarLote = [];
let tableVisualizarLote;


// CARREGA DADOS NA TABELA
function createTable() {
    axios.get("/visualizarLote/dadosLote").then(response => {
        //APAGA DADOS DO ARRAY
        VisualizarLote = [];
        console.log(response)
        
        for(let b of response.data.loteAtivo){

            if(b.Status === "SV") {
                VisualizarLote.push([
                    b.Lote, 
                    b.MateriaPrimaIdInsumo,
                    b.MateriaPrimaInsumo,
                    b.Barcode,
                    'EM ESTOQUE'
                ]);
            } else if (b.Status === "CV") {
                VisualizarLote.push([
                    b.Lote, 
                    b.MateriaPrimaIdInsumo,
                    b.MateriaPrimaInsumo,
                    b.Barcode,
                    'PRODUZINDO'
                ]);
            } else {
                    VisualizarLote.push([
                    b.Lote, 
                    b.MateriaPrimaIdInsumo,
                    b.MateriaPrimaInsumo,
                    b.Barcode,
                    'FINALIZADO'
                ]);
            }
            
        }
        
        tableVisualizarLote = jQuery('#tabela-VisualizarLote').DataTable(
            {
                pageLength : 10,
                bLengthChange: false,
                bFilter: true,
                data: VisualizarLote,
                columns: [{title: "LOTE"}, {title: "MATERIA PRIMA ID"}, {title: "MATERIA PRIMA"}, {title: "BARCODE"}, {title: "STATUS"}],
                ordering: false,
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
        
        
        jQuery('#tabela-VisualizarLote tbody').on('click', 'tr', function () 
        {
            var tr = jQuery(this).closest('tr');
            var row = tableVisualizarLote.row(tr);
            /*Check if row is empty*/
            if (typeof row.data() === 'undefined'){return null;}
            /*Selected row*/
            if (jQuery(this).hasClass('tableSelected')){
                jQuery(this).removeClass('tableSelected');
            }
            else {
                tableVisualizarLote.$('tr.tableSelected').removeClass('tableSelected');
                jQuery(this).addClass('tableSelected');
            }   
        });

    }).catch(error => {
        console.log(error);
    });
};


createTable();