const form = document.getElementById("avaliacao");

const message = document.getElementById("mensagem");


const estrela = document.getElementsByName("estrela")

if(message != null ) {
    console.log(estrela)
    console.log("os elementos existem")
}

function getValueParam() {
    const params = new URLSearchParams(window.location.search);
    const nomeParam = params.get("id")
    return nomeParam;
}
var idlivro = parseInt(getValueParam());
var idusuario = parseInt(sessionStorage.getItem("user_id"));
console.log("idusuario: "+ idusuario + " idlivro: "+ idlivro)

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    var valstar = 0;
    for (var i = 0; i < estrela.length; i++) {
        if (estrela[i].checked) {
            console.log("Escolheu: " + estrela[i].value);
            valstar = estrela[i].value
        }
    }

    
    const url = "http://localhost:8080/livro/avaliacao";
    
        fetch(url, {
            method: 'POST',
            mode: 'cors',
          
            
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("user_token"),
                'Content-Type' : 'application/json'
              
            },

            body: JSON.stringify({ qtd_estrela : valstar, descricao :  message.value,   id_livro : idlivro, id_usuario : idusuario }),
            
            

            
        }).then(response => response.json())
        .then(data => {

          
        }).catch(data => {
     

        })

        

        
        
    
})