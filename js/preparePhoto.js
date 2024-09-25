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

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

document.addEventListener('DOMContentLoaded', function () {
    // let access_token = localStorage.getItem("sessionSecret");

    if (typeof supabase !== 'undefined') {

        const _supabase = createClient('project link', "password schema");

        let myInput = document.getElementById('myFileInput');
        let tokenData = JSON.parse(localStorage.getItem('tokenData'));
        let pointer = localStorage.getItem('sessionEmail');
        let next = document.getElementById('seguinte');
        let personName;
        let photoLink;
        let userId;
        let token = localStorage.getItem('token');

        next.style.display = 'none';

        //funcao para enviar foto
        myInput.addEventListener('change', async function (e) {

            myInput.style.display = 'none';
            next.style.display = 'block';

            const avatarFile = e.target.files[0]
            const fileExtension = avatarFile.name.split('.').pop(); // Obtém a extensão do arquivo
            photoLink = `${Math.random().toString(16).substr(2)}.${fileExtension}`; // Adiciona a extensão ao link

            const reader = new FileReader();
            reader.onload = function (e) {
                const previewImage = document.getElementById('previewImage');
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                document.querySelector('.custom-file-label i').style.display = 'none';
            };
            reader.readAsDataURL(avatarFile);

            const { data, error } = await _supabase
                .storage
                .from('i9Face-auth')
                .upload(`i9Face-auth/${photoLink}`, avatarFile, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) {
                console.error(error);
                return;
            }
        });

        next.addEventListener('click', async () => {
            sendAllData();
        });

        async function sendAllData() {
            const { data, error } = await _supabase
                .from('detailsUser') // Seleciona a tabela
                .update({
                    phone_authentication: `bucket link https://projectlink.com/bucket/bucket_name/bucket_folder${photoLink}`,
                    event_hash: [tokenData.hash],
                    dias: tokenData.days,
                    setor: tokenData.sector
                })
                .select()
                .eq('email', pointer) // Filtra pelo e-mail do usuário

            personName = data[0].display_name;

            sendController(); // Chama a função para enviar dados ao controller
        }

        async function sendController() {
            const url = `API link with endpoint`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "name": personName, "door": tokenData.door })
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();

                userId = JSON.parse(json.userID);

                saveDataFinish()
            } catch (error) {
                console.error(error.message);
                window.location.href = './error.html';
            }
        }

        async function saveDataFinish() {
            const { data, error } = await _supabase
                .from('detailsUser') // Seleciona a tabela
                .update({ userID: userId })
                .select()
                .eq('email', pointer) // Filtra pelo e-mail do usuário

            saveDB();
        }

        async function saveDB() {
            const url = `API link with endpoint`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": personName,
                        "photo": photoLink,
                        "token": token,
                        "email": pointer
                    })
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();

                deleteTokenPass();
            } catch (error) {
                console.error(error.message);
                window.location.href = './error.html';
            }
        }

        async function deleteTokenPass() {
            const url = `API link with endpoint + ${token}`;
            try {
                const response = await fetch(url, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();

                window.location.href = './finalization.html';
            } catch (error) {
                console.error(error.message);
                window.location.href = './error.html';
            }
        }
    } else {
        console.error('Supabase is not initialized');
    }
});