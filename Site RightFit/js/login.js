const login = document.getElementById("loginForm")

console.log(login)
login.addEventListener("submit", function (e) {
    e.preventDefault()

    console.log("ola")

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value


    fetch("http://localhost:3333/api/login", {

        method: "POST",

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
            email: email,
            password: password,
        }),


    })
        .then((resposta) => {
            resposta.json().then((dados) => {
                console.log("a")
                console.log(dados)
                if(!dados.token){
                    return error2.textContent = dados
                }
                localStorage.setItem("token",dados.token)
                window.location = "dashboardTcc/index2.html"
            })
        })

})


