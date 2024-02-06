const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const spanError = document.querySelector(".message-error")
const confirmPassword = document.getElementById("confirmPassword")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    if(campsValidate()) {
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        const url = "https://bookaholic-api-production.up.railway.app/usuario"

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },

            body: JSON.stringify({
                id: null,
                username: username.value,
                email: email.value,
                senha: password.value
                }),

            
        }).then(response => response.json())
        .then(data => {
             
            if(data["verifica"] == null){
                setErrorInsert(spanError, data["message"])
                setError(username, "")
                setError(password, "")
                setError(email, "")
                setError(confirmPassword, "")
         
            } else {
                setSuccess(spanError, data['verifica'])
  
            }
        })

        
        
    } else {

    }
})

function setErrorInsert(spanError, mensagem) {
    spanError.innerHTML = mensagem;
    spanError.style.display = 'block'
    spanError.style.color = '#B22222'
    spanError.style.textAlign = 'center'

}
function campsValidate() {
    var test = false
    test = checkUsername(username)
    test = checkEmail(email)
    test = checkPasword(password)
    test = checkPasswordConfirm(password, confirmPassword)
    return test
   
}
function checkUsername(username) {
    if(username.value.length >= 6 ){
        setSuccess(username)
        return true
    } else {
        setError(username, "Minimum username of 6 characters and has some letter")
        return false
    }
}
function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if(emailRegex.test(email.value.trim())){
        setSuccess(email)
        return true
    } else {
        setError(email ,"email invalid")
        return false
    }
}
function checkPasword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    if(passwordRegex.test(password.value.trim())){
        setSuccess(password)
        return true
    } else {
        setError(password, "Password insert caracter special and upercase and 1 a 9 caracter")
        return false
    } 
}
function checkPasswordConfirm(password, confirmPassword) {
    if(password.value.trim() == confirmPassword.value.trim()) {
        setSuccess(confirmPassword)
        return true
    } else {
        setError(confirmPassword, "senhas incongruentes")
        return false
    }

}



function setError(input, message) {
    const inputBox = input.parentElement;
    console.log(inputBox)
    const span = inputBox.querySelector("span");
    span.innerText = message;

    inputBox.className = 'input-box error'
}


function setSuccessInsert(input, message) {
    spanError.innerHTML = mensagem;
    spanError.style.display = 'block'
    spanError.style.color = '#3CB371'
    spanError.style.textAlign = 'center'
}

function setSuccess(input) {
    input.parentElement.classList.remove('error')
    input.parentElement.classList.add('success')
}