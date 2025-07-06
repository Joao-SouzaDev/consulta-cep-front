function buscaListaCepLocalStorage() {
    const listaCep = JSON.parse(localStorage.getItem('listaCep')) || [];
    return listaCep;
}
function salvaListaCepLocalStorage(listaCep) {
    localStorage.setItem('listaCep', JSON.stringify(listaCep));
}

export { buscaListaCepLocalStorage, salvaListaCepLocalStorage };