function controlaConteudo(idNovoConteudo) {
    const divPrinciapal = document.getElementById('container-principal');
    divPrinciapal.innerHTML = '';
    const novoConteudo = document.getElementById(idNovoConteudo);
    divPrinciapal.appendChild(novoConteudo)
}

