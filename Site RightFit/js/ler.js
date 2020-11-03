

document.addEventListener("DOMContentLoaded",function(){    
    
    const nome = document.getElementById("nome")
    console.log("ola")


    fetch("http://localhost:3333/api/read", {
        

        method: "GET",

        headers: { 'Content-Type': 'application/json',"Authorization": localStorage.getItem("token") },

    })
        .then((resposta) => {
            resposta.json().then((dados) => {
                console.log("a")
                console.log(dados)
                console.log(nome)                                
                nome.textContent = titleize(dados.name)
                
            })
        })

})



