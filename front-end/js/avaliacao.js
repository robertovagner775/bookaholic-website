var path = "./../files/imagems/"

function formatarData(dataString) {

  
    const data = new Date(dataString)
    const newData = moment(data).format('YYYY-MM-DD')

    return newData
}

function getValueParam() {
    const params = new URLSearchParams(window.location.search);
    const nomeParam = params.get("id")
    return nomeParam;
}
async function listCardBook() {
    try {
        fetch("https://bookaholic-api-production.up.railway.app/home/livro?id=" + getValueParam())
        .then(response => response.json())
        .then(data => {
        

            const container = document.querySelector(".main-cont")

       

           
            const divCont = document.createElement('div')
            const divRow = document.createElement('div')
            const divCard = document.createElement('div')
            const divImgWrapper = document.createElement('div')
            const img = document.createElement('img')
            const divCardBody = document.createElement('div')
            const title = document.createElement('h4')
            const subtitle = document.createElement('h6')
            const p_star = document.createElement('p')


            const cardText = document.createElement('p')
            const i = document.createElement('i')
            const i2 = document.createElement('i')
            const i3 = document.createElement('i')
            const i4 = document.createElement('i')
            const i5 = document.createElement('i')

        

            divRow.classList.add("row", "g-0")
            divCont.classList.add("col-12", "cont-mod", "my-5")
            title.innerHTML = data.titulo
            subtitle.innerHTML = data.escritor.nome
            img.setAttribute("src", localStorage.getItem("path") + data.path_imagem)
            console.log(localStorage.getItem("path")    + data.path_imagem)
            cardText.innerHTML = data.sinopse
  
            divCard.classList.add("card", "card-mod","mb-3")
            divImgWrapper.classList.add("col-4", "img-mod")
            img.classList.add("img-fluid", "rounded-start")
            divCardBody.classList.add("card-body", "p-5")
            title.classList.add("card-title")
            subtitle.classList.add("card-subtitle", "text-muted", "mb-5")
            p_star.classList.add("card-text", "col", 'my-5', "star")
            cardText.classList.add("card-text", "text-book")

            fetch("https://bookaholic-api-production.up.railway.app/livro/viewAvaliacao?id=" + data.id)
            .then(response => response.json())
            .then(data => {
               
                    
            if(parseInt(data.score) == 1){
                i.classList.add("bi","bi-star-fill", "text-warning")
                i2.classList.add("bi","bi-star-fill")
                i3.classList.add("bi","bi-star-fill")
                i4.classList.add("bi","bi-star-fill")
                i5.classList.add("bi","bi-star-fill")
            } else if (parseInt(data.score) == 2) {
                i.classList.add("bi","bi-star-fill", "text-warning")
                i2.classList.add("bi","bi-star-fill", "text-warning")
                i3.classList.add("bi","bi-star-fill")
                i4.classList.add("bi","bi-star-fill")
                i5.classList.add("bi","bi-star-fill")

            } else if (parseInt(data.score) == 3) {
                i.classList.add("bi","bi-star-fill", "text-warning")
                i2.classList.add("bi","bi-star-fill", "text-warning")
                i3.classList.add("bi","bi-star-fill", "text-warning")
                i4.classList.add("bi","bi-star-fill")
                i5.classList.add("bi","bi-star-fill")

            } else if(parseInt(data.score) == 4) {
                i.classList.add("bi","bi-star-fill", "text-warning")
                i2.classList.add("bi","bi-star-fill", "text-warning")
                i3.classList.add("bi","bi-star-fill", "text-warning")
                i4.classList.add("bi","bi-star-fill", "text-warning")
                i5.classList.add("bi","bi-star-fill")
            }else if(parseInt(data.score) == 5) {
                i.classList.add("bi","bi-star-fill", "text-warning")
                i2.classList.add("bi","bi-star-fill", "text-warning")
                i3.classList.add("bi","bi-star-fill", "text-warning")
                i4.classList.add("bi","bi-star-fill", "text-warning")
                i5.classList.add("bi","bi-star-fill", "text-warning")
            } else if(data.type != "") {
                i.classList.add("bi","bi-star-fill")
                i2.classList.add("bi","bi-star-fill")
                i3.classList.add("bi","bi-star-fill")
                i4.classList.add("bi","bi-star-fill")
                i5.classList.add("bi","bi-star-fill")

            }

        })
            const divButton = document.createElement('div')
            const colMd = document.createElement('div')
            const button = document.createElement('a')
            const button2 = document.createElement('a')
            colMd.classList.add("col")

            button2.classList.add("btn", "btn-danger", "col", "mx-3")
            button.classList.add("btn", "btn-danger", "col")

            divButton.classList.add("row", "text-center")
            var path_epub = data.path_imagem
            button2.setAttribute("onclick", "setEpub()")

            button.setAttribute("onclick", "adicionarLivro()")
            button.onclick = adicionarLivro.bind(this, data.idImagem)
            button2.onclick = setEpub.bind(this, data.path_epub)
            divButton.append(button, button2)
            
            button.innerHTML = "Add library"
            button2.innerHTML = "View Preview"
            divCont.append(divCard)
            divRow.append(divImgWrapper, colMd)
            colMd.append(divCardBody)
            divCard.append(divRow)
            divImgWrapper.append(img)
            divCardBody.append(title, subtitle, cardText, p_star, divButton)
            p_star.append(i, i2, i3, i4, i5)




            container.append(divCont)
        
            
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}

async function adicionarLivro(idLivro) {

    var idUsuario = parseInt(sessionStorage.getItem("user_id"));

    const url = "https://bookaholic-api-production.up.railway.app/biblioteca/livro"     
           
   
        fetch(url, {
            method: 'POST',
            mode: 'cors',        
            headers: {         
                'Accept' : 'application/json',
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer ' + sessionStorage.getItem("user_token")            
            },
            body: JSON.stringify({
                   
                    id_usuario : idUsuario,
                    id_imagem : idLivro
                  
                 
                    
                }),
            
        }).then(response => response.json())
        .then(data => {
            if (!response.ok || sessionStorage.getItem("position") != "LEITOR") {
               Swal.fire({
                  title: "Oops!",
                  text: "E necessario autorização",
                  icon: "error"
                });
              throw new Error('Falhou!');
            }
            console.log('Sucesso no upload!');
           Swal.fire({
              title: "Good job!",
              text: "You clicked the button!",
              icon: "success"
            });
        }).catch(data => {
            console.log(data)
        })            
  

    
}




async function listEscritorBook() {
    try {
        fetch("https://bookaholic-api-production.up.railway.app/home/livro?id=" + getValueParam())
        .then(response => response.json())
        .then(data => {
        

            const container = document.querySelector(".main-cont-escritor")

       

           
            const divCont = document.createElement('div')
            const divRow = document.createElement('div')
            const divCard = document.createElement('div')
            const cardText = document.createElement('p')
            const divImgWrapper = document.createElement('div')
            const img = document.createElement('img')
            const divCardBody = document.createElement('div')
            const title = document.createElement('h4')
            const subtitle = document.createElement('h6')
            const p_star = document.createElement('p')

        

            divRow.classList.add("row", "g-0")
            divCont.classList.add("col-12", "cont-mod", "my-5")
            title.innerHTML = data.escritor.nome
            cardText.innerHTML = data.escritor.sobre_autor
  
            divCard.classList.add("card", "card-mod","mb-3")
            divCardBody.classList.add("card-body", "p-5")
            title.classList.add("card-title")
            subtitle.classList.add("card-subtitle", "text-muted", "mb-5")
            p_star.classList.add("card-text", "col", 'my-5', "star")
            cardText.classList.add("card-text", "text-book")


     

          

       
     
       
            
        
            divCont.append(divCard)
            divRow.append(divImgWrapper, divCardBody)
            divCard.append(divRow)
            divImgWrapper.append(img)
            divCardBody.append(title, subtitle, cardText)




            container.append(divCont)
        
            
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}

async function listEditoraBook() {
    try {
        fetch("https://bookaholic-api-production.up.railway.app/home/livro?id=" + getValueParam())
        .then(response => response.json())
        .then(data => {
        

            const container = document.querySelector(".main-cont-editora")

       

     
           
            const divCont = document.createElement('div')
            const divRow = document.createElement('div')
            const divCard = document.createElement('div')
            const divImgWrapper = document.createElement('div')
            const img = document.createElement('img')
            const divCardBody = document.createElement('div')
            const title = document.createElement('h4')
            const cardText = document.createElement('p')     
            const subtitle = document.createElement('h6')
            const p_star = document.createElement('p')

        

            divRow.classList.add("row", "g-0")
            divCont.classList.add("col-12", "cont-mod", "my-5")
            title.innerHTML = data.editora.nome_editora
            subtitle.innerHTML = data.editora.genero
            cardText.innerHTML = data.editora.descricao


            divCard.classList.add("card", "card-mod","mb-3")
            divCardBody.classList.add("card-body", "p-5")
            title.classList.add("card-title")
            subtitle.classList.add("card-subtitle", "text-muted", "mb-5")
            cardText.classList.add("card-text", "text-book")


     

          

       
     
       
            
        
            divCont.append(divCard)
            divRow.append(divImgWrapper, divCardBody)
            divCard.append(divRow)
            divCardBody.append(title, subtitle, cardText)
     



            container.append(divCont)
        
            
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}

async function listAvaliacoesBook() {

    fetch("https://bookaholic-api-production.up.railway.app/livro/avaliacaoUsuario?id=" + getValueParam())
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("comentarios");
            data.map((item) => {
                /*
                <div class="card mt-5 p-3 ps-3" >
             
                <div class="d-flex flex-row">
                    <div >
                        <img src="imgs/user.png" alt="" width="50" height="50">
                    </div>
                    <div class="mt-3 mx-3 ">
                        <h5 class="card-title">Marco Antonio</h5>
                    </div>
                </div>
                <div class="card-text col ">

                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>

                        <h7 class="text-warning">Incrivel vou reler</h7>
                  
                </div>  
                <h6 class="card-subtitle text-muted "> Avaliado em 17/10/2023</h6>    
                <div class="mb-3">
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    
                </div>
      
        </div>
                */

                const div1 = document.createElement("div")
                const div2 = document.createElement("div")
                const div21 = document.createElement("div")
                const div22 = document.createElement("div")
                const img = document.createElement("img")
                const h5 = document.createElement("h5")
                const divtext = document.createElement("div")
                const i = document.createElement("i");
                const i2 = document.createElement("i2");
                const i3 = document.createElement("i3");
                const i4 = document.createElement("i4");
                const i5 = document.createElement("i5");
                const h6 = document.createElement("h6")
                const divtextp = document.createElement("div")
                const p = document.createElement("p")
                
                div1.classList.add("card", "mt-5", "p-3", "ps-3")
                div2.classList.add("d-flex", "flex-row")
                div22.classList.add("mt-3", "mx-3")
                h5.classList.add("card-title")
                divtext.classList.add("card-text", "col")
                h6.classList.add("card-subtitle", "text-muted")

                if(item.qtd_estrela == 1){
                    i.classList.add("bi","bi-star-fill", "text-warning")
                    i2.classList.add("bi","bi-star-fill")
                    i3.classList.add("bi","bi-star-fill")
                    i4.classList.add("bi","bi-star-fill")
                    i5.classList.add("bi","bi-star-fill")
                } else if (item.qtd_estrela == 2) {
                    i.classList.add("bi","bi-star-fill", "text-warning")
                    i2.classList.add("bi","bi-star-fill", "text-warning")
                    i3.classList.add("bi","bi-star-fill")
                    i4.classList.add("bi","bi-star-fill")
                    i5.classList.add("bi","bi-star-fill")

                } else if (item.qtd_estrela == 3) {
                    i.classList.add("bi","bi-star-fill", "text-warning")
                    i2.classList.add("bi","bi-star-fill", "text-warning")
                    i3.classList.add("bi","bi-star-fill", "text-warning")
                    i4.classList.add("bi","bi-star-fill")
                    i5.classList.add("bi","bi-star-fill")

                } else if(item.qtd_estrela == 4) {
                    i.classList.add("bi","bi-star-fill", "text-warning")
                    i2.classList.add("bi","bi-star-fill", "text-warning")
                    i3.classList.add("bi","bi-star-fill", "text-warning")
                    i4.classList.add("bi","bi-star-fill", "text-warning")
                    i5.classList.add("bi","bi-star-fill")
                }else if(item.qtd_estrela == 5) {
                    i.classList.add("bi","bi-star-fill", "text-warning")
                    i2.classList.add("bi","bi-star-fill", "text-warning")
                    i3.classList.add("bi","bi-star-fill", "text-warning")
                    i4.classList.add("bi","bi-star-fill", "text-warning")
                    i5.classList.add("bi","bi-star-fill", "text-warning")
                } else {
                    i.classList.add("bi","bi-star-fill")
                    i2.classList.add("bi","bi-star-fill")
                    i3.classList.add("bi","bi-star-fill")
                    i4.classList.add("bi","bi-star-fill")
                    i5.classList.add("bi","bi-star-fill")

                }
                
                img.setAttribute("src", "imgs/user.png")
                img.setAttribute("width", "50")
                img.setAttribute("heidht", "50")
                

            
                h6.innerHTML = formatarData(item.created)
                h5.innerHTML = item.nome_usuario
                p.innerHTML = item.descricao

                div21.append(img)
                div22.append(h5)
                div2.append(div21 , div22)
                divtext.append(i, i2, i3, i4, i5)
                divtextp.append(p)
                div1.append(div2, divtext, h6, divtextp)

                list.append(div1)

            })
            
        })
}



function setEpub(pathEpub1) {
    location.href = "http://localhost:5500/front-end/ViewBook.html?path=" + pathEpub1
}


listAvaliacoesBook()
listCardBook()
listEscritorBook()
listEditoraBook()