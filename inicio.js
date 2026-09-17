const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
const dataAtual = new Date();
document.getElementById("mes-atual").textContent = meses[dataAtual.getMonth()];
const nomeSalvo = localStorage.getItem("nomeUsuario");
document.getElementById("nome-usuario").textContent = nomeSalvo;
const dicas = [
  "Antes de comprar, pergunte-se: eu realmente preciso disso?",
  "Compare preços antes de comprar. Pequenas diferenças também viram economia.",
  "Evite compras por impulso. Espere um pouco antes de decidir.",
  "Defina um limite de gastos para o dia e tente respeitá-lo.",
  "Priorize suas necessidades antes dos seus desejos.",
  "Anote seus gastos. Saber para onde o dinheiro vai facilita o controle.",
  "Antes de parcelar, confira se as parcelas cabem nos próximos meses."
];
const indiceDica = Math.floor(Date.now() / 86400000) % dicas.length;
document.getElementById("texto-dica").textContent = dicas[indiceDica];
const botaoAdicionar = document.querySelector(".adicionar-gasto");
const modalGasto = document.getElementById("modal-gasto");
const botaoFecharModal = document.getElementById("fechar-modal");
botaoFecharModal.addEventListener("click", function() {
  modalGasto.style.display = "none";
});
botaoAdicionar.addEventListener("click", function() {
  modalGasto.style.display = "flex";
});
const botaoNecessidade = document.getElementById("tipo-necessidade");
const botaoDesejo = document.getElementById("tipo-desejo");
botaoNecessidade.addEventListener("click", function() {
  botaoNecessidade.classList.add("ativo");
  botaoDesejo.classList.remove("ativo");
});
botaoDesejo.addEventListener("click", function() {
  botaoDesejo.classList.add("ativo");
  botaoNecessidade.classList.remove("ativo");
});
const botaoSalvar = document.getElementById("salvar-gasto");
const campoNome = document.getElementById("nome-compra");
const campoValor = document.getElementById("valor-compra");
const campoCategoria = document.getElementById("categoria-compra");
const campoData = document.getElementById("data-compra");
botaoSalvar.addEventListener("click", function() {
    const valor = parseFloat(campoValor.value);
    if (!campoNome.value.trim() || !valor || valor <= 0 || !campoCategoria.value || !campoData.value) {
  alert("Preencha todos os campos corretamente.");
  return;
}
const tipo = botaoNecessidade.classList.contains("ativo")
  ? "necessidade"
  : "desejo";
  const novoGasto = {
  nome: campoNome.value.trim(),
  valor: valor,
  categoria: campoCategoria.value,
  data: campoData.value,
  tipo: tipo
};
const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
gastos.push(novoGasto);
localStorage.setItem("gastos", JSON.stringify(gastos));
atualizarResumo();
campoNome.value = "";
campoValor.value = "";
campoCategoria.value = "";
campoData.value = "";

botaoNecessidade.classList.add("ativo");
botaoDesejo.classList.remove("ativo");

modalGasto.style.display = "none";
});
function atualizarResumo() {
  
const gastosSalvos = JSON.parse(localStorage.getItem("gastos")) || [];

  const agora = new Date();
  const mesAtual = agora.getMonth();
  const anoAtual = agora.getFullYear();
  
  const gastosDoMes = gastosSalvos.filter(function(gasto) {

    const [ano, mes] = gasto.data.split("-").map(Number);
    return mes - 1 === mesAtual && ano === anoAtual;
  });

const totalGasto = gastosDoMes.reduce((total, gasto) => total + gasto.valor, 0);
document.getElementById("valor-total").textContent =
  totalGasto.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  const totalNecessidades = gastosDoMes
  .filter(gasto => gasto.tipo === "necessidade")
  .reduce((total, gasto) => total + gasto.valor, 0);
 

const totalDesejos = gastosDoMes
  .filter(gasto => gasto.tipo === "desejo")
  .reduce((total, gasto) => total + gasto.valor, 0);
  document.getElementById("valor-desejos").textContent =
  totalDesejos.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  const totalCentavos = Math.round(totalGasto * 100);
const necessidadesCentavos = Math.round(totalNecessidades * 100);
const desejosCentavos = Math.round(totalDesejos * 100);

const porcentagemNecessidades =
  totalCentavos > 0 ? (necessidadesCentavos / totalCentavos) * 100 : 0;

const porcentagemDesejos =
  totalCentavos > 0 ? (desejosCentavos / totalCentavos) * 100 : 0;
  document.getElementById("porcentagem-necessidades").textContent =
  porcentagemNecessidades.toFixed(2) + "%";

document.getElementById("porcentagem-desejos").textContent =
  porcentagemDesejos.toFixed(2) + "%";
  document.getElementById("valor-necessidades").textContent =
  totalNecessidades.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
atualizarResumo();
document.getElementById("valor-desejos").textContent =
  totalDesejos.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  atualizarResumo();