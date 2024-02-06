const form = document.getElementById("form");
const rg = document.getElementById("rg");
const cpf = document.getElementById("cpf");
const data = document.getElementById("data_nascimento");
const nome = document.getElementById("nome_completo");


function verificarCampos() {

    if(campsValidate()){
        location.href = "./../payment/pixQrCode.html";
        if(localStorage.getItem("cpf") != null){
            localStorage.clear()
        }
      
        dataFormat = formatarData(data.value)
        
        localStorage.setItem("cpf", cpf.value) 
        localStorage.setItem("rg", rg.value) 
        localStorage.setItem("data", dataFormat) 
        localStorage.setItem("nome", nome.value) 
    } else {
    
    }
}    


/*
            const url = "http://localhost:8080/usuario/cliente"

                fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    
                    headers: {
                    
                        'Content-Type' : 'application/json',
                    
                    },

                    body: JSON.stringify({
               
                        RG : rg.value,
                        CPF : cpf.value,
                        nome_completo : nome_completo.value,
                        data_nascimento : data_nascimento.value,
                        idUser : sessionStorage.getItem("id"),
                      
                        }),

                    
                }).then(response => response.json())
                .then(data => {
                    if(data != "") {
                        location.href = "./../pixQrCode.html";
                    }
                    console.log(data)
                
                
                }).catch(data => {
                    if(data['type'] != "") {
                
                    }

                })

                

                
    }else {
        console.log("error repeat")
    }
            
        })
    
*/
function campsValidate() {
    var test = false
    test = cpfValid()
    test = rgValid()
    test = dataValid()
    test = nomeValid()
    return test


}

function formatarData(dataString) {

  
    const data = new Date(dataString)
    const newData = moment(data).format('YYYY-MM-DD')

    return newData
}

function rgValid() {
    const regexRg = /^(^(\d{2}\x2E\d{3}\x2E\d{3}[-]\d{1})$|^(\d{2}\x2E\d{3}\x2E\d{3})$)/
    if(regexRg.test(rg.value)) {
        setSuccess(rg)
        return true
    } else {
        setError(rg, "informe um rg valido")
        return false
    }

}
function cpfValid() {
    const regexCpf = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    if(regexCpf.test(cpf.value)) {
        setSuccess(cpf)
        return true
    } else {
        setError(cpf, "insira um cpf valido")
        return false
    }
    
}
function dataValid() {
    const dateRegex = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/
    if(dateRegex.test(data.value)) {
        setSuccess(data)
        return true
    } 
    setError(data, "data invalida")
    return false

}
function nomeValid() {
    if(nome.value != "" && nome.value.length > 6) {
        setSuccess(nome)
        return true
    } else {
        setError(nome, "insira um nome valido")
        return false
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

    console.log(campInput,  divValid)
    
}
