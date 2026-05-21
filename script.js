// 1. Captura correta dos elementos do HTML (Usando as suas novas variáveis)
let campoNome = document.getElementById("nome_carro");
let campoDescricao = document.getElementById("descrição"); 
let galeria_de_carros = document.querySelector(".galeria_de_carros");


let descricao = document.querySelector("#descrição"); 
let nome = document.querySelector("#nome_carro"); 
let input_com_imagem = document.getElementById("input_com_imagem");

// Array que vai armazenar os objetos de carros cadastrados
let car = [];

// Arrow function atualizada para incluir a imagem no objeto do carro
const criarCarro = (nome, descricao, imagem) => {
    return {
        nome: nome,
        descricao: descricao,
        imagem: imagem // Guarda o caminho da imagem aqui
    };
};

// Função para cadastrar o carro
function cadastrar_carros() {
    // Validação básica para não aceitar campos vazios
    if (campoNome.value.trim() === "" || campoDescricao.value.trim() === "") {
        alert("Por favor, preencha o nome e a descrição do carro!");
        return;
    }

    // Pega o arquivo de imagem que o usuário selecionou no computador
    let arquivo = input_com_imagem.files[0];
    let caminhoImagem = "";

    // Se o usuário escolheu um arquivo, cria um link temporário para ele
    if (arquivo) {
        caminhoImagem = URL.createObjectURL(arquivo);
    }

    // Executa a função criadora passando Nome, Descrição e a Imagem
    let novo_carro = criarCarro(campoNome.value, campoDescricao.value, caminhoImagem);
    
    // Adiciona o novo carro dentro do array 'car'
    car.push(novo_carro);
    console.log(novo_carro);

    // Limpa a galeria na tela antes de refazer a lista atualizada
    galeria_de_carros.innerHTML = "";

    // Loop que percorre o array 'car' criando elementos puros na memória
        // Loop que percorre o array 'car' criando elementos puros na memória
    for (let i = 0; i < car.length; i++) {
        // CORREÇÃO: Cria uma caixinha (div) para o carro e adiciona a classe do seu CSS
        const cartao = document.createElement("div");
        cartao.classList.add("cartao-item");

        const titulo = document.createElement("h3");
        const paragrafo = document.createElement("p");
        const imagem = document.createElement("img"); 
        const button = document.createElement("div");
        button.innerHTML = `
             
         <button id="remover" onclick="removerelement()">Remover itens</button>
           
          
        
        `

        titulo.textContent = car[i].nome;
        paragrafo.textContent = car[i].descricao;
        
        // Se houver uma imagem cadastrada, define o link dela e adiciona no cartão
        if (car[i].imagem !== "") {
            imagem.src = car[i].imagem;
            imagem.style.width = "100%"; // Ajustado para ocupar a largura do cartão
            imagem.style.borderRadius = "4px"; // Arredonda os cantos da imagem
            cartao.appendChild(imagem);
        }

        // Coloca o título e o parágrafo dentro da caixinha do carro
        cartao.appendChild(titulo);
        cartao.appendChild(paragrafo);

        // Coloca a caixinha completa dentro da galeria principal
        galeria_de_carros.appendChild(cartao);
    }

    

    // Limpa os campos de texto após o cadastro com sucesso
    novo_carro_campos();
}

// Função do botão "Remover itens" (Limpa a lista e a tela)
function remover_itens() {
    car = [];
    galeria_de_carros.innerHTML = "";
    
}

function removerelement(indice) {
car.splice (indice, 1); //remover elemento do array
localStorage.setItem("car", JSON.stringify(cadastrar_carros));

}



// Função do botão "Novo carro" (Apenas limpa os campos de texto)
function novo_carro() {
    novo_carro_campos();
}

// Função auxiliar para reaproveitar a limpeza de inputs
function novo_carro_campos() {
    campoNome.value = "";
    campoDescricao.value = "";
    input_com_imagem.value = ""; // Limpa o campo de seleção de arquivo
    campoNome.focus();
}
