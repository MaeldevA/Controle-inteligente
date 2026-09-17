
document.body.classList.remove("carregando");

const botaoContinuar = document.getElementById("botao-continuar");
botaoContinuar.addEventListener("click", function() {
const nome = document.getElementById("nome-input").value;
localStorage.setItem("nomeUsuario", nome);
window.location.href = "inicio.html";
});