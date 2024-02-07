function logout() {
    sessionStorage.removeItem("user_id")
    sessionStorage.removeItem("user_username")
    sessionStorage.removeItem("user_token")
   

    location.href = "./loginPage.html";

}