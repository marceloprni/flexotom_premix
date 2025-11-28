
function preencherSelect(valueId, dados) {
    const $select = $(`#${valueId}`);
    $select.empty();

    // Adiciona uma opção padrão "Selecione" que não seleciona nada
    $select.append($('<option></option>')
        .val(''));

    dados.forEach(item => {
        const option = $('<option></option>')
            .val(item.id)
            .text(item.Descricao);
        $select.append(option);
    });
}

function preencherSelectComArray(array, selectId) {
    const $select = $(`#${selectId}`);
    $select.empty();

    // Adiciona espaço em branco no início
    $select.append($('<option></option>').val('').text(''));

    // Loop pelo array
    array.forEach(item => {
        const valor = item[0];
        const descricao = item[1];
        $select.append($('<option></option>').val(valor).text(descricao));
    });

    // Atualiza o Select2
    $select.trigger('change');
}

function formatText(item) { 
    const id = item.id;
    const descricao = item.text;
    console.log(id, descricao);
}

/*
function preencherSelect(valueId, dados) {
    const $select = $(`#${valueId}`);
    $select.empty();

    // Adiciona a opção padrão "Selecione"
    $select.append($('<option></option>').val('').text('Selecione'));

    // Adiciona as opções recebidas
    dados.forEach(item => {
        console.log(item)
        const option = $('<option></option>')
            .val(item.id)
            .text(item.Descricao);
        $select.append(option);
    });

    // Atualiza o Select2 para refletir as novas opções
    $select.trigger('change');
}
*/
export {
    preencherSelect,
    preencherSelectComArray,
    formatText
}