// Keycharm - LocalStorage Authentication System

const modalOverlay = document.getElementById('modalOverlay');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// ===============================
// MODAL FUNCTIONS
// ===============================

function openModal() {
    modalOverlay.classList.add('active');
    showLogin();
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

function showSignup(e) {
    if (e) e.preventDefault();

    loginModal.classList.remove('active');
    signupModal.classList.add('active');
}

function showLogin(e) {
    if (e) e.preventDefault();

    signupModal.classList.remove('active');
    loginModal.classList.add('active');
}

// ===============================
// SIGN UP
// ===============================

function handleSignup(e) {
    e.preventDefault();

    const signupInputs = signupModal.querySelectorAll('input');

    const firstName = signupInputs[0].value.trim();
    const lastName = signupInputs[1].value.trim();
    const email = signupInputs[2].value.trim().toLowerCase();
    const password = signupInputs[3].value;
    const confirmPassword = signupInputs[4].value;

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("Email already registered!");
        return;
    }

    // Create new user object
    const newUser = {
        firstName,
        lastName,
        email,
        password
    };

    // Save user
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    // Auto login after signup
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Account created successfully!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}

// ===============================
// LOGIN
// ===============================

function handleLogin(e) {
    e.preventDefault();

    const loginInputs = loginModal.querySelectorAll('input');

    const email = loginInputs[0].value.trim().toLowerCase();
    const password = loginInputs[1].value;

    // Get users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    // Save logged in session
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert(`Welcome back, ${user.firstName}!`);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}

// ===============================
// LOGOUT
// ===============================

function logout() {
    localStorage.removeItem("currentUser");

    alert("Logged out successfully!");

    // Redirect back to homepage
    window.location.href = "index.html";
}

// ===============================
// UPDATE UI
// ===============================

function updateUI() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // If user is logged in redirect to dashboard
    if (currentUser) {
        window.location.href = "dashboard.html";
    }

    const ctaButton = document.querySelector('.cta-button');

    // Homepage button always opens modal
    if (ctaButton) {
        ctaButton.onclick = openModal;
    }
}

// ===============================
// CLOSE MODAL EVENTS
// ===============================

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (
        e.key === 'Escape' &&
        modalOverlay.classList.contains('active')
    ) {
        closeModal();
    }
});

// ===============================
// INITIAL LOAD
// ===============================

updateUI();