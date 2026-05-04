// chuyển trang
function goLogin() {
    window.location.href = "login.html";
}
function goRegister() {
    window.location.href = "register.html";
}

// ===== ĐĂNG KÝ =====
function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    if (!user || !pass) {
        alert("Nhập đầy đủ!");
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

// ===== ĐĂNG NHẬP =====
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let savedUser = localStorage.getItem("user");
    let savedPass = localStorage.getItem("pass");

    if (user === savedUser && pass === savedPass) {
        localStorage.setItem("currentUser", user); // 🔥 lưu user đang login
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        alert("Sai tài khoản!");
    }
}
function togglePass(id) {
    let input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}