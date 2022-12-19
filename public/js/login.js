const login = async event => {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    const response = fetch('/api/users', {
        method: 'POST'
    })
}

const signup = async event => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
}

document.querySelector('#login-form').addEventListener('submit', login);
document.querySelector('#signup-form').addEventListener('submit', signup);