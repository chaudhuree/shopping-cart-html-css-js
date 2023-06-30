// selecting all the containers
const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const quantity = document.querySelector(".quantity");
const card = document.querySelector(".card");
const clearIcon = document.querySelector(".clear-cart");

// functianility for open and close the sidebar drawer
openShopping.addEventListener("click", () => {
  card.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  card.classList.remove("active");
});

// note: DOMContentLoaded is used to utilize the data from localstorage
document.addEventListener("DOMContentLoaded", reloadCard);

// listCards is for storing cart items
let listCards;
// check localstorage for cart items
// if it is the first time or cart is empty, listCards is an empty array
if (localStorage.getItem("nsc") == null) {
  listCards = [];
} else {
  listCards = JSON.parse(localStorage.getItem("nsc"));
}

// this is for load the products
const initApp = () => {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value?.name}</div>
            <div class="price">${value?.price.toLocaleString()}</div>
            <button class="retro" onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  });
};
// called the initn app
initApp();

// this is for adding the product to cart
const addToCard = (key) => {
  if (listCards[key] == null) {
    // check if the product is not in the cart
    // then add it to the cart
    listCards[key] = products[key];
    listCards[key].quantity = 1;
  }
  // reloadCard is to reload the sidebar and also quantity icons
  reloadCard();
};
// this is for reloading the sidebar and also quantity icons
// at the initial state DOMContentLoaded is called and it check either
// data is available in localstorage or not

function reloadCard () {
  localStorage.setItem("nsc", JSON.stringify(listCards));
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards
    ?.filter((item) => item !== null)
    ?.forEach((value, key) => {
      totalPrice = totalPrice + value?.price;
      count = count + value?.quantity;
      if (value != null) {
        let newDiv = document.createElement("li");
        newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div class="card-item-text">${value?.name}</div>
                <div class="card-item-text">${value?.price.toLocaleString()}</div>
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
  total.innerHTML = `TOTAL : ${totalPrice.toLocaleString()} / ${totalPrice.toLocaleString(
    "bn-BD",
    { style: "currency", currency: "BDT" }
  )} `;
  quantity.innerText = count;
};

// increase or decrease the quantity of the product
const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    // delete listCards[key];
    listCards.splice(key, 1);
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
};

// clear cart data
clearIcon.addEventListener("click", () => {
  console.log("clear card");

  listCards = [];
  listCard.innerHTML = "";
  reloadCard();
  card.classList.remove("active");
});
