import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

document.addEventListener('DOMContentLoaded', function () {
    // Certifique-se de que 'supabase' está definido antes de usá-lo
    if (typeof supabase !== 'undefined') {
        // Crie o cliente Supabase
        const _supabase = createClient('project link', 'password schema');

        // Adicione um ouvinte de evento ao formulário de login
        document.getElementById('loginForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Exemplo de uso do Supabase
            const { data, error } = await _supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error('Erro ao fazer login:', error);

                /* 
                *
                *
                mensagem de erro  aqui
                *
                *
                */

            } else {
                // console.log('Usuário logado:', data);
                let pointer = data.user.email;

                localStorage.setItem("sessionSecret", data.session.access_token);
                localStorage.setItem("sessionEmail", pointer);
                
                async function sendAllData() {
                    const { data, error } = await _supabase
                        .from('detailsUser') // Seleciona a tabela
                        .select("event_hash")
                        .eq('email', pointer) // Filtra pelo e-mail do usuário

                    localStorage.setItem("hash", data[0].event_hash);
                    
                    window.location.href = './tokenRegister.html';
                }

                sendAllData();
            }
        });
    } else {
        console.error('Supabase is not initialized');
    }
});