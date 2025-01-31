const nav = document.getElementById("nav")
const openBtn = document.getElementById("open-btn")

openBtn.addEventListener("click", () => {
  render(searchInp, shoppingCart)
  nav.classList.toggle("open-menu")
  // searchInp.classList.remove('open-search_inp');
})

// ===========SEARCH_BAR & SHOPPING-CART===========

const searchBtn = document.getElementById("search-btn")
const searchInp = document.querySelector(".search_inp")
const shoppingCart = document.querySelector(".shopping-cart")
const cartBtn = document.getElementById("cart-shopping")

searchBtn.addEventListener("click", () => {
  render(nav, shoppingCart)
  searchInp.classList.toggle("open-search_inp")
  // nav.classList.remove('open-menu');
})

cartBtn.addEventListener("click", () => {
  render(searchInp, nav)
  shoppingCart.classList.toggle("card-active")
})

function render(a, b) {
  a.classList.remove("open-menu")
  b.classList.remove("open-menu")
  a.classList.remove("open-search_inp")
  b.classList.remove("card-active")
}

// ==============ONSCROLL================
window.onscroll = () => {
  searchInp.classList.remove("open-search_inp")
  shoppingCart.classList.remove("card-active")
  nav.classList.remove("open-menu")
}

// ==============SHOPPING-CART==============

let shop = document.getElementById("product-cards")

let product_items = [
  {
    id: 1,
    img: "images/product-1.png",
    name: "Nicaragua - Fresh Coffee",
    price: 15.99,
    sale: 20.99,
  },
  {
    id: 2,
    img: "images/product-2.png",
    name: "Columbia - Strong Coffee",
    price: 20.99,
    sale: 25.99,
  },
  {
    id: 3,
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
    name: "Tasy And Healty",
    price: 20.99,
    sale: 15.99,
  },
  {
    id: 2,
    img: "images/menu-1.png",
    name: "Tasy And Healty",
    price: 20.99,
    sale: 15.99,
  },
  {
    id: 3,
    img: "images/menu-2.png",
    name: "Tasy And Healty",
    price: 20.99,
    sale: 15.99,
  },
  {
    id: 4,
    img: "images/menu-1.png",
    name: "Tasy And Healty",
    price: 20.99,
    sale: 15.99,
  },
]

let equipments = [
  {
    id: 1,
    img: "images/e.jpg",
    name: "Tasy And Healty",
    price: 20.99,
    sale: 15.99,
  },
  {
    id: 2,
    img: "images/f.jpg",
    name: "Tasy And Healty",
    price: 20.99,
    sale: 15.99,
  },
  {
    id: 3,
    img: "images/g.jpg",
    name: "Tasy And Healty",
    price: 20.99,
    sale: 15.99,
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
                        <div id=${id} class="product-btns">
                            <button onclick="sendCard(${id})" class="sebet"><i class="fa-solid fa-cart-shopping"></i></button>
                            <button class="heart"><i class="fa-solid fa-heart"></i></button>
                            <button class="eye"><i class="fa-solid fa-eye"></i></button>
                        </div>
                        <img src=${img} 
                        alt='product- ${id}' class="card-img" id='img-${id}'>
                        <h4>${name}</h4>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <p>$${price} <del>$${sale}</del></p>
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
            <img src="${item.img}" alt="" class="card-img">
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
    alert("You have successfully purchased.")
    clearStorage()
    renderCart()
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
      let { id, img, name, price } = item
      cost += price
      listItems += `
                     <div id='${id}' class="shop-card">
                         <div class="prod-item">
                                 <img src=${img} alt="cart-1">
                                 <div class="item-desc">
                                     <h3>${name}</h3>
                                     <p>$${price}</p>
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
  shopCart.querySelector("#cost").textContent = cost
}

// Add to LocalStorage Onclick button
function sendCard(id, kind) {
  const products =
    kind === "coffees"
      ? coffees
      : kind === "equipments"
      ? equipments
      : product_items
  let selected = products[id - 1]
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

// sendCard();
