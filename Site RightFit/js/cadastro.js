const form = document.getElementById("registerForm")

console.log(form)
form.addEventListener("submit",function(e){
    e.preventDefault()
    
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const passwordConf = document.getElementById("passwordConf").value
    const error = document.getElementById("error")
    
    console.log(password)
    console.log(passwordConf)
    if (password != passwordConf){
        return error.textContent = "Senhas não coincidem!!"
    }


    fetch("http://localhost:3333/api/user", { 

    method: "POST",
    
    headers: { 'Content-Type': 'application/json' },
     
    body: JSON.stringify({ 
        name:name, 
        email:email,
        password:password,
        passwordConf:passwordConf 
    }), 
    

}) 
.then((resposta) => {
  resposta.json().then((dados) => {
      console.log("a")
      console.log(dados)
  
  })
})
})