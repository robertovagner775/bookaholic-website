const form = document.getElementById("formSearch")
const input = document.getElementById("search")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    const content = document.querySelector(".content")
   
    
  
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const url = "http://localhost:8080/home/livroTitulo?titulo="+ search.value

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            
            headers: {
              
                'Content-Type' : 'application/json',
              
            },
            
        }).then(response => response.json())
        .then(data => {

            const content = document.querySelector(".content")
           
            data.map((item) => {

                var path = "./../"

                
                const divCol = document.createElement('div')
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

            


                divCol.classList.add("col-md-4", "md-5")
                title.innerHTML = item.titulo
                subtitle.innerHTML = item.escritor.nome
                img.setAttribute("src", localStorage.getItem("path") + item.path_imagem)
                divCard.style = "width:18rem;"
                aLinkAvaliacao.setAttribute('href', 'https://robertomeudominio.000webhostapp.com/front-end/AvaliacaoPage.html?id='+ item.id)
                divCard.classList.add("card", "card-mod-scroll")
                divImgWrapper.classList.add("img-wrapper")
                img.classList.add("card-img-top")
                divCardBody.classList.add("card-body", "text-center")
                title.classList.add("card-title")
                subtitle.classList.add("card-subtitle", "text-muted", "mx-5")
                p_star.classList.add("card-text")
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
                        
                        p_star_qtd.innerHTML = "(" + data.quantidade + ")";
                        if(data.type != null) {
                            p_star_qtd.innerHTML = ""
                        }
                    })  
                divCol.append(aLinkAvaliacao)
                aLinkAvaliacao.append(divCard)
                divCard.append(divImgWrapper, divCardBody)
                divImgWrapper.append(img)
                divCardBody.append(title, subtitle, p_star)
                p_star.append(i, i2, i3, i4, i5, p_star_qtd)
            


                content.append(divCol)

        })

        

    })        
        
    
})


function limparConteudo() {
    const content = document.getElementById("content-search");

    for (child of content.children){
        child.remove();
    }
}