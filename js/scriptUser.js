const usuariosContainer = document.querySelector(".motos__container");

// Função para cadastrar um novo usuário
async function adicionarUsuario() {
    const nomeCompletoInput = document.getElementById("nomeCompletoInput");
    const cpfInput = document.getElementById("cpfInput");
    const dataNascimentoInput = document.getElementById("dataNascimentoInput");
    const telefoneInput = document.getElementById("telefoneInput");
    const emailInput = document.getElementById("emailInput");

    const usuario = {
        name: nomeCompletoInput.value,
        cpf: cpfInput.value,
        birth: dataNascimentoInput.value,
        phone: telefoneInput.value,
        email: emailInput.value,
    };

    try {
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            buscarEExibirUsuarios();
            // Limpar campos do formulário
            nomeCompletoInput.value = "";
            cpfInput.value = "";
            dataNascimentoInput.value = "";
            telefoneInput.value = "";
            emailInput.value = "";
        } else {
            alert("Erro ao cadastrar usuário.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
    }
}

// Função para listar os usuários cadastrados
async function buscarEExibirUsuarios() {
    try {
        const response = await fetch("http://localhost:8080/users");
        if (response.ok) {
            const usuarios = await response.json();
            usuariosContainer.innerHTML = "";

            usuarios.forEach(usuario => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.name}</td>
                    <td>${usuario.cpf}</td>
                    <td>${usuario.birth}</td>
                    <td>${usuario.phone}</td>
                    <td>${usuario.email}</td>
                    <td>
                        <button class="removerButton" data-id="${usuario.id}">Remover</button>
                    </td>
                `;

                const removerButton = tr.querySelector(".removerButton");
                removerButton.addEventListener("click", () => excluirUsuario(usuario.id));

                usuariosContainer.appendChild(tr);
            });
        } else {
            alert("Erro ao buscar usuários.");
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}

// Função para excluir um usuário
async function excluirUsuario(id) {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Usuário excluído com sucesso!");
            buscarEExibirUsuarios();
        } else {
            alert("Erro ao excluir usuário.");
        }
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
    }
}

// Adicionar evento ao botão de cadastro
const btnCadastrar = document.getElementById("btnCadastrar");
btnCadastrar.addEventListener("click", event => {
    event.preventDefault(); // Impede o recarregamento da página
    adicionarUsuario();
});

// Carregar usuários ao abrir a página
buscarEExibirUsuarios();
