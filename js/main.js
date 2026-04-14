function loadProducts() {
    let html = "";

    products.forEach(p => {
        html += `
            <div class="product">
                <img src="${p.img}" style="width:100%; border-radius:10px;">
                <h3>${p.name}</h3>
                <p>${p.price.toLocaleString()} VNĐ</p>
            </div>
        `;
    });

    document.getElementById("productList").innerHTML = html;
}
