document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting normally

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            // Hardcoded credentials for demonstration purposes.
            // In a real application, you would send this to a server for validation.
            const correctUsername = 'admin';
            const correctPassword = 'password';

            const enteredUsername = usernameInput.value.trim();
            const enteredPassword = passwordInput.value.trim();

            if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
                // Successful login
                // Hide any previous error messages
                errorMessage.style.display = 'none';
                errorMessage.textContent = '';
                
                // Redirect to the admin dashboard
                window.location.href = 'admin.html';
            } else {
                // Failed login
                // Display an error message
                errorMessage.textContent = 'Invalid username or password. Please try again.';
                errorMessage.style.display = 'block';

                // Clear the password field for security
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }
});
