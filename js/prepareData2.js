function showData() {
    let data = JSON.parse(localStorage.getItem("tokenData"));
    let dias = document.getElementById('data');

    dias.innerHTML = `[${data.days}]`
}