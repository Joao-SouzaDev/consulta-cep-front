import { consultaApi } from "./comunicaAPI.js";
import { salvaListaCepLocalStorage, buscaListaCepLocalStorage } from "./localStorage.js";
const campoResultado = document.getElementById('card-resultado');
const containerResultado = document.getElementById('cep-resultado');
//Controla form conforme opcao selecionada
const opcaoCepForm = document.getElementById('inlineRadio1');
const opcaoEnderecoForm = document.getElementById('inlineRadio2');
opcaoCepForm.addEventListener('change', () => {
    document.getElementById('cep-form').style.display = 'block';
    document.getElementById('estado-cidade-form').style.display = 'none';
    campoResultado.innerHTML = ''; // Limpa o resultado ao mudar a opção
    containerResultado.classList.remove('show'); // Esconde o container de resultado
});
opcaoEnderecoForm.addEventListener('change', () => {
    document.getElementById('cep-form').style.display = 'none';
    document.getElementById('estado-cidade-form').style.display = 'block';
    campoResultado.innerHTML = ''; // Limpa o resultado ao mudar a opção
    containerResultado.classList.remove('show'); // Esconde o container de resultado
});
const botaoConsultar = document.getElementById('botao-consultar')
botaoConsultar.addEventListener('click', async () => {
    await consultaEndereco();
})
// Adicionado segundo botao para consultar endereço para evitar conflito com o botao de consultar CEP
const botaoConsultarEndereco = document.getElementById('botao-consultar-endereco');
botaoConsultarEndereco.addEventListener('click', async () => {
    await consultaEndereco();
});




async function consultaEndereco() {
    mostrarLoading();
    if (opcaoCepForm.checked === true) {
        try {
            await processaBuscaCep();
        } catch (error) {
            console.error('Erro ao consultar CEP:', error);
            campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Ocorreu um erro ao consultar o CEP. Por favor, tente novamente mais tarde.</div>';
            containerResultado.classList.add('show');
        }
    } else { // Se a opção de Endereço estiver selecionada
        try {
            await processaBuscaEstadoCidade();
        } catch (error) {
            console.error('Erro ao consultar endereço:', error);
            campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Ocorreu um erro ao consultar o endereço. Por favor, tente novamente mais tarde.</div>';
            containerResultado.classList.add('show');
        }
    }
}

function mostrarLoading() {
    containerResultado.classList.add('show');
    campoResultado.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="loading"></div>
            <p style="margin-top: 1rem; color: #666;">Consultando CEP...</p>
        </div>
    `;
}
async function processaBuscaEstadoCidade() {
    let listaCep = buscaListaCepLocalStorage();
    const estadoInput = document.getElementById('estado');
    const cidadeInput = document.getElementById('cidade');
    const logradouroInput = document.getElementById('logradouro');
    if (estadoInput.value === "" || cidadeInput.value === "" || logradouroInput.value === "") {
        campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Por favor, informe o estado e a cidade.</div>';
        containerResultado.classList.add('show');
        return;
    }
    if (estadoInput.value.length !== 2) {
        campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> A UF deve ser informado com 2 letras.</div>';
        containerResultado.classList.add('show');
        return;
    }
    mostrarLoading();
    try {
        let resultado = await consultaApi(null, estadoInput.value, cidadeInput.value, logradouroInput.value);
        if (resultado && resultado.length > 0) {
            var lista = document.createElement('ul');
            lista.className = 'list-group';
            campoResultado.innerHTML = '';
            resultado.forEach(item => {
                let cepExistente = listaCep.find(ender => ender.cep === item.cep);
                if (!cepExistente)
                    listaCep.push(item); // Salva a lista de resultados no localStorage
                var itemLista = document.createElement('li');
                itemLista.className = 'list-group-item';
                itemLista.innerHTML = montaCardResultado(
                    item.cep,
                    item.logradouro,
                    item.bairro,
                    item.cidade,
                    item.uf
                );
                lista.appendChild(itemLista);
            });
            campoResultado.appendChild(lista);
            containerResultado.classList.add('show');
        } else {
            campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Nenhum resultado encontrado.</div>';
            containerResultado.classList.add('show');
        }
        salvaListaCepLocalStorage(listaCep); // Salva a lista de CEPs no localStorage
    } catch (error) {
        console.error('Erro ao consultar endereço:', error);
        campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Ocorreu um erro ao consultar o endereço. Por favor, tente novamente mais tarde.</div>';
        containerResultado.classList.add('show');
    }
}

async function processaBuscaCep() {
    let listaCep = buscaListaCepLocalStorage();
    const cepInformado = document.getElementById('cep');
    if (cepInformado.value === "" || cepInformado.value.length < 8) {
        campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Por favor, informe um CEP válido.</div>';
        containerResultado.classList.add('show');
        return;
    }
    // Verifica se o CEP já foi pesquisado
    let cepExistente = listaCep.find(item => item.cep === cepInformado.value);
    if (cepExistente) {
        campoResultado.innerHTML = montaCardResultado(
            cepExistente.cep,
            cepExistente.logradouro,
            cepExistente.bairro,
            cepExistente.cidade,
            cepExistente.uf
        );
        containerResultado.classList.add('show');
        return;
    }
    try {
        let resultado = await consultaApi(cepInformado.value, null, null, null)
        if (resultado.cep) {
            // Verifica se o CEP já existe na lista antes de adicionar
            let cepDuplicado = listaCep.find(item => item.cep === resultado.cep);
            if (!cepDuplicado) {
                listaCep.push(resultado);
            }
            campoResultado.innerHTML = montaCardResultado(
                resultado.cep,
                resultado.logradouro,
                resultado.bairro,
                resultado.cidade,
                resultado.uf
            );
        } else {
            campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> CEP não encontrado ou inválido.</div>';
        }
        salvaListaCepLocalStorage(listaCep);
    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Ocorreu um erro ao consultar o CEP. Por favor, tente novamente mais tarde.</div>';
        containerResultado.classList.add('show');
        return;
    }
}
function montaCardResultado(cep, logradouro, bairro, cidade, uf) {
    return `
        <h3><i class="fas fa-check-circle" style="color: #28a745;"></i> CEP Encontrado</h3>
        <div class="resultado-item">
            <span class="resultado-label">
                <i class="fas fa-map-marker-alt"></i>
                CEP:
            </span>
            <span class="resultado-valor">${cep || 'Não informado'}</span>
        </div>
        <div class="resultado-item">
            <span class="resultado-label">
                <i class="fas fa-road"></i>
                Logradouro:
            </span>
            <span class="resultado-valor">${logradouro || 'Não informado'}</span>
        </div>
        <div class="resultado-item">
            <span class="resultado-label">
                <i class="fas fa-building"></i>
                Bairro:
            </span>
            <span class="resultado-valor">${bairro || 'Não informado'}</span>
        </div>
        <div class="resultado-item">
            <span class="resultado-label">
                <i class="fas fa-city"></i>
                Cidade:
            </span>
            <span class="resultado-valor">${cidade || 'Não informado'}</span>
        </div>
        <div class="resultado-item">
            <span class="resultado-label">
                <i class="fas fa-flag"></i>
                Estado:
            </span>
            <span class="resultado-valor">${uf || 'Não informado'}</span>
        </div>
    `;
}