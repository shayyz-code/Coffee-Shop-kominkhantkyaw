const nav = document.getElementById("nav")
const openBtn = document.getElementById("open-btn")

openBtn.addEventListener("click", () => {
  render(shoppingCart)
  nav.classList.toggle("open-menu")
  // searchInp.classList.remove('open-search_inp');
})

// ===========SHOPPING-CART===========

const shoppingCart = document.querySelector(".shopping-cart")
const cartBtn = document.getElementById("cart-shopping")

cartBtn.addEventListener("click", () => {
  render(nav)
  shoppingCart.classList.toggle("card-active")
})

function render(b) {
  b.classList.remove("open-menu")
  b.classList.remove("card-active")
}

// ==============ONSCROLL================
window.onscroll = () => {
  shoppingCart.classList.remove("card-active")
  nav.classList.remove("open-menu")
}

// ==============SHOPPING-CART==============

let shop = document.getElementById("product-cards")

let product_items = [
  {
    id: 13,
    img: "images/product-1.png",
    name: "Nicaragua - Fresh Coffee",
    price: 15.99,
    sale: 20.99,
  },
  {
    id: 14,
    img: "images/product-2.png",
    name: "Columbia - Strong Coffee",
    price: 20.99,
    sale: 25.99,
  },
  {
    id: 15,
    img: "images/product-3.png",
    name: "Peru - Normal Coffee",
    price: 18.99,
    sale: 23.99,
  },
]

let coffees = [
  {
    id: 1,
    img: "images/menu-1.png",
    name: "Espresso Delight",
    price: 14.99,
    sale: 18.99,
  },
  {
    id: 2,
    img: "images/menu-2.png",
    name: "Caramel Bliss",
    price: 15.99,
    sale: 19.99,
  },
  {
    id: 3,
    img: "images/menu-3.png",
    name: "Vanilla Cream",
    price: 16.49,
    sale: 20.49,
  },
  {
    id: 4,
    img: "images/menu-4.png",
    name: "Hazelnut Harmony",
    price: 17.49,
    sale: 21.49,
  },
  {
    id: 5,
    img: "images/menu-5.png",
    name: "Mocha Supreme",
    price: 18.49,
    sale: 22.49,
  },
  {
    id: 6,
    img: "images/menu-6.png",
    name: "Classic Brew",
    price: 13.99,
    sale: 17.99,
  },
]

let equipments = [
  {
    id: 7,
    img: "images/g.png",
    name: "Traditional French Press",
    price: 64.99,
    sale: 79.99,
  },
  {
    id: 8,
    img: "images/f.png",
    name: "Advanced Brewing Machine",
    price: 79.99,
    sale: 99.99,
  },
  {
    id: 9,
    img: "images/e.png",
    name: "Premium French Press",
    price: 29.99,
    sale: 39.99,
  },
  {
    id: 10,
    img: "images/h.png",
    name: "Smart Espresso Machine",
    price: 119.99,
    sale: 149.99,
  },
  {
    id: 11,
    img: "images/i.png",
    name: "Milk Frother",
    price: 17.99,
    sale: 24.99,
  },
  {
    id: 12,
    img: "images/j.png",
    name: "Coffee Grinder",
    price: 34.99,
    sale: 49.99,
  },
]

const { pathname } = window.location
const lastPath = pathname.split("/")[pathname.split("/").length - 1]

