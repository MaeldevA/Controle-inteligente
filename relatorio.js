const botaoCalendario = document.querySelector('.botao-calendario');
const seletorMes = document.querySelector('.seletor-mes');

botaoCalendario.addEventListener('click', function() {
  seletorMes.classList.toggle('oculto');
});
const hoje = new Date();
const mesAtual = hoje.getMonth();
let mesSelecionado = mesAtual;

const botoesMes = document.querySelectorAll(".meses-grid button");
const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
const textoMesRelatorio = document.getElementById("mes-relatorio");
const graficoRosca = document.querySelector(".grafico-rosca");
const totalRelatorio = document.getElementById("total-relatorio");
const necessidadesRelatorio = document.getElementById("necessidades-relatorio");
const desejosRelatorio = document.getElementById("desejos-relatorio");
const quadroStatus = document.getElementById("quadro-status");
const fraseStatus = document.getElementById("frase-status");
const complementoStatus = document.getElementById("complemento-status");
const bocaStatus = document.getElementById("boca-status");
const olhosStatus = document.querySelectorAll(".olho");
const anoAtual = hoje.getFullYear();
textoMesRelatorio.textContent =
  `${nomesMeses[mesAtual]} de ${anoAtual}`;
  const textoAnoSeletor = document.getElementById("ano-seletor");
textoAnoSeletor.textContent = anoAtual;

botoesMes.forEach(function(botao) {
    const mesDoBotao = Number(botao.dataset.mes);

    if (mesDoBotao > mesAtual) {
      botao.disabled = true;
    }
     });
  botoesMes.forEach(function(botao) {
 const mesDoBotao = Number(botao.dataset.mes);

if (mesDoBotao === mesAtual) {
botao.classList.add("selecionado");
}
   });
 botoesMes.forEach(function(botao) {
 botao.addEventListener("click", function() {
if (botao.disabled) return;
 botoesMes.forEach(function(outroBotao) {
  outroBotao.classList.remove("selecionado");
  });
  botao.classList.add("selecionado");

 mesSelecionado = Number(botao.dataset.mes);  
 calcularTotalDoMes(); 
 calcularNecessidadesDoMes();
 calcularDesejosDoMes();
 calcularPorcentagensDoMes();
 

 console.log("Gastos do mês selecionado:", obterGastosDoMesSelecionado()); 
  textoMesRelatorio.textContent = 
  `${nomesMeses[mesSelecionado]} de ${hoje.getFullYear()}`;
seletorMes.classList.add("oculto");

console.log("Mes selecionado:", mesSelecionado);
  });
   });

const gastosSalvos = JSON.parse(localStorage.getItem("gastos")) || [];

function obterGastosDoMesSelecionado() {
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

return gastos.filter(function(gasto) {
  const [ano, mes] = gasto.data.split("-").map(Number);

  return ano === anoAtual && mes - 1 === mesSelecionado;
});
}
function calcularDesejosDoMes() {
  const gastosDoMes = obterGastosDoMesSelecionado();

  const totalDesejos = gastosDoMes
    .filter(function (gasto) {
      return gasto.tipo === "desejo";
    })
    .reduce(function (total, gasto) {
      return total + gasto.valor;
    }, 0);

  console.log("Total desejos do mês:", totalDesejos);
}


console.log("Gastos salvos:", gastosSalvos);
function calcularTotalDoMes() {
  const gastosDoMes = obterGastosDoMesSelecionado();

  const totalGasto = gastosDoMes.reduce(function (total, gasto) {
    return total + gasto.valor;
  }, 0);

  totalRelatorio.textContent = totalGasto.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  console.log("Total gasto do mês:", totalGasto);
}
function calcularNecessidadesDoMes() {
  const gastosDoMes = obterGastosDoMesSelecionado();

  const totalNecessidades = gastosDoMes
    .filter(function (gasto) {
      return gasto.tipo === "necessidade";
    })
    .reduce(function (total, gasto) {
      return total + gasto.valor;
    }, 0);

  console.log("Total necessidades do mês:", totalNecessidades);
}
function calcularPorcentagensDoMes() {
  const gastosDoMes = obterGastosDoMesSelecionado();

  const totalGasto = gastosDoMes.reduce(function (total, gasto) {
    return total + gasto.valor;
  }, 0);

  const totalNecessidades = gastosDoMes
    .filter(function (gasto) {
      return gasto.tipo === "necessidade";
    })
    .reduce(function (total, gasto) {
      return total + gasto.valor;
    }, 0);

  const totalDesejos = gastosDoMes
    .filter(function (gasto) {
      return gasto.tipo === "desejo";
    })
    .reduce(function (total, gasto) {
      return total + gasto.valor;
    }, 0);

  const porcentagemNecessidades =
    totalGasto === 0 ? 0 : (totalNecessidades / totalGasto) * 100;

  const porcentagemDesejos =
    totalGasto === 0 ? 0 : (totalDesejos / totalGasto) * 100;
    atualizarQuadroStatus (
    totalGasto,
    porcentagemNecessidades,
    porcentagemDesejos
  );

    necessidadesRelatorio.textContent =
  totalNecessidades.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  }) + ` (${porcentagemNecessidades.toFixed(2).replace(".", ",")}%)`;

