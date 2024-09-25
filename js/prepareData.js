if ((localStorage.getItem("sessionSecret") != null)) {
    if (localStorage.getItem("token") != null) {
        if (localStorage.getItem("tokenData") == null)
            window.location.href = './index.html';
    } else {
        window.location.href = './index.html';
    }
} else {
    window.location.href = './index.html';
}

// logica acima veirifica se a pessoa nao esta burlando o link

function showData() {
    let data = JSON.parse(localStorage.getItem("tokenData"));
    let dias = document.getElementById('data');
    let titulo = document.getElementById('title');
    let descricao = document.getElementById('description');

    titulo.innerHTML = data.title
    dias.innerHTML = `[${data.days}]`
    descricao.innerHTML = data.description
}