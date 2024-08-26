const form = document.getElementById('authorization-form')

form.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(form)

    fetch('http://localhost:3000/api/auth/login', {
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
                return res.text().then(data => {
                    throw new Error(data)
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
            document.getElementById('error-field').textContent = error.message
        })
})
