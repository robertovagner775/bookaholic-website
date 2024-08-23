localStorage.setItem("pathEpub", "./files/epub/")

async function listCardBook() {
    try {
        fetch("http://localhost:8080/biblioteca/" + sessionStorage.getItem("user_id") + "/livros", {
            
            headers: {         
                'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + sessionStorage.getItem("user_token")            
            },  
        })

        .then(response => response.json())
        .then(data => {
        

            const container = document.getElementById("containerRow")
            const list = document.querySelector("#tableBookCorpo")

            data.map((item) => {
                /*
                <div class="col-6 cont-mod ">
                <div class="card mb-3" style="max-width: 540px;">
                  <div class="row g-0">
                    <div class="col-md-4 img-mod">
                      <img src="imgs/arte-da-guerra.jpg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h4 class="card-title">Arte da Guerra</h4>
                        <h5 class="card-subtitle text-muted ">Sun Tzu</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      
                        <div class="row text-center">
                            
                        <p class="card-text col">
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          
                      </p>   
                      <h5 class="card-text col text-info mt-5">SEM ACESSO</h5>
                        
                          <a href="#" class="btn btn-danger col mt-5"  >Ler</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            */


                    const div = document.createElement("div")
                    const divCard = document.createElement("div")
                    const divRow = document.createElement("div")
                    const divColImg = document.createElement("div")
                    const divCol = document.createElement("div")
                    const cardBody = document.createElement("div")
                    const divRow1 = document.createElement("div")
                    const img = document.createElement("img")
                    const h4 = document.createElement("h4")
                    const h5 = document.createElement("h5")
                    const p = document.createElement("p")
                    const a = document.createElement("a")
                    const h5status = document.createElement("h5")
                   
                    cardBody.classList.add("card-body")
                    div.classList.add("col-6", "cont-mod", "mt-5")
                    divCard.classList.add("card", "mb-3")
                    divRow.classList.add("row", "g-0")
                    divRow1.classList.add("row", "card-text")
                    divColImg.classList.add("col-md-4","img-mod" )
                    img.classList.add("img-fluid", "rounded-start")
                    h4.classList.add("card-title")
                    h5.classList.add("card-subtitle", "text-muted")
                    p.classList.add("card-text")
                    h5status.classList.add("card-text", "col", "text-info", "mt-5")
                    divCol.classList.add("col-md-8")
                    a.classList.add("btn", "btn-danger", "col", "mt-5")

                    divCard.style.maxWidth = "540px";
                    a.innerHTML = "LER"
                    h4.innerHTML = item.titulo
                    h5.innerHTML = item.subtitulo
                    p.innerText = item.sinopsem
                    console.log(item.sinopsem)
                    img.setAttribute("src",localStorage.getItem("path") + item.pathImagem)
                    a.setAttribute("href", "http://localhost:8080/front-end/ViewBook.html?path=" + "./files/epub/" + item.pathEpub)
                    if(item.status == "sem acesso") {
                        h5status.classList.remove("text-success")
                        h5status.classList.remove("text-warning")
                        h5status.classList.add("text-info")
                    }else if(item.status == "em andamento"){
                        h5status.classList.remove("text-success")
                        h5status.classList.remove("text-info")
                        h5status.classList.add("text-warning")
                    } else {
                        h5status.classList.remove("text-info")
                        h5status.classList.remove("text-warning")
                        h5status.classList.add("text-success")
                    }
                    h5status.innerHTML = item.status.toUpperCase()

                    divColImg.append(img)
                    divRow1.append(h5status, a)
                    cardBody.append(h4, h5, p, divRow1)
                    divCol.append(cardBody)
                    divRow.append(divColImg, divCol)
                    divCard.append(divRow)
                    div.append(divCard);
                    

                    container.append(div)


                    const tr = document.createElement('tr')
                    const th = document.createElement('th')
                    th.setAttribute("scope", "row")
                    const td1 = document.createElement('td')
                    const td2 = document.createElement('td')
                    const td3 = document.createElement('td')
                    const button1 = document.createElement('a')
                    button1.classList.add('btn', 'btn-warning', 'mx-1')
                    button1.innerHTML = 'em andamento'
                    const button2 = document.createElement('a')
                    button2.classList.add('btn', 'btn-success', 'mx-1')
                    button2.innerHTML = 'finalizar'


                    button1.setAttribute("onclick", "alterarStatusAndamento()")
                    button2.setAttribute("onclick", "alterarStatusFinalizado()")


                    button2.onclick = alterarStatusFinalizado.bind(this, item.id)

                    button1.onclick = alterarStatusAndamento.bind(this, item.id)
                    button1
                    const listButtons2 = document.querySelector('.td-buttons-action')
                 
                    th.innerHTML = item.titulo
                    td1.innerHTML = item.subtitulo
                    if(item.status == "sem acesso") {
                        td2.classList.add("text-info")
                    }else if(item.status == "em andamento"){
                        td2.classList.add("text-warning")
                    } else {
                        td2.classList.add("text-success")
                    }
                    td2.innerHTML = item.status.toUpperCase()
                    list.append(tr)
                    td3.append(button1, button2)
                    list.append(th, td1, td2, td3)


            })
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}

async function alterarStatusAndamento(id) {
    const status = "em andamento"; 
    const url = "http://localhost:8080/biblioteca/" + id +"/livro?status=" + status;

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            
            headers: {
              
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem("user_token")
            },

            
        }).then(response => response.json())
        .then(data => {
            //setErrorInsert(spanError, data["message"])
            console.log(data)
            
        })
        
    
}

async function alterarStatusFinalizado(id) {
    const status = "finalizado"; 
    const url = "http://localhost:8080/biblioteca/" + id +"/livro?status=" + status;

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            
            headers: {
              
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem("user_token")
            },

            
        }).then(response => response.json())
        .then(data => {
            //setErrorInsert(spanError, data["message"])
            console.log(data)
            
        })
        
    
}


listCardBook()