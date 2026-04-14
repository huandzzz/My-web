function loadProducts() {
    let html = "";
    products.forEach(p => {
        html += `<p>${p.name} - ${p.price} VNĐ</p>`;
    });
    document.getElementById("productList").innerHTML = html;
}
