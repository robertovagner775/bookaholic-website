

function getValueParam() {
    const params = new URLSearchParams(window.location.search);
    const nomeParam = params.get("id")
    return nomeParam;
}
var id = getValueParam();
const formArquivoEpub = document.getElementById("formArquivoEpub")
const formArquivoImagem = document.getElementById("formArquivoImg")


formArquivoEpub.addEventListener("submit", (t) => {
    t.preventDefault() 
    
    //const formData = new FormData(formEscritor)
    //const data = Object.fromEntries(formData)
    const url = "http://localhost:8080/file/epub?id=" + getValueParam()

    const fileEpub = document.getElementById('epub').files[0]
    const formData = new FormData();
    formData.append('file', fileEpub);
          
        fetch(url, {
            method: 'POST',
            body:  (formData)                    
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Falhou!');
          }
          console.log('Sucesso no upload!');
          swal("Archive Upload Success!!! ", "success");
        })
        .catch((error) => {
          swal(error);
        });          
    
})


formArquivoImagem.addEventListener("submit", (t) => {
  t.preventDefault() 
  
  //const formData = new FormData(formEscritor)
  //const data = Object.fromEntries(formData)
  const url = "http://localhost:8080/file/imagem?id=" + getValueParam()

  const fileImagem = document.getElementById('imagem').files[0]
  const formData2 = new FormData();
  formData2.append('file', fileImagem);
        
      fetch(url, {
          method: 'POST',
          body:  (formData2)                    
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Falhou!');
        }
        console.log('Sucesso no upload!');
        swal("Archive Upload Success!!! ", "success");
      })
      .catch((error) => {
        swal(error);
      });          
  
})

async function listTableBook() {
  try {
      fetch("http://localhost:8080/livro/"+ getValueParam())
      .then(response => response.json())
      .then(data => {
      
          const list = document.querySelector("#tableBookCorpo")
   

          data.map((item) => {
              const tr = document.createElement('tr')
              const th = document.createElement('th')
              const td1 = document.createElement('td')
              const td2 = document.createElement('td')
              const td3 = document.createElement('td')
      
          
              const listButtons2 = document.querySelector('.td-buttons-action')
            
              th.innerHTML = item.epub.nome_arquivo
              td1.innerHTML = item.epub.path
              td2.innerHTML = item.titulo
              td3.innerHTML = item.epub.tamanho
              list.append(tr)
            
              list.append(th, td1, td2, td3)

              
              
              





      

          })
      }

      )             
  } catch (error) {
      console.log(error)
      
  }
}

listTableBook()