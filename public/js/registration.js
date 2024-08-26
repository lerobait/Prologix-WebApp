const form = document.getElementById('registration-form')

form.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(form)

    fetch('http://localhost:3000/api/auth/registration', {
        method: 'POST',
        body: JSON.stringify({
            login: formData.get('login'),
            password: formData.get('password')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 200) {
                return res.json().then(data => {
                    throw new Error(data.message)
                })
            }

            return res.json()
        })
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)

            window.location.href = '/'
        })
        .catch(error => {
            const errorField = document.getElementById('password-error')
            errorField.style.display = 'block'
            errorField.textContent = error.message
        })
})