desejosRelatorio.textContent =
  totalDesejos.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  }) + ` (${porcentagemDesejos.toFixed(2).replace(".", ",")}%)`;

if (totalGasto === 0) {
  graficoRosca.style.background = "#e5e7eb";
  graficoRosca.classList.add("sem-gastos");
} else {
  graficoRosca.classList.remove("sem-gastos");

  graficoRosca.style.background =
  `conic-gradient(#18a84b 0% ${porcentagemNecessidades}%, #ff1f2d ${porcentagemNecessidades}% 100%)`;
 
  graficoRosca.style.setProperty(
  "--angulo-separador",
  `${porcentagemNecessidades * 3.6}deg`
);
}

console.log("cor Do gráfico:", graficoRosca.style.background);
 console.log("Necessidades:", porcentagemNecessidades.toFixed(2) + "%");
  console.log("Desejos:", porcentagemDesejos.toFixed(2) + "%");
}
calcularTotalDoMes();
calcularNecessidadesDoMes();
calcularDesejosDoMes();
calcularPorcentagensDoMes();

function definirCarinha(tipo) {
  olhosStatus.forEach(function(olho) {
    olho.style.display = "";
  });
  if (tipo === "feliz") {
    bocaStatus.setAttribute("d", "M24 46 Q40 62 56 46");
  }

  if (tipo === "triste") {
    bocaStatus.setAttribute("d", "M24 56 Q40 40 56 56");
  }

  if (tipo === "neutra") {
    bocaStatus.setAttribute("d", "M26 50 L54 50");
    bocaStatus.style.strokeWidth = "4";

  olhosStatus.forEach(function(olho) {
    olho.style.display = "";
  });
}

if (tipo === "sem-gastos") {
  bocaStatus.setAttribute("d", "M24 40 L56 40");
  bocaStatus.style.strokeWidth = "7";

  olhosStatus.forEach(function(olho) {
    olho.style.display = "none";
  });
}
}
function atualizarQuadroStatus(
  totalGasto,
  porcentagemNecessidades,
  porcentagemDesejos
) {
  quadroStatus.classList.remove("verde", "vermelho", "cinza");
  if (totalGasto === 0) {
    quadroStatus.classList.add("cinza");
    definirCarinha("sem-gastos");

    fraseStatus.textContent =
      "Nenhum gasto registrado neste mês.";

    complementoStatus.textContent = ""

    return;
  }
  if (
  totalGasto > 0 &&
  porcentagemNecessidades > porcentagemDesejos
) {
  quadroStatus.classList.add("verde");
  definirCarinha("feliz");

  fraseStatus.textContent =
    "Você está consumindo de forma consciente!";

  complementoStatus.textContent =
    "Continue assim!";

  return;
}
if (
  totalGasto > 0 &&
  porcentagemDesejos > porcentagemNecessidades
) {
  quadroStatus.classList.add("vermelho");
  definirCarinha("triste");

  fraseStatus.textContent =
    "Desejos acima do ideal!";

  complementoStatus.textContent =
    "Atenção aos seus gastos.";

  return;
}
if (
  totalGasto > 0 &&
  porcentagemNecessidades === porcentagemDesejos
) {
  quadroStatus.classList.add("cinza");
  definirCarinha("neutra");

  fraseStatus.textContent =
    "Seus gastos estão equilibrados!";

  complementoStatus.textContent = "";

  return;
}
}