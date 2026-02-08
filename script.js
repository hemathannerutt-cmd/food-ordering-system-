let cart = [];
let total = 0;

async function loadFoods() {
  try {
    const res = await fetch("foods.json"); // local file
    const foods = await res.json();

    const list = document.getElementById("food-list");
    list.innerHTML = "";

    foods.forEach(food => {
      const div = document.createElement("div");
      div.className = "food-card";

      div.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <h3>${food.name}</h3>
        <p>₹${food.price}</p>
        <button onclick="addToCart('${food.name}', ${food.price})">
          Add to Cart
        </button>
      `;

      list.appendChild(div);
    });
  } catch (err) {
    alert("❌ Foods not loading. Check foods.json path!");
    console.log(err);
  }
}

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = `Total: ₹${total}`;
}

function placeOrder() {
  alert("✅ Order Placed! (GitHub Pages Demo)");
}

loadFoods();

