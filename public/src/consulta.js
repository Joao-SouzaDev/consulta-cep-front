import { consultaApi } from "./comunicaAPI.js";
import { salvaListaCepLocalStorage, buscaListaCepLocalStorage } from "./localStorage.js";
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
const campoResultado = document.getElementById('card-resultado');
const containerResultado = document.getElementById('cep-resultado');


// Função para verificar qual opção de busca está selecionada
function obterOpcaoSelecionada() {
    const opcaoSelecionada = document.querySelector('input[name="inlineRadioOptions"]:checked');
    return opcaoSelecionada ? opcaoSelecionada.value : null;
}


async function consultaEndereco() {
    let listaCep = buscaListaCepLocalStorage();
    mostrarLoading();
    // Verifica se CEP ja foi pesquisado
    var opcao = obterOpcaoSelecionada();
    if (opcao === null) {
        campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Por favor, selecione uma opção de busca.</div>';
        containerResultado.classList.add('show');
        return;
    }
    if (opcao === 'opcao-cep') {
        const cepInformado = document.getElementById('cep');
        if (cepInformado.value === "" || cepInformado.value.length < 9) {
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