// 购物车数组
let cart = JSON.parse(localStorage.getItem('cart')) || [];
 
// 更新购物车显示
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    let total = 0;
 
    // 清空购物车内容
    cartItemsDiv.innerHTML = '';
 
    cart.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${cart.indexOf(item)})">移除</button>
            <hr>
        `;
        cartItemsDiv.appendChild(itemDiv);
 
        // Calculate the total price
        total += item.price * item.quantity;
    });
 
    // Display the total price
    cartTotalDiv.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;
 
    // Save the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}
 
// 添加到购物车
function addToCart(productName, productPrice) {
    const productQuantity = parseInt(prompt('请输入购买数量:'));
 
    if (isNaN(productQuantity) || productQuantity <= 0) {
        alert('请输入有效的购买数量');
        return;
    }
 
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += productQuantity;
    } else {
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: productQuantity });
    }
 
    updateCartDisplay();
}
 
// 从购物车移除商品
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}
 
// 结算功能（这里只是简单输出购物车内容，实际中应处理支付逻辑）
function checkout() {
    if (cart.length === 0) {
        alert('购物车为空');
    } else {
        alert(`结算购物车内容:\n${cart.map(item => `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`).join('\n')}`);
        // 可以在这里添加支付逻辑，例如重定向到支付页面
        // 例如: window.location.href = 'payment.html';
    }
}
 
// 初始化显示（例如，页面加载时如果有已保存的购物车数据）
window.onload = updateCartDisplay;