let cart = [];
let totalPrice = 0;

// Load Foods
async function loadFoods() {
  const res = await fetch("/foods");
  const foods = await res.json();

  const foodList = document.getElementById("food-list");

  foods.forEach(food => {
    const card = document.createElement("div");
    card.className = "food-card";

    card.innerHTML = `
      <img src="${food.image}" alt="${food.name}">
      <h3>${food.name}</h3>
      <p>₹${food.price}</p>
      <button onclick="addToCart(${food.id}, '${food.name}', ${food.price})">
        Add to Cart
      </button>
    `;

    foodList.appendChild(card);
  });
}

// Add to Cart
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  totalPrice += price;

  updateCart();
}

// Update Cart UI
function updateCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText =
    `Total: ₹${totalPrice}`;
}

// Place Order
async function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const orderData = {
    items: cart,
    total: totalPrice,
    date: new Date()
  };

  const res = await fetch("/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });

  const result = await res.json();

  document.getElementById("message").innerText = result.message;

  cart = [];
  totalPrice = 0;
  updateCart();
}

loadFoods();
