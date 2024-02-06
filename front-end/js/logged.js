const username = document.getElementById("username")
const linkLogin = document.getElementById("linkLogin")
const linkLogout = document.getElementById("linkLogout")
const nome_avaliacao = document.getElementById("nome_avaliacao")

if(sessionStorage.getItem("user_id") == null) {
    noLoggedUser()
} else {
    loggedUser()
}


function logout() {
    sessionStorage.removeItem("user_id")
    sessionStorage.removeItem("user_username")
    sessionStorage.removeItem("user_token")
    sessionStorage.removeItem("user_position")

    location.href = "./loginPage.html";

}

function loggedUser() {
    if(sessionStorage.getItem("user_position") == "LEITOR") {
        document.getElementById("linkAssinatura").style.display = "none";
    }   
    if(window.location.href == "localhost:5500/front-end/AvaliacaoPage.html"){
        nome_avaliacao.innerHTML = sessionStorage.getItem("user_username")
    }
    if(sessionStorage.getItem("user_position") != "LEITOR") {
        document.getElementById("divBiblioteca").style.display = "none";
     
    } 
    username.innerHTML = sessionStorage.getItem("user_username")
    linkLogin.style.display = "none";
}
function noLoggedUser() {
    username.innerHTML = "";
    linkLogout.style.display = "none"
}