
export async function consultaApi(cep, estado, cidade, logradouro) {
    if (cep) {
        return await fetch(`http://localhost:8080/cep/${cep}`)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    }
    else if (estado && cidade && logradouro) {
        return await fetch(`http://localhost:8080/cep?estado=${estado}&cidade=${cidade}&logradouro=${logradouro}`)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    }
    else {
        return null;
    }

}