if (lastPath === "coffee-selection.html") {
  const menuDiv = document.getElementById("menuDiv")
  menuDiv.innerHTML = coffees
    .map(
      (item) => `
        <div class="card text-center">
            <img src="${item.img}" alt="" class="card-img">
            <h4>${item.name}</h4>
            <p>$${item.price} <del>$${item.sale}</del></p>
            <button class="btn" onclick="sendCard(${item.id}, 'coffees')">Add to Cart</button>
        </div>
    `
    )
    .join("")

  let generateShop = () => {
    shop.innerHTML = product_items
      .map((item) => {
        let { id, img, name, price, sale } = item
        return `
                    <div class="card text-center" id='product-item-${id}'>
                        <img src=${img} 
                        alt='product- ${id}' class="card-img card-brew-img" id='img-${id}'>
                        <h4>${name}</h4>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <p>$${price} <del>$${sale}</del></p>
                        <div id=${id} class="product-btns">
                            <button onclick="sendCard(${id})" class="sebet"><i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div>
        `
      })
      .join("")
  }
  generateShop()
} else if (lastPath === "brewing-equipment.html") {
  const menuDiv = document.getElementById("menuDiv")
  menuDiv.innerHTML = equipments
    .map(
      (item) => `
        <div class="card text-center">
            <img src="${item.img}" alt="" class="card-brew-img">
            <h4>${item.name}</h4>
            <p>$${item.price} <del>$${item.sale}</del></p>
            <button class="btn" onclick="sendCard(${item.id}, 'equipments')">Add to Cart</button>
        </div>
    `
    )
    .join("")
}
//===================== CART==================
const getStorage = () => JSON.parse(localStorage.getItem("myShopArr")) || []
const clearStorage = () => localStorage.removeItem("myShopArr")

let shopCart = document.querySelector(".shopping-cart")

shopCart.querySelector(".check-items").onclick = () => {
  if (getStorage().length > 0) {
    checkoutNow()
  } else {
    alert("Please add an item to cart.")
  }
}

function renderCart() {
  let leadsFromLocalStorage = getStorage() || []
  // localStorage.clear()   LOCALSTORAGE-I TEMIZLEMEK UCUN
  if (leadsFromLocalStorage.length > 0) {
    const myShopArr = leadsFromLocalStorage
    createList(myShopArr)
  } else {
    shopCart.querySelector(".items").innerHTML = `
        <h2>You haven't added any Item</h2>
        `
    shopCart.querySelector("#cost").textContent = "0"
  }
}
renderCart()

function createList(myShopArr) {
  let listItems = ""
  let cost = 0
  myShopArr
    .map((item) => {
      let { id, img, name, price, quantity } = item
      cost += price * quantity
      listItems += `
                     <div id='${id}' class="shop-card">
                         <div class="prod-item">
                                 <img src=${img} alt="cart-1">
                                 <div class="item-desc">
                                     <h3>${name}</h3>
                                     <div class="flex">
                                        <div>
                                          <button class="btn icon-btn" onclick="plus(${id})"><i class="fa-solid fa-plus"></i></button>
                                          <button class="btn icon-btn" onclick="minus(${id})"><i class="fa-solid fa-minus"></i></button>
                                        </div>
                                        <span>$${price} x ${quantity}</span>
                                     </div>
                                 </div>
                         </div>
                         <div onclick="deleteItem(${id})" class="close-btn">
                                 <i class="fa-solid fa-xmark"></i>
                         </div>
                     </div>
            `
    })
    .join("")
  shopCart.querySelector(".items").innerHTML = listItems
  shopCart.querySelector("#cost").textContent = cost.toFixed(2)
  // For Checkout
  sessionStorage.setItem("checkout", JSON.stringify({ total: cost }))
}

function checkoutNow() {
  window.location.href = "checkout.html"
}
// Add to LocalStorage Onclick button
function sendCard(id, kind) {
  const products =
    kind === "coffees"
      ? coffees
      : kind === "equipments"
      ? equipments
      : product_items
  let selected = products.find((product) => product.id === id)

  selected.quantity = 1
  localStorage.setItem("myShopArr", JSON.stringify([...getStorage(), selected]))
  renderCart()
}

//  Delete From Localstorage Onclick button
function deleteItem(id) {
  let selectedItem = document.getElementById(id)
  const newItems = getStorage().filter((x) => x.id != selectedItem.id)
  localStorage.setItem("myShopArr", JSON.stringify(newItems))
  renderCart()
}

function plus(id) {
  const item = getStorage().find((item) => item.id === id)
  item.quantity++
  localStorage.setItem(
    "myShopArr",
    JSON.stringify([...getStorage().filter((x) => x.id != id), item])
  )
  renderCart()
}

function minus(id) {
  const item = getStorage().find((item) => item.id === id)
  item.quantity--
  if (item.quantity == 0) {
    deleteItem(id)
  } else {
    localStorage.setItem(
      "myShopArr",
      JSON.stringify([...getStorage().filter((x) => x.id != id), item])
    )
    renderCart()
  }
}

// sendCard();
