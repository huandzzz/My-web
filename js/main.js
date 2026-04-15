function loadProducts() {
    let html = "";

    products.forEach(p => {
        html += `
            <div class="product">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p>${p.price.toLocaleString()} VNĐ</p>
            </div>
        `;
    });

    document.getElementById("productList").innerHTML = html;
}
