
import { getApiUrl } from './config.js';

export async function consultaApi(cep, estado, cidade, logradouro) {
    const apiUrl = await getApiUrl();

    if (cep) {
        return await fetch(`${apiUrl}cep/${cep}`)
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
        return await fetch(`${apiUrl}cep?estado=${estado}&cidade=${cidade}&logradouro=${logradouro}`)
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