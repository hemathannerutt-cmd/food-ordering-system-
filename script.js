async function loadFoods() {
  try {
    const res = await fetch("http://localhost:3000/foods");

    if (!res.ok) {
      throw new Error("Foods API not working!");
    }

    const foods = await res.json();
    console.log("Foods Loaded:", foods);

    const foodList = document.getElementById("food-list");
    foodList.innerHTML = "";

    foods.forEach(food => {
      const card = document.createElement("div");
      card.className = "food-card";

      card.innerHTML = `
        <img src="${food.image}" />
        <h3>${food.name}</h3>
        <p>₹${food.price}</p>
        <button>Add to Cart</button>
      `;

      foodList.appendChild(card);
    });

  } catch (error) {
    alert("❌ Error Loading Foods: " + error.message);
    console.log(error);
  }
}

loadFoods();

