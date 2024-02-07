const form = document.getElementById("form");
const password = document.getElementById("password");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
  
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const url = "http://localhost:8080/usuario/login"

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            
            headers: {
              
                'Content-Type' : 'application/json',
              
            },

            body: JSON.stringify({
                email: email.value,
                senha: password.value
                }),

            
        }).then(response => response.json())
        .then(data => {
            //setErrorInsert(spanError, data["message"])
            console.log(data)
            
              if(data['type'] == "NOT-FOUND"){
                span = document.getElementById("error-login");
                span.innerHTML = "usuario não encontrado"
                span.style.color = '#B22222'
                span.style.textAlign = 'center'

                setErrorInsert(email)
                setErrorInsert(password)
            }
        
            if(data['type'] == "NOT-AUTHORIZATION"){
                span = document.getElementById("error-login");
                span.innerHTML = "Erro Credenciais Invalidas"
                span.style.color = '#B22222'
                span.style.textAlign = 'center'

                setErrorInsert(email)
                setErrorInsert(password)
            }
        
            if(data['type'] == "CONFIRM-ACCOUNT" || data['message'] == 'user not enabled') {
                location.href = "confirmPage.html";
            }
            if(data["username"] != null && data["position"] != "ADMIN"){
                sessionStorage.setItem('user_id', data["idusuario"] );
                sessionStorage.setItem('user_username', data["username"] );
                sessionStorage.setItem('user_token', data["token_id"] );
                sessionStorage.setItem('user_position', data["position"] );
        
                location.href = "homePage.html";
            } if(data["position"] == "ADMIN") {
                sessionStorage.setItem('user_id', data["idusuario"] );
                sessionStorage.setItem('user_username', data["username"] );
                sessionStorage.setItem('user_token', data["token_id"] );
                sessionStorage.setItem('user_position', data["position"] );
        
                location.href = "./../front-end/restrict/adminPage.html";
            }
        }).catch(data => {
            if(data['type'] != "") {
               span = document.getElementById("error-login");
               span.innerHTML = "Erro Credenciais Invalidas"
               span.style.color = '#B22222'
               span.style.textAlign = 'center'
            }

        })

        

        
        
    
})

function setErrorInsert(input, message) {
   
    const inputBox = input.parentElement;
    console.log(inputBox)
    const span = inputBox.querySelector("span");


    inputBox.classList.add('error')

}