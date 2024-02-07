

async function listEscritorSelect() {
    try {
        fetch("http://localhost:8080/gerencia/listNameEscritor")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.querySelector("#autor")

            data.map((item) => {
                const option = document.createElement('option')
                console.log(item)
                option.setAttribute('value', item.id_escritor)
                option.innerHTML = item.nome
                list.append(option)

            })
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}

async function listTableBook() {
    try {
        fetch("http://localhost:8080/gerencia/listLivro")
        .then(response => response.json())
        .then(data => {
        
            const list = document.querySelector("#tableBookCorpo")
     

            data.map((item) => {
                const tr = document.createElement('tr')
                const th = document.createElement('th')
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                const td3 = document.createElement('td')
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
                td3.append(button3)
                list.append(th, td1, td2, td3)

                
                
                





        

            })
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}



async function listTableAutor() {
    try {
        fetch("http://localhost:8080/gerencia/listNameEscritor")
        .then(response => response.json())
        .then(data => {
        
            const list = document.querySelector("#tableEscritor")
     

            data.map((item) => {
                const tr = document.createElement('tr')
                const th = document.createElement('th')
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                const td3 = document.createElement('td')
                const button1 = document.createElement('a')
                button1.className =  'btn btn-danger mx-1'
                button1.innerHTML = 'deletar'
                const button2 = document.createElement('a')
                button2.className = 'btn btn-info mx-1'
                button2.innerHTML = 'alterar'
               
          
            
                th.innerHTML = item.id_escritor
                td1.innerHTML = item.nome
                td2.innerHTML = item.data_nascimento
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

async function listEditoraSelect() {
    try {
        fetch("http://localhost:8080/gerencia/listNameEditora")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.querySelector("#editora")

            data.map((item) => {
                const option = document.createElement('option')
                console.log(item)
                option.setAttribute('value', item.id)
                option.innerHTML = item.nome_editora
                list.append(option)

            })
        }

        )             
    } catch (error) {
        console.log(error)
        
    }
}

listTableAutor()
listTableBook()
listEscritorSelect()
listEditoraSelect()