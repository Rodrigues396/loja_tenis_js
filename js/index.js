if(localStorage.getItem(".token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "./html/signin.html";
}
  
const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  
const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá ${userLogado.nome}`;
