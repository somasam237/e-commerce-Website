class AuthManager {
    constructor() {
        this.baseURL = 'http://localhost:5000/auth';
        this.init();
    }

    init() {
        // Register form handler
        const registerForm = document.getElementById('RegisterForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Login form handler
        const loginForm = document.getElementById('LoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch(`${this.baseURL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! You can now login.');
                showLoginForm();
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            alert('Network error. Please try again.');
            console.error('Registration error:', error);
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user info
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                alert('Login successful!');
                // Redirect to main page
                window.location.href = 'index.html';
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            alert('Network error. Please try again.');
            console.error('Login error:', error);
        }
    }
}

// Form switching functions
function showLoginForm() {
    document.getElementById('RegisterForm').style.display = 'none';
    document.getElementById('LoginForm').style.display = 'block';
}

function showRegisterForm() {
    document.getElementById('LoginForm').style.display = 'none';
    document.getElementById('RegisterForm').style.display = 'block';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
