// 1. Captura correta dos elementos do HTML
let campoNome = document.getElementById("nome_carro");
let campoDescricao = document.getElementById("descrição"); // Mantido o ID original do seu HTML
let galeria_de_carros = document.querySelector(".galeria_de_carros");

// Array que vai armazenar os objetos de carros cadastrados
let car = [];

// Arrow function corrigida para criar o objeto do carro com Nome e Descrição
const criarCarro = (nome, descricao) => {
    return {
        nome: nome,
        descricao: descricao
    };
};

// Função para cadastrar o carro
function cadastrar_carros() {
    // Validação básica para não aceitar campos vazios
    if (campoNome.value.trim() === "" || campoDescricao.value.trim() === "") {
        alert("Por favor, preencha o nome e a descrição do carro!");
        return;
    }

    // Executa a função criadora passando os valores digitados nos inputs
    let novo_carro = criarCarro(campoNome.value, campoDescricao.value);
    
    // Adiciona o novo carro dentro do array 'car'
    car.push(novo_carro);
    console.log(novo_carro);

    // Limpa a galeria na tela antes de refazer a lista atualizada
    galeria_de_carros.innerHTML = "";

    // Loop que percorre o array 'car' criando elementos puros na memória (sem strings HTML)
    for (let i = 0; i < car.length; i++) {
        const titulo = document.createElement("h3");
        const paragrafo = document.createElement("p");

        titulo.textContent = car[i].nome;
        paragrafo.textContent = car[i].descricao;

        galeria_de_carros.appendChild(titulo);
        galeria_de_carros.appendChild(paragrafo);
    }

    // Limpa os campos de texto após o cadastro com sucesso
    novo_carro_campos();
}

// Função do botão "Remover itens" (Limpa a lista e a tela)
function remover_itens() {
    car = [];
    galeria_de_carros.innerHTML = "";
}

// Função do botão "Novo carro" (Apenas limpa os campos de texto)
function novo_carro() {
    novo_carro_campos();
}

// Função auxiliar para reaproveitar a limpeza de inputs
function novo_carro_campos() {
    campoNome.value = "";
    campoDescricao.value = "";
    campoNome.focus();
}
