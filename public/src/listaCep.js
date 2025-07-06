import { buscaListaCepLocalStorage } from './localStorage.js';
const listaCep = document.getElementById('lista-cep');
function exibirListaCep() {
    const lista = buscaListaCepLocalStorage();
    if (!lista || lista.length === 0) {
        document.getElementById('conteudo-listagem').innerHTML = '<p class="no-results">Nenhum CEP pesquisado.</p>';
        return;
    }
    listaCep.innerHTML = ''; // Limpa a lista antes de exibir os novos itens
    lista.forEach(cep => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `CEP: ${cep.cep}, Logradouro: ${cep.logradouro}, Bairro: ${cep.bairro}, Cidade: ${cep.cidade}, Estado: ${cep.estado}`;
        listaCep.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    exibirListaCep();
});