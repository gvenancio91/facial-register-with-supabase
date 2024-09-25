if ((localStorage.getItem("sessionSecret") == null) || (localStorage.getItem("sessionSecret") == undefined))
    window.location.href = './index.html';

let token;
let hash = localStorage.getItem("hash");

console.log(hash);

function avaliateToken() {
    token = document.querySelector('#token').value;
    console.log(token);
    getToken();
}

async function getToken() {
    const url = `API link with endpoint + ${token}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        localStorage.setItem('token', token);
        localStorage.setItem("tokenData", JSON.stringify(json));

        if ((hash == json.hash))
            console.log('ERRO: Você já se cadastrou para este evento');

            /* 
            *
            *
            mensagem de erro aqui...
            * 
            * 
            */

        else
            window.location.href = './preparation1.html'; //alterar dps

    } catch (error) {
        console.log("ERRO: Token inexistente, ou já utilizado");

        /* 
        *
        *
        mensagem de erro aqui...
        * 
        * 
        */
    }
}