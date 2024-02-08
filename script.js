document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('registerUsername').value;
    let password = document.getElementById('registerPassword').value;
    localStorage.setItem(username, password);
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;
    if(localStorage.getItem(username) === password) {
        // Redirect to user account page
        window.location.href = "account.html";
    } else {
        alert('Invalid username or password');
    }
});