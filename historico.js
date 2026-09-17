const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

const hoje = new Date();

document.getElementById("mes-historico").textContent =
  meses[hoje.getMonth()] + " de " + hoje.getFullYear();
  const listaGastos = document.getElementById("lista-gastos");
const gastosSalvos = JSON.parse(localStorage.getItem("gastos")) || [];
const nomesCategorias = {
  alimentacao: "Alimentação",
  transporte: "Transporte",
  moradia: "Moradia",
  saude: "Saúde",
  educacao: "Educação",
  lazer: "Lazer",
  compras: "Compras",
  servicos: "Serviços",
  "contas-taxas": "Contas e Taxas",
  outros: "Outros"
};
 gastosSalvos.forEach(function(gasto, indice) {
  const item = document.createElement("div");
  item.classList.add("item-gasto");
item.dataset.tipo = gasto.tipo;
item.dataset.indeice = indice;
item.dataset.data = gasto.data;
  item.innerHTML = `
    <div class="icone-moeda">$</div>

    <div class="info-gasto">
      <strong>${gasto.nome}</strong>
      <span>${nomesCategorias[gasto.categoria] || gasto.categoria} • ${gasto.tipo === "necessidade" ? "Necessidade" : "Desejo"}</span>
    </div>

    <div class="valor-data">
      <strong class="${gasto.tipo}">
        ${gasto.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
      </strong>
      <span>${gasto.data.split("-").reverse().slice(0, 2).join("/")}</span>
    </div>
  `;

  listaGastos.appendChild(item);
});
const botoesFiltro = document.querySelectorAll(".filtro-btn");

botoesFiltro.forEach(function(botao) {
  botao.addEventListener("click", function() {
    botoesFiltro.forEach(function(outroBotao) {
      outroBotao.classList.remove("ativo");
    });

    botao.classList.add("ativo");
   tipoSelecionado = botao.dataset.filtro;
   console.log("Filtro selecionado:", tipoSelecionado);
 aplicarFiltros();
  });
});
const seletorMes = document.getElementById("seletor-mes");
const anoSeletor = document.getElementById("ano-seletor");
const botoesMes = document.querySelectorAll(".meses-grid button");

const dataHoje = new Date();
const mesAtual = dataHoje.getMonth();
const anoAtual = dataHoje.getFullYear();
let mesSelecionado = mesAtual;
let tipoSelecionado = "todos";
function aplicarFiltros() {
  const itensGasto = document.querySelectorAll(".item-gasto");

  itensGasto.forEach(function(item) {
    const data = item.dataset.data;

    if (!data) return;

    const partes = data.split("-");
    const mesDoGasto = Number(partes[1]) - 1;
    const anoDoGasto = Number(partes[0]);

    const passaMes =
      mesDoGasto === mesSelecionado &&
      anoDoGasto === anoAtual;

    const passaTipo =
      tipoSelecionado === "todos" ||
      item.dataset.tipo === tipoSelecionado;
console.log(
  "tipoSelecionado:", tipoSelecionado,
  "item.dataset.tipo:", item.dataset.tipo,
  "passatipo", passaTipo
);
    item.style.display =
      passaMes && passaTipo ? "flex" : "none";
  });
}
aplicarFiltros();
anoSeletor.textContent = anoAtual;
const botaoCalendario = document.querySelector(".botao-calendario");
botaoCalendario.addEventListener("click", function() {
  seletorMes.classList.toggle("oculto");
});

botoesMes.forEach(function(botao) {
  botao.addEventListener("click", function() {
 mesSelecionado = Number(botao.dataset.mes);


  botoesMes.forEach(function(outroBotao) {
    outroBotao.classList.remove("ativo");
  });

  botao.classList.add("ativo");

  const itensGasto = document.querySelectorAll(".item-gasto");

  itensGasto.forEach(function(item) {
    const data = item.dataset.data;

    if (!data) return;

    const partes = data.split("-");
    const mesDoGasto = Number(partes[1]) - 1;
    const anoDoGasto = Number(partes[0]);

    if (mesDoGasto === mesSelecionado && anoDoGasto === anoAtual) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });

  document.getElementById("mes-historico").textContent =
    meses[mesSelecionado] + " de " + anoAtual;

  seletorMes.classList.add("oculto");
});
  const numeroMes = Number(botao.dataset.mes);

  if (numeroMes > mesAtual) {
    botao.disabled = true;
  }

  if (numeroMes === mesAtual) {
    botao.classList.add("ativo");
  }
});
const modalDetalhes = document.getElementById("modal-detalhes");
const detalheNome = document.getElementById("detalhe-nome");
const detalheCategoria = document.getElementById("detalhe-categoria");
const detalheValor = document.getElementById("detalhe-valor");
const detalheData = document.getElementById("detalhe-data");
const botaoFechar = document.getElementById("botao-fechar");
const botaoExcluir = document.getElementById("botao-excluir");
let gastoSelecionado = null;
const confirmacaoExclusao = document.getElementById("confirmacao-exclusao");
const cancelarExclusao = document.getElementById("cancelar-exclusao");
const confirmarExclusao = document.getElementById("confirmar-exclusao");

botaoFechar.addEventListener("click", function() {
  modalDetalhes.classList.remove("aberto");
});
const itensGasto = document.querySelectorAll(".item-gasto");
itensGasto.forEach(function(item) {
  item.addEventListener("click", function() {
    gastoSelecionado = item;
    const nome = item.querySelector(".info-gasto strong").textContent;
    const categoria = item.querySelector(".info-gasto span").textContent;
    const valor = item.querySelector(".valor-data strong").textContent;
    const data = item.querySelector(".valor-data span").textContent;

    detalheNome.textContent = nome;
    detalheCategoria.textContent = categoria;
    detalheValor.textContent = valor;
    detalheData.textContent = data;

    modalDetalhes.classList.add("aberto");
  });
});
botaoExcluir.addEventListener("click", function() {
  if (!gastoSelecionado) return;

  confirmacaoExclusao.classList.add("aberto");
});
cancelarExclusao.addEventListener("click", function() {
  confirmacaoExclusao.classList.remove("aberto");
});
confirmarExclusao.addEventListener("click", function(event) {
  event.stopPropagation()

  if (!gastoSelecionado) return;

  const indice = Number(gastoSelecionado.dataset.indeice);
  const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

  gastos.splice(indice, 1);
  localStorage.setItem("gastos", JSON.stringify(gastos));

location.reload();

  confirmacaoExclusao.classList.remove("aberto");
  modalDetalhes.classList.remove("aberto");
  gastoSelecionado = null;
});