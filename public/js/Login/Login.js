document.getElementById('senha').addEventListener('input', function() {
    const img = this.previousElementSibling; // pega a imagem antes do input
    if (this.value.length > 0) {
        img.style.opacity = 0; // esconde com animação suave
    } else {
        img.style.opacity = 1; // mostra novamente se apagar tudo
    }
});