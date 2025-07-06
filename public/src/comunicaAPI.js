const botaoConsultar = document.getElementById('bota-consultar')
botaoConsultar.addEventListener('click', async () => {
    await consultaApi();
})
const campoResultado = document.getElementById('cep-resultado');
async function consultaApi() {
    const cepInformado = document.getElementById('cep');
    if (cepInformado.value === "") {
        campoResultado.innerHTML = 'O Cep precisa ser informado'
        return;
    }
    await fetch(`http://localhost:8080/cep/${cepInformado.value}`)
        .then(response => response.text())
        .then(data => campoResultado.innerHTML = data)
        .catch(error => console.log(error));
}