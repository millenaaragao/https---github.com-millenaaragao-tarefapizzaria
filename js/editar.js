document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('editForm'); 
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const userId = localStorage.getItem('userId'); 
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value 
        };

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (userData.password && !passwordRegex.test(userData.password)) {
            mensagem.textContent = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
            return;
        }

        fetch(`http://localhost:8000/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                mensagem.textContent = `Usuário ${userData.name} foi atualizado com sucesso!`;
                form.reset();
            } else {
                mensagem.textContent = 'Erro na atualização: ' + data.message;
            }
        })
        .catch(error => {
            console.error("Erro ao realizar a atualização:", error);
            mensagem.textContent = 'Erro ao realizar a atualização. Tente novamente.';
        });
    });
});
