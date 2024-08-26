import { fetchData } from "./makeAuthRequest.js"

const logoutBtn = document.getElementById('logout-button')

logoutBtn.addEventListener('click', e => {
    e.preventDefault()

    fetchData('http://localhost:3000/api/auth/logout', 'DELETE')
        .then(res => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            window.location.href = '/'
        })
})

fetchData('http://localhost:3000/api/user', 'GET')
    .then(res => res.json())
    .then(data => {
        document.getElementById('user-login').textContent = data.login
    })
