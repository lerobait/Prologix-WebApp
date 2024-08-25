document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');

    form.addEventListener('submit', function(event) {
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;
        const passwordRegex = /^(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

        if (!passwordRegex.test(passwordValue)) {
            event.preventDefault();
            passwordError.textContent = 'Пароль должен содержать от 8 до 20 знаков и включать минимум одну цифру или специальный символ';
            passwordError.style.display = 'block';
        } else if (passwordValue !== confirmPasswordValue) {
            event.preventDefault();
            passwordError.textContent = 'Пароли не совпадают';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Store tokens (e.g., in localStorage)
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                // Redirect user to the desired page
                window.location.href = 'http://localhost:63342/Prologix-WebApp-main/Front-End/src/index.html';
            } else {
                const errorData = await response.json();
                loginError.textContent = errorData.message || 'Ошибка авторизации';
                loginError.style.display = 'block';
            }
        } catch (error) {
            loginError.textContent = 'Ошибка сети';
            loginError.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const userLogin = document.getElementById('user-login');
    const logoutButton = document.getElementById('logout-button');

    async function getUserInfo() {
        try {
            const response = await fetch('http://localhost:3000/api/user/info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                userLogin.textContent = data.login;
            } else {
                console.error('Ошибка получения информации о пользователе');
            }
        } catch (error) {
            console.error('Ошибка сети', error);
        }
    }

    getUserInfo();

    logoutButton.addEventListener('click', logout);
});

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.cabinet-button');

    async function logout() {
        try {
            const response = await fetch('http://localhost:3000/api/user/logout', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = 'login.html';
            } else {
                console.error('Ошибка выхода из аккаунта');
            }
        } catch (error) {
            console.error('Ошибка сети', error);
        }
    }

    logoutButton.addEventListener('click', logout);
});