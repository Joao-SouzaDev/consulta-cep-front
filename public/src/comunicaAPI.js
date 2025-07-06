const botaoConsultar = document.getElementById('botao-consultar')
botaoConsultar.addEventListener('click', async () => {
    await consultaApi();
})
const campoResultado = document.getElementById('card-resultado');
const containerResultado = document.getElementById('cep-resultado');

async function consultaApi() {
    const cepInformado = document.getElementById('cep');
    if (cepInformado.value === "") {
        campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> O CEP precisa ser informado</div>'
        containerResultado.classList.add('show');
        return;
    }

    // Mostra o loading
    mostrarLoading();

    await fetch(`http://localhost:8080/cep/${cepInformado.value}`)
        .then(response => response.json())
        .then(data => {
            campoResultado.innerHTML = montaCardResultado(
                data.cep,
                data.logradouro,
                data.bairro,
                data.cidade,
                data.uf
            );
            containerResultado.classList.add('show');
        })
        .catch(error => {
            console.log(error);
            campoResultado.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Erro ao consultar CEP</div>';
            containerResultado.classList.add('show');
        });
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

function mostrarLoading() {
    containerResultado.classList.add('show');
    campoResultado.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="loading"></div>
            <p style="margin-top: 1rem; color: #666;">Consultando CEP...</p>
        </div>
    `;
}