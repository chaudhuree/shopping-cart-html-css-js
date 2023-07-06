let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let card = document.querySelector(".card");
let clearIcon = document.querySelector(".clear-cart");
openShopping.addEventListener("click", () => {
  card.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  card.classList.remove("active");
});

let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button class="retro" onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  });
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div class="card-item-text">${value.name}</div>
                <div class="card-item-text">${value.price.toLocaleString()}</div>
                <div>
                    <button class="retro inde-padding" onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button class="retro inde-padding" onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerHTML = `TOTAL : ${totalPrice.toLocaleString()} `;
  quantity.innerText = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    // delete listCards[key];
    listCards.splice(key, 1);
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

clearIcon.addEventListener("click", () => {
  console.log("clear card");

  listCards = [];
  listCard.innerHTML = "";
  reloadCard();
  card.classList.remove("active");
});
