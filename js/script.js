const listaVeiculos = document.querySelector(".motos__container");

// Função para enviar um POST com os dados da nova moto
async function adicionarMoto() {
    const nomeInput = document.getElementById("nomeInput");
    const marcaInput = document.getElementById("marcaInput");
    const modeloInput = document.getElementById("modeloInput");
    const placaInput = document.getElementById("placaInput");
    const anoInput = document.getElementById("anoInput");
    const opcaoInput = document.getElementById("opcaoInput")

    const nome = nomeInput.value;
    const marca = marcaInput.value;
    const modelo = modeloInput.value;
    const placa = placaInput.value;
    const ano = anoInput.value;
    const opcao = opcaoInput.value;

    try {
        const response = await fetch("http://localhost:8080/motorcycle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nome,
                brand: marca,
                model: modelo,
                plate: placa,
                year: ano,
                plan: opcao,
            }),
        });

        if (response.ok) {
            // Se a solicitação POST for bem-sucedida, atualizar a lista de motos
            buscarEMostrarMotos();
            // Limpar os campos do formulário
            nomeInput.value = "";
            marcaInput.value = "";
            modeloInput.value = "";
            anoInput.value = "";
            placaInput.value = "";
            opcaoInput.value = "";
        } else {
            console.error("Falha ao adicionar a moto.");
        }
    } catch (error) {
        console.error("Houve um erro ao adicionar a moto: " + error);
    }
}

// Adicionando um evento de clique ao botão "Cadastrar" para chamar a função adicionarMoto
const cadastrarButton = document.getElementById("cadastrarButton");
cadastrarButton.addEventListener("click", adicionarMoto);

// Função para enviar uma solicitação DELETE para remover uma moto
async function removerMoto(id) {
    try {
        const response = await fetch(`http://localhost:8080/motorcycle/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            // Se a solicitação DELETE for bem-sucedida, atualizar a lista de Motos
            buscarEMostrarMotos();
        } else {
            console.error("Falha ao remover a moto.");
        }
    } catch (error) {
        console.error("Houve um erro ao remover a moto: " + error);
    }
}

// Função para criar uma linha de moto com botões de ação
function criarLinhaMoto(moto) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${moto.id}</td>
        <td>${moto.name}</td>
        <td>${moto.brand}</td>
        <td>${moto.model}</td>
        <td>${moto.year}</td>
        <td>${moto.plate}</td>
        <td>${moto.plan}</td>
        <td>
            <button class="removerButton" data-id="${moto.id}">Remover</button>
        </td>
    `;

    const removerButton = tr.querySelector(".removerButton");
    removerButton.addEventListener("click", () => {
        const id = removerButton.getAttribute("data-id");
        removerMoto(id);
    });

    return tr;
}

// Função buscarEMostrarMotos que chama a função criarLinhaMoto
async function buscarEMostrarMotos() {
    try {
        const busca = await fetch("http://localhost:8080/motorcycle");
        const motos = await busca.json();

        const motosContainer = document.querySelector(".motos__container");
        motosContainer.innerHTML = "";

        motos.forEach((moto) => {
            motosContainer.appendChild(criarLinhaMoto(moto));
        });
    } catch (error) {
        const listaVeiculos = document.querySelector(".motos__container");
        listaVeiculos.innerHTML = `<tr><td colspan="5">Houve um erro ao carregar as motos: ${error}</td></tr>`;
    }
}

buscarEMostrarMotos();