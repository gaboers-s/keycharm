// ===============================
// AUTH SYSTEM (ENHANCED)
// ===============================

const modalOverlay = document.getElementById('modalOverlay');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// ===============================
// CONFIG
// ===============================

const ADMIN_EMAIL = "admin@gmail.com";

// ===============================
// HELPERS
// ===============================

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function isAdmin(user) {
    return user && user.email === ADMIN_EMAIL;
}

// ===============================
// AUTO REDIRECT IF LOGGED IN
// ===============================

(function checkSession() {
    const user = getCurrentUser();

    if (user) {
        window.location.href = "dashboard.html";
    }
})();

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
// SIGNUP
// ===============================

function handleSignup(e) {
    e.preventDefault();

    const inputs = signupModal.querySelectorAll('input');

    const firstName = inputs[0].value.trim();
    const lastName = inputs[1].value.trim();
    const email = inputs[2].value.trim().toLowerCase();
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);

    if (exists) {
        alert("Email already registered!");
        return;
    }

    const newUser = {
        firstName,
        lastName,
        email,
        password,
        role: email === ADMIN_EMAIL ? "admin" : "user"
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    window.location.href = "dashboard.html";
}

// ===============================
// LOGIN
// ===============================

function handleLogin(e) {
    e.preventDefault();

    const inputs = loginModal.querySelectorAll('input');

    const email = inputs[0].value.trim().toLowerCase();
    const password = inputs[1].value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "dashboard.html";
}

// ===============================
// LOGOUT (optional if used here)
// ===============================

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// ===============================
// UI INIT
// ===============================

function updateUI() {
    const user = getCurrentUser();

    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton) {
        ctaButton.onclick = openModal;
    }

    // no redirect loop here anymore (important fix)
}

// ===============================
// EVENTS
// ===============================

modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// ===============================
// START
// ===============================

updateUI();