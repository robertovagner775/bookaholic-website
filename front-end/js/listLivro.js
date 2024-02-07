function getValueParamTitle() {
        const params = new URLSearchParams(window.location.search);
        const path = params.get("title")
        return path;
}

var score = 0;
const path = "./files/imagems/"
localStorage.setItem("path", path);
async function getScoreSemanal() {
    fetch("http://localhost:8080/livro/scoreSemanal")
        .then(response => response.json())
        .then(data => {
            var i = 0;          
            data.map((item) => {
                i++
                localStorage.setItem("topBook" + i, item.titulo)
                localStorage.setItem("topBookScore" + i, item.score)
                localStorage.setItem("topBookQtd" + i, item.quantidade)
                console.log("topBook "+ i)
            })
        })
}


async function listCardBookSemanal() {
    fetch("https://bookaholic-api-production.up.railway.app/livro/livroSemana?title="+ localStorage.getItem("topBook1") +"&title2=" + localStorage.getItem("topBook2"))
    .then(response => response.json())
    .then(data => {     
        const list = document.getElementById("recomendacaoLeitura")

     
        data.map((item, i) => {
            var i = i + 1;
        
            /*
                        

            <div class="col-6 cont-mod m-3">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4 img-mod">
                  <img src="imgs/hobbit.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h4 class="card-title">Hobbit</h4>
                    <h5 class="card-subtitle text-muted ">Tolkien</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div class="row text-center">
                      <p class="card-text col">
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        (112)
                    </p>   
                      
                        <a href="#" class="btn btn-danger col"  >Go somewhere</a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
             </div>
             */


             const divContainer = document.createElement("div")
             const divCard = document.createElement("div")
             const divRow = document.createElement("div")
             const divCol = document.createElement("div")
             const img = document.createElement("img")
             const divColDois = document.createElement("div")
             const cardBody = document.createElement("div")
             const h4 = document.createElement("h4")
             const h5 = document.createElement("h5")
             const divRowDois = document.createElement("div")
             const p_star = document.createElement('p')
             const p = document.createElement('p')
             const p_star_qtd = document.createElement('label')
             const ii = document.createElement('i')
             const ii2 = document.createElement('i2')
             const ii3 = document.createElement('i3')
             const ii4 = document.createElement('i4')
             const ii5 = document.createElement('i5')
             const a = document.createElement('a')

             //class="card mb-3" style="max-width: 540px;"

             
            divContainer.classList.add("col-6", "cont-mod")
            divCard.classList.add("card", "mb-3")
            divCard.style.maxWidth = "540px";
            divRow.classList.add("row", "g-0");
            divCol.classList.add("col-md-4", "img-mod")
            img.classList.add("img-fluid", "rounded-start")
            divColDois.classList.add("col-md-8")
            cardBody.classList.add("card-body")
            h4.classList.add("card-title")
            h5.classList.add("card-subtitle", "text-muted")
            p.classList.add("card-text")
            divRowDois.classList.add("row", "text-center", "pt-3")
            p_star.classList.add("card-text", "col")
            a.classList.add("btn", "btn-danger", "col")
            h4.innerHTML = item.titulo
            h5.innerHTML = item.escritor.nome
            p.innerHTML = item.sinopse
            img.setAttribute("src", path + item.path_imagem)
            a.innerHTML = "leia mais"
            a.setAttribute('href', 'https://robertomeudominio.000webhostapp.com/front-end/AvaliacaoPage.html?id='+ item.id)
           console.log(localStorage.getItem("topBookScore" + i))
            if(parseInt(localStorage.getItem("topBookScore" + i)) == 1){
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill")
                ii3.classList.add("bi","bi-star-fill")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")
            } else if (parseInt(localStorage.getItem("topBookScore" + i)) == 2) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")

            } else if (parseInt(localStorage.getItem("topBookScore" + i)) == 3) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill", "text-warning")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")

            } else if(parseInt(localStorage.getItem("topBookScore" + i)) == 4) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill", "text-warning")
                ii4.classList.add("bi","bi-star-fill", "text-warning")
                ii5.classList.add("bi","bi-star-fill")
            }else if(parseInt(localStorage.getItem("topBookScore" + i)) == 5) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill", "text-warning")
                ii4.classList.add("bi","bi-star-fill", "text-warning")
                ii5.classList.add("bi","bi-star-fill", "text-warning")
            } else if(localStorage.getItem("topBookScore" + i) == "") {
                ii.classList.add("bi","bi-star-fill")
                ii2.classList.add("bi","bi-star-fill")
                ii3.classList.add("bi","bi-star-fill")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")

            }

            p_star_qtd.innerHTML = "(" +localStorage.getItem("topBookQtd" + i) +")";
            
            
            p_star.append(ii, ii2, ii3, ii4, ii5, p_star_qtd)
            divRowDois.append(p_star, a)
            cardBody.append(h4, h5, p, divRowDois)
            divColDois.append(cardBody)
            divCol.append(img)
            divRow.append(divCol, divColDois)
            divCard.append(divRow)
            divContainer.append(divCard)
            list.append(divContainer)
        })


})
}
async function listCardBookCategoria(){
    fetch("https://bookaholic-api-production.up.railway.app/home/categoria?title="+getValueParamTitle())
    .then(response => response.json())
    .then(data => {     
        const list = document.getElementById("categoriaCards")
      
     
        data.map((item, i) => {
            var i = i + 1;
            
             if(data == null) {
                document.getElementById("noResult").style.visibility = "visible"
            } else {
                document.getElementById("noResult").style.visibility = "hidden"
            }
            /*
                        

            <div class="col-6 cont-mod m-3">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4 img-mod">
                  <img src="imgs/hobbit.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h4 class="card-title">Hobbit</h4>
                    <h5 class="card-subtitle text-muted ">Tolkien</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div class="row text-center">
                      <p class="card-text col">
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        (112)
                    </p>   
                      
                        <a href="#" class="btn btn-danger col"  >Go somewhere</a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
             </div>
             */


             const divContainer = document.createElement("div")
             const divCard = document.createElement("div")
             const divRow = document.createElement("div")
             const divCol = document.createElement("div")
             const img = document.createElement("img")
             const divColDois = document.createElement("div")
             const cardBody = document.createElement("div")
             const h4 = document.createElement("h4")
             const h5 = document.createElement("h5")
             const divRowDois = document.createElement("div")
             const p_star = document.createElement('p')
             const p = document.createElement('p')
             const p_star_qtd = document.createElement('label')
             const ii = document.createElement('i')
             const ii2 = document.createElement('i2')
             const ii3 = document.createElement('i3')
             const ii4 = document.createElement('i4')
             const ii5 = document.createElement('i5')
             const a = document.createElement('a')

             //class="card mb-3" style="max-width: 540px;"

             
            divContainer.classList.add("col-6", "cont-mod")
            divCard.classList.add("card", "mb-3")
            divCard.style.maxWidth = "540px";
            divRow.classList.add("row", "g-0");
            divCol.classList.add("col-md-4", "img-mod")
            img.classList.add("img-fluid", "rounded-start")
            divColDois.classList.add("col-md-8")
            cardBody.classList.add("card-body")
            h4.classList.add("card-title")
            h5.classList.add("card-subtitle", "text-muted")
            p.classList.add("card-text")
            divRowDois.classList.add("row", "text-center", "pt-3")
            p_star.classList.add("card-text", "col")
            a.classList.add("btn", "btn-danger", "col")
            h4.innerHTML = item.titulo
            h5.innerHTML = item.escritor.nome
            p.innerHTML = item.sinopse
            img.setAttribute("src", path + item.path_imagem)
            a.innerHTML = "leia mais"
            a.setAttribute('href', 'https://robertomeudominio.000webhostapp.com/front-end/AvaliacaoPage.html?id='+ item.id)
           console.log(localStorage.getItem("topBookScore" + i))
            if(parseInt(localStorage.getItem("topBookScore" + i)) == 1){
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill")
                ii3.classList.add("bi","bi-star-fill")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")
            } else if (parseInt(localStorage.getItem("topBookScore" + i)) == 2) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")

            } else if (parseInt(localStorage.getItem("topBookScore" + i)) == 3) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill", "text-warning")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")

            } else if(parseInt(localStorage.getItem("topBookScore" + i)) == 4) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill", "text-warning")
                ii4.classList.add("bi","bi-star-fill", "text-warning")
                ii5.classList.add("bi","bi-star-fill")
            }else if(parseInt(localStorage.getItem("topBookScore" + i)) == 5) {
                ii.classList.add("bi","bi-star-fill", "text-warning")
                ii2.classList.add("bi","bi-star-fill", "text-warning")
                ii3.classList.add("bi","bi-star-fill", "text-warning")
                ii4.classList.add("bi","bi-star-fill", "text-warning")
                ii5.classList.add("bi","bi-star-fill", "text-warning")
            } else if(localStorage.getItem("topBookScore" + i) == "") {
                ii.classList.add("bi","bi-star-fill")
                ii2.classList.add("bi","bi-star-fill")
                ii3.classList.add("bi","bi-star-fill")
                ii4.classList.add("bi","bi-star-fill")
                ii5.classList.add("bi","bi-star-fill")

            }
            
            

            p_star_qtd.innerHTML = "(" +localStorage.getItem("topBookQtd" + i) +")";
            
            
            p_star.append(ii, ii2, ii3, ii4, ii5, p_star_qtd)
            divRowDois.append(p_star, a)
            cardBody.append(h4, h5, p, divRowDois)
            divColDois.append(cardBody)
            divCol.append(img)
            divRow.append(divCol, divColDois)
            divCard.append(divRow)
            divContainer.append(divCard)
            list.append(divContainer)
        })


})
}




async function listCardBook() {
    try {
        fetch("https://bookaholic-api-production.up.railway.app/home/livros")
        .then(response => response.json())
        .then(data => {
        

            const carousel_inner = document.querySelector(".carousel-inner")

            data.map((item) => {

             
                const carousel_item = document.createElement('div')
                const aLinkAvaliacao = document.createElement('a')
                const divCard = document.createElement('div')
                const divImgWrapper = document.createElement('div')
                const img = document.createElement('img')
                const divCardBody = document.createElement('div')
                const title = document.createElement('h4')
                const subtitle = document.createElement('h6')
                const p_star = document.createElement('p')
                const p_star_qtd = document.createElement('label')
                const i = document.createElement('i')
                const i2 = document.createElement('i2')
                const i3 = document.createElement('i3')
                const i4 = document.createElement('i4')
                const i5 = document.createElement('i5')

            
                

                carousel_item.classList.add("carousel-item")
                title.innerHTML = item.titulo
                subtitle.innerHTML = item.escritor.nome
                img.setAttribute("src", path + item.path_imagem)
                divCard.style = "width:18rem;"
                aLinkAvaliacao.setAttribute('href', 'https://robertomeudominio.000webhostapp.com/front-end/AvaliacaoPage.html?id='+ item.id)
                divCard.classList.add("card", "card-mod-scroll")
                divImgWrapper.classList.add("img-wrapper")
                img.classList.add("card-img-top")
                divCardBody.classList.add("card-body", "text-center")
                title.classList.add("card-title")
                subtitle.classList.add("card-subtitle", "text-muted", "mx-5")
                p_star.classList.add("card-text")
                //listScoreBook(item.id)
                //var score = localStorage.getItem("score")
                //console.log("Score: "+ score + " Livro: "+ item.id)

                fetch("https://bookaholic-api-production.up.railway.app/livro/viewAvaliacao?id=" + item.id)
                .then(response => response.json())
                .then(data => {
                   
                        console.log(item)
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
                        
              
                        p_star_qtd.innerHTML = "(" + data.quantidade +")" 

                        if(data.type != null) {
                            p_star_qtd.innerHTML = ""
                        }
                })  


                carousel_item.append(aLinkAvaliacao)
                aLinkAvaliacao.append(divCard)
                divCard.append(divImgWrapper, divCardBody)
                divImgWrapper.append(img)
                divCardBody.append(title, subtitle, p_star)
                p_star.append(i, i2, i3, i4, i5, p_star_qtd)
                
            


                carousel_inner.append(carousel_item)



                /*
                const button1 = document.createElement('a')
                button1.className =  'btn btn-danger mx-1'
                button1.innerHTML = 'deletar'
                const button2 = document.createElement('a')
                button2.className = 'btn btn-info mx-1'
                button2.innerHTML = 'alterar'
                const button3 = document.createElement('a')
                button3.className = 'btn btn-dark mx-1'
               button3.innerHTML = 'adicionar arquivo'
                const listButtons2 = document.querySelector('.td-buttons-action')
                button3.setAttribute('href', 'livroPage.html?id=' + item.id_livro)
                th.innerHTML = item.id_livro
                td1.innerHTML = item.titulo
                td2.innerHTML = item.escritor.nome
                list.append(tr)
                td3.append(button1, button2, button3)
                list.append(th, td1, td2, td3)
                */
            })
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}

async function listCardBookDois() {
    try {
        fetch("https://bookaholic-api-production.up.railway.app/home/livroAlfabetica")
        .then(response => response.json())
        .then(data => {
        

            const carousel_inner = document.getElementById("carouselInner2")

            data.map((item) => {

         
                const carousel_item = document.createElement('div')
                const aLinkAvaliacao = document.createElement('a')
                const divCard = document.createElement('div')
                const divImgWrapper = document.createElement('div')
                const img = document.createElement('img')
                const divCardBody = document.createElement('div')
                const title = document.createElement('h4')
                const subtitle = document.createElement('h6')
                const p_star = document.createElement('p')
                const p_star_qtd = document.createElement('label')
                const i = document.createElement('i')
                const i2 = document.createElement('i2')
                const i3 = document.createElement('i3')
                const i4 = document.createElement('i4')
                const i5 = document.createElement('i5')

            
                

                carousel_item.classList.add("carousel-item")
                title.innerHTML = item.titulo
                subtitle.innerHTML = item.escritor.nome
                img.setAttribute("src", path + item.path_imagem)
                divCard.style = "width:18rem;"
                aLinkAvaliacao.setAttribute('href', 'https://robertomeudominio.000webhostapp.com/front-end/AvaliacaoPage.html?id='+ item.id)
                divCard.classList.add("card", "card-mod-scroll")
                divImgWrapper.classList.add("img-wrapper")
                img.classList.add("card-img-top")
                divCardBody.classList.add("card-body", "text-center")
                title.classList.add("card-title")
                subtitle.classList.add("card-subtitle", "text-muted", "mx-5")
                p_star.classList.add("card-text")
                //listScoreBook(item.id)
                //var score = localStorage.getItem("score")
                //console.log("Score: "+ score + " Livro: "+ item.id)

                fetch("https://bookaholic-api-production.up.railway.app/livro/viewAvaliacao?id=" + item.id)
                .then(response => response.json())
                .then(data => {
                   
                        console.log(item)
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
                        
              
                        p_star_qtd.innerHTML = "(" + data.quantidade +")" 

                        if(data.type != null) {
                            p_star_qtd.innerHTML = ""
                        }
                })  


                carousel_item.append(aLinkAvaliacao)
                aLinkAvaliacao.append(divCard)
                divCard.append(divImgWrapper, divCardBody)
                divImgWrapper.append(img)
                divCardBody.append(title, subtitle, p_star)
                p_star.append(i, i2, i3, i4, i5, p_star_qtd)
                
            


                carousel_inner.append(carousel_item)



            })
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
async function listScoreBook(idlivro) {
    fetch("https://bookaholic-api-production.up.railway.app/livro/viewAvaliacao?id=" + idlivro)
        .then(response => response.json())
        .then(data => {
            data.map((item) => {
                localStorage.setItem("score",item.score)
            })
        })  
}
listCardBookCategoria()
getScoreSemanal()
listCardBookSemanal()
listCardBookDois()
listCardBook()

