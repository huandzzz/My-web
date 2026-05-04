function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let list = document.getElementById("cartList");
    let total = 0;

    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = "<p>Giỏ hàng trống</p>";
        document.getElementById("totalPrice").innerText = "0đ";
        return;
    }

    list.innerHTML = cart.map(item => {
        let p = products.find(x => x.id === item.id);
        if (!p) return "";

        total += p.price * item.qty;

        return `
        <div class="cart-item">

            <div class="cart-left">
                <img src="${p.image}">
                <div class="cart-info">
                    <h3>${p.name}</h3>
                    <p>${p.price.toLocaleString()}đ</p>
                </div>
            </div>

            <div class="cart-right">
                <div>
                    <button class="qty-btn" onclick="changeQty(${item.id
					}, -1)">-</button>
                    ${item.qty}
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>

                <p><b>${(p.price * item.qty).toLocaleString()}đ</b></p>

                <button class="delete-btn" onclick="removeItem(${item.id})">Xóa</button>
            </div>

        </div>
        `;
    }).join("");

    document.getElementById("totalPrice").innerText = total.toLocaleString() + "đ";
}
function changeQty(id, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += amount;
    if (item.qty < 1) item.qty = 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
function checkout() {
    if (!confirm("Xác nhận thanh toán?")) return;

    alert("Thanh toán thành công!");
    localStorage.removeItem("cart");
    loadCart();
}