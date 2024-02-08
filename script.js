let registerForm = document.getElementById('registerForm');
if(registerForm != null) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let username = document.getElementById('registerUsername').value;
        let password = document.getElementById('registerPassword').value;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    });   
}

let loginForm = document.getElementById('loginForm');
if(loginForm != null) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let username = document.getElementById('loginUsername').value;
        let password = document.getElementById('loginPassword').value;
        if(localStorage.getItem('username') === username && localStorage.getItem('password') === password) {
            localSessionStorage.setItem('username', username);
            localSessionStorage.setItem('password', password);
            // Redirect to user account page
            window.location.href = "account.html";
        } else {
            alert('Invalid username or password');
        }
    });
}
