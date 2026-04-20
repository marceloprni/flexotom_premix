function imprimirModal(idModal) {
  const conteudoModal = document.getElementById(`${idModal}`).innerHTML;
  const novaPagina = window.open();

  novaPagina.document.write(`
    <html>
    <head>
      <title>Imprimir Modal</title>
      <style>
        /* Reset e dimensões da página */
        @page {
          size: 106mm 30mm; /* Largura × Altura */
          margin: 0; /* Remove margens padrão */
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          width: 106mm;
          height: 30mm;
          overflow: hidden; /* Evita vazamentos de conteúdo */
        }
      
        #barCodeDiv {
          margin:0;
          padding: 0;
        }
        
        #barCodeBody {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        #mensagemBarcode {
          margin: 0;
          padding: 0;
          font-size: 25px;
          text-align: center;
        }

        #idBarcode {
          align-items: center;
          width: 90%;
          height: 90%;
        }

        #btn_imprimir_barcode {
          display: none;
        }
      </style>
    </head>
    <body>
      ${conteudoModal}
    </body>
    </html>
  `);

  novaPagina.document.close();

  // Imprime após o carregamento
  novaPagina.onload = function() {
    novaPagina.focus();
    novaPagina.print();
    // novaPagina.close(); // Opcional: fechar após imprimir
  };
}

export { imprimirModal };