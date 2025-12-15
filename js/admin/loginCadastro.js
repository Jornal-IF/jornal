document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('loginForm')
    const loginDoUsuario = document.getElementById('loginUsuario')
    const senhaDoUsuario = document.getElementById('loginSenha')

    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        const usuario = loginDoUsuario.value.trim()
        const senha = senhaDoUsuario.value.trim()

        
        if(!usuario || !senha) {
            console.log('Preencha todos os campos!')
            return
        }

        sessionStorage.setItem('usuarioLogado', usuario)
        console.log('Usuario salvo:', usuario)

        window.location.href = 'cadastro.html'
    })

})