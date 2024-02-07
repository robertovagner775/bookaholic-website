const formLivro = document.getElementById("formLivro");
const titulo = document.getElementById("titulo");
const dataLanc = document.getElementById("datalancamento");
const sinopse = document.getElementById("sinopse");
const id_escritor = document.getElementById("autor");
const id_editora = document.getElementById("editora");







formLivro.addEventListener("submit", (e) => {
    e.preventDefault() 
    //const formData = new FormData(formEscritor)
    //const data = Object.fromEntries(formData)
    const url = "http://localhost:8080/gerencia/livro"     
        var test= campsValidation()       
   
        fetch(url, {
            method: 'POST',
            mode: 'cors',        
            headers: {         
                'Accept' : 'application/json',
              'Content-Type' : 'application/json'            
            },
            body: JSON.stringify({
                    id_livro: null,
                    titulo: titulo.value,
                    sinopse: sinopse.value,
                    escritor_id: id_escritor.value,
                    editora_id: id_editora.value,
                    data_lancamento: dataLanc.value
                    
                }),
            
        }).then(response => response.json())
        .then(data => {
          
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
    var text = false;
    text = validaTitulo()
    text = validaSinopse()
    text = validaData()
    text = validaIds()
    return text;

}

function validaTitulo () {
    if(titulo.value.length >= 6) {
        setSuccess(titulo)
        return true;
    } else {
        setError(titulo, "deve ser maior que 6 caracteres")
        return false;
    }
}

function validaSinopse() {
    if(sinopse.value != "") {
        setSuccess(sinopse)
        return true
    } else {
        setError(sinopse, "preencha esse campo corretamente")
        return false
    }
} 

function validaData() {
    if(!(dataLanc instanceof Date && !isNaN(dataLanc))) {
        setSuccess(dataLanc)
        return true
    } 
    setError(dataLanc, "data invalida")
    return false
  }

  function validaIds() {
    if(id_editora.value != "" && id_escritor.value != ""){
        setSuccess(id_editora)
        setSuccess(id_escritor)      
        return true
    }
    setError(id_editora, "selecione uma editora")
    setError(id_escritor, "selecione uma escritor")
    return false
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

