// ================================
// CONTROLE DA ÁREA DE PAGAMENTO
// ================================

function abrirPagamento() {
  const pagamento = document.getElementById("pagamentoVip");

  if (!pagamento) return;

  pagamento.classList.add("visivel");

  setTimeout(() => {
    pagamento.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}


// ================================
// SELEÇÃO DO MÉTODO DE PAGAMENTO
// ================================

function selecionarPagamento(tipo) {
  const opcaoPix = document.getElementById("opcaoPix");
  const opcaoCredito = document.getElementById("opcaoCredito");
  const opcaoDebito = document.getElementById("opcaoDebito");

  const areaPix = document.getElementById("areaPix");
  const areaCartao = document.getElementById("areaCartao");

  if (!opcaoPix || !opcaoCredito || !opcaoDebito) return;
  if (!areaPix || !areaCartao) return;

  // Remove a seleção atual
  opcaoPix.classList.remove("selecionado");
  opcaoCredito.classList.remove("selecionado");
  opcaoDebito.classList.remove("selecionado");

  if (tipo === "pix") {
    opcaoPix.classList.add("selecionado");

    areaPix.style.display = "block";
    areaCartao.style.display = "none";
  }

  if (tipo === "credito") {
    opcaoCredito.classList.add("selecionado");

    areaPix.style.display = "none";
    areaCartao.style.display = "block";
  }

  if (tipo === "debito") {
    opcaoDebito.classList.add("selecionado");

    areaPix.style.display = "none";
    areaCartao.style.display = "block";
  }
}


// ================================
// COPIAR CÓDIGO PIX
// ================================

function copiarPix() {
  const campoPix = document.getElementById("codigoPix");
  const botao = document.querySelector(".botao-copiar");

  if (!campoPix || !botao) return;

  const codigo = campoPix.value;

  navigator.clipboard.writeText(codigo)
    .then(() => {
      const textoOriginal = botao.textContent;

      botao.textContent = "Código copiado!";

      setTimeout(() => {
        botao.textContent = textoOriginal;
      }, 2000);
    })
    .catch(() => {
      campoPix.select();
      document.execCommand("copy");

      const textoOriginal = botao.textContent;

      botao.textContent = "Código copiado!";

      setTimeout(() => {
        botao.textContent = textoOriginal;
      }, 2000);
    });
}


// ================================
// MÁSCARA DO NÚMERO DO CARTÃO
// ================================

const numeroCartao = document.getElementById("numeroCartao");

if (numeroCartao) {
  numeroCartao.addEventListener("input", function () {

    let valor = this.value.replace(/\D/g, "");

    valor = valor.substring(0, 16);

    let resultado = "";

    for (let i = 0; i < valor.length; i++) {

      if (i > 0 && i % 4 === 0) {
        resultado += " ";
      }

      resultado += valor[i];
    }

    this.value = resultado;
  });
}


// ================================
// MÁSCARA DA VALIDADE
// ================================

const validadeCartao = document.getElementById("validadeCartao");

if (validadeCartao) {
  validadeCartao.addEventListener("input", function () {

    let valor = this.value.replace(/\D/g, "");

    valor = valor.substring(0, 4);

    if (valor.length > 2) {
      valor =
        valor.substring(0, 2) +
        "/" +
        valor.substring(2);
    }

    this.value = valor;
  });
}


// ================================
// MÁSCARA DO CVV
// ================================

const cvvCartao = document.getElementById("cvvCartao");

if (cvvCartao) {
  cvvCartao.addEventListener("input", function () {

    this.value = this.value
      .replace(/\D/g, "")
      .substring(0, 3);
  });
}


// ================================
// CONFIRMAR PAGAMENTO
// ================================

const botaoConfirmar =
  document.querySelector(".botao-confirmar-pagamento");

if (botaoConfirmar) {

  botaoConfirmar.addEventListener("click", function () {

    const pixSelecionado =
      document.getElementById("opcaoPix")?.classList.contains("selecionado");

    if (pixSelecionado) {

      alert("Pagamento via Pix selecionado.");

      return;
    }

    const numero =
      document.getElementById("numeroCartao")?.value.trim();

    const nome =
      document.getElementById("nomeCartao")?.value.trim();

    const validade =
      document.getElementById("validadeCartao")?.value.trim();

    const cvv =
      document.getElementById("cvvCartao")?.value.trim();

    if (!numero || !nome || !validade || !cvv) {
      alert("Preencha todos os dados do cartão.");
      return;
    }

    alert("Dados preenchidos. Pagamento pronto para confirmação.");
  });
}


// ================================
// CONFIGURAÇÃO INICIAL
// ================================

document.addEventListener("DOMContentLoaded", function () {

  const areaPix = document.getElementById("areaPix");
  const areaCartao = document.getElementById("areaCartao");

  if (areaPix && areaCartao) {
    areaPix.style.display = "block";
    areaCartao.style.display = "none";
  }

});