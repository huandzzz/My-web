// ===== LOAD KHI TRANG MỞ =====
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartCount();

    const input = document.getElementById("searchInput");
    if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") doSearch();
        });
    }
});

// ===== HIỂN THỊ SẢN PHẨM =====
function loadProducts(filter = "All") {
    const list = document.getElementById("productList");
    if (!list || typeof products === "undefined") return;

    const result = products.filter(p => filter === "All" || p.category === filter);

    list.innerHTML = result.length
        ? result.map(p => `
            <div class="product">
                <img src="${p.image}" onclick="goDetail(${p.id})">
                <h3 onclick="goDetail(${p.id})">${p.name}</h3>
                <p>${p.price.toLocaleString()}đ</p>

                <button class="add-cart-btn" onclick="addToCart(${p.id})">
                    🛒 Thêm
                </button>
            </div>
        `).join("")
        : "<p>Không có sản phẩm</p>";
}

// ===== SEARCH =====
function searchProduct(keyword) {
    keyword = keyword.toLowerCase().trim();

    const list = document.getElementById("productList");
    if (!list) return;

    const result = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    list.innerHTML = result.length
        ? result.map(p => `
            <div class="product">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>${p.price.toLocaleString()}đ</p>

                <button class="add-cart-btn" onclick="addToCart(${p.id})">
                    🛒
                </button>
            </div>
        `).join("")
        : "<p>Không tìm thấy</p>";
}

function doSearch() {
    const input = document.getElementById("searchInput");
    if (input) searchProduct(input.value);
}

// ===== DETAIL =====
function goDetail(id) {
    window.location.href = "detail.html?id=" + id;
}

function getId() {
    return new URLSearchParams(window.location.search).get("id");
}

function loadDetail() {
    let id = parseInt(getId());
    let p = products.find(x => x.id === id);

    if (!p) return;

    const box = document.getElementById("detail");
    if (!box) return;

    box.innerHTML = `
        <img src="${p.image}">
        <div class="detail-info">
            <h2>${p.name}</h2>
            <p>${p.desc || ""}</p>
            <h3>${p.price.toLocaleString()}đ</h3>

            <button class="add-cart-btn" onclick="addToCart(${p.id})">
                🛒 Thêm vào giỏ
            </button>
        </div>
    `;
}

// ===== GIỎ HÀNG (CHUẨN) =====
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    let cart = getCart();
    let item = cart.find(i => i.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ id: id, qty: 1 });
    }

    saveCart(cart);
    updateCartCount();

    alert("Đã thêm vào giỏ 🛒");
}

// ===== UPDATE SỐ LƯỢNG =====
function updateCartCount() {
    let cart = getCart();
    let count = cart.reduce((sum, i) => sum + i.qty, 0);

    let el = document.getElementById("cartCount");
    if (el) el.innerText = count;
}

// ===== LOAD CART =====
function loadCart() {
    let cart = getCart();
    let box = document.getElementById("cartList");

    if (!box) return;

    if (cart.length === 0) {
        box.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }

    let total = 0;

    box.innerHTML = cart.map(item => {
        let p = products.find(x => x.id === item.id);
        total += p.price * item.qty;

        return `
            <div class="cart-item">
                <img src="${p.image}">
                <div>
                    <h4>${p.name}</h4>
                    <p>${item.qty} x ${p.price.toLocaleString()}đ</p>
                </div>
            </div>
        `;
    }).join("");

    let totalEl = document.getElementById("totalPrice");
    if (totalEl) {
        totalEl.innerText = total.toLocaleString() + "đ";
    }
}

// ===== LIÊN HỆ =====
function goContact() {
    window.location.href = "contact.html";
}