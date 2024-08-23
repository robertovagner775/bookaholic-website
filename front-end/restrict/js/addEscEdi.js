const formEscritor = document.getElementById("formEscritor");
const nomeEscritor = document.getElementById("nomeEscritor");
const descricaoEscritor = document.getElementById("sobre");
const dataNascimento = document.getElementById("dataNascimento");

const formEditora = document.getElementById("formEditora");
const nomeEditora = document.getElementById("nomeEditora");
const genero = document.getElementById("genero")
const sobre =  document.getElementById("sobreEditora")






formEscritor.addEventListener("submit", (e) => {
    e.preventDefault()
    
  
    //const formData = new FormData(formEscritor)
    //const data = Object.fromEntries(formData)
    const url = "http://localhost:8080/escritores"
        
        campsValidation()
        console.log(dataNascimento.value)
        
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            
            headers: {
              
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
              
            },

            body: JSON.stringify({
                    idEscritor: null,
                    data_nascimento: dataNascimento.value,
                    nome: nomeEscritor.value,
                    sobre_autor: descricaoEscritor.value
                    
                }),

            
        }).then(response => response.json())
        .then(data => {
          
        }).catch(data => {
          
        })

        

        
        
    
})


formEditora.addEventListener("submit", (f) => {
    f.preventDefault()
    //const formData = new FormData(formEscritor)
    //const data = Object.fromEntries(formData)
    const url = "http://localhost:8080/editoras"
        campsValidationEditora()
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            
            headers: {
              
                'Content-Type' : 'application/json',
              
            },

            body: JSON.stringify({
                    id: null,
                    nome_editora: nomeEditora.value,
                    genero: genero.value,
                    descricao: sobre.value
                    
                }),

            
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            cleanCampsAlert()
          
        }).catch(data => {
          
        })

        

      
        
    
})

function cleanCampsAlert(){
    nomeEditora.innerHTML = ""
    sobre.innerHTML = ""
    genero.innerHTML = ""

    swal("Good job!", "You clicked the button!", "success");
}

function campsValidation() {
    if(descricaoEscritor.value.length > 5) { 
        setSuccess(descricaoEscritor)
        
    } else {
        setError(descricaoEscritor, "preencha esse campo")
    }
    if(nomeEscritor.value.length > 5 ){
        setSuccess(nomeEscritor)
    } else {
        setError(nomeEscritor, "digite um nome acima de 5 caracteres")
    }
    if(dataNascimento.value == "") {
        setError(dataNascimento, "preencha esse campo!!!")
    } else {
        setSuccess(dataNascimento)
    }

}

function campsValidationEditora() {
    if(nomeEditora.value.length > 5) { 
        setSuccess(nomeEditora)
    } else {
        setError(nomeEditora, "preencha esse campo")
    }
    if(genero.value.length != "" ){
        setSuccess(genero)
    } else {
        setError(genero, "digite um nome acima de 5 caracteres")
    }
    if(sobre.value == "") {
        setError(sobre , "preencha esse campo!!!")
    } else {
        setSuccess(sobre)
    }

}

function setError(input, message) {
    const inputBox = input.parentElement;

    const divValid = inputBox.querySelector("#valid");
    divValid.innerText = message;
    

    input.classList.remove("is-valid")
    divValid.classList.remove("valid-feedback");

    input.classList.add("is-invalid")
    divValid.classList.add("invalid-feedback");

}

function setSuccess(campInput) {

    const inputBox = campInput.parentElement
    const divValid = inputBox.querySelector('#valid');

    divValid.innerText = ""

    divValid.classList.remove("invalid-feedback")
    divValid.classList.add("valid-feedback")

    campInput.classList.remove("is-invalid")
    campInput.classList.add("is-valid")
    
}

