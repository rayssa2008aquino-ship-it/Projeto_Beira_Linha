/* ==========================================
   CAPTURA DOS ELEMENTOS HTML
========================================== */
// Elementos da página de cadastro (podem ser null na index)
let campoNome = document.getElementById("nome_carro");
let campoMarca = document.getElementById("marca");
let campoAno = document.getElementById("ano");
let campoCor = document.getElementById("cor");
let campoCategoria = document.getElementById("categoria");
let campoDescricao = document.getElementById("descricao");
let input_com_imagem = document.getElementById("input_com_imagem");

// Elementos da página principal (index)
let galeria_de_carros = document.querySelector(".galeria_de_carros");
const texto_pesquisa = document.querySelector("#texto_pesquisa");
const limpar_filtro = document.querySelector("#limpar_filtro");

const total_carros = document.getElementById("total_carros");
const total_favoritos = document.getElementById("total_favoritos");

/* ==========================================
   EVENTOS
========================================== */
if (texto_pesquisa) {
  texto_pesquisa.addEventListener("input", function () {
    ListaComFiltro();
  });
}

if (limpar_filtro) {
  limpar_filtro.addEventListener("click", function () {
    texto_pesquisa.value = "";
    ListaSemFiltro();
  });
}

/* ==========================================
   ARRAY DE CARROS (Carregado do LocalStorage)
========================================== */
let car = JSON.parse(localStorage.getItem("meus_carros")) || [];

/* ==========================================
   CRIAÇÃO DO OBJETO
========================================== */
function criarCarro(nome, marca, ano, cor, categoria, descricao, imagem) {
  return { 
    nome, 
    marca, 
    ano, 
    cor, 
    categoria, 
    descricao, 
    imagem,
    favorito: false 
  };
}

/* ==========================================
   CADASTRAR CARRO
========================================== */
function cadastrar_carros() {
  // Verifica se os campos existem na página atual antes de prosseguir
  if (!campoNome || !campoMarca || !campoAno) return;

  if (
    campoNome.value.trim() === "" ||
    campoMarca.value.trim() === "" ||
    campoAno.value.trim() === ""
  ) {
    alert("Preencha Nome, Marca e Ano.");
    return;
  }

  let arquivo = input_com_imagem ? input_com_imagem.files[0] : null;

  if (arquivo) {
    let leitor = new FileReader();
    leitor.onloadend = function () {
      salvarCarroNoArray(leitor.result);
    };
    leitor.readAsDataURL(arquivo);
  } else {
    salvarCarroNoArray("");
  }
}

function salvarCarroNoArray(caminhoImagem) {
  if (!campoNome) return;

  let novoCarro = criarCarro(
    campoNome.value,
    campoMarca.value,
    campoAno.value,
    campoCor.value,
    campoCategoria.value,
    campoDescricao.value,
    caminhoImagem
  );

  car.push(novoCarro);
  localStorage.setItem("meus_carros", JSON.stringify(car));

  atualizarEstatisticas();
  ListaSemFiltro();
  limparCampos();

  alert("Carro cadastrado com sucesso!");
}

/* ==========================================
   MOSTRAR TODOS OS CARROS
========================================== */
function ListaSemFiltro() {
  if (!galeria_de_carros) return;

  galeria_de_carros.innerHTML = "";

  // Se não houver carros, exibe uma mensagem amigável
  if (car.length === 0) {
    galeria_de_carros.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888;'>Nenhum carro cadastrado ainda. Vá em 'Cadastro de Carros'!</p>";
    return;
  }

  for (let i = 0; i < car.length; i++) {
    criarCard(car[i], i);
  }
}

/* ==========================================
   FILTRO DE PESQUISA
========================================== */
function ListaComFiltro() {
  if (!galeria_de_carros || !texto_pesquisa) return;

  galeria_de_carros.innerHTML = "";
  let pesquisa = texto_pesquisa.value.toLowerCase();

  for (let i = 0; i < car.length; i++) {
    if (
      car[i].nome.toLowerCase().includes(pesquisa) ||
      car[i].marca.toLowerCase().includes(pesquisa) ||
      car[i].ano.toString().includes(pesquisa)
    ) {
      criarCard(car[i], i);
    }
  }
}

/* ==========================================
   CRIAR CARD HTML
========================================== */
function criarCard(carro, indice) {
  if (!galeria_de_carros) return;

  const cartao = document.createElement("div");
  cartao.classList.add("cartao-item");

  if (carro.imagem && carro.imagem !== "") {
    const imagem = document.createElement("img");
    imagem.src = carro.imagem;
    imagem.alt = `Foto do ${carro.nome}`;
    imagem.style.width = "100%";
    cartao.appendChild(imagem);
  }

  const titulo = document.createElement("h3");
  titulo.textContent = carro.nome;

  const descricao = document.createElement("p");
  descricao.innerHTML = `
    <strong>Marca:</strong> ${carro.marca}<br>
    <strong>Ano:</strong> ${carro.ano}<br>
    <strong>Cor:</strong> ${carro.cor}<br>
    <strong>Categoria:</strong> ${carro.categoria}<br><br>
    ${carro.descricao}
  `;

  const botaoFavoritar = document.createElement("button");
  botaoFavoritar.textContent = carro.favorito ? "⭐ Favoritado" : "☆ Favoritar";
  botaoFavoritar.style.marginRight = "5px";
  botaoFavoritar.onclick = function () {
    alternarFavorito(indice);
  };

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.onclick = function () {
    removerelement(indice);
  };

  cartao.appendChild(titulo);
  cartao.appendChild(descricao);
  cartao.appendChild(botaoFavoritar);
  cartao.appendChild(botaoRemover);

  galeria_de_carros.appendChild(cartao);
}

/* ==========================================
   FUNÇÃO DE FAVORITAR
========================================== */
function alternarFavorito(indice) {
  car[indice].favorito = !car[indice].favorito;
  localStorage.setItem("meus_carros", JSON.stringify(car));
  
  atualizarEstatisticas();
  ListaSemFiltro();
}

/* ==========================================
   REMOVER UM CARRO
========================================== */
function removerelement(indice) {
  car.splice(indice, 1);
  localStorage.setItem("meus_carros", JSON.stringify(car));

  atualizarEstatisticas();
  ListaSemFiltro();
}

/* ==========================================
   ATUALIZAR ESTATÍSTICAS
========================================== */
function atualizarEstatisticas() {
  if (total_carros) {
    total_carros.textContent = car.length;
  }
  
  if (total_favoritos) {
    const qtdFavoritos = car.filter(carro => carro.favorito).length;
    total_favoritos.textContent = qtdFavoritos;
  }
}

/* ==========================================
   LIMPAR CAMPOS DO FORMULÁRIO
========================================== */
function limparCampos() {
  if (campoNome) {
    campoNome.value = "";
    campoMarca.value = "";
    campoAno.value = "";
    campoCor.value = "";
    campoCategoria.value = "";
    campoDescricao.value = "";
    if (input_com_imagem) input_com_imagem.value = "";

    let preview = document.getElementById("preview_imagem");
    if (preview) preview.style.display = "none";

    campoNome.focus();
  }
}

/* ==========================================
   CARROSSEL AUTOMÁTICO
========================================== */
let slideIndex = 0;
function moverCarrossel() {
  const slides = document.querySelector(".slides");
  if (slides) {
    const imagens = slides.querySelectorAll("img");
    if (imagens.length === 0) return;
    
    slideIndex++;
    if (slideIndex >= imagens.length) {
      slideIndex = 0;
    }
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  }
}

if (document.querySelector(".carrossel")) {
  setInterval(moverCarrossel, 1000);
}

/* ==========================================
   FILTRAR POR CATEGORIA (Ao clicar nas imagens do Grid)
========================================== */
function filtrarPorCategoria(nomeCategoria) {
  if (!galeria_de_carros) return;

  // Limpa os cards exibidos atualmente
  galeria_de_carros.innerHTML = "";
  
  let categoriaPesquisada = nomeCategoria.toLowerCase();
  let carrosEncontrados = 0;

  for (let i = 0; i < car.length; i++) {
    // Verifica se o carro possui uma categoria definida e se ela bate com a selecionada
    if (car[i].categoria && car[i].categoria.toLowerCase() === categoriaPesquisada) {
      criarCard(car[i], i);
      carrosEncontrados++;
    }
  }

  // Caso nenhum carro tenha sido cadastrado nessa categoria ainda
  if (carrosEncontrados === 0) {
    galeria_de_carros.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center; color: #888; margin-top: 20px;">
        Nenhum carro cadastrado na categoria "${nomeCategoria}" ainda.
      </p>
    `;
  }
}

/* ==========================================
   INICIAR SISTEMA
========================================== */
if (galeria_de_carros) {
  ListaSemFiltro();
}

atualizarEstatisticas